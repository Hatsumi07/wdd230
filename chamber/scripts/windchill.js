const temperature = document.getElementById("temperature");
const windSpeed = document.getElementById("windSpeed");
const windChill = document.getElementById("windChill");
const description = document.getElementById("desc");

/*----------------------------------ACCESSING API----------------------*/
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
    const img = document.querySelector(".time img");
    const src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = capitalize(weatherData.weather[0].description);

    //p.innerHTML = `The current temperature in Fairbanks, Alaska is: <strong>${weatherData.main.temp.toFixed(0)}</strong> &deg;F`;    temperature.innerHTML = weatherData.main.temp.toFixed(0);
    img.setAttribute("src", src);
    img.setAttribute("alt", desc);
    temperature.textContent = weatherData.main.temp.toFixed(0);
    description.textContent = desc;
    windSpeed.textContent = (weatherData.wind.speed * 3.6).toFixed(2);
    getWindChill(weatherData.main.temp, weatherData.wind.speed);

  }
/*----------------------------------GET WIND CHILL---------------------*/
function getWindChill (tempC, speedMeters) {
    console.log("reached getwindchill function");
    const tempF =  (tempC * 9/5) + 32;
    const speedMiles = speedMeters * 2.23;
    if (tempF <= 50 && speedMiles > 3.0) {
        const windChillFactor = 35.74 + (0.6215 * tempF) - (35.75 * (speedMiles ** 0.16)) + (0.4275 * tempF * (speedMiles ** 0.16));
        windChill.textContent = windChillFactor.toFixed(2);
    }
    else {
        console.log("didn't match requirements");
        windChill.textContent = "N/A";
    }
}
