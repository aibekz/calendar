"use client";

import { useEffect, useState } from "react";
import type { YearProgress } from "../data/types";
import { daysInYear, getDayOfYear } from "../lib/utils";

export default function useYearProgress(year: number): YearProgress {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [todayIndex, setTodayIndex] = useState<number | null>(null);
  const [days, setDays] = useState<number[]>([]);
  const [passed, setPassed] = useState<number | null>(null);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);

    const nowDate = new Date();
    const tot = daysInYear(year);
    const tIndex = getDayOfYear(nowDate);
    const ds = Array.from({ length: tot }, (_, i) => i + 1);
    const passedCount = tIndex - 1;
    const prog = Math.max(
      0,
      Math.min(100, Math.round((passedCount / tot) * 100)),
    );

    setTotal(tot);
    setTodayIndex(tIndex);
    setDays(ds);
    setPassed(passedCount);
    setProgress(prog);

    return () => clearInterval(id);
  }, [year]);

  return { mounted, now, total, todayIndex, days, passed, progress };
}
