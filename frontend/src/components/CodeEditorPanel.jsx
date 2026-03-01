import Editor from "@monaco-editor/react";
import { LoaderCircle, Play, Send, Settings, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  isSubmitting,
  onLanguageChange,
  onCodeChange,
  onRunCode,
  onSubmit,
}) {
  return (
    <div className="h-full bg-[#1e1e1e] flex flex-col rounded-xl border border-white/5 overflow-hidden shadow-2xl">
      {/* Editor Header */}
      <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.36 }} className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Language</span>
            <select
              className="bg-transparent text-sm font-bold text-white/80 outline-none cursor-pointer hover:text-white transition-colors"
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key} className="bg-[#252526]">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <button className="p-1.5 text-white/40 hover:text-white transition-colors">
            <Settings className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 font-bold text-sm border border-white/5 group"
            disabled={isRunning || isSubmitting}
            onClick={onRunCode}
          >
            {isRunning ? (
              <LoaderCircle className="size-4 animate-spin text-primary" />
            ) : (
              <Play className="size-4 group-hover:fill-current transition-all" />
            )}
            <span>Run</span>
          </button>

          <button
            className="flex items-center gap-2 px-6 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all duration-300 font-black text-sm group relative overflow-hidden active:scale-95 disabled:opacity-50 btn-3d"
            disabled={isRunning || isSubmitting}
            onClick={onSubmit}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] shimmer" />
            {isSubmitting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Send className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            )}
            <span>Submit</span>
          </button>
        </div>
      </motion.div>

      {/* Monaco Editor */}
      <div className="flex-1 relative group/editor">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 15,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            padding: { top: 16 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            containerStyle: { background: "#1e1e1e" },
          }}
        />
      </div>

      {/* Editor Footer / Info */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#1e1e1e] border-t border-white/5 text-[10px] font-bold text-white/20 uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Terminal className="size-3" />
            <span>Console</span>
          </div>
        </div>
        <div>
          <span>Line 1, Column 1</span>
        </div>
      </div>
    </div>
  );
}
export default CodeEditorPanel;
