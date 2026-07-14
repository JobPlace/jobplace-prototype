// Shared UI primitives for the JobPlace prototype.

export function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
  const sizes = { sm: 'text-sm px-3 py-1.5', md: 'text-[15px] px-4 py-2.5', lg: 'text-base px-5 py-3' }
  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-dark',
    ghost: 'bg-transparent text-ink hover:bg-black/5',
    outline: 'border border-line-strong text-ink hover:bg-black/5',
    soft: 'bg-brand-soft text-brand-dark hover:bg-brand-soft/70',
  }
  return <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>{children}</button>
}

export function Card({ children, className = '', ...props }) {
  return <div className={`bg-white border border-line rounded-2xl shadow-card ${className}`} {...props}>{children}</div>
}

export function Eyebrow({ children }) {
  return <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-faint">{children}</div>
}

// A score rendered as a precise measurement — the product's signature.
export function Score({ value, size = 'md', tone = 'ink' }) {
  const sizes = { sm: 'text-lg', md: 'text-3xl', lg: 'text-6xl' }
  const tones = { ink: 'text-ink', brand: 'text-brand', pos: 'text-pos', muted: 'text-faint' }
  return (
    <span className={`font-mono font-bold tabular-nums ${sizes[size]} ${tones[tone]}`}>
      {value}<span className="text-faint font-normal text-[0.5em] align-top ml-0.5">/100</span>
    </span>
  )
}

export function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-black/5 text-muted',
    brand: 'bg-brand-soft text-brand-dark',
    pos: 'bg-pos-soft text-pos',
    warn: 'bg-warn-soft text-warn',
  }
  return <span className={`inline-flex items-center font-body text-xs font-medium px-2.5 py-1 rounded-full ${tones[tone]}`}>{children}</span>
}

export function TopBar({ persona, onHome }) {
  return (
    <header className="sticky top-0 z-20 bg-paper/85 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-5 h-14 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2 group">
          <span className="grid place-items-center h-6 w-6 rounded-md bg-ink text-white font-mono text-xs font-bold">JP</span>
          <span className="font-display font-bold text-ink tracking-tight">JobPlace</span>
        </button>
        <div className="flex items-center gap-3">
          {persona && <Badge tone="brand">{persona} view</Badge>}
          <span className="hidden sm:inline font-mono text-[10px] tracking-widest uppercase text-faint border border-line-strong rounded-full px-2 py-1">Prototype · dummy data</span>
        </div>
      </div>
    </header>
  )
}

export function BackLink({ onClick, children }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-4">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      {children}
    </button>
  )
}

export function Stepper({ steps, current }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`h-1.5 w-1.5 rounded-full ${i <= current ? 'bg-brand' : 'bg-line-strong'}`} />
          <span className={`text-xs ${i === current ? 'text-ink font-medium' : 'text-faint'}`}>{s}</span>
          {i < steps.length - 1 && <div className="w-6 h-px bg-line-strong" />}
        </div>
      ))}
    </div>
  )
}
