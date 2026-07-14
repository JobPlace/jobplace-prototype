// Dummy data for the JobPlace prototype. PM roles only.
// Deterministic generation so the histogram is stable across reloads.

const SOURCES = ['LinkedIn', 'Naukri', 'Glassdoor', 'Referral', 'Indeed']

const FIRST = ['Aarav','Diya','Kabir','Meera','Rohan','Ananya','Vikram','Isha','Arjun','Priya',
  'Karan','Neha','Aditya','Sara','Rahul','Tara','Nikhil','Zoya','Dev','Riya',
  'Manav','Aisha','Yash','Kavya','Siddharth','Nisha','Aryan','Pooja','Varun','Sneha',
  'Rehan','Anjali','Kunal','Ira','Vivaan','Mira','Aman','Naina','Dhruv','Leela']
const LAST = ['Rao','Iyer','Shah','Nair','Gupta','Menon','Reddy','Bose','Kapoor','Verma',
  'Sharma','Khanna','Pillai','Sinha','Desai','Mehta','Chopra','Banerjee','Joshi','Malhotra']

// simple deterministic PRNG
function mulberry(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const ROLES = [
  { id: 'pm-sr',  title: 'Senior Product Manager', location: 'Bangalore · Hybrid', applicants: 128, posted: '3 days ago', seed: 11 },
  { id: 'pm-core', title: 'Product Manager',        location: 'Remote (India)',    applicants: 96,  posted: '1 day ago',  seed: 27 },
  { id: 'pm-apm', title: 'Associate Product Manager', location: 'Pune · On-site',  applicants: 214, posted: '5 days ago', seed: 43 },
  { id: 'pm-gpm', title: 'Group Product Manager',   location: 'Hyderabad · Hybrid', applicants: 41,  posted: '2 days ago', seed: 58 },
]

export function candidatesFor(role) {
  const rand = mulberry(role.seed)
  const n = role.applicants
  const out = []
  for (let i = 0; i < n; i++) {
    // right-ish distribution: bulk in the middle, thin strong tail
    let score = Math.round((rand() * 0.5 + rand() * 0.5) * 62 + 14)
    if (rand() > 0.9) score += Math.round(rand() * 22)
    score = Math.max(6, Math.min(98, score))
    const name = `${FIRST[Math.floor(rand() * FIRST.length)]} ${LAST[Math.floor(rand() * LAST.length)]}`
    const source = SOURCES[Math.floor(rand() * SOURCES.length)]
    const exp = Math.round(rand() * rand() * 13)
    const appliedDaysAgo = 1 + Math.floor(rand() * 12)
    out.push({ id: `${role.id}-${i}`, name, profileScore: score, source, exp, appliedDaysAgo })
  }
  return out
}

export function expBand(e) {
  return e < 2 ? '0-2' : e < 5 ? '2-5' : e < 8 ? '5-8' : '8+'
}

// Simulate a test score for a candidate once they take the screen.
export function simulateTestScore(candidate) {
  const r = mulberry(candidate.id.length * 7 + candidate.profileScore)
  // correlated with profile score but with real spread — the whole point of the platform
  const noise = (r() - 0.4) * 46
  return Math.max(20, Math.min(99, Math.round(candidate.profileScore + noise)))
}

export const SOURCE_LIST = SOURCES
