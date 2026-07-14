// The signature element: profile-match score distribution.
// Buckets of 10; the >=70 "shortlist zone" is highlighted; optional draggable threshold.
import { useMemo } from 'react'

export default function Histogram({ scores, threshold = null, onThreshold = null, height = 150 }) {
  const buckets = useMemo(() => {
    const b = new Array(10).fill(0)
    scores.forEach((s) => { b[Math.min(9, Math.floor(s / 10))]++ })
    return b
  }, [scores])
  const max = Math.max(1, ...buckets)
  const peak = buckets.indexOf(max)
  const ticks = ['0','10','20','30','40','50','60','70','80','90']

  return (
    <div>
      <div className="flex items-end gap-1.5" style={{ height }}>
        {buckets.map((c, i) => {
          const strong = i >= 7
          const isPeak = i === peak
          const active = threshold == null || i * 10 + 10 > threshold
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end">
              <span className={`font-mono text-[11px] mb-1 tabular-nums ${strong ? 'text-brand' : isPeak ? 'text-ink' : 'text-faint'} ${active ? '' : 'opacity-30'}`}>{c}</span>
              <div
                className={`w-full rounded-t-md transition-all duration-300 ${active ? '' : 'opacity-25'} ${strong ? 'bg-brand' : isPeak ? 'bg-ink' : 'bg-line-strong'}`}
                style={{ height: `${(c / max) * (height - 24)}px` }}
              />
            </div>
          )
        })}
      </div>
      <div className="flex mt-1.5">
        {ticks.map((l, i) => (
          <span key={i} className="flex-1 text-center font-mono text-[10px] text-faint tabular-nums">{l}</span>
        ))}
      </div>
      {onThreshold && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted">Shortlist cutoff</span>
            <span className="font-mono text-sm font-bold text-brand tabular-nums">{threshold}</span>
          </div>
          <input
            type="range" min="0" max="95" step="5" value={threshold ?? 70}
            onChange={(e) => onThreshold(Number(e.target.value))}
            className="w-full accent-brand"
          />
        </div>
      )}
    </div>
  )
}
