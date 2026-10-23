# 🌾 Kisan Mausam Mitra (किसान मौसम मित्र)

Hindi weather forecasts, weather-triggered alerts, crop-specific guidance, common crop disease records,
government-scheme information and a nearby-help directory for hill farmers of Himachal Pradesh.

Built by **Team Eyana** for the *Hack for Social Cause* hackathon.

## Features (prototype)
- Hindi UI, district + crop selection
- 5-day forecast (Open-Meteo) with offline fallback to sample data
- Rule-based alerts: heavy rain, hail/storm, frost, strong wind
- Crop guidance and common diseases (sample data)
- Government schemes: PMFBY, PM-KISAN, KCC, Kisan Call Centre
- Nearby directory (sample data)

## Setup (no installs needed to just run)
1. Install Node.js 18+ (https://nodejs.org).
2. Clone/download this folder, open a terminal inside it.
3. Run the app: `npx http-server . -p 8080` then open http://localhost:8080
   (Or use VS Code "Live Server" on `index.html`. Opening the file directly may block loading `data/*.json`.)
4. Run tests: `npm test`

## Environment variables
None are required for the prototype. See `.env.example` (SMS keys are for future work).

## Folder structure
- `index.html`, `app.js` – Hindi web UI
- `alerts.js` – alert rules (also used by tests)
- `data/` – districts, crops, schemes, directory, sample weather
- `tests/` – automated test, `docs/TECHNICAL_DESIGN.md` – architecture

## Data and honesty note
Weather comes from Open-Meteo. Crop, disease, scheme and directory data are **sample data** for the demo and must be
validated with HPKV Palampur, YSPUHF Nauni, KVKs and the Department of Agriculture before real use.
Advice is informational, not a substitute for an expert's diagnosis. Alert thresholds are illustrative.

## Roadmap
SMS/WhatsApp alerts, voice (Hindi TTS), village-level location, mandi price API, validated profit-planner, offline PWA.

## License
MIT – see `LICENSE`.
