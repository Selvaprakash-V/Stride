import { useUser } from "@clerk/clerk-react";
import { ArrowRight, Sparkles, Zap, ChevronRight, Code2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="size-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Elite Developer Hub</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
              Elevate Your <br />
              <span className="text-gradient">Logic to Art</span>
            </h1>

            <p className="text-xl text-white/40 max-w-xl font-medium leading-relaxed">
              Welcome back, <span className="text-white font-bold">{user?.firstName || "Stridian"}</span>. Your journey to mastery continues. Ready to tackle the next big challenge?
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onCreateSession}
                className="group relative px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <div className="flex items-center gap-3 relative z-10">
                  <Zap className="size-6 fill-current" />
                  <span>Start Local Session</span>
                  <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              <div className="flex -space-x-3 items-center ml-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="size-10 rounded-full border-2 border-[#030712] bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40 overflow-hidden backdrop-blur-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i * 10}`} alt="avatar" className="opacity-80" />
                  </div>
                ))}
                <div className="pl-6 text-xs font-bold text-white/30 uppercase tracking-widest">
                  Join 50+ Coding Live
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hidden lg:block relative group w-[500px] flex-shrink-0"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-[2rem] blur-3xl group-hover:bg-primary/18 transition-colors duration-700 -z-10" />

            {/* Code Editor Window */}
            <div className="editor-window animate-float">
              {/* Title bar */}
              <div className="editor-titlebar">
                <div className="size-3 rounded-full bg-[#ff5f57]" />
                <div className="size-3 rounded-full bg-[#febc2e]" />
                <div className="size-3 rounded-full bg-[#28c840]" />
                <div className="flex items-center gap-2 ml-3 px-3 py-1 bg-[#0d1117] rounded-md border border-white/5">
                  <Code2 className="size-3 text-primary/60" />
                  <span className="text-[11px] font-mono text-white/35">solution.py</span>
                </div>
                <div className="ml-auto text-[10px] font-mono text-white/20">Python 3.12</div>
              </div>

              {/* Code body */}
              <div className="flex text-[12px] leading-[1.75]">
                {/* Line numbers */}
                <div className="editor-linenums">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                    <div key={n}>{n}</div>
                  ))}
                </div>

                {/* Code content */}
                <div className="p-4 font-mono text-[12px] leading-[1.75] flex-1 bg-[#0d1117] overflow-hidden">
                  <div><span className="token-kw">def</span>{' '}<span className="token-fn">two_sum</span><span className="token-op">(nums, target):</span></div>
                  <div className="pl-5 token-cmt"># O(n) hash-map approach</div>
                  <div className="pl-5"><span className="token-var">seen</span><span className="token-op"> = </span><span className="token-op">{}</span></div>
                  <div className="pl-5"><span className="token-kw">for</span>{' '}<span className="token-var">i, n</span>{' '}<span className="token-kw">in</span>{' '}<span className="token-fn">enumerate</span><span className="token-op">(nums):</span></div>
                  <div className="pl-10"><span className="token-var">diff</span><span className="token-op"> = </span><span className="token-var">target</span><span className="token-op"> - </span><span className="token-var">n</span></div>
                  <div className="pl-10 rounded bg-primary/5 -mx-1 px-1"><span className="token-kw">if</span>{' '}<span className="token-var">diff</span>{' '}<span className="token-kw">in</span>{' '}<span className="token-var">seen</span><span className="token-op">:</span></div>
                  <div className="pl-16"><span className="token-kw">return</span>{' '}<span className="token-op">[</span><span className="token-var">seen</span><span className="token-op">[diff],</span>{' '}<span className="token-var">i</span><span className="token-op">]</span></div>
                  <div className="pl-10"><span className="token-var">seen</span><span className="token-op">[n] = </span><span className="token-num">i</span></div>
                  <div className="pl-5"><span className="token-kw">return</span>{' '}<span className="token-op">[]</span></div>
                  <div className="pl-0 h-[1.75em] flex items-center">
                    <span className="inline-block w-[2px] h-[14px] bg-primary cursor-blink align-middle ml-0" />
                  </div>
                </div>
              </div>

              {/* Result / status bar */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-white/5 bg-[#161b22]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-3.5 text-easy" />
                  <span className="text-[10px] font-mono text-easy tracking-wider">Accepted</span>
                  <span className="text-[10px] font-mono text-white/20">· 32ms · 17.4 MB</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono text-white/20">Beats</span>
                  <span className="text-[10px] font-mono font-bold text-primary">94.2%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
