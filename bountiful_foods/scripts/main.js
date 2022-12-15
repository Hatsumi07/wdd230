function toggleMenu() {
	document.getElementById("navigation").classList.toggle("open");
	document.querySelector(".menu button").classList.toggle("open");
}

const menuBtn = document.querySelector(".menu button");
menuBtn.onclick = toggleMenu;

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

// Progressive Loading Images
const imagesToLoad = document.querySelectorAll('picture source[data-src]');
const loadImages = (image) => {
  image.setAttribute('srcset', image.getAttribute('data-src'));
  image.onload = () => {
    image.removeAttribute('data-src');
  };
};
const options = {
  rootMargin: '0px 0px 300px 0px',
  threshold: 0
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((items) => {
    items.forEach((item) => {
      console.log('ITEM IS');
      console.log(item);
      if (item.isIntersecting) {
        loadImages(item.target);
        observer.unobserve(item.target);
        console.log('ITEM TARGET IS');
        console.log(item.target);  
      }
    });
  }, options);
  imagesToLoad.forEach((img) => {
    observer.observe(img);
  });
} else {
  imagesToLoad.forEach((img) => {
    loadImages(img);
  });
}


const dataUrl = 'https://brotherblazzard.github.io/canvas-content/fruit.json';
const fieldset = document.querySelector("form.mix fieldset");
const legend = document.createElement("legend");
legend.textContent = "Choose three fruits:"
fieldset.appendChild(legend);
fetch(dataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const fruits = jsonObject;
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    for (let i = 0; i < 3; i++) {
      let label = document.createElement('label');
      let select = document.createElement('select');
      select.setAttribute("id", `fruit${i + 1}`)
      select.setAttribute("name", `Fruit${i + 1}`)
      select.setAttribute("form", "mix");
      label.textContent = `Fruit${i + 1}: `;
      fruits.forEach(fruit => displayFruit(fruit, select));
      label.appendChild(select);
      fieldset.appendChild(label);
    }
  });
function displayFruit(fruit, select) {

  let option = document.createElement('option');

  option.setAttribute("value", fruit.name);
  option.textContent = fruit.name;

  select.appendChild(option);

}
const fname = document.querySelector("form.mix #fname");
const email = document.querySelector("form.mix #email");
const phone = document.querySelector("form.mix #phone");
const fruit1 = document.querySelector("form.mix #fruit1");
const fruit2 = document.querySelector("form.mix #fruit2");
const fruit3 = document.querySelector("form.mix #fruit3");
const fruitsMixed = document.querySelector("main .fruitsMixed");

fname.addEventListener('input', function() {
  document.querySelector("main .fruitsMixed p:nth-child(1)").innerHTML = fname.value;
});
email.addEventListener('input', function() {
  document.querySelector("main .fruitsMixed p:nth-child(2)").innerHTML = email.value;
});
phone.addEventListener('input', function() {
  document.querySelector("main .fruitsMixed p:nth-child(3)").innerHTML = phone.value;
});
fruit1.addEventListener('change', () => {
      document.querySelector("main .fruitsMixed p:nth-child(4)").innerHTML = fruit1.value;
});
fruit2.addEventListener('change', function() {
  document.querySelector("main .fruitsMixed p:nth-child(5)").innerHTML = fruit2.value;
});
fruit3.addEventListener('change', function() {
  document.querySelector("main .fruitsMixed p:nth-child(6)").innerHTML = fruit3.value;
});
function mixFruits() {
  const fname = document.querySelector("form.mix .fname");
  const email = document.querySelector("form.mix .email");
  const phone = document.querySelector("form.mix .phone");
  const fruit1 = document.querySelector("form.mix #fruit1");
  const fruit2 = document.querySelector("form.mix #fruit2");
  const fruit3 = document.querySelector("form.mix #fruit3");
  const fruitsMixed = document.querySelector(".fruitsMixed");
  const p = document.createElement("p");
  p.innerHTML = `${fname.value}<br>${email.value}<br>${phone.value}<br>${fruit1.value}<br>${fruit2.value}<br>${fruit3.value}`;
  fruitsMixed.appendChild(p);
}
