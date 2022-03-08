var searchBtn = document.querySelector(".search-btn");
var cityInputEl = document.querySelector("#city");
var currentCityEl = document.querySelector(".current-city");
var previousCityEl = document.querySelector(".previous-city");

function formSubmitHandler(event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  getLatLon(city);
  if (city) {
    // for (var i = 0; i < city.length; i++) {
    // //   localStorage.setItem("event", city);
    // //   var addToList = localStorage.getItem("event");
    // //   previousCityEl.appendChild(addToList);
    // }
  } else {
    alert("Error: Please enter a valid city!");
  }
}

function getLatLon(city) {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=8d11ee23127ece86a8e45e07590427e7"
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getCityWeather(lat, lon);
        console.log(lat, lon);
        return lat;
      });
    }
  });
}
// console.log(lat);
// console.log(lon);

function getCityWeather(lat, lon) {
  var latLon = getLatLon();
  console.log(latLon);
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=8d11ee23127ece86a8e45e07590427e7";
  console.log(apiUrl);
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCity(data);
      });
    } else {
      alert("Error: Please enter a valid city");
    }
  });
}

function displayCity(data) {
  currentCityEl.textContent = cityInputEl.value.trim() + "(" + Date() + ")";
  var currentTemp = document.createElement("p");
  currentTemp.textContent =
    "Temp: " +
    (Math.round((data.current.temp - 273.15) * (9 / 5) + 32) * 100) / 100 +
    "°F";
  currentCityEl.appendChild(currentTemp);
  var windEl = document.createElement("p");
  windEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
  currentTemp.appendChild(windEl);
  var humidityEl = document.createElement("p");
  humidityEl.textContent = "Humidity: " + data.current.humidity + " %";
  windEl.appendChild(humidityEl);
  var uviEl = document.createElement("p");
  uviEl.classList = "uvi";
  uviEl.textContent = "UV Index: " + data.current.uvi;
  humidityEl.appendChild(uviEl);
  cityInputEl.textContent = "";
  getCityWeather(city);
  console.log(data);
}
document.addEventListener("submit", formSubmitHandler);
