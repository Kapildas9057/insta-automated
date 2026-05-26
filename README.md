# RoadSOS

RoadSOS is a hackathon-ready **React + Vite** emergency dispatch dashboard simulating AI-powered ambulance triage for Indian road accidents.

## Features
- Mock AI triage (no external API)
- 3-column dark dashboard layout
- Live ambulance fleet sorting and ETA estimation (Haversine)
- Interactive Leaflet map with incident + ambulance markers
- One-click best-unit dispatch logic for nearest available ALS unit
- Fully static frontend (deployable to Vercel/Netlify)

## Tech Stack
- React 18
- Vite
- JavaScript
- Leaflet + React Leaflet
- Lucide React

## Setup
```bash
git clone <your-repo-url>
cd roadsos
npm install
npm run dev
```
Open: `http://localhost:5173`

## Build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Push repository to GitHub.
2. In Vercel, click **Add New Project**.
3. Import the repo.
4. Framework preset: **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Click **Deploy**.

## Deploy to Netlify
1. Push repository to GitHub.
2. In Netlify, click **Add new site > Import an existing project**.
3. Select your repository.
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy site**.

## Notes
- No backend, DB, auth, or API keys required.
- All data lives in `src/data/mockData.js`.
- Triage logic is mocked in `src/hooks/useTriage.js` with a 1–1.5 second simulated delay.
