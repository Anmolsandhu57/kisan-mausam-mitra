const $ = id => document.getElementById(id);
const DAYS_HI = ["रवि","सोम","मंगल","बुध","गुरु","शुक्र","शनि"];
let DATA = {};

async function load() {
  const [districts, crops, schemes, directory] = await Promise.all(
    ["districts", "crops", "schemes", "directory"].map(n => fetch(`data/${n}.json`).then(r => r.json())));
  DATA = { districts, crops: crops.crops, schemes: schemes.schemes, directory: directory.entries };
  $("district").innerHTML = districts.map(d => `<option value="${d.id}">${d.name_hi}</option>`).join("");
  $("crop").innerHTML = DATA.crops.map(c => `<option value="${c.id}">${c.name_hi}</option>`).join("");
  $("go").onclick = render;
  render();
}

async function getWeather(d) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code` +
    `&timezone=Asia%2FKolkata&forecast_days=5`;
  try { const r = await fetch(url); if (!r.ok) throw 0; return await r.json(); }
  catch { return await fetch("data/sample_weather.json").then(r => r.json()); } // offline fallback
}

async function render() {
  const d = DATA.districts.find(x => x.id === $("district").value);
  const crop = DATA.crops.find(x => x.id === $("crop").value);
  const w = await getWeather(d);
  const al = Alerts.dailyAlerts(w);
  $("alerts").innerHTML = al.length
    ? al.map(a => `<div class="alert ${a.level}"><b>${a.date}</b> — ${a.message_hi}</div>`).join("")
    : `<div class="card">✅ अगले दिनों में कोई बड़ी चेतावनी नहीं।</div>`;
  const D = w.daily;
  $("weather").innerHTML = `<h2>📍 ${d.name_hi} — मौसम पूर्वानुमान</h2><table><tr><th>दिन</th><th>अधिकतम°C</th><th>न्यूनतम°C</th><th>वर्षा mm</th></tr>` +
    D.time.map((t, i) => `<tr><td>${DAYS_HI[new Date(t).getDay()]}</td><td>${D.temperature_2m_max[i]}</td><td>${D.temperature_2m_min[i]}</td><td>${D.precipitation_sum[i]}</td></tr>`).join("") + `</table>`;
  const suitable = crop.zones.includes(d.id) ? "✅ इस जिले में यह फसल सामान्यतः उगाई जाती है" : "⚠️ इस जिले के लिए कृषि विशेषज्ञ से पुष्टि करें";
  $("guidance").innerHTML = `<h2>🌱 ${crop.name_hi} — सलाह</h2><p>${suitable}</p><p>मौसम: ${crop.season}</p><ul>${crop.guidance_hi.map(g => `<li>${g}</li>`).join("")}</ul>`;
  $("diseases").innerHTML = `<h2>🐛 आम रोग</h2>` + crop.diseases.map(x => `<p><b>${x.name_hi}</b><br>लक्षण: ${x.symptom_hi}<br>उपाय: ${x.action_hi}</p>`).join("");
  $("schemes").innerHTML = `<h2>🏛️ सरकारी योजनाएँ</h2>` + DATA.schemes.map(s => `<p><b>${s.name_hi}</b><br>${s.what_hi}<br><i>${s.tip_hi}</i> · <a href="${s.link}" target="_blank" rel="noopener">आधिकारिक लिंक</a></p>`).join("");
  $("directory").innerHTML = `<h2>📞 नज़दीकी सहायता निर्देशिका</h2>` +
    DATA.directory.filter(e => e.district === d.id).concat(DATA.directory.filter(e => e.district !== d.id).slice(0, 2))
      .map(e => `<p><b>${e.type_hi}</b>: ${e.name}</p>`).join("") + `<p>किसान कॉल सेंटर: 1800-180-1551</p>`;
}
load();
