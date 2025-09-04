"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { YearSquaresProps } from "../../data/types";
import useYearProgress from "../../hooks/useYearProgress";
import LegendSwatch from "./LegendSwatch";

export default function YearSquares(props: YearSquaresProps) {
  const {
    year = new Date().getFullYear(),
    size = 12,
    gap = 4,
    cols = 31,
  } = props;
  // Responsive columns: start with prop cols, then adjust based on container width
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [colsUsed, setColsUsed] = useState<number>(cols);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    function computeCols(width: number) {
      // each cell consumes size + gap horizontally (gap applied between cells)
      const cellSpace = size + gap;
      const computed = Math.max(1, Math.floor(width / cellSpace));
      // don't exceed configured cols
      return Math.min(cols, computed);
    }

    // Initialize
    setColsUsed((_prev) => computeCols(el.getBoundingClientRect().width));

    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setColsUsed(computeCols(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [size, gap, cols]);
  const {
    mounted,
    now: nowLocal,
    total,
    todayIndex,
    days,
    passed,
    progress,
  } = useYearProgress(year);
  const gridStyle = {
    gridTemplateColumns: `repeat(${colsUsed}, ${size}px)`,
    gridAutoRows: `${size}px`,
    gap: `${gap}px`,
  };
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex items-center justify-center p-6">
      <div
        ref={wrapperRef}
        className="w-full max-w-5xl flex flex-col items-center"
      >
        {/* App name */}
        <div className="w-full mb-4 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Simpli Calendar
          </span>
        </div>
        {/* Header */}
        <div className="mb-6 text-center">
          {/* Today + live time row */}
          <div className="w-full flex justify-center">
            <time
              dateTime={
                mounted && nowLocal ? nowLocal.toISOString() : undefined
              }
              aria-live="polite"
              className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-neutral-800/60 text-neutral-100 text-sm font-mono shadow-sm ring-1 ring-white/6"
              title={
                mounted && nowLocal ? nowLocal.toLocaleString() : undefined
              }
            >
              {mounted && nowLocal
                ? nowLocal.toLocaleString(undefined, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "Loading time..."}
            </time>
          </div>
          {/* Stats grid */}
          <div className="mt-4 w-full grid grid-cols-3 gap-3 items-center text-sm">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-neutral-100 font-semibold text-lg">
                {mounted && passed != null ? passed : "--"}
              </span>
              <span className="text-xs text-neutral-400">days passed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-neutral-100 font-semibold text-lg">
                {mounted && progress != null ? `${progress}%` : "--%"}
              </span>
              <span className="text-xs text-neutral-400">complete</span>
            </div>
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-neutral-100 font-semibold text-lg">
                {mounted && total != null && passed != null
                  ? total - passed
                  : "--"}
              </span>
              <span className="text-xs text-neutral-400">days left</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-neutral-100 shadow-[0_0_12px_rgba(255,255,255,0.06)]"
              style={{
                width: mounted && progress != null ? `${progress}%` : `0%`,
              }}
            />
          </div>
        </div>
        {/* Grid of days */}
        <div
          className="relative rounded-2xl p-4 md:p-5 bg-neutral-900/60 shadow-lg ring-1 ring-white/10"
          style={{
            backgroundImage:
              "radial-gradient(800px 300px at 50% -10%, rgba(255,255,255,0.04), transparent 50%)",
          }}
        >
          <div className="grid place-items-center" style={gridStyle}>
            {days.map((d) => {
              const isPast =
                mounted && todayIndex != null ? d < todayIndex : false;
              const isToday =
                mounted && todayIndex != null ? d === todayIndex : false;
              const _isFuture =
                mounted && todayIndex != null ? d > todayIndex : false;
              const base =
                "rounded-sm transition-transform duration-200 ease-out will-change-transform";
              const cls = isPast
                ? `${base} bg-neutral-100 hover:scale-[1.15] shadow-[0_0_8px_rgba(255,255,255,0.06)]`
                : isToday
                  ? `${base} bg-neutral-100/30 ring-2 ring-white animate-pulse`
                  : `${base} bg-white/10 hover:bg-white/20`;
              const date = new Date(year, 0, d);
              const label = date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              return (
                <div
                  key={d}
                  className={cls}
                  role="img"
                  title={`${label} — ${isPast ? "passed" : isToday ? "today" : "remaining"}`}
                  aria-label={`${label} — ${isPast ? "passed" : isToday ? "today" : "remaining"}`}
                  style={{ width: size, height: size }}
                />
              );
            })}
          </div>
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-5 text-xs text-neutral-400">
            <LegendSwatch label="Passed" className="bg-neutral-100" />
            <LegendSwatch
              label="Today"
              className="bg-neutral-100/30 ring-2 ring-white"
            />
            <LegendSwatch label="Remaining" className="bg-white/10" />
          </div>
        </div>
        {/* Footer / Attribution */}
        <div className="mt-6 text-xs text-neutral-500 text-center">
          <p>
            &copy; {year} Brought to you by{" "}
            <Link
              href="https://www.simpliprompt.com"
              className="font-semibold text-neutral-100"
            >
              Simpli Prompt
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
