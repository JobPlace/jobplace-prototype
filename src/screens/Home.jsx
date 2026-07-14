import { Card, Button, Eyebrow, Score } from '../components/ui.jsx'
import Histogram from '../components/Histogram.jsx'
import { ROLES, candidatesFor } from '../data.js'

export default function Home({ go }) {
  const demoScores = candidatesFor(ROLES[0]).map((c) => c.profileScore)
  return (
    <div>
      {/* Hero — the thesis: a score made visible */}
      <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center mb-14">
        <div>
          <Eyebrow>Equal-opportunity hiring</Eyebrow>
          <h1 className="font-display font-bold text-ink text-4xl sm:text-5xl leading-[1.05] tracking-tight mt-3">
            Skills,<br />made visible.
          </h1>
          <p className="text-muted text-lg leading-relaxed mt-4 max-w-md">
            Pedigree filters throw away capable people before anyone looks. JobPlace adds one objective signal — a score you earn — so the right candidates surface, whatever their background.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <Button size="lg" onClick={() => go('roast')}>Enter as a candidate</Button>
            <Button size="lg" variant="outline" onClick={() => go('jobs')}>Enter as a recruiter</Button>
          </div>
        </div>
        <Card className="p-6">
          <div className="flex items-baseline justify-between mb-1">
            <span className="font-display font-semibold text-ink">A real applicant pool</span>
            <span className="font-mono text-[11px] text-faint">128 candidates</span>
          </div>
          <p className="text-sm text-muted mb-5">Most cluster in the middle. The strong-match tail is thin — that's who a recruiter can trust surfacing on merit alone.</p>
          <Histogram scores={demoScores} height={140} />
          <div className="mt-5 flex items-center gap-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-brand" /> Shortlist zone (70+)</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-ink" /> Most common band</span>
          </div>
        </Card>
      </section>

      {/* Two journeys */}
      <div className="grid md:grid-cols-2 gap-5">
        <Card className="p-6">
          <Eyebrow>For candidates</Eyebrow>
          <h2 className="font-display font-bold text-2xl text-ink mt-2 mb-2">A journey, not a wall</h2>
          <p className="text-muted text-[15px] mb-5">Roast your resume, prove your skills, and land where you belong — gamified end to end.</p>
          <ul className="space-y-2.5 mb-6">
            {['Resume roast — honest, fun, useful', 'Skills test — the equaliser', 'Interview prep & company intel'].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[15px] text-ink">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}
              </li>
            ))}
          </ul>
          <Button onClick={() => go('roast')}>Start with a roast</Button>
        </Card>

        <Card className="p-6">
          <Eyebrow>For recruiters</Eyebrow>
          <h2 className="font-display font-bold text-2xl text-ink mt-2 mb-2">A smaller, honest shortlist</h2>
          <p className="text-muted text-[15px] mb-5">See your whole pool as a distribution, filter it live, and rank by who actually performed.</p>
          <ul className="space-y-2.5 mb-6">
            {['Filterable score distribution', 'Correct the match score in one tap', 'Rank the shortlist by test result'].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[15px] text-ink">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand shrink-0" />{t}
              </li>
            ))}
          </ul>
          <Button onClick={() => go('jobs')}>Open the dashboard</Button>
        </Card>
      </div>
    </div>
  )
}
