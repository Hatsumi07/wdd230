// select HTML elements in the document
const weather = document.querySelector(".weather");
const url = 'https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=07c38bb26d244f2a9856dcddf725921d';

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
    const p = document.createElement("p");
    const h2 = document.createElement("h2");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = capitalize(weatherData.weather[0].description);

    p.innerHTML = `The current temperature in Fairbanks, Alaska is: <strong>${weatherData.main.temp.toFixed(0)}</strong> &deg;F`;
    h2.textContent = `Current Condition Icon`;
    img.setAttribute("src", iconsrc);
    img.setAttribute("alt", desc);
    figcaption.textContent = `Icon of current weather condition at ${weatherData.name} is ${desc}`;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    weather.appendChild(p);
    weather.appendChild(h2);
    weather.appendChild(figure);


  }
  function display() {
    document.querySelector("body button").classList.toggle("show");
    weather.classList.toggle("show");
  }
  