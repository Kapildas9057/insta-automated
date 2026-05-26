# RoadSOS

RoadSOS is a production-ready React + Vite hackathon MVP for AI-assisted ambulance dispatch decisions during Indian road emergencies.

## Features

- Mock AI triage with 1.0–1.5 sec loading simulation (no external AI/API calls)
- Incident panel with caller details and triage reasoning
- Sorted ambulance fleet with ETA calculation via haversine distance
- One-click best ALS dispatch with visual confirmation banner
- Dark themed Leaflet map with incident pulse marker and route polyline
- Fully frontend-only; deployable to Vercel and Netlify as static site

## Tech Stack

- React 18
- Vite
- JavaScript
- Leaflet + React Leaflet
- Lucide React
- Plain CSS

## Local Setup

```bash
git clone <your-repo-url>
cd roadsos
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click **New Project** and import the repo.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

## Deploy to Netlify

1. Push repo to GitHub.
2. In Netlify, click **Add new site → Import from Git**.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy site.

## Notes

- No backend, auth, DB, or server routes used.
- All data is hardcoded in `src/data/mockData.js`.
- All triage behavior is deterministic mock logic in `src/hooks/useTriage.js`.
