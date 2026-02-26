import React from "react";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const TAGS = ["Arrays", "Strings", "DP", "Graphs", "Trees", "Hash Table", "Stack", "BFS"];

export default function ProblemFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Difficulty Filter */}
      <select
        className="select select-bordered select-sm"
        value={filters.difficulty || ""}
        onChange={e => setFilters(f => ({ ...f, difficulty: e.target.value }))}
      >
        <option value="">All Difficulties</option>
        {DIFFICULTIES.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      {/* Tag Filter */}
      <select
        className="select select-bordered select-sm"
        value={filters.tag || ""}
        onChange={e => setFilters(f => ({ ...f, tag: e.target.value }))}
      >
        <option value="">All Tags</option>
        {TAGS.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      {/* Search */}
      <input
        className="input input-bordered input-sm w-64"
        type="text"
        placeholder="Search by title..."
        value={filters.search || ""}
        onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
      />
    </div>
  );
}
