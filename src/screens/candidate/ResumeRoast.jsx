import { useState, useRef } from 'react'
import { Card, Button, Eyebrow, BackLink, Stepper, Badge } from '../../components/ui.jsx'

const LEVELS = [
  {
    id: 'ramsay', emoji: '🔥', name: 'Gordon Ramsay style', tag: 'Savage',
    desc: 'Your resume is RAW. Brutal, loud, no mercy — but every insult hides a fix.',
  },
  {
    id: 'comedian', emoji: '🎤', name: 'Stand-up comedian', tag: 'Witty',
    desc: 'Roasted like open-mic night. Sharp jokes, real observations, applause optional.',
  },
  {
    id: 'teacher', emoji: '📚', name: 'Teacher level', tag: 'Gentle',
    desc: 'Red pen, kind heart. Firm corrections with encouragement in the margins.',
  },
]

// Three distinct canned roasts — one per persona. (Prototype only:
// the real product roasts the actual resume content.)
const ROASTS = {
  ramsay: [
    { icon: '🤬', title: '"Responsible for roadmap" — RESPONSIBLE?!', body: 'My grandmother is responsible for her houseplants! What did you DECIDE? What did you SHIP? This bullet is so vague it should come with a missing-person report.' },
    { icon: '🥩', title: '"Increased engagement" is RAW', body: 'No number, no baseline, no timeframe. You\'ve served me a metric so undercooked it\'s still applying to other jobs. Quantify it or bin it!' },
    { icon: '🗑️', title: '"Team player, fast learner, passionate"', body: 'Three clichés in a row — it\'s a buzzword sandwich with nothing in the middle. DONKEY! Show me one hard decision you made instead.' },
  ],
  comedian: [
    { icon: '🎭', title: '"Responsible for roadmap" — sure, and I\'m responsible for the moon', body: 'Everyone\'s "responsible" for something. Saying it without an outcome is like a magician explaining a trick they never performed. What actually happened because of you?' },
    { icon: '📉', title: '"Increased engagement" — by a rounding error?', body: 'You know who else "increased engagement"? Every group chat during an argument. Give us a number, or the audience assumes it\'s 0.2%.' },
    { icon: '🥁', title: '"Team player, fast learner, passionate"', body: 'The holy trinity of resume filler — words so common they should pay rent on every CV. Cut them and tell one story only YOU can tell. That\'s the punchline recruiters remember.' },
  ],
  teacher: [
    { icon: '✏️', title: '"Responsible for roadmap" — let\'s be specific', body: 'Good start, but responsibility describes the seat, not the work. Rewrite it as a decision you owned and what changed because of it. You clearly did the work — let it show.' },
    { icon: '📏', title: '"Increased engagement" — add the measurement', body: 'This is almost there! Attach the number, the baseline, and the period: "grew weekly engagement 18% in two quarters." Evidence turns a claim into a grade-A bullet.' },
    { icon: '🌱', title: '"Team player, fast learner, passionate"', body: 'These qualities matter, but adjectives don\'t demonstrate them. Replace with a short example — a time you learned something hard, fast, and used it. Show, then the reader believes.' },
  ],
}

const FIXES = [
  'Lead each bullet with the outcome: "Cut checkout drop-off 22% by…"',
  'Name the decision you owned, not the meetings you attended.',
  'Replace the adjectives with one story of a hard call you made.',
]

export default function ResumeRoast({ go, back }) {
  const [level, setLevel] = useState('ramsay')
  const [file, setFile] = useState(null)
  const [roasted, setRoasted] = useState(false)
  const inputRef = useRef(null)

  function onFile(f) { if (f) { setFile(f); setRoasted(false) } }

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
        <div className="max-w-3xl">
          {/* 1 · pick your roaster */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="grid place-items-center h-5 w-5 rounded-full bg-brand-soft text-brand-dark font-mono text-[11px] font-bold">1</span>
              <span className="font-display font-semibold text-ink">Choose your roaster</span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {LEVELS.map((l) => (
                <button key={l.id} onClick={() => setLevel(l.id)} className="text-left">
                  <Card className={`p-4 h-full transition-all ${level === l.id ? 'border-brand ring-1 ring-brand bg-brand-soft/30' : 'hover:border-line-strong'}`}>
                    <div className="text-2xl mb-2">{l.emoji}</div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display font-semibold text-[15px] text-ink leading-tight">{l.name}</span>
                      <Badge tone={level === l.id ? 'brand' : 'neutral'}>{l.tag}</Badge>
                    </div>
                    <p className="text-[13px] text-muted leading-snug">{l.desc}</p>
                  </Card>
                </button>
              ))}
            </div>
          </div>

          {/* 2 · upload */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="grid place-items-center h-5 w-5 rounded-full bg-brand-soft text-brand-dark font-mono text-[11px] font-bold">2</span>
              <span className="font-display font-semibold text-ink">Upload your resume</span>
            </div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]) }}
              className="rounded-2xl border-2 border-dashed border-line-strong bg-white p-8 text-center hover:border-brand transition-colors"
            >
              <div className="mx-auto mb-3 grid place-items-center h-12 w-12 rounded-full bg-brand-soft">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2547E6" strokeWidth="2"><path d="M12 16V4m0 0l-4 4m4-4l4 4"/><path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3"/></svg>
              </div>
              {file ? (
                <>
                  <p className="font-medium text-ink">{file.name}</p>
                  <p className="text-sm text-muted mt-1">Ready to roast. Swap the file any time.</p>
                </>
              ) : (
                <>
                  <p className="font-medium text-ink">Drag &amp; drop your resume here</p>
                  <p className="text-sm text-muted mt-1">PDF or Word document (max 12&nbsp;MB)</p>
                </>
              )}
              <div className="mt-4">
                <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>Browse files</Button>
                <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
              </div>
            </div>
            <div className="mt-3 rounded-xl bg-pos-soft px-4 py-3 flex items-start gap-2.5">
              <span className="mt-0.5">🔒</span>
              <p className="text-[13px] text-pos leading-snug">Your file stays private. We read it only to roast it — nothing is stored, saved, or shared.</p>
            </div>
          </div>

          <Button size="lg" disabled={!file} onClick={() => setRoasted(true)}>Roast my resume 🔥</Button>
          {!file && <p className="text-xs text-faint mt-2">Upload a resume to unlock the roast.</p>}
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_320px] gap-5 items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span className="text-xl">{LEVELS.find((l) => l.id === level).emoji}</span>
              <span className="text-sm text-muted">Roasted by: <span className="font-medium text-ink">{LEVELS.find((l) => l.id === level).name}</span></span>
              <button onClick={() => setRoasted(false)} className="ml-auto text-sm text-brand hover:underline">Change roaster</button>
            </div>
            {ROASTS[level].map((r) => (
              <Card key={r.title} className="p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl">{r.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-ink mb-1">{r.title}</h3>
                    <p className="text-[15px] text-muted leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </Card>
            ))}
            <p className="text-xs text-faint px-1">Prototype note: this roast is a sample. The real product roasts the actual content of your resume.</p>
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
              <p className="text-sm text-brand-dark">Good news: you don't need the perfect resume to get seen here. The test does the talking.</p>
            </div>
            <Button className="w-full" onClick={() => go('test')}>Prove it on the test →</Button>
          </Card>
        </div>
      )}
    </div>
  )
}
