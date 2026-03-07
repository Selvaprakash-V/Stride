import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import ProblemsTable from "../components/ProblemsTable";
import ProblemFilters from "../components/ProblemFilters";
import { problemApi } from "../api/problems";
import { userApi } from "../api/users";
import { Sparkles, Trophy, Target, Zap } from "lucide-react";

export default function ProblemsPage() {
  const [filters, setFilters] = useState({ search: "", difficulty: "All", tag: "" });
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ solvedCount: 0, accuracy: 0, streak: 0 });
  const limit = 15;

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      problemApi
        .getProblems({
          search: filters.search,
          difficulty: filters.difficulty === "All" ? "" : filters.difficulty,
          tags: filters.tag ? [filters.tag] : [],
          page,
          limit,
        })
        .then((res) => {
          setProblems(res.problems || []);
          setTotal(res.total || 0);
        })
        .finally(() => setLoading(false));
    }, 300); // Debounce
    return () => clearTimeout(delay);
  }, [filters, page]);

    useEffect(() => {
      let mounted = true;
      userApi
        .getStats()
        .then((res) => {
          if (!mounted) return;
          setStats(res.stats || { solvedCount: 0, accuracy: 0, streak: 0 });
        })
        .catch(() => {})
        .finally(() => {});
      return () => {
        mounted = false;
      };
    }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden text-white font-sans selection:bg-primary/30">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <Sparkles className="size-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-white/60">Challenge Yourself</span>
            </div>
            <h1 className="text-5xl font-black mb-4 tracking-tight leading-tight">
              Master Your <span className="text-gradient">Coding Skills</span>
            </h1>
            <p className="text-lg text-white/40 max-w-xl font-medium">
              Explore curated problems, sharpen your algorithms, and compete with the best in our premium coding environment.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4"
          >
            <StatCard icon={<Trophy className="text-yellow-500" />} label="Solved" value={`${stats.solvedCount}`} />
            <StatCard icon={<Target className="text-primary" />} label="Accuracy" value={`${stats.accuracy}%`} />
            <StatCard icon={<Zap className="text-easy" />} label="Streak" value={`${stats.streak} Days`} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ProblemFilters filters={filters} setFilters={setFilters} />
          <ProblemsTable problems={problems} loading={loading} />

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold"
              disabled={page === 1}
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.ceil(total / limit) || 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPage(i + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`size-10 rounded-xl transition-all font-bold ${page === i + 1 ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-white/5 text-white/40 hover:bg-white/10"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold"
              disabled={page * limit >= total}
              onClick={() => {
                setPage((p) => p + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next
            </button>
          </div>
        </motion.div>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 text-center text-white/20 text-sm font-medium border-t border-white/5 mt-12">
        © 2026 Stride Coding Platform. Built with precision for top-tier developers.
      </footer>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 shadow-xl min-w-[120px]">
      <div className="flex items-center gap-3 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{label}</span>
      </div>
      <div className="text-xl font-black">{value}</div>
    </div>
  );
}
