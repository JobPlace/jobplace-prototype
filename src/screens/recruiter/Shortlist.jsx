import { useMemo } from 'react'
import { Card, Button, Eyebrow, BackLink, Score, Badge } from '../../components/ui.jsx'
import { ROLES, candidatesFor, simulateTestScore } from '../../data.js'

export default function Shortlist({ back, home, roleId, selectedIds = [] }) {
  const role = ROLES.find((r) => r.id === roleId) || ROLES[0]
  const all = useMemo(() => candidatesFor(role), [role])

  const shortlisted = useMemo(() => {
    const set = new Set(selectedIds)
    return all
      .filter((c) => set.has(c.id))
      .map((c) => ({ ...c, testScore: simulateTestScore(c) }))
      .sort((a, b) => b.testScore - a.testScore || b.profileScore - a.profileScore || a.appliedDaysAgo - b.appliedDaysAgo)
  }, [all, selectedIds])

  // find a candidate whose test rank beats their profile rank — the platform's whole thesis
  const surprise = shortlisted.find((c) => c.testScore - c.profileScore >= 15)

  return (
    <div>
      <BackLink onClick={back}>Candidate listing</BackLink>
      <div className="mb-5">
        <Eyebrow>Shortlist · after the test</Eyebrow>
        <h1 className="font-display font-bold text-2xl text-ink mt-1">{role.title}</h1>
        <p className="text-muted text-sm mt-0.5">{shortlisted.length} candidates completed the skills test</p>
      </div>

      {surprise && (
        <Card className="p-4 mb-5 border-brand bg-brand-soft/40">
          <p className="text-[15px] text-brand-dark">
            <span className="font-semibold">{surprise.name}</span> ranked mid-pack on profile ({surprise.profileScore}) but scored{' '}
            <span className="font-mono font-bold">{surprise.testScore}</span> on the test — exactly the candidate a pedigree filter would have missed.
          </p>
        </Card>
      )}

      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs text-faint uppercase tracking-wide">Sorted by test score</span>
        <span className="text-xs text-faint">profile score shown, but no longer the sort key</span>
      </div>

      <div className="space-y-2 mb-6">
        {shortlisted.map((c, idx) => (
          <Card key={c.id} className="px-4 py-3 flex items-center gap-4">
            <span className={`font-mono text-sm w-6 tabular-nums ${idx === 0 ? 'text-brand font-bold' : 'text-faint'}`}>{idx + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-ink truncate">{c.name}</div>
              <div className="text-xs text-muted">{c.source} · {c.exp} yr{c.exp === 1 ? '' : 's'} exp</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wide text-faint">profile</div>
              <span className="font-mono text-sm text-muted tabular-nums">{c.profileScore}</span>
            </div>
            <div className="w-16 text-right">
              <div className="text-[10px] uppercase tracking-wide text-brand">test</div>
              <Score value={c.testScore} size="sm" tone="brand" />
            </div>
          </Card>
        ))}
        {!shortlisted.length && (
          <Card className="p-8 text-center">
            <p className="text-muted">No candidates selected. Go back and pick a pool to send the test to.</p>
          </Card>
        )}
      </div>

      {!!shortlisted.length && (
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => alert('Illustrative — offer letter generation with your comp structure is a later stage.')}>Generate offer letter</Button>
          <Button variant="outline" onClick={() => alert('Illustrative — background verification integration is a later stage.')}>Run background check</Button>
          <Button variant="ghost" onClick={home}>Back to start</Button>
        </div>
      )}
    </div>
  )
}
