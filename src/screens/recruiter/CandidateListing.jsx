import { useState, useMemo } from 'react'
import { Card, Button, Eyebrow, BackLink, Score } from '../../components/ui.jsx'
import Histogram from '../../components/Histogram.jsx'
import { ROLES, candidatesFor, expBand, SOURCE_LIST } from '../../data.js'

const QUICK = [10, 20, 30, 50]

export default function CandidateListing({ go, back, roleId }) {
  const role = ROLES.find((r) => r.id === roleId) || ROLES[0]
  const all = useMemo(() => candidatesFor(role), [role])

  const [source, setSource] = useState('all')
  const [exp, setExp] = useState('all')
  const [topN, setTopN] = useState(30)
  const [selected, setSelected] = useState({})

  // slice filters first, then rank
  const pool = useMemo(() => {
    const f = all.filter((c) => (source === 'all' || c.source === source) && (exp === 'all' || expBand(c.exp) === exp))
    return [...f].sort((a, b) => b.profileScore - a.profileScore)
  }, [all, source, exp])

  const n = Math.min(topN, pool.length)
  const shown = pool.slice(0, n)
  // rank-derived boundary: the score of the Nth candidate decides which bars light up
  const cutoffScore = shown.length ? shown[shown.length - 1].profileScore : null

  const selectedIds = Object.keys(selected).filter((k) => selected[k])

  function toggle(id) { setSelected((p) => ({ ...p, [id]: !p[id] })) }
  function selectShown() {
    const next = {}
    shown.forEach((c) => { next[c.id] = true })
    setSelected(next)
  }

  return (
    <div>
      <BackLink onClick={back}>Positions</BackLink>
      <div className="flex items-end justify-between flex-wrap gap-3 mb-5">
        <div>
          <Eyebrow>Candidate listing</Eyebrow>
          <h1 className="font-display font-bold text-2xl text-ink mt-1">{role.title}</h1>
          <p className="text-muted text-sm mt-0.5">{role.location} · {all.length} applicants</p>
        </div>
        <Button disabled={!selectedIds.length} onClick={() => go('shortlist', { roleId: role.id, selectedIds })}>
          Send test to selected ({selectedIds.length}) →
        </Button>
      </div>

      {/* TOP: distribution + top-N + filters */}
      <Card className="p-6 mb-5">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-display font-semibold text-ink">Profile-match distribution</span>
              <span className="font-mono text-[11px] text-faint tabular-nums">{pool.length} in pool</span>
            </div>
            <Histogram scores={pool.map((c) => c.profileScore)} cutoffScore={cutoffScore} height={150} />

            <div className="mt-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-muted">Show top candidates</span>
                <span className="font-mono text-sm font-bold text-brand tabular-nums">Top {n}</span>
              </div>
              <input
                type="range" min="1" max={pool.length || 1} step="1" value={n}
                onChange={(e) => setTopN(Number(e.target.value))}
                className="w-full accent-brand"
                aria-label="Top N candidates"
              />
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {QUICK.map((q) => (
                  <button key={q} onClick={() => setTopN(q)} disabled={q > pool.length}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors disabled:opacity-30 ${n === q ? 'bg-brand-soft border-brand text-brand-dark' : 'border-line-strong text-muted hover:text-ink'}`}>
                    Top {q}
                  </button>
                ))}
                <button onClick={() => setTopN(pool.length)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${n === pool.length ? 'bg-brand-soft border-brand text-brand-dark' : 'border-line-strong text-muted hover:text-ink'}`}>
                  All {pool.length}
                </button>
                <Button size="sm" variant="soft" className="ml-auto" onClick={selectShown}>Select these {n}</Button>
              </div>
            </div>
          </div>

          <div className="lg:border-l lg:border-line lg:pl-8">
            <div className="mb-5">
              <div className="text-xs text-faint uppercase tracking-wide mb-2">Source</div>
              <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full rounded-lg border border-line-strong bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand">
                <option value="all">All sources</option>
                {SOURCE_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div className="text-xs text-faint uppercase tracking-wide mb-2">Experience</div>
              <select value={exp} onChange={(e) => setExp(e.target.value)} className="w-full rounded-lg border border-line-strong bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand">
                <option value="all">Any experience</option>
                <option value="0-2">0–2 yrs</option>
                <option value="2-5">2–5 yrs</option>
                <option value="5-8">5–8 yrs</option>
                <option value="8+">8+ yrs</option>
              </select>
            </div>
            <p className="text-xs text-faint mt-5 leading-relaxed">Filters narrow the pool; the slider ranks it. The highlighted bars show where your top {n} sit.</p>
          </div>
        </div>
      </Card>

      {/* BOTTOM: only the top-N, sorted by profile score */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs text-faint uppercase tracking-wide">Top {n} · sorted by profile-match score</span>
        <span className="text-xs text-faint">tap ✓ to add to the test pool · tap a candidate for full detail</span>
      </div>
      <div className="space-y-2">
        {shown.map((c, idx) => {
          const sel = selected[c.id]
          return (
            <Card key={c.id} className={`px-4 py-3 flex items-center gap-4 ${sel ? 'ring-1 ring-brand border-brand' : ''}`}>
              <button onClick={() => toggle(c.id)} aria-label="select" className={`h-6 w-6 shrink-0 rounded-md border grid place-items-center ${sel ? 'bg-brand border-brand text-white' : 'border-line-strong text-transparent hover:border-brand'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
              </button>
              <span className="font-mono text-xs text-faint w-6 tabular-nums">{idx + 1}</span>
              <button onClick={() => go('candidateDetail', { roleId: role.id, candidateId: c.id })} className="min-w-0 flex-1 text-left group">
                <div className="font-medium text-ink truncate group-hover:text-brand transition-colors">{c.name}</div>
                <div className="text-xs text-muted truncate">{c.currentRole} · {c.source} · applied {c.appliedDaysAgo}d ago</div>
              </button>
              <span className="hidden sm:inline-flex items-center font-mono text-xs font-bold bg-black/5 text-ink rounded-full px-2.5 py-1 whitespace-nowrap tabular-nums">{c.exp} yr{c.exp === 1 ? '' : 's'}</span>
              <div className="w-14 text-right"><Score value={c.profileScore} size="sm" tone={cutoffScore != null && c.profileScore >= cutoffScore ? 'brand' : 'ink'} /></div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
