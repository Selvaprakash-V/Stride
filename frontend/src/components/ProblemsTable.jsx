import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

const difficultyColors = {
  Easy: "text-easy bg-easy-light",
  Medium: "text-medium bg-medium-light",
  Hard: "text-hard bg-hard-light",
};

export default function ProblemsTable({ problems, loading }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-premium">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Problem</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Acceptance</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Difficulty</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence mode="wait">
              {loading ? (
                <SkeletonRows />
              ) : problems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-12 rounded-full bg-white/5 flex items-center justify-center">
                        <Circle className="size-6 text-white/20" />
                      </div>
                      <p className="text-white/40 font-medium">No problems found matching your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                problems.map((problem, index) => (
                  <motion.tr
                    key={problem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-white/5 transition-all duration-300"
                  >
                    <td className="px-6 py-5">
                      {problem.solved ? (
                        <CheckCircle2 className="size-5 text-easy" />
                      ) : (
                        <Circle className="size-5 text-white/20" />
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        <Link
                          to={`/problem/${problem.slug || problem.id}`}
                          className="text-base font-semibold text-white group-hover:text-primary transition-colors inline-flex items-center gap-1 group/link"
                        >
                          {problem.title}
                          <span className="relative h-[2px] w-0 bg-primary absolute bottom-0 left-0 group-hover/link:w-full transition-all duration-300" />
                        </Link>
                        <div className="flex flex-wrap gap-2">
                          {problem.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary/60"
                            style={{ width: `${problem.acceptanceRate || 0}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-white/60">
                          {problem.acceptanceRate ? `${problem.acceptanceRate.toFixed(1)}%` : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColors[problem.difficulty] || "text-white/60 bg-white/10"
                          }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        to={`/problem/${problem.slug || problem.id}`}
                        className="inline-flex items-center justify-center size-8 rounded-full bg-white/5 text-white/40 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      >
                        <ChevronRight className="size-5" />
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
    <tr key={i} className="animate-pulse">
      <td className="px-6 py-5"><div className="size-5 rounded-full bg-white/5" /></td>
      <td className="px-6 py-5">
        <div className="h-4 w-48 bg-white/5 rounded-md mb-2" />
        <div className="flex gap-2">
          <div className="h-3 w-12 bg-white/5 rounded-full" />
          <div className="h-3 w-16 bg-white/5 rounded-full" />
        </div>
      </td>
      <td className="px-6 py-5"><div className="h-3 w-20 bg-white/5 rounded-full" /></td>
      <td className="px-6 py-5"><div className="h-6 w-16 bg-white/5 rounded-full" /></td>
      <td className="px-6 py-5"><div className="size-8 rounded-full bg-white/5 ml-auto" /></td>
    </tr>
  ));
}
