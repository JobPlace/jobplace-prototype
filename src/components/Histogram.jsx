// The signature element: profile-match score distribution.
// Buckets of 10. Bars at/above `cutoffScore` (rank-derived) highlight in brand blue.
import { useMemo } from 'react'

export default function Histogram({ scores, cutoffScore = null, threshold = null, height = 150 }) {
  const buckets = useMemo(() => {
    const b = new Array(10).fill(0)
    scores.forEach((s) => { b[Math.min(9, Math.floor(s / 10))]++ })
    return b
  }, [scores])
  const max = Math.max(1, ...buckets)
  const peak = buckets.indexOf(max)
  const ticks = ['0','10','20','30','40','50','60','70','80','90']
  const cut = cutoffScore != null ? cutoffScore : threshold // threshold kept for older screens

  return (
    <div>
      <div className="flex items-end gap-1.5" style={{ height }}>
        {buckets.map((c, i) => {
          const bucketHigh = i * 10 + 9
          const lit = cut != null ? bucketHigh >= cut : i >= 7
          const isPeak = i === peak
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end">
              <span className={`font-mono text-[11px] mb-1 tabular-nums ${lit ? 'text-brand' : isPeak ? 'text-ink' : 'text-faint'}`}>{c}</span>
              <div
                className={`w-full rounded-t-md transition-all duration-300 ${lit ? 'bg-brand' : isPeak ? 'bg-ink' : 'bg-line-strong'}`}
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
    </div>
  )
}
