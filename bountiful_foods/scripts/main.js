function toggleMenu() {
	document.getElementById("navigation").classList.toggle("open");
	document.querySelector(".menu button").classList.toggle("open");
}

const menuBtn = document.querySelector(".menu button");
menuBtn.onclick = toggleMenu;
//Last modified 
const lastMdf = document.lastModified;
document.querySelector(".lastMdf").textContent = `Last Modified: ${lastMdf}`

const weather = document.querySelector("div.weather");
const url = 'https://api.openweathermap.org/data/2.5/forecast?lat=34.05223&lon=-118.24368&units=metric&appid=07c38bb26d244f2a9856dcddf725921d';

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        const week = [];
        let week_index = 0;
        const list = data.list;
        for (let i = 0; i < list.length; i++) {
          if (0 < i) {
            let dt_txt_before = new Date(data.list[i-1].dt_txt);
            let dt_txt = new Date(data.list[i].dt_txt);
            if (dt_txt_before.getDate() != dt_txt.getDate()) {
              week.push(list[i]);
              week_index = week.length - 1;
            } else if (dt_txt_before.getDate() == dt_txt.getDate()) {
              week[week_index] = list[i];
            }
          } else if (i == 0) {
            week.push(list[i]);
          }
          }
        for (let i = 0; i < week.length; i++) {
          displayResults(week, i)
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
  function displayResults(week, index) {
    const dt_txt = new Date(week[index].dt_txt);
    const weather = document.querySelector("div.weather");
    const day = document.createElement("div");
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const date = document.createElement("p");
    const temperature = document.createElement("p");
    const condition = document.createElement("p");
    const humidity = document.createElement("p");
    const img = document.createElement("img");
    const src = `https://openweathermap.org/img/w/${week[index].weather[0].icon}.png`;
    const desc = capitalize(week[index].weather[0].description);
    console.log(dt_txt.getSeconds().toString().padEnd(2, "0"));

    //p.innerHTML = `The current temperature in Fairbanks, Alaska is: <strong>${weatherData.main.temp.toFixed(i)}</strong> &deg;F`;    temperature.innerHTML = weatherData.main.temp.toFixed(i);
    day.setAttribute("class", "day");
    img.setAttribute("src", src);
    img.setAttribute("alt", desc);
    date.textContent = `${weekday[dt_txt.getDay()]} ${dt_txt.getDate()} at ${dt_txt.getHours().toString().padEnd(2, "0")}:${dt_txt.getMinutes().toString().padStart(2, "0")}:${dt_txt.getSeconds().toString().padStart(2, "0")}`;
    temperature.textContent = `${week[index].main.temp.toFixed(0)} °C`;
    condition.textContent = capitalize(week[index].weather[0].description);
    humidity.textContent = `${week[index].main.humidity}% humid`;
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

// Accessing fruits json file
const dataUrl = 'https://brotherblazzard.github.io/canvas-content/fruit.json';
let fruits;
const fieldset = document.querySelector("form#mixForm fieldset");
const legend = document.createElement("legend");
legend.textContent = "Choose three fruits:"
fieldset.appendChild(legend);
fetch(dataUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    fruits = jsonObject;
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    for (let i = 0; i < 3; i++) {
      let label = document.createElement('label');
      let select = document.createElement('select');
      select.setAttribute("id", `fruit${i + 1}`)
      select.setAttribute("name", `fruit${i + 1}`)
      select.setAttribute("form", "mix");
      label.textContent = `Fruit${i + 1}: `;
      let fruitIndex = 0;
      fruits.forEach(fruit => displayFruit(fruit, select));
      function displayFruit(fruit, select) {
        let option = document.createElement('option');
      
        option.setAttribute("value", fruitIndex);
        option.textContent = fruit.name;
      
        select.appendChild(option);
        fruitIndex += 1;
      }
      label.appendChild(select);
      fieldset.appendChild(label);
    }
  });

const submitBtn = document.querySelector("#submitBtn");
/* Assigning the submitForm function to the onclick event of the submit button. */
submitBtn.onclick = mixFruits;

document.getElementById("fruitsMixed").style.visibility = "hidden";
function mixFruits() {
  if (!localStorage.getItem('mixesNum')) {
    localStorage.setItem('mixesNum', 1);
    } else {
      localStorage.setItem("mixesNum", +localStorage.getItem("mixesNum") + 1);
    }
  fruitsMixed.scrollIntoView();

  document.getElementById("fruitsMixed").style.visibility = "visible";
  const mixForm = document.querySelector("#mixForm");
console.log(localStorage.getItem("mixesNum"));
  if (mixForm.checkValidity()) {

    const fruitsMixed = document.querySelector("#fruitsMixed");


    fruitsMixed.innerHTML = `<h3>Drink #${localStorage.getItem("mixesNum")}</h3>`;

    let carbohydrates = 0;
    let protein = 0;
    let fat = 0;
    let sugar = 0;
    let calories = 0;

    const name = document.createElement("p");
    const email = document.createElement("p");
    const phone = document.createElement("p");
    const selectedFruits = document.createElement("ul");
    const specialInstructions = document.createElement("p");
    const orderDate = document.createElement("p");
    const nutritionFacts = document.createElement("ul");
    const carbsLi = document.createElement("li");
    const protLi = document.createElement("li");
    const fatLi = document.createElement("li");
    const sugarli = document.createElement("li");
    const calLi = document.createElement("li");
    selectedFruits.innerHTML = `<p>Your fruits: </p>`;

    for (let i = 0; i < 3; i++) {
      const selectedFruit = document.createElement("li");
      const fruit = document.querySelector(`#fruit${i + 1}`);
      selectedFruit.textContent = fruits[fruit.value].name;
      selectedFruits.appendChild(selectedFruit);
      console.log(fruits[fruit.value].nutritions.carbohydrates);
      carbohydrates += fruits[fruit.value].nutritions.carbohydrates;
      protein += fruits[fruit.value].nutritions.protein;
      fat += fruits[fruit.value].nutritions.fat;
      sugar += fruits[fruit.value].nutritions.sugar;
      calories += fruits[fruit.value].nutritions.calories;
    }

    name.textContent = `Name: ${document.querySelector("#fname").value}`;
    email.textContent = `Email: ${document.querySelector("#email").value}`;
    phone.textContent = `Phone: ${document.querySelector("#phone").value}`;
    specialInstructions.innerHTML = `Instructions:<br>${document.querySelector("form textarea").value}`;
    orderDate.textContent = `Order Date: ${new Date()}`;
    nutritionFacts.innerHTML = `<p>Nutrition Facts</p>`;
    carbsLi.textContent = `Carbohydrates: ${carbohydrates.toFixed(2)}`;
    protLi.textContent = `Protein: ${protein.toFixed(2)}`;
    fatLi.textContent = `Fat: ${fat.toFixed(2)}`;
    sugarli.textContent = `Sugar: ${sugar.toFixed(2)}`;
    calLi.textContent = `Calories: ${calories.toFixed(2)}`;

    fruitsMixed.appendChild(name);
    fruitsMixed.appendChild(email);
    fruitsMixed.appendChild(phone);
    fruitsMixed.appendChild(selectedFruits);
    fruitsMixed.appendChild(specialInstructions);
    fruitsMixed.appendChild(orderDate);
    nutritionFacts.appendChild(carbsLi);
    nutritionFacts.appendChild(protLi);
    nutritionFacts.appendChild(fatLi);
    nutritionFacts.appendChild(sugarli);
    nutritionFacts.appendChild(calLi);
    fruitsMixed.appendChild(nutritionFacts);

    document.querySelector("#fname").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#instructions").value = "";

  }
}
