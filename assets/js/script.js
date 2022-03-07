var searchBtn = document.querySelector(".search-btn");
var cityInputEl = document.querySelector("#city");
var currentCityEl = document.querySelector(".current-city");
var previousCityEl = document.querySelector(".previous-city");

function formSubmitHandler(event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  if (city) {
    getCityWeather(city);
    // for (var i = 0; i < city.length; i++) {
    // //   localStorage.setItem("event", city);
    // //   var addToList = localStorage.getItem("event");
    // //   previousCityEl.appendChild(addToList);
    // }
  } else {
    alert("Error: Please enter a valid city");
  }
}

function getCityWeather(city) {
  //   var apiUrl =
  //     "https://api.openweathermap.org/data/2.5/onecall?lat=36.1659&lon=-86.7844&appid=c87ce505ce52817e75d4e9f4b1e2a56a";

  var latitude =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInputEl.value +
    "&limit=1&appid=c87ce505ce52817e75d4e9f4b1e2a56a";
  fetch(latitude).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.lat);
      });
    }
  });

  var longitude =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInputEl.value +
    "&limit=1&appid=c87ce505ce52817e75d4e9f4b1e2a56a";
  fetch(longitude).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.lon);
      });
    }
  });
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=c87ce505ce52817e75d4e9f4b1e2a56a";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        displayCity(data);
      });
    } else {
      alert("Error: Please enter a valid city");
    }
  });
}

function displayCity(data) {
  currentCityEl.textContent = cityInputEl.value + "(" + Date() + ")";
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

  console.log(data);
}
document.addEventListener("submit", formSubmitHandler);
