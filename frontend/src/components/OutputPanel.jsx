import { Terminal, ShieldCheck, ShieldAlert, Cpu, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function OutputPanel({ output, isRunning, isSubmitting }) {
  if (isRunning || isSubmitting) {
    return (
      <div className="h-full flex flex-col bg-[#161b22] p-6">
        <div className="flex items-center gap-2 mb-6 text-white/20">
          <Terminal className="size-4" />
          <span className="text-xs font-black uppercase tracking-widest">Executing...</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                className="size-2 rounded-full bg-primary"
              />
            ))}
          </div>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Compiling Source Code</p>
        </div>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="h-full flex flex-col bg-[#161b22] p-6 text-white/20">
        <div className="flex items-center gap-2 mb-6">
          <Terminal className="size-4" />
          <span className="text-xs font-black uppercase tracking-widest">Console Output</span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center opacity-50">
          <Terminal className="size-8 mb-3" />
          <p className="text-sm font-bold">Run your code to see results</p>
        </div>
      </div>
    );
  }

  const isAccepted = output.status === "Accepted" || (output.success && !output.error);
  const isError = output.status === "Runtime Error" || output.error;

  return (
    <div className="h-full flex flex-col bg-[#161b22] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-white/30" />
          <span className="text-xs font-black uppercase tracking-widest text-white/50">Execution Result</span>
        </div>

        <div className="flex gap-4">
          {output.runtime !== undefined && (
            <div className="flex items-center gap-1.5">
              <Timer className="size-3 text-white/30" />
              <span className="text-[10px] font-black text-white/60">{output.runtime}ms</span>
            </div>
          )}
          {output.memory !== undefined && (
            <div className="flex items-center gap-1.5">
              <Cpu className="size-3 text-white/30" />
              <span className="text-[10px] font-black text-white/60">{output.memory}MB</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-4 rounded-2xl flex items-center gap-4 border transition-all ${isAccepted
              ? "bg-easy-light border-easy/20 shadow-[0_0_20px_rgba(0,184,163,0.1)]"
              : "bg-hard-light border-hard/20 shadow-[0_0_20px_rgba(239,71,67,0.1)]"
            }`}
        >
          <div className={`p-2 rounded-xl bg-white/10 ${isAccepted ? "text-easy" : "text-hard"}`}>
            {isAccepted ? <ShieldCheck className="size-6" /> : <ShieldAlert className="size-6" />}
          </div>
          <div>
            <h4 className={`text-lg font-black ${isAccepted ? "text-easy" : "text-hard"}`}>
              {output.status || (isAccepted ? "Success" : "Error")}
            </h4>
            <p className="text-xs font-medium text-white/40">
              {isAccepted ? "Your solution passed all test cases" : "Check logs for more details"}
            </p>
          </div>
        </motion.div>

        {/* Console Logs */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Standard Output</span>
            <button
              onClick={() => navigator.clipboard.writeText(output.output || output.error)}
              className="text-[10px] font-bold text-primary hover:underline"
            >
              Copy
            </button>
          </div>
          <pre className="p-5 rounded-2xl bg-black/40 border border-white/5 font-mono text-sm overflow-x-auto selection:bg-primary/30">
            <code className={isError ? "text-hard/80" : "text-white/80"}>
              {output.output || output.error || "No standard output returned"}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default OutputPanel;
