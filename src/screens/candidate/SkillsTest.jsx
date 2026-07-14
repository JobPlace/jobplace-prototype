import { useState } from 'react'
import { Card, Button, Eyebrow, BackLink, Stepper } from '../../components/ui.jsx'

const QUESTIONS = [
  {
    q: 'Your onboarding funnel drops 40% of users at the "connect your data" step. What do you do first?',
    options: [
      { t: 'Redesign the step to look nicer', good: 0 },
      { t: 'Talk to users who dropped and watch session recordings', good: 1 },
      { t: 'Add a progress bar to reduce anxiety', good: 0 },
      { t: 'Remove the step entirely', good: 0 },
    ],
  },
  {
    q: 'Two features are proposed. A lifts activation 3%; B is a big bet that could lift retention 15% or flop. You have one sprint. How do you decide?',
    options: [
      { t: 'Always ship the sure thing (A)', good: 0 },
      { t: 'Always chase the big bet (B)', good: 0 },
      { t: 'Cheapest test that de-risks B before committing the sprint', good: 1 },
      { t: 'Ask the CEO to pick', good: 0 },
    ],
  },
  {
    q: 'Engineering says your top-priority feature will take 3x longer than estimated. What\'s the PM move?',
    options: [
      { t: 'Push them to hit the original date', good: 0 },
      { t: 'Find the 20% of scope that delivers 80% of the value and ship that', good: 1 },
      { t: 'Silently slip the roadmap and hope nobody notices', good: 0 },
      { t: 'Drop the feature', good: 0 },
    ],
  },
  {
    q: 'A stakeholder demands a feature "because a big customer asked." How do you respond?',
    options: [
      { t: 'Build it — the customer is always right', good: 0 },
      { t: 'Refuse — it\'s not on the roadmap', good: 0 },
      { t: 'Quantify the ask against other bets and make the trade-off explicit', good: 1 },
      { t: 'Escalate to leadership immediately', good: 0 },
    ],
  },
]

export default function SkillsTest({ go, back }) {
  const [answers, setAnswers] = useState({})
  const [i, setI] = useState(0)
  const q = QUESTIONS[i]
  const chosen = answers[i]
  const last = i === QUESTIONS.length - 1

  function next() {
    if (last) {
      const correct = QUESTIONS.reduce((acc, qq, idx) => acc + (qq.options[answers[idx]]?.good ? 1 : 0), 0)
      const score = Math.round(48 + (correct / QUESTIONS.length) * 50) // 48..98
      go('result', { testScore: score, correct, total: QUESTIONS.length })
    } else setI(i + 1)
  }

  return (
    <div>
      <BackLink onClick={back}>Roast</BackLink>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div>
          <Eyebrow>Step 1 · the equaliser</Eyebrow>
          <h1 className="font-display font-bold text-3xl text-ink mt-1">PM skills screen</h1>
        </div>
        <Stepper steps={['Roast', 'Test', 'Score']} current={1} />
      </div>

      <Card className="p-6 max-w-2xl">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-xs text-faint tabular-nums">Question {i + 1} of {QUESTIONS.length}</span>
          <div className="flex gap-1">
            {QUESTIONS.map((_, idx) => (
              <span key={idx} className={`h-1.5 w-6 rounded-full ${idx < i ? 'bg-brand' : idx === i ? 'bg-brand/50' : 'bg-line-strong'}`} />
            ))}
          </div>
        </div>
        <h2 className="font-display font-semibold text-xl text-ink leading-snug mb-5">{q.q}</h2>
        <div className="space-y-2.5">
          {q.options.map((o, idx) => (
            <button
              key={idx} onClick={() => setAnswers({ ...answers, [i]: idx })}
              className={`w-full text-left rounded-xl border p-4 text-[15px] transition-colors ${chosen === idx ? 'border-brand bg-brand-soft text-brand-dark' : 'border-line hover:border-line-strong text-ink'}`}
            >
              {o.t}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button size="lg" disabled={chosen === undefined} onClick={next}>{last ? 'See my score' : 'Next question'} →</Button>
        </div>
      </Card>
      <p className="text-xs text-faint mt-4 max-w-2xl">No trick questions — these reward judgment, not memorised frameworks. That's the point: the test is hard to fake and easy to earn.</p>
    </div>
  )
}
