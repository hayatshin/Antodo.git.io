const date = document.querySelector("#date");
const weather = document.querySelector("#weather");

let today = new Date(Date.now()).toISOString().slice(0, 10);
date.innerText = today;

const API_KEY = "0dfc68fee7fe2ac7010930d0df92b92c";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then(
      (data) =>
        (weather.innerText = `Today's Weather : ${data.weather[0].main}`)
    );
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
