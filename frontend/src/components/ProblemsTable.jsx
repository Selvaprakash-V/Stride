import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

export default function ProblemsTable({ problems, loading }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-base-100">
      <table className="min-w-full divide-y divide-base-200">
        <thead className="bg-base-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Acceptance</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Difficulty</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-base-200">
          {loading ? (
            <tr><td colSpan={4} className="text-center py-8 text-base-content/60">Loading...</td></tr>
          ) : problems.length === 0 ? (
            <tr><td colSpan={4} className="text-center py-8 text-base-content/60">No problems found.</td></tr>
          ) : (
            problems.map((problem) => (
              <tr key={problem.id} className="hover:bg-base-200 transition">
                <td className="px-4 py-3">{/* TODO: Status icon */}</td>
                <td className="px-4 py-3">
                  <Link to={`/problem/${problem.id}`} className="font-semibold text-primary hover:underline">
                    {problem.title}
                  </Link>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {problem.tags?.map((tag) => (
                      <span key={tag} className="badge badge-xs badge-outline mr-1">{tag}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">{problem.acceptanceRate ? `${problem.acceptanceRate.toFixed(1)}%` : "-"}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
