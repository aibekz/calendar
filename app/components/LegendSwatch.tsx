import type { LegendSwatchProps } from "../../data/types";

export function LegendSwatch({ label, className = "" }: LegendSwatchProps) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`inline-block w-3 h-3 rounded-sm ${className}`} />
      <span className="text-neutral-300">{label}</span>
    </span>
  );
}

export default LegendSwatch;
