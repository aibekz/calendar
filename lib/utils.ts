export const DAY = 24 * 60 * 60 * 1000;

export function daysInYear(year: number): number {
  // Leap year check
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
}

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  // Normalize to local midnight to avoid DST issues
  const startMid = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );
  const todayMid = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const diff = todayMid.getTime() - startMid.getTime();
  return Math.floor(diff / DAY) + 1; // Jan 1st = 1
}

export function nth(n: number): string {
  return n % 10 === 1 && n % 100 !== 11
    ? "st"
    : n % 10 === 2 && n % 100 !== 12
      ? "nd"
      : n % 10 === 3 && n % 100 !== 13
        ? "rd"
        : "th";
}
