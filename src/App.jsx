import { useState, useCallback } from 'react'
import { TopBar } from './components/ui.jsx'
import Home from './screens/Home.jsx'
import ResumeRoast from './screens/candidate/ResumeRoast.jsx'
import SkillsTest from './screens/candidate/SkillsTest.jsx'
import ScoreResult from './screens/candidate/ScoreResult.jsx'
import JobListing from './screens/recruiter/JobListing.jsx'
import CandidateListing from './screens/recruiter/CandidateListing.jsx'
import Shortlist from './screens/recruiter/Shortlist.jsx'

const PERSONA = {
  roast: 'Candidate', test: 'Candidate', result: 'Candidate',
  jobs: 'Recruiter', candidates: 'Recruiter', shortlist: 'Recruiter',
}

export default function App() {
  const [stack, setStack] = useState([{ screen: 'home', params: {} }])
  const top = stack[stack.length - 1]

  const go = useCallback((screen, params = {}) => setStack((s) => [...s, { screen, params }]), [])
  const back = useCallback(() => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)), [])
  const home = useCallback(() => setStack([{ screen: 'home', params: {} }]), [])

  const screens = {
    home: <Home go={go} />,
    roast: <ResumeRoast go={go} back={back} />,
    test: <SkillsTest go={go} back={back} {...top.params} />,
    result: <ScoreResult go={go} back={back} home={home} {...top.params} />,
    jobs: <JobListing go={go} back={back} />,
    candidates: <CandidateListing go={go} back={back} {...top.params} />,
    shortlist: <Shortlist go={go} back={back} home={home} {...top.params} />,
  }

  return (
    <div className="min-h-screen">
      <TopBar persona={PERSONA[top.screen]} onHome={home} />
      <main className="mx-auto max-w-6xl px-5 py-8">{screens[top.screen]}</main>
      <footer className="mx-auto max-w-6xl px-5 py-10 text-center">
        <p className="font-mono text-[11px] text-faint tracking-wide">JobPlace prototype · skills, made visible · dummy data for feedback</p>
      </footer>
    </div>
  )
}
