# Test cases
| ID | Input (data/sample_weather.json) | Expected |
|---|---|---|
| T1 | 22 Oct: 0 mm, calm | No alert |
| T2 | 23 Oct: 42 mm, code 95, wind 35 | heavy_rain + hail alerts |
| T3 | 24 Oct: min -1 C | frost alert |
| T4 | Open-Meteo unreachable | App falls back to sample data |
| T5 | Crop not typical for district | Warning to confirm with expert |
Run: `npm test`
