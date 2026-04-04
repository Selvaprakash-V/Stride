function toKey(date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function startOfUTCDate(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function parseKeyToUTCDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
}

function getShadeClass(count) {
  if (count <= 0) return "bg-[#161b22] border-[#30363d]";
  if (count === 1) return "bg-[#0e4429] border-[#0e4429]";
  if (count <= 3) return "bg-[#006d32] border-[#006d32]";
  if (count <= 6) return "bg-[#26a641] border-[#26a641]";
  return "bg-[#39d353] border-[#39d353]";
}

function buildRollingGrid(activity) {
  const dailyCounts = activity?.dailyCounts || [];
  const countMap = new Map(dailyCounts.map((row) => [row.date, row.count]));
  const fallbackEnd = startOfUTCDate(new Date());
  const fallbackStart = new Date(fallbackEnd);
  fallbackStart.setUTCDate(fallbackStart.getUTCDate() - 364);

  const start = activity?.rangeStart ? parseKeyToUTCDate(activity.rangeStart) : fallbackStart;
  const end = activity?.rangeEnd ? parseKeyToUTCDate(activity.rangeEnd) : fallbackEnd;

  const startOffset = start.getUTCDay();
  const gridStart = new Date(start);
  gridStart.setUTCDate(gridStart.getUTCDate() - startOffset);

  // Do not extend to future dates; stop exactly at end day.
  const gridEnd = new Date(end);

  const cells = [];
  const monthLabelByColumn = new Map();

  let cursor = startOfUTCDate(gridStart);
  let colIdx = 0;

  while (cursor <= gridEnd) {
    const columnCells = [];
    for (let i = 0; i < 7; i++) {
      if (cursor > gridEnd) break;

      const day = new Date(cursor);
      const key = toKey(day);
      const inYear = day >= start && day <= end;
      const count = inYear ? countMap.get(key) || 0 : 0;

      columnCells.push({
        key,
        count,
        inYear,
        date: day,
      });

      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    const firstInYear = columnCells.find((cell) => cell.inYear);
    if (firstInYear) {
      const month = firstInYear.date.getUTCMonth();
      if (!monthLabelByColumn.has(month)) {
        monthLabelByColumn.set(month, colIdx);
      }
    }

    cells.push(columnCells);
    colIdx += 1;
  }

  const monthLabels = Array.from(monthLabelByColumn.entries()).map(([month, idx]) => ({
    idx,
    label: new Date(Date.UTC(start.getUTCFullYear(), month, 1)).toLocaleString("default", { month: "short" }),
  }));

  const monthLabelByIndex = new Map(monthLabels.map((m) => [m.idx, m.label]));

  return { columns: cells, monthLabelByIndex };
}

function formatDayTitle(cell) {
  const dateText = cell.date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  return `${cell.count} submissions on ${dateText}`;
}

function ContributionHeatmap({ activity, isLoading }) {
  const { columns, monthLabelByIndex } = buildRollingGrid(activity);
  const total = activity?.totalSubmissions || 0;

  return (
    <div className="rounded-xl border border-[#30363d] bg-[#0d1117] text-[#c9d1d9] overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-[#21262d] flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{total} submissions in the last year</h2>
        <div className="text-xs text-[#8b949e]">From one year ago to today</div>
      </div>

      <div className="p-4 sm:p-5">
          {isLoading ? (
            <div className="h-36 rounded-lg border border-[#30363d] bg-[#0b1017] animate-pulse" />
          ) : (
            <>
              <div className="space-y-[6px]">
                <div
                  className="grid gap-[3px] mb-[2px] text-[11px] text-[#8b949e]"
                  style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
                >
                  {Array.from({ length: columns.length }).map((_, idx) => {
                    return (
                      <span key={`month-${idx}`} className="h-4 leading-4">
                        {monthLabelByIndex.get(idx) || ""}
                      </span>
                    );
                  })}
                </div>

                <div
                  className="grid gap-[3px]"
                  style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
                >
                  {columns.map((col, cIdx) => (
                    <div key={`col-${cIdx}`} className="grid grid-rows-7 gap-[3px]">
                      {col.map((cell, rIdx) => (
                        <div
                          key={`${cell.key}-${cIdx}-${rIdx}`}
                          title={cell.inYear ? formatDayTitle(cell) : ""}
                          className={`w-full aspect-square rounded-[2px] border transition-colors ${
                            cell.inYear ? getShadeClass(cell.count) : "bg-transparent border-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 text-[11px] text-[#8b949e]">
                <span>Less</span>
                <span className="h-3 w-3 rounded-[2px] border bg-[#161b22] border-[#30363d]" />
                <span className="h-3 w-3 rounded-[2px] border bg-[#0e4429] border-[#0e4429]" />
                <span className="h-3 w-3 rounded-[2px] border bg-[#006d32] border-[#006d32]" />
                <span className="h-3 w-3 rounded-[2px] border bg-[#26a641] border-[#26a641]" />
                <span className="h-3 w-3 rounded-[2px] border bg-[#39d353] border-[#39d353]" />
                <span>More</span>
              </div>
            </>
          )}
      </div>
    </div>
  );
}

export default ContributionHeatmap;
