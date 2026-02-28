import { Search, Filter, Hash } from "lucide-react";
import { motion } from "framer-motion";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
const TAGS = ["Arrays", "Strings", "Stack", "Queue", "Hash Table", "Two Pointers", "Sliding Window", "BFS", "DFS", "DP", "Greedy", "Binary Search"];

export default function ProblemFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-white/30">
          <Search className="size-5" />
        </div>
        <input
          type="text"
          placeholder="Search problems by title, tags..."
          className="w-full pl-11 pr-4 py-3 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-primary/50 rounded-2xl outline-none transition-all duration-300 text-white placeholder:text-white/20 shadow-lg"
          value={filters.search || ""}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
        />
      </div>

      <div className="flex gap-4">
        {/* Difficulty Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary">
            <Filter className="size-4" />
          </div>
          <select
            className="pl-10 pr-10 py-3 bg-white/5 hover:bg-white/10 appearance-none border border-white/10 rounded-2xl outline-none transition-all duration-300 text-white/80 cursor-pointer min-w-[160px]"
            value={filters.difficulty || "All"}
            onChange={(e) => setFilters((f) => ({ ...f, difficulty: e.target.value }))}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d} className="bg-slate-900 text-white">
                {d === "All" ? "Any Difficulty" : d}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <div className="border-t-2 border-r-2 border-white/20 w-1.5 h-1.5 rotate-[135deg] group-hover:border-white/40" />
          </div>
        </div>

        {/* Tag Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-primary">
            <Hash className="size-4" />
          </div>
          <select
            className="pl-10 pr-10 py-3 bg-white/5 hover:bg-white/10 appearance-none border border-white/10 rounded-2xl outline-none transition-all duration-300 text-white/80 cursor-pointer min-w-[160px]"
            value={filters.tag || ""}
            onChange={(e) => setFilters((f) => ({ ...f, tag: e.target.value }))}
          >
            <option value="" className="bg-slate-900 text-white">All Topics</option>
            {TAGS.map((t) => (
              <option key={t} value={t} className="bg-slate-900 text-white">
                {t}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <div className="border-t-2 border-r-2 border-white/20 w-1.5 h-1.5 rotate-[135deg] group-hover:border-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
