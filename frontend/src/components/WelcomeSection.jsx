import { useUser } from "@clerk/clerk-react";
import { ArrowRight, Sparkles, Zap, ChevronRight } from "lucide-react";
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
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block relative group"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl group-hover:bg-primary/30 transition-colors duration-700" />
            <div className="relative glass-card p-2 border-white/5 overflow-hidden animate-float">
              <div className="absolute inset-0 noise-overlay" />
              <div className="rounded-[1.3rem] overflow-hidden border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
                  alt="code mockup"
                  className="w-[450px] aspect-[16/10] object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-easy/20 flex items-center justify-center">
                      <Zap className="size-4 text-easy" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Ongoing Match</p>
                      <p className="text-sm font-bold text-white">Binary Search Masterclass</p>
                    </div>
                  </div>
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
