export type YearSquaresProps = {
  year?: number;
  size?: number;
  gap?: number;
  cols?: number;
};

export type LegendSwatchProps = {
  label: string;
  className?: string;
};

export type YearProgress = {
  mounted: boolean;
  now: Date | null;
  total: number | null;
  todayIndex: number | null;
  days: number[];
  passed: number | null;
  progress: number | null;
};
