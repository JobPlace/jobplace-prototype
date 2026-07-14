import { useState } from 'react'
import { Card, Button, Eyebrow, BackLink, Stepper, Badge } from '../../components/ui.jsx'

const SAMPLE = `Product Manager with 4 years experience. Worked on mobile app. Responsible for roadmap and stakeholder management. Increased engagement. Team player, fast learner, passionate about products.`

const ROAST = [
  { tone: 'neg', icon: '🔥', title: '"Responsible for roadmap" tells me nothing', body: 'What did you decide, ship, and change? Ownership without outcomes reads like a job description, not a track record.' },
  { tone: 'neg', icon: '📉', title: '"Increased engagement" — by how much?', body: 'A PM who won\'t put a number on their own impact makes a recruiter assume the number was small. Quantify or cut it.' },
  { tone: 'warn', icon: '🫥', title: '"Team player, fast learner, passionate"', body: 'Every resume says this, so it says nothing. Show it through a decision you made, not adjectives.' },
]
const FIXES = [
  'Lead each bullet with the outcome: "Cut checkout drop-off 22% by…"',
  'Name the decision you owned, not the meetings you attended.',
  'Replace the adjectives with one story of a hard call you made.',
]

export default function ResumeRoast({ go, back }) {
  const [roasted, setRoasted] = useState(false)
  const [text, setText] = useState(SAMPLE)

  return (
    <div>
      <BackLink onClick={back}>Home</BackLink>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <Eyebrow>Step 0 · the hook</Eyebrow>
          <h1 className="font-display font-bold text-3xl text-ink mt-1">Resume roast</h1>
        </div>
        <Stepper steps={['Roast', 'Test', 'Score']} current={0} />
      </div>

      {!roasted ? (
        <Card className="p-6 max-w-2xl">
          <p className="text-muted mb-4">Paste your resume summary. We'll be honest — that's the point. No feelings spared, all of it fixable.</p>
          <textarea
            value={text} onChange={(e) => setText(e.target.value)} rows={6}
            className="w-full rounded-xl border border-line bg-paper/50 p-4 text-[15px] text-ink resize-none focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <div className="mt-4"><Button size="lg" onClick={() => setRoasted(true)}>Roast my resume 🔥</Button></div>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-[1fr_320px] gap-5 items-start">
          <div className="space-y-3">
            {ROAST.map((r) => (
              <Card key={r.title} className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl">{r.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-ink">{r.title}</h3>
                      <Badge tone={r.tone === 'neg' ? 'warn' : 'neutral'}>{r.tone === 'neg' ? 'fix this' : 'soften'}</Badge>
                    </div>
                    <p className="text-[15px] text-muted leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-5 lg:sticky lg:top-20">
            <Eyebrow>How to fix it</Eyebrow>
            <ul className="mt-3 space-y-3 mb-5">
              {FIXES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-pos shrink-0" />{f}
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-brand-soft p-4 mb-4">
              <p className="text-sm text-brand-dark">Good news: you don't have to have the perfect resume to get seen here. The test does the talking.</p>
            </div>
            <Button className="w-full" onClick={() => go('test')}>Prove it on the test →</Button>
          </Card>
        </div>
      )}
    </div>
  )
}
