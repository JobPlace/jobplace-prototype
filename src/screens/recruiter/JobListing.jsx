import { Card, Eyebrow, BackLink, Score } from '../../components/ui.jsx'
import { ROLES, candidatesFor } from '../../data.js'

export default function JobListing({ go, back }) {
  return (
    <div>
      <BackLink onClick={back}>Home</BackLink>
      <div className="mb-6">
        <Eyebrow>Recruiter · your roles</Eyebrow>
        <h1 className="font-display font-bold text-3xl text-ink mt-1">Open positions</h1>
        <p className="text-muted mt-1">Pick a role to see its applicant pool as a distribution, then shortlist on merit.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {ROLES.map((role) => {
          const pool = candidatesFor(role)
          const strong = pool.filter((c) => c.profileScore >= 70).length
          return (
            <button key={role.id} onClick={() => go('candidates', { roleId: role.id })} className="text-left">
              <Card className="p-5 hover:border-brand hover:shadow-md transition-all h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display font-semibold text-lg text-ink">{role.title}</h2>
                    <p className="text-sm text-muted mt-0.5">{role.location}</p>
                  </div>
                  <span className="font-mono text-[11px] text-faint whitespace-nowrap">{role.posted}</span>
                </div>
                <div className="mt-5 flex items-center gap-5">
                  <div>
                    <div className="font-mono text-2xl font-bold text-ink tabular-nums">{role.applicants}</div>
                    <div className="text-xs text-faint">applicants</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold text-brand tabular-nums">{strong}</div>
                    <div className="text-xs text-faint">strong match (70+)</div>
                  </div>
                  <span className="ml-auto text-brand text-sm font-medium inline-flex items-center gap-1">Open →</span>
                </div>
              </Card>
            </button>
          )
        })}
      </div>
    </div>
  )
}
