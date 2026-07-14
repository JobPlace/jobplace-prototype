import { useMemo, useState } from 'react'
import { Card, Button, Eyebrow, BackLink, Score, Badge } from '../../components/ui.jsx'
import { ROLES, candidatesFor } from '../../data.js'

// Deterministic, illustrative detail content derived from the candidate record.
function buildDetail(c, role) {
  const noticeOpts = ['Immediate', '15 days', '30 days', '60 days']
  const notice = noticeOpts[c.name.length % noticeOpts.length]
  const relocation = c.exp % 2 === 0 ? 'Yes' : 'Open to discuss'
  return {
    form: [
      { q: 'Current role & company', a: `${c.currentRole} at a mid-size consumer tech company` },
      { q: 'Total experience', a: `${c.exp} year${c.exp === 1 ? '' : 's'}` },
      { q: 'Notice period', a: notice },
      { q: `Willing to relocate for ${role.location.split('·')[0].trim()}?`, a: relocation },
      { q: 'Why this role?', a: 'I want to own a product end-to-end where data decides the roadmap, and this role sits exactly at that intersection.' },
    ],
    resume: [
      `${c.currentRole} (${Math.max(1, Math.ceil(c.exp / 2))} yr${Math.max(1, Math.ceil(c.exp / 2)) === 1 ? '' : 's'}): owned discovery-to-launch for two feature lines; ran weekly experiment reviews.`,
      'Led a pricing-page experiment programme; the winning variant lifted paid conversion 11%.',
      'Partnered with data science to rebuild the activation funnel dashboard used by 4 teams.',
      c.exp >= 2 ? `Earlier: analyst roles building SQL/BI reporting (${Math.floor(c.exp / 2)} yr${Math.floor(c.exp / 2) === 1 ? '' : 's'}).` : 'Recent graduate: campus product fellowship + two shipped side projects.',
    ],
    reasons: [
      { label: 'Role-title alignment', detail: `Current title "${c.currentRole}" maps closely to the JD's core responsibilities.`, weight: c.profileScore >= 70 ? 'Strong' : 'Partial' },
      { label: 'Experience band', detail: `${c.exp} yrs vs the JD's preferred 3–6 yrs window.`, weight: c.exp >= 3 && c.exp <= 6 ? 'Strong' : 'Partial' },
      { label: 'Skill keywords', detail: 'Matched: experimentation, funnel analytics, stakeholder management. Missing: marketplace domain.', weight: 'Partial' },
      { label: 'Outcome evidence', detail: 'Resume shows quantified impact (11% conversion lift), which the JD explicitly asks for.', weight: c.profileScore >= 60 ? 'Strong' : 'Weak' },
    ],
  }
}

export default function CandidateDetail({ back, roleId, candidateId }) {
  const role = ROLES.find((r) => r.id === roleId) || ROLES[0]
  const all = useMemo(() => candidatesFor(role), [role])
  const c = all.find((x) => x.id === candidateId) || all[0]
  const detail = useMemo(() => buildDetail(c, role), [c, role])

  const [verdict, setVerdict] = useState(null) // 'agree' | 'up' | 'down'
  const [reason, setReason] = useState('')
  const [saved, setSaved] = useState(false)

  const needsReason = verdict === 'up' || verdict === 'down'
  const canSubmit = verdict === 'agree' || (needsReason && reason.trim().length >= 10)

  return (
    <div>
      <BackLink onClick={back}>Candidate listing</BackLink>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <Eyebrow>Candidate detail · {role.title}</Eyebrow>
          <h1 className="font-display font-bold text-3xl text-ink mt-1">{c.name}</h1>
          <p className="text-muted text-sm mt-1">{c.currentRole} · {c.exp} yr{c.exp === 1 ? '' : 's'} experience · via {c.source} · applied {c.appliedDaysAgo}d ago</p>
        </div>
        <Card className="px-5 py-4 text-right">
          <div className="text-[10px] uppercase tracking-wide text-faint mb-1">Profile-match score</div>
          <Score value={c.profileScore} size="md" tone="brand" />
        </Card>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 items-start">
        {/* LEFT: application form + resume */}
        <div className="space-y-5">
          <Card className="p-6">
            <Eyebrow>Application form responses</Eyebrow>
            <div className="mt-4 space-y-4">
              {detail.form.map((f) => (
                <div key={f.q}>
                  <div className="text-xs text-faint mb-0.5">{f.q}</div>
                  <div className="text-[15px] text-ink">{f.a}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Eyebrow>Resume — key points</Eyebrow>
              <Badge tone="neutral">parsed from upload</Badge>
            </div>
            <ul className="space-y-3">
              {detail.resume.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-[15px] text-ink leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ink/60 shrink-0" />{r}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* RIGHT: why this score + feedback */}
        <div className="space-y-5 lg:sticky lg:top-20">
          <Card className="p-6 border-brand/40">
            <Eyebrow>Why this score</Eyebrow>
            <p className="text-sm text-muted mt-2 mb-4">How the {c.profileScore}/100 was assembled — so you can judge it, not just trust it.</p>
            <div className="space-y-3">
              {detail.reasons.map((r) => (
                <div key={r.label} className="flex items-start gap-3">
                  <Badge tone={r.weight === 'Strong' ? 'pos' : r.weight === 'Weak' ? 'warn' : 'neutral'}>{r.weight}</Badge>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink">{r.label}</div>
                    <div className="text-[13px] text-muted leading-snug">{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <Eyebrow>Is this score right?</Eyebrow>
            {!saved ? (
              <>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <VerdictBtn active={verdict === 'agree'} tone="ok" onClick={() => setVerdict('agree')} label="Looks right" symbol="=" />
                  <VerdictBtn active={verdict === 'up'} tone="up" onClick={() => setVerdict('up')} label="Should be higher" symbol="↑" />
                  <VerdictBtn active={verdict === 'down'} tone="down" onClick={() => setVerdict('down')} label="Should be lower" symbol="↓" />
                </div>
                {needsReason && (
                  <div className="mt-4">
                    <label className="text-xs text-faint block mb-1.5">Why? (required — this trains the matching model)</label>
                    <textarea
                      value={reason} onChange={(e) => setReason(e.target.value)} rows={3}
                      placeholder={verdict === 'up' ? 'e.g. Their experimentation depth outweighs the missing domain keyword…' : 'e.g. Title looks aligned but the resume shows no ownership of outcomes…'}
                      className="w-full rounded-xl border border-line bg-paper/50 p-3 text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </div>
                )}
                <Button className="w-full mt-4" disabled={!canSubmit} onClick={() => setSaved(true)}>
                  Submit feedback
                </Button>
                {needsReason && !canSubmit && <p className="text-xs text-faint mt-2">Add a short reason (10+ characters) to submit.</p>}
              </>
            ) : (
              <div className="mt-3 rounded-xl bg-pos-soft p-4">
                <p className="text-sm text-pos font-medium mb-1">Feedback recorded — thank you.</p>
                <p className="text-[13px] text-pos/90 leading-snug">Your suggestion is saved for review. The displayed score stays as-is for now; validated feedback improves future scoring.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

function VerdictBtn({ active, tone, onClick, label, symbol }) {
  const tones = {
    ok: active ? 'bg-ink text-white border-ink' : 'border-line-strong text-muted hover:border-ink',
    up: active ? 'bg-pos text-white border-pos' : 'border-line-strong text-muted hover:border-pos',
    down: active ? 'bg-neg text-white border-neg' : 'border-line-strong text-muted hover:border-neg',
  }
  return (
    <button onClick={onClick} className={`rounded-xl border px-2 py-3 text-center transition-colors ${tones[tone]}`}>
      <div className="font-bold text-lg leading-none mb-1">{symbol}</div>
      <div className="text-[11px] leading-tight">{label}</div>
    </button>
  )
}
