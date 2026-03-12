// Local code execution engine — runs user code via the system's installed runtimes.
// No external API required. Supports JavaScript, Python, Java, C, C++.

import { spawn } from "child_process";
import { writeFile, mkdir, rm } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";

const TIMEOUT_MS = 10000; // 10 second execution limit

const LANGUAGE_CONFIG = {
    javascript: { ext: "js",   cmd: "node",    args: (f) => [f] },
    python:     { ext: "py",   cmd: "python",  args: (f) => [f] },
    java:       { ext: "java", cmd: null,       compile: "javac", run: "java", mainClass: "Main" },
    c:          { ext: "c",    cmd: null,       compile: "gcc",   compileArgs: (src, out) => [src, "-o", out, "-lm"], run: (out) => out },
    cpp:        { ext: "cpp",  cmd: null,       compile: "g++",   compileArgs: (src, out) => [src, "-o", out],        run: (out) => out },
};

function runProcess(cmd, args, options = {}) {
    return new Promise((resolve) => {
        const proc = spawn(cmd, args, { ...options, shell: false });
        let stdout = "";
        let stderr = "";
        let timedOut = false;

        const timer = setTimeout(() => {
            timedOut = true;
            proc.kill("SIGKILL");
        }, TIMEOUT_MS);

        proc.stdout?.on("data", (d) => { stdout += d.toString(); });
        proc.stderr?.on("data", (d) => { stderr += d.toString(); });

        proc.on("close", (code) => {
            clearTimeout(timer);
            resolve({ stdout, stderr, code, timedOut });
        });

        proc.on("error", (err) => {
            clearTimeout(timer);
            resolve({ stdout, stderr: err.message, code: 1, timedOut: false });
        });
    });
}

/**
 * @param {string} language
 * @param {string} code
 * @returns {Promise<{success:boolean, output?:string, error?:string, runtime?:number}>}
 */
export async function executeCode(language, code) {
    const config = LANGUAGE_CONFIG[language];
    if (!config) {
        return { success: false, error: `Unsupported language: ${language}` };
    }

    const workDir = join(tmpdir(), `stride-${randomUUID()}`);
    const start = Date.now();

    try {
        await mkdir(workDir, { recursive: true });

        // ── JavaScript / Python ──────────────────────────────────────────────
        if (config.cmd) {
            const srcFile = join(workDir, `main.${config.ext}`);
            await writeFile(srcFile, code, "utf8");

            // python may be "python3" on some systems; try both
            const cmds = config.cmd === "python" ? ["python", "python3"] : [config.cmd];
            let result;
            for (const cmd of cmds) {
                result = await runProcess(cmd, config.args(srcFile), { cwd: workDir });
                if (!result.stderr?.includes("not recognized") && !result.stderr?.includes("No such file")) break;
            }

            if (result.timedOut) return { success: false, error: "Time Limit Exceeded (10s)" };
            if (result.stderr && result.code !== 0) return { success: false, error: result.stderr.trim(), output: result.stdout.trim() };
            return { success: true, output: result.stdout.trim() || "No output", runtime: Date.now() - start };
        }

        // ── Java ─────────────────────────────────────────────────────────────
        if (language === "java") {
            const srcFile = join(workDir, "Main.java");
            await writeFile(srcFile, code, "utf8");

            const compile = await runProcess("javac", [srcFile], { cwd: workDir });
            if (compile.timedOut) return { success: false, error: "Compilation timed out" };
            if (compile.code !== 0) return { success: false, error: compile.stderr.trim() };

            const run = await runProcess("java", ["-cp", workDir, config.mainClass], { cwd: workDir });
            if (run.timedOut) return { success: false, error: "Time Limit Exceeded (10s)" };
            if (run.stderr && run.code !== 0) return { success: false, error: run.stderr.trim(), output: run.stdout.trim() };
            return { success: true, output: run.stdout.trim() || "No output", runtime: Date.now() - start };
        }

        // ── C / C++ ──────────────────────────────────────────────────────────
        if (language === "c" || language === "cpp") {
            const srcFile = join(workDir, `main.${config.ext}`);
            const outFile = join(workDir, "a.out");
            await writeFile(srcFile, code, "utf8");

            const compiler = language === "c" ? "gcc" : "g++";
            const compile = await runProcess(compiler, config.compileArgs(srcFile, outFile), { cwd: workDir });
            if (compile.timedOut) return { success: false, error: "Compilation timed out" };
            if (compile.code !== 0) return { success: false, error: compile.stderr.trim() };

            const run = await runProcess(outFile, [], { cwd: workDir });
            if (run.timedOut) return { success: false, error: "Time Limit Exceeded (10s)" };
            if (run.stderr && run.code !== 0) return { success: false, error: run.stderr.trim(), output: run.stdout.trim() };
            return { success: true, output: run.stdout.trim() || "No output", runtime: Date.now() - start };
        }

        return { success: false, error: "Execution path not implemented" };

    } catch (err) {
        return { success: false, error: `Execution error: ${err.message}` };
    } finally {
        rm(workDir, { recursive: true, force: true }).catch(() => {});
    }
}
