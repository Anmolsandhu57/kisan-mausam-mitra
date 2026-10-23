// Rule-based alert engine. Works in browser (window.Alerts) and Node (module.exports).
(function (root) {
  const RULES = [
    { id: "heavy_rain", test: d => d.precipitation_sum >= 30, level: "red",
      hi: "भारी बारिश की संभावना: खाद/दवा का छिड़काव टालें, खेत में जल निकासी खोलें, कटी फसल ढककर रखें।" },
    { id: "hail", test: d => [96, 99].includes(d.weather_code) || (d.weather_code === 95 && d.wind_speed_10m_max >= 30), level: "red",
      hi: "ओलावृष्टि/आँधी-तूफ़ान की संभावना: बागों में एंटी-हेल नेट लगाएँ, पशुओं और उपकरणों को सुरक्षित रखें।" },
    { id: "frost", test: d => d.temperature_2m_min <= 0, level: "orange",
      hi: "पाला (फ्रॉस्ट) की संभावना: रात में हल्की सिंचाई करें, नर्सरी/पौध ढकें।" },
    { id: "strong_wind", test: d => d.wind_speed_10m_max >= 40, level: "orange",
      hi: "तेज हवा की संभावना: सहारा (स्टेकिंग) मजबूत करें, छिड़काव न करें।" }
  ];
  function dailyAlerts(weather) {
    const out = [], D = weather.daily;
    D.time.forEach((date, i) => {
      const day = {
        precipitation_sum: D.precipitation_sum[i], weather_code: D.weather_code[i],
        wind_speed_10m_max: D.wind_speed_10m_max[i], temperature_2m_min: D.temperature_2m_min[i]
      };
      RULES.forEach(r => { if (r.test(day)) out.push({ date, id: r.id, level: r.level, message_hi: r.hi }); });
    });
    return out;
  }
  const api = { dailyAlerts, RULES };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.Alerts = api;
})(typeof window !== "undefined" ? window : globalThis);
