var searchBtn = document.querySelector(".search-btn");
var cityInputEl = document.querySelector("#city");
var currentCityEl = document.querySelector(".current-city");
var previousCityEl = document.querySelector(".previous-city");
var fiveDayEl = document.querySelector(".five-day");
var fiveHeaderEl = document.querySelector(".five-header");

var cities = [];

displayButtons();

function displayButtons() {
  localStorage.getItem(cities);
  console.log(cities);
  for (var i = 0; i < cities.length; i++) {
    var previousCityItemEl = document.createElement("li");
    var previousCityItemEl = document.createElement("button");
    previousCityItemEl.classList = "list-previous btn-city";
    previousCityItemEl.textContent = cities[[i]];
    previousCityEl.prepend(cities[i]);
  }
}

function formSubmitHandler(event) {
  event.preventDefault();
  var city = cityInputEl.value.trim();
  getLatLon(city).then(function (coord) {
    getCityWeather(coord.lat, coord.lon);
    localStorage.setItem("cities", cityInputEl.value);
    cities = cities.push(cityInputEl.value);
  });
  if (city) {
    var previousCityItemEl = document.createElement("li");
    var previousCityItemEl = document.createElement("button");
    previousCityItemEl.classList = "list-previous btn-city";
    previousCityItemEl.textContent = cityInputEl.value;
    previousCityEl.prepend(previousCityItemEl);
  } else {
    alert("Error: Please enter a valid city");
  }
  //   formSubmitHandler.catch(alert("Please enter a valid city name"));
}

function retrievePast(event) {
  var prevCityStr = event.target.innerHTML;
  currentCityEl.textContent = prevCityStr;
  getLatLon(prevCityStr).then(function (coord) {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      coord.lat +
      "&lon=" +
      coord.lon +
      "&appid=3f66c366ccf0a1df05a58c774ca05fc5";
    console.log(apiUrl);
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          currentCityEl.textContent =
            prevCityStr + " (" + moment().format("MMMM Do, YYYY") + ")";
          var currentTemp = document.createElement("p");
          currentTemp.textContent =
            "Temp: " +
            (Math.round((data.current.temp - 273.15) * (9 / 5) + 32) * 100) /
              100 +
            "°F";
          currentCityEl.appendChild(currentTemp);
          var windEl = document.createElement("p");
          windEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
          currentTemp.appendChild(windEl);
          var humidityEl = document.createElement("p");
          humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
          windEl.appendChild(humidityEl);
          var uviEl = document.createElement("p");
          uviEl.classList = "uvi";
          uviEl.textContent = "UV Index: " + data.current.uvi;
          humidityEl.appendChild(uviEl);
          fiveDay(data);
        });
      } else {
        alert("Error: Please enter a valid city");
      }
    });
  });
}

previousCityEl.addEventListener("click", retrievePast);

function getLatLon(city) {
  return fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=3f66c366ccf0a1df05a58c774ca05fc5"
  ).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        return data.coord;
      });
    }
  });
}

function getCityWeather(lat, lon) {
  //   var latLon = getLatLon(city);
  //   console.log(latLon);
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=3f66c366ccf0a1df05a58c774ca05fc5";
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
  currentCityEl.textContent =
    cityInputEl.value + " (" + moment().format("MMMM Do, YYYY") + ")";
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
  humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
  windEl.appendChild(humidityEl);
  var uviEl = document.createElement("p");
  uviEl.classList = "uvi";
  uviEl.textContent = "UV Index: " + data.current.uvi;
  humidityEl.appendChild(uviEl);
  cityInputEl.value = "";
  fiveDay(data);
}

function fiveDay(data) {
  fiveDayEl.innerHTML = "";
  for (var i = 0; i < 5; i++) {
    var daily = data.daily[i];
    fiveHeaderEl.classList = "h2";
    var eachDayEl = document.createElement("p");
    var iconEl = document.createElement("p");
    iconEl.classList = "";
    iconEl.textContent = daily.weather[0].icon;
    fiveDayEl.appendChild(iconEl);
    iconEl.appendChild(eachDayEl);
    eachDayEl.textContent = moment()
      .add(i + 1, "days")
      .format("MMMM Do, YYYY");
    var currentTemp = document.createElement("p");
    currentTemp.textContent =
      "Temp: " +
      (Math.round((daily.temp.day - 273.15) * (9 / 5) + 32) * 100) / 100 +
      "°F";
    eachDayEl.appendChild(currentTemp);
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + data.current.wind_speed + " MPH";
    currentTemp.appendChild(windEl);
    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + data.current.humidity + "%";
    windEl.appendChild(humidityEl);
    var uviEl = document.createElement("p");
    uviEl.classList = "uvi";
    uviEl.textContent = "UV Index: " + data.current.uvi;
    humidityEl.appendChild(uviEl);
  }
}
document.addEventListener("submit", formSubmitHandler);
