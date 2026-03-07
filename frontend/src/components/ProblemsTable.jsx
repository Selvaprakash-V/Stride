import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronRight, Hash } from "lucide-react";

const difficultyClasses = {
  Easy:   "diff-easy",
  Medium: "diff-medium",
  Hard:   "diff-hard",
};

export default function ProblemsTable({ problems, loading }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-black/25 backdrop-blur-xl shadow-premium">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/6 bg-[#0d1117]/60">
              <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-white/25 w-12 font-mono">#</th>
              <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-white/40">Status</th>
              <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-white/40">Problem</th>
              <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-white/40">Acceptance</th>
              <th className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-white/40">Difficulty</th>
              <th className="px-4 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="wait">
              {loading ? (
                <SkeletonRows />
              ) : problems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-12 rounded-full bg-white/5 flex items-center justify-center">
                        <Hash className="size-6 text-white/20" />
                      </div>
                      <p className="text-white/40 font-medium">No problems found matching your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                problems.map((problem, index) => (
                  <motion.tr
                    key={problem.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: index * 0.04 }}
                    className="group code-row border-b border-white/4 transition-all duration-200"
                  >
                    <td className="px-4 py-5 text-right">
                      <span className="text-[11px] font-mono text-white/20 group-hover:text-white/35 transition-colors">{index + 1}</span>
                    </td>
                    <td className="px-4 py-5">
                      {problem.solved ? (
                        <CheckCircle2 className="size-5 text-easy" />
                      ) : (
                        <Circle className="size-5 text-white/15 group-hover:text-white/25 transition-colors" />
                      )}
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex flex-col gap-1.5">
                        <Link
                          to={`/problem/${problem.slug || problem.id}`}
                          className="text-sm font-semibold text-white/90 group-hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          {problem.title}
                        </Link>
                        <div className="flex flex-wrap gap-1.5">
                          {problem.tags?.map((tag) => (
                            <span key={tag} className="tag-chip">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${problem.acceptanceRate || 0}%`,
                              background: `linear-gradient(90deg, #60a5fa, #7c3aed)`
                            }}
                          />
                        </div>
                        <span className="text-xs font-mono font-medium text-white/50">
                          {problem.acceptanceRate ? `${problem.acceptanceRate.toFixed(1)}%` : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full font-mono ${difficultyClasses[problem.difficulty] || "text-white/50 bg-white/8"}`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-5 text-right">
                      <Link
                        to={`/problem/${problem.slug || problem.id}`}
                        className="inline-flex items-center justify-center size-8 rounded-full bg-white/5 text-white/30 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      >
                        <ChevronRight className="size-4" />
                      </Link>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SkeletonRows() {
  return Array.from({ length: 10 }).map((_, i) => (
    <tr key={i} className="animate-pulse border-b border-white/4">
      <td className="px-4 py-5"><div className="h-3 w-5 bg-white/5 rounded font-mono ml-auto" /></td>
      <td className="px-4 py-5"><div className="size-5 rounded-full bg-white/5" /></td>
      <td className="px-4 py-5">
        <div className="h-4 w-48 bg-white/5 rounded-md mb-2" />
        <div className="flex gap-2">
          <div className="h-3 w-14 bg-white/5 rounded" />
          <div className="h-3 w-18 bg-white/5 rounded" />
        </div>
      </td>
      <td className="px-4 py-5"><div className="h-3 w-20 bg-white/5 rounded-full" /></td>
      <td className="px-4 py-5"><div className="h-6 w-16 bg-white/5 rounded-full" /></td>
      <td className="px-4 py-5"><div className="size-8 rounded-full bg-white/5 ml-auto" /></td>
    </tr>
  ));
}
