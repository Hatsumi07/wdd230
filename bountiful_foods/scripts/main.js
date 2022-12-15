const weather = document.querySelector("div.weather");
const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=34.05223&lon=-118.24368&cnt=7&units=metric&appid=07c38bb26d244f2a9856dcddf725921d';

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        for (let i = 0; i < 8; i++) {
            displayResults(data, i);
          }
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();
function capitalize(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}
  function displayResults(weatherData, index) {

    const weather = document.querySelector("div.weather");
    const day = document.createElement("div");
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const date = document.createElement("h3");
    const temperature = document.createElement("h3");
    const condition = document.createElement("h3");
    const humidity = document.createElement("h3");
    const img = document.createElement("img");
    const src = `https://openweathermap.org/img/w/${weatherData.list[index].weather[0].icon}.png`;
    const desc = capitalize(weatherData.list[index].weather[0].description);
    const dt_txt = new Date(weatherData.list[index].dt_txt);
    console.log(dt_txt.getSeconds().toString().padEnd(2, "0"));

    //p.innerHTML = `The current temperature in Fairbanks, Alaska is: <strong>${weatherData.main.temp.toFixed(i)}</strong> &deg;F`;    temperature.innerHTML = weatherData.main.temp.toFixed(i);
    day.setAttribute("class", "day");
    img.setAttribute("src", src);
    img.setAttribute("alt", desc);
    date.textContent = `${weekday[dt_txt.getDay()]} ${dt_txt.getDay()} at ${dt_txt.getHours().toString().padEnd(2, "0")}:${dt_txt.getMinutes().toString().padStart(2, "0")}:${dt_txt.getSeconds().toString().padStart(2, "0")}`;
    temperature.textContent = `${weatherData.list[index].main.temp.toFixed(0)} °C`;
    condition.textContent = capitalize(weatherData.list[index].weather[0].description);
    humidity.textContent = `${weatherData.list[index].main.humidity}% humid`;
    day.appendChild(date);
    day.appendChild(temperature);
    day.appendChild(img);
    day.appendChild(condition);
    day.appendChild(humidity);
    weather.appendChild(day);

  }