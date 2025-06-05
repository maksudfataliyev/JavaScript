let sessionuser = JSON.parse(sessionStorage.getItem('loggeduser'));
let localuser = JSON.parse(localStorage.getItem('loggeduser'));

if (sessionuser && localuser && sessionuser.username === localuser.username && !sessionuser.location && localuser.location) {
  sessionuser.location = localuser.location;
  sessionStorage.setItem('loggeduser', JSON.stringify(sessionuser));
}

let usernametext = document.getElementById('username');
let locationtext = document.getElementById('location');
let logout = document.getElementById('logout');
let forecastText = document.querySelector('.forecast-box p');

usernametext.textContent = sessionuser.username;

if (sessionuser.location) {
  locationtext.textContent = `Lat: ${sessionuser.location.lat.toFixed(4)}, Lng: ${sessionuser.location.lng.toFixed(4)}`;
} else {
  locationtext.textContent = 'Undefined location';
}

logout.addEventListener('click', () => {
  sessionStorage.clear();
  window.location.href = "html.html";
});

let map;
let marker;

function initMap() {
  const defaultPosition = { lat: 48.8566, lng: 2.3522 };
  const startPosition = sessionuser.location || defaultPosition;

  map = new google.maps.Map(document.getElementById("map"), {
    center: startPosition,
    zoom: 5,
  });

  marker = new google.maps.Marker({
    position: startPosition,
    map: map,
    draggable: true,
  });

  map.addListener("click", (e) => {
    const latLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };

    marker.setPosition(latLng);
    locationtext.textContent = `Lat: ${latLng.lat.toFixed(4)}, Lng: ${latLng.lng.toFixed(4)}`;

    sessionuser.location = latLng;

    sessionStorage.setItem('loggeduser', JSON.stringify(sessionuser));
    localStorage.setItem('loggeduser', JSON.stringify(sessionuser));

    loadWeather();
  });
}

function loadWeather() {
  if (!sessionuser.location) {
    forecastText.textContent = 'Location not available.';
    return;
  }

  const { lat, lng } = sessionuser.location;
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      if (!data.daily || !data.daily.time) {
        forecastText.textContent = 'No forecast data.';
        return;
      }

      let output = '';
      for (let i = 0; i < 3; i++) {
        const date = data.daily.time[i];
        const min = data.daily.temperature_2m_min[i];
        const max = data.daily.temperature_2m_max[i];
        const code = data.daily.weathercode[i];
        output += `${date}: ${getWeatherDescription(code)}, Min: ${min}°C, Max: ${max}°C\n`;
      }

      forecastText.textContent = output.trim();
    })
    .catch(err => {
      forecastText.textContent = 'Failed to load forecast.';
      console.error(err);
    });
}

function getWeatherDescription(code) {
  const codes = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
    55: "Dense drizzle", 61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow", 80: "Rain showers",
    81: "Moderate rain showers", 82: "Violent rain showers", 95: "Thunderstorm",
    96: "Thunderstorm + hail", 99: "Heavy thunderstorm + hail"
  };
  return codes[code] || "Unknown weather";
}

window.addEventListener('DOMContentLoaded', () => {
  loadWeather();
});
