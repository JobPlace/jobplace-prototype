import { useState, useMemo } from 'react'
import { Card, Button, Eyebrow, BackLink, Score, Badge } from '../../components/ui.jsx'
import Histogram from '../../components/Histogram.jsx'
import { ROLES, candidatesFor, expBand, SOURCE_LIST } from '../../data.js'

const TOPN = [['all', 'All'], ['150', 'Top 150'], ['100', 'Top 100'], ['50', 'Top 50']]

export default function CandidateListing({ go, back, roleId }) {
  const role = ROLES.find((r) => r.id === roleId) || ROLES[0]
  const all = useMemo(() => candidatesFor(role), [role])

  const [topN, setTopN] = useState('all')
  const [source, setSource] = useState('all')
  const [exp, setExp] = useState('all')
  const [threshold, setThreshold] = useState(70)
  const [feedback, setFeedback] = useState({}) // id -> 'agree'|'up'|'down'
  const [selected, setSelected] = useState({}) // id -> true

  const filtered = useMemo(() => {
    let f = all.filter((c) => (source === 'all' || c.source === source) && (exp === 'all' || expBand(c.exp) === exp))
    f = [...f].sort((a, b) => b.profileScore - a.profileScore)
    if (topN !== 'all') f = f.slice(0, Number(topN))
    return f
  }, [all, source, exp, topN])

  const scores = filtered.map((c) => c.profileScore)
  const overThreshold = filtered.filter((c) => c.profileScore >= threshold)
  const selectedIds = Object.keys(selected).filter((k) => selected[k])

  function setFb(id, v) { setFeedback((p) => ({ ...p, [id]: p[id] === v ? undefined : v })) }
  function toggle(id) { setSelected((p) => ({ ...p, [id]: !p[id] })) }
  function selectOverThreshold() {
    const next = {}
    overThreshold.forEach((c) => { next[c.id] = true })
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

      {/* TOP: distribution + filters */}
      <Card className="p-6 mb-5">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-display font-semibold text-ink">Profile-match distribution</span>
              <span className="font-mono text-[11px] text-faint tabular-nums">{filtered.length} shown</span>
            </div>
            <Histogram scores={scores} threshold={threshold} onThreshold={setThreshold} height={150} />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted">Above the cutoff: <span className="font-mono font-bold text-brand">{overThreshold.length}</span> candidates</p>
              <Button size="sm" variant="soft" onClick={selectOverThreshold}>Select all above {threshold}</Button>
            </div>
          </div>

          <div className="lg:border-l lg:border-line lg:pl-8">
            <div className="mb-5">
              <div className="text-xs text-faint uppercase tracking-wide mb-2">Rank</div>
              <div className="flex flex-wrap gap-2">
                {TOPN.map(([v, l]) => (
                  <button key={v} onClick={() => setTopN(v)} className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${topN === v ? 'bg-brand-soft border-brand text-brand-dark' : 'border-line-strong text-muted hover:text-ink'}`}>{l}</button>
                ))}
              </div>
            </div>
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
          </div>
        </div>
      </Card>

      {/* BOTTOM: the list (majority of the screen), sorted by profile score */}
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs text-faint uppercase tracking-wide">Sorted by profile-match score</span>
        <span className="text-xs text-faint">tap ✓ to add to the test pool · rate the score to train the model</span>
      </div>
      <div className="space-y-2">
        {filtered.map((c, idx) => {
          const fb = feedback[c.id]
          const sel = selected[c.id]
          return (
            <Card key={c.id} className={`px-4 py-3 flex items-center gap-4 ${sel ? 'ring-1 ring-brand border-brand' : ''}`}>
              <button onClick={() => toggle(c.id)} aria-label="select" className={`h-6 w-6 shrink-0 rounded-md border grid place-items-center ${sel ? 'bg-brand border-brand text-white' : 'border-line-strong text-transparent hover:border-brand'}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
              </button>
              <span className="font-mono text-xs text-faint w-6 tabular-nums">{idx + 1}</span>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-ink truncate">{c.name}</div>
                <div className="text-xs text-muted">{c.source} · {c.exp} yr{c.exp === 1 ? '' : 's'} exp · applied {c.appliedDaysAgo}d ago</div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="text-xs text-faint mr-1">score right?</span>
                <FbBtn active={fb === 'agree'} tone="ok" onClick={() => setFb(c.id, 'agree')} label="Agree">=</FbBtn>
                <FbBtn active={fb === 'up'} tone="up" onClick={() => setFb(c.id, 'up')} label="Too low">↑</FbBtn>
                <FbBtn active={fb === 'down'} tone="down" onClick={() => setFb(c.id, 'down')} label="Too high">↓</FbBtn>
              </div>
              <div className="w-14 text-right"><Score value={c.profileScore} size="sm" tone={c.profileScore >= 70 ? 'brand' : 'ink'} /></div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function FbBtn({ children, active, tone, onClick, label }) {
  const tones = {
    ok: active ? 'bg-ink text-white border-ink' : 'border-line-strong text-muted hover:border-ink',
    up: active ? 'bg-pos text-white border-pos' : 'border-line-strong text-muted hover:border-pos',
    down: active ? 'bg-neg text-white border-neg' : 'border-line-strong text-muted hover:border-neg',
  }
  return (
    <button onClick={onClick} title={label} aria-label={label} className={`h-7 w-7 rounded-md border font-bold text-sm grid place-items-center transition-colors ${tones[tone]}`}>{children}</button>
  )
}
