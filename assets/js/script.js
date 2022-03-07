var searchBtn = document.querySelector(".search-btn");
var cityInputEl = document.querySelector("#city");
var currentCityEl = document.querySelector(".current-city");

function formSubmitHandler(event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCityWeather(city);
  } else {
    alert("Error: Please enter a valid city");
  }
}

function getCityWeather(city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=36.1659&lon=-86.7844&exclude=hourly,daily&appid=c87ce505ce52817e75d4e9f4b1e2a56a";

  var latitude = city.lat;
  var longitude = city.lon;
  // "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  // lat +
  // "&lon=" +
  // lon +
  // "&exclude=" +
  // part +
  // "&appid=c87ce505ce52817e75d4e9f4b1e2a56a";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {});
      displayCity();
    } else {
      alert("Error: Please enter a valid city");
    }
  });
}

function displayCity(city, weatherInfo) {
  currentCityEl.textContent = cityInputEl.value;
  var weatherInfoEl = document.createElement("div");
  cityInputEl.appendChild(weatherInfoEl);
  weatherInfoEl.textContent = weatherInfo;
}
document.addEventListener("submit", formSubmitHandler);
