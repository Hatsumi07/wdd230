const weather = document.querySelector("div.weather");
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Comas&units=metric&appid=07c38bb26d244f2a9856dcddf725921d';

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
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
  function displayResults(weatherData) {
    const weather = document.querySelector("div.weather");

    const temperature = document.createElement("h3");
    const condition = document.createElement("h3");
    const humidity = document.createElement("h3");
    const img = document.createElement("img");
    const src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = capitalize(weatherData.weather[0].description);

    //p.innerHTML = `The current temperature in Fairbanks, Alaska is: <strong>${weatherData.main.temp.toFixed(0)}</strong> &deg;F`;    temperature.innerHTML = weatherData.main.temp.toFixed(0);
    img.setAttribute("src", src);
    img.setAttribute("alt", desc);
    temperature.textContent = weatherData.main.temp.toFixed(0);
    condition.textContent = weatherData.weather.description;
    humidity.textContent = weatherData.main.humidity;


  }