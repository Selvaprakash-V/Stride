import {
  ArrowRight,
  Code2,
  Crown,
  Users,
  Zap,
  Loader2,
  ShieldAlert
} from "lucide-react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 relative group h-full">
      <div className="glass-card p-8 h-full border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-white/5 shadow-inner">
              <Zap className="size-6 text-primary fill-primary/20" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Active Transmissions</h2>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[.2em]">Live Competitive Network</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
            <div className="size-2 bg-easy rounded-full animate-ping" />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{sessions.length} Online</span>
          </div>
        </div>

        {/* List Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 opacity-30">
                <Loader2 className="size-12 animate-spin text-primary" />
                <p className="font-bold uppercase tracking-widest text-xs">Syncing with Grid...</p>
              </div>
            ) : sessions.length > 0 ? (
              sessions.map((session, idx) => (
                <motion.div
                  key={session._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group/item relative rounded-2xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-white/[0.08] transition-all duration-300 p-5"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className="relative size-14 flex-shrink-0">
                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover/item:opacity-100 transition-opacity" />
                        <div className="relative size-full rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-white/10 flex items-center justify-center overflow-hidden">
                          <Code2 className="size-7 text-white/60 group-hover/item:text-primary transition-colors" />
                          <div className="absolute bottom-0 inset-x-0 h-1 bg-primary/40" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 mb-1">
                          <h3 className="font-black text-lg text-white group-hover/item:text-primary transition-colors truncate">
                            {session.problem}
                          </h3>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white/5 text-white/40 border border-white/5">
                            {session.difficulty.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                          <div className="flex items-center gap-1.5 grayscale opacity-60 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all">
                            <Crown className="size-3 text-secondary" />
                            <span>{session.host?.name || "Unknown"}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="size-3" />
                            <span>{session.participant ? "Engaged" : "Signal Open"}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/session/${session._id}`}
                      className={`
                        relative px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 overflow-hidden
                        ${session.participant && !isUserInSession(session)
                          ? "bg-white/5 text-white/20 cursor-not-allowed"
                          : "bg-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95"}
                      `}
                    >
                      {session.participant && !isUserInSession(session) ? (
                        "Encrypted"
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{isUserInSession(session) ? "Restore" : "Interface"}</span>
                          <ArrowRight className="size-4" />
                        </div>
                      )}
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 opacity-30 gap-4"
              >
                <div className="p-6 rounded-full bg-white/5 border border-dashed border-white/20">
                  <ShieldAlert className="size-12" />
                </div>
                <div className="text-center">
                  <p className="font-black text-lg tracking-tight">System Idle</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest">No active sessions detected on the grid</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[8px] font-bold text-white/10 uppercase tracking-[.3em]">
          <span>Grid Status: Operational</span>
          <span>Latency: 24ms</span>
        </div>
      </div>
    </div>
  );
}
export default ActiveSessions;
