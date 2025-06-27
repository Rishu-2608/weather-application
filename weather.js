//js part
//notice:- Use your own api and api key


let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

const getCountryName = (code) => {
  return new Intl.DisplayNames(['en'], { type: "region" }).of(code);
};
//data or time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); 
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city = "pune";


citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityInput = document.querySelector(".city_name");
  if (!cityInput.value.trim()) {
    alert("Please enter a city name");
    return;
  }

  city = cityInput.value.trim();
  getWeatherData();

  cityInput.value = "";
});

const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ae46cbe9cd582ced2945497033b2a08e&units=metric`;
  try {
    const res = await fetch(weatherUrl);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`;

    w_temperature.innerHTML = `${main.temp}&#176;C`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176;C`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176;C`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176;C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

window.addEventListener("load", getWeatherData);
