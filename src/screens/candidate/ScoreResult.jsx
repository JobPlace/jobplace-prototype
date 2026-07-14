import { Card, Button, Eyebrow, BackLink, Stepper, Score, Badge } from '../../components/ui.jsx'
import Histogram from '../../components/Histogram.jsx'
import { ROLES, candidatesFor } from '../../data.js'

export default function ScoreResult({ back, home, testScore = 82, correct = 3, total = 4 }) {
  const profileScore = Math.max(20, Math.min(96, testScore - 9)) // illustrative
  const pool = candidatesFor(ROLES[0]).map((c) => c.profileScore)
  const beats = Math.round((pool.filter((s) => s < testScore).length / pool.length) * 100)

  const next = [
    { t: 'Interview prep for your target role', d: 'Round-by-round, tuned to how this company hires.' },
    { t: 'Company intelligence brief', d: 'Values, business model, competitors, product-market fit.' },
    { t: 'Referral outreach', d: 'Find the hiring manager and a warm path in.' },
  ]

  return (
    <div>
      <BackLink onClick={back}>Test</BackLink>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <Eyebrow>Step 2 · your result</Eyebrow>
          <h1 className="font-display font-bold text-3xl text-ink mt-1">You earned your score</h1>
        </div>
        <Stepper steps={['Roast', 'Test', 'Score']} current={2} />
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-5 items-start">
        <Card className="p-6">
          <span className="text-sm text-muted">Test score</span>
          <div className="mt-2 mb-1"><Score value={testScore} size="lg" tone="brand" /></div>
          <p className="text-sm text-muted mb-5">{correct} of {total} judgment calls a strong PM would make.</p>

          <div className="h-px bg-line my-5" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Profile-match score</span>
            <Score value={profileScore} size="sm" tone="ink" />
          </div>
          <div className="mt-3 h-2 rounded-full spectrum relative">
            <div className="absolute -top-1 h-4 w-1 rounded bg-ink" style={{ left: `${profileScore}%` }} />
          </div>
          <p className="text-xs text-faint mt-2">The match score is a judgment, so a recruiter can adjust it. The test score is yours — earned, not assumed.</p>
        </Card>

        <div className="space-y-5">
          <Card className="p-6">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-display font-semibold text-ink">Where you land</span>
              <Badge tone="pos">Ahead of {beats}% of applicants</Badge>
            </div>
            <p className="text-sm text-muted mb-5">Against a real pool for Senior Product Manager. Your background didn't decide this — your answers did.</p>
            <Histogram scores={pool} threshold={testScore} height={130} />
          </Card>

          <Card className="p-6">
            <Eyebrow>What's next</Eyebrow>
            <div className="mt-3 space-y-3">
              {next.map((n) => (
                <div key={n.t} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
                  <div>
                    <div className="text-[15px] font-medium text-ink">{n.t}</div>
                    <div className="text-sm text-muted">{n.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <Button onClick={home}>Back to start</Button>
              <Button variant="outline" onClick={() => alert('Illustrative — interview prep is a later stage of the prototype.')}>Start interview prep</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
