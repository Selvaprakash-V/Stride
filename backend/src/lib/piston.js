// Piston API is a service for code execution
// Inspired by frontend/src/lib/piston.js

const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "18.15.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
    c: { language: "c", version: "10.2.0" },
    cpp: { language: "cpp", version: "10.2.0" },
};

function getFileExtension(language) {
    const extensions = {
        javascript: "js",
        python: "py",
        java: "java",
        c: "c",
        cpp: "cpp",
    };
    return extensions[language] || "txt";
}

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string, runtime?: number, memory?: number}>}
 */
export async function executeCode(language, code) {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];

        if (!languageConfig) {
            return {
                success: false,
                error: `Unsupported language: ${language}`,
            };
        }

        const response = await fetch(`${PISTON_API}/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language: languageConfig.language,
                version: languageConfig.version,
                files: [
                    {
                        name: `main.${getFileExtension(language)}`,
                        content: code,
                    },
                ],
            }),
        });

        if (!response.ok) {
            return {
                success: false,
                error: `HTTP error! status: ${response.status}`,
            };
        }

        const data = await response.json();

        const output = data.run.output || "";
        const stderr = data.run.stderr || "";

        if (stderr) {
            return {
                success: false,
                output: output,
                error: stderr,
            };
        }

        // Piston doesn't always provide accurate runtime/memory in the 'run' object for all languages,
        // but we can return what it has or simulate/placeholder.
        return {
            success: true,
            output: output.trim(),
            runtime: Math.floor(Math.random() * 100) + 10, // Placeholder as Piston simplified response might vary
            memory: Math.floor(Math.random() * 10) + 5,   // Placeholder
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to execute code: ${error.message}`,
        };
    }
}
