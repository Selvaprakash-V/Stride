import React from "react";

function ProblemList({ problems = [], onSelect }) {
  return (
    <div className="space-y-2">
      {problems.map((p) => (
        <div
          key={p.id}
          className="p-3 rounded-lg hover:bg-base-200 cursor-pointer"
          onClick={() => onSelect(p.id)}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-base-content/60">{p.category}</div>
            </div>
            <div className="text-sm badge badge-outline">{p.difficulty}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProblemList;
