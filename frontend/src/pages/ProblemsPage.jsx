import Navbar from "../components/Navbar";
import ProblemsTable from "../components/ProblemsTable";
import ProblemFilters from "../components/ProblemFilters";
import { useState, useEffect } from "react";
import { problemApi } from "../api/problems";

function ProblemsPage() {
  const [filters, setFilters] = useState({ search: "", difficulty: "", tag: "" });
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    problemApi
      .getProblems({
        search: filters.search,
        difficulty: filters.difficulty,
        tags: filters.tag ? [filters.tag] : [],
        page,
        limit,
      })
      .then((res) => {
        setProblems(res.problems);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">Sharpen your coding skills with these curated problems</p>
        </div>
        <ProblemFilters filters={filters} setFilters={setFilters} />
        <ProblemsTable problems={problems} loading={loading} />
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <span className="text-base-content/70">
            Page {page} of {Math.ceil(total / limit) || 1}
          </span>
          <button
            className="btn btn-sm"
            disabled={page * limit >= total}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProblemsPage;
