# JobPlace — Prototype

A clickable, dummy-data prototype for **JobPlace**, an equal-opportunity hiring marketplace where a demonstrated-skill score surfaces capable candidates alongside pedigree. Focus role family: **Product Management**.

Built with **Vite + React + Tailwind CSS**. No backend — all data is synthetic and deterministic, so screens are stable for demos and surveys.

## What's inside

**Candidate flow** (the growth hook)
- Resume roast → PM skills test → earned score + where you land in the distribution

**Recruiter flow** (the decision surface)
- Job listing → Candidate listing (live filterable score histogram + list sorted by profile score + agree/↑/↓ feedback) → Shortlist sorted by test score

Illustrative-only actions (offer letter, background check, interview prep) are stubbed with a note.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL.

## Deploy to Vercel (free)

1. Push this repo to GitHub.
2. In Vercel, **New Project → Import** the repo. Framework preset auto-detects **Vite**.
3. Deploy. The Hobby tier is free and gives you a shareable URL.

## Polish in v0 (optional, credit-light)

1. Push to GitHub (above).
2. In v0, **import the GitHub repo** rather than generating from scratch — this avoids spending output-token credits on the initial build.
3. Keep the repo lean (imported files count as input context) and prefer one detailed prompt per change over many small iterations.

## Project structure

```
src/
  App.jsx                 # stack-based screen navigation
  data.js                 # PM roles + deterministic dummy candidates
  components/
    ui.jsx                # Button, Card, Score, Badge, TopBar, ...
    Histogram.jsx         # signature score-distribution chart
  screens/
    Home.jsx
    candidate/  ResumeRoast · SkillsTest · ScoreResult
    recruiter/  JobListing · CandidateListing · Shortlist
```

## Design notes

Scores are set in mono type, like precise measurements — the product's signature. Cobalt is the brand accent; green/red are reserved for score reactions; a red→amber→green spectrum appears only where a score is shown as a scale.
