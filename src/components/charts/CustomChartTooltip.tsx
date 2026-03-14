'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomChartTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="chart-tooltip" role="tooltip" aria-live="polite">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} aria-hidden="true" />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">
            {p.value}
            {p.name === 'Score' ? '/10' : '%'}
          </span>
        </div>
      ))}
    </div>
  );
}
