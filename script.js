let weather = {
  apiKey: "363c08598c1aa91fe6a439bf12eafb7c",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey + "&lang=pt_br"
    )
      .then((response) => {
        if (!response.ok) {
          alert("Não encontrado.");
          throw new Error("Não encontrado");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like, temp_min, temp_max } = data.main;
    const { speed } = data.wind;

    document.querySelector(".weekDay").innerText = daySettings().dayOfTheWeek;
    document.querySelector(".yearDate").innerText = daySettings().daySettings;
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp.toFixed(0) + "°C";
    document.querySelector(".humidity").innerText = humidity + "%";
    document.querySelector(".wind").innerText = speed.toFixed(0) + " km/h";
    document.querySelector(".precipitation").innerText = feels_like.toFixed(0) + "°C";
    document.querySelector(".weather").classList.remove("loading");
    document.querySelector(".temp_min").innerText = temp_min.toFixed(0) + "°C";
    document.querySelector(".temp_max").innerText = temp_max.toFixed(0) + "°C";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

function daySettings() {
  const day = new Date();

  const dayOfTheWeek = dayName(day.getDay());
  const dayOfTheMonth = day.getDate();
  const month = monthName(day.getMonth());
  const year = day.getFullYear();

  let daySettings = `${dayOfTheMonth} de ${month} de ${year}`;

  return {daySettings, dayOfTheWeek};
}

function dayName(day) {
  switch (day + 1) {
    case 1:
      d = "Domingo";
      break;
    case 2:
      d = "Segunda";
      break;
    case 3:
      d = "Terça";
      break;
    case 4:
      d = "Quarta";
      break;
    case 5:
      d = "Quinta";
      break;
    case 6:
      d = "Sexta";
      break;
    case 7:
      d = "Sábado";
      break;
  }
  return d;
}

function monthName(month) {
  switch (month + 1) {
    case 1:
      m = "Janeiro";
      break;
    case 2:
      m = "Fevereiro";
      break;
    case 3:
      m = "Março";
      break;
    case 4:
      m = "Abril";
      break;
    case 5:
      m = "Maio";
      break;
    case 6:
      m = "Junho";
      break;
    case 7:
      m = "Julho";
      break;
    case 8:
      m = "Agosto";
      break;
    case 9:
      m = "Setembro";
      break;
    case 10:
      m = "Outubro";
      break;
    case 11:
      m = "Novembro";
      break;
    case 12:
      m = "Dezembro";
      break;
  }

  return m;
}

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("São Paulo");
