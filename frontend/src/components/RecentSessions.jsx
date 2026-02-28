import { Code2, Clock, Users, Trophy, Loader2, ChevronRight } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const difficultyStyles = {
  Easy: "text-easy bg-easy-light",
  Medium: "text-medium bg-medium-light",
  Hard: "text-hard bg-hard-light",
};

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="mt-12 group/container">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover/container:border-primary/30 transition-colors">
            <Clock className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">Timeline</h2>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[.2em]">Operational History</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 glass-card animate-pulse border-white/5" />
          ))
        ) : sessions.length > 0 ? (
          sessions.map((session, idx) => (
            <motion.div
              key={session._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`group/card relative glass-card p-6 border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden ${session.status === "active" ? "ring-2 ring-primary/20" : ""
                }`}
            >
              {/* Background effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover/card:bg-primary/10 transition-colors" />

              {session.status === "active" && (
                <div className="absolute top-4 right-4">
                  <div className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 flex items-center gap-2">
                    <div className="size-1.5 bg-primary rounded-full animate-ping" />
                    <span className="text-[8px] font-black text-primary tracking-widest uppercase">Ongoing</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-white/5 border border-white/5 group-hover/card:border-primary/30 transition-colors`}>
                  <Code2 className="size-6 text-white/40 group-hover/card:text-primary transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-lg text-white truncate truncate">{session.problem}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${difficultyStyles[session.difficulty] || "bg-white/5 text-white/40"}`}>
                    {session.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-xs font-medium text-white/40">
                  <Clock className="size-4" />
                  <span>
                    {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-white/40">
                  <Users className="size-4" />
                  <span>
                    {session.participant ? "Dual Interface" : "Solo Session"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Archive ID</span>
                  <span className="text-[10px] font-mono text-white/40">#{session._id.slice(-6).toUpperCase()}</span>
                </div>
                <button className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover/card:bg-primary group-hover/card:text-white transition-all duration-300">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 opacity-30">
            <Trophy className="size-12 mb-4" />
            <p className="font-black tracking-tight text-white text-lg">Empty Timeline</p>
            <p className="text-[10px] font-bold uppercase tracking-widest">Complete your first mission to populate history</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessions;
