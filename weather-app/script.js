const apiKey = "80867af8dc4660cb071225aaa49ab7e0";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  if (city == "") {
    displayError();
    return;
  }

  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    displayError();
    return;
  } else {
    document.querySelector(".error").style.display = "none";
  }

  var data = await response.json();

  console.log(data);

  document.querySelector(".weather").style.display = "block";

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind-speed").innerHTML = data.wind.speed + " km/h";

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
  }

  searchBox.value = "";
}

function displayError() {
  document.querySelector(".error").style.display = "block";

  document.querySelector(".weather").style.display = "none";
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
