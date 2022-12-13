//Full date format for header
const now = new Date();

const datefieldUK = document.querySelector(".date");

const fulldateUK = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(now);

datefieldUK.innerHTML = `<em>${fulldateUK}</em>`;

const lastMdf = document.lastModified;
document.querySelector(".lastMdf").innerHTML = `Last Modified: ${lastMdf}`;

// responsive menu button
function toggleMenu() {
	document.getElementById("navigation").classList.toggle("open");
	document.querySelector(".menu button").classList.toggle("open");
}

const menuBtn = document.querySelector(".menu button");
menuBtn.onclick = toggleMenu;

//meeting reminder
const meetingDiv = document.querySelector(".meeting");

function popReminder () {
	meetingDiv.style.display = "none";
}

function meetingReminder () {
	meetingDiv.style.top = "0px";
	const day = now.getDay();
	console.log(day);
	if ((day == 1) || (day == 2)) {
		meetingDiv.style.display = "block";
	} else {
		meetingDiv.style.display = "none";
	}
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

//Local storage days off
const daysOffDiv = document.querySelector('.daysOff');
function closeDaysOff() {
  daysOffDiv.style.display = 'none';
}
const daysOffMsg = document.getElementById('daysOffMsg');
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
let fromLastVisit;
if (!localStorage.getItem('todayVisit')) {
  localStorage.setItem('todayVisit', now.getTime());
  daysOffMsg.textContent = 'Welcome to the Comas Chamber of Commerce!';
  } else {
    const lastVisit = localStorage.getItem('todayVisit');
    localStorage.setItem('todayVisit', now.getTime());
    const todayVisit = localStorage.getItem('todayVisit');
    fromLastVisit = Math.floor((todayVisit - lastVisit) / day);
  }
console.log(fromLastVisit);
if (fromLastVisit < 1) { 
  daysOffMsg.textContent = "Don't miss any news!";
} else if (1 == fromLastVisit) { 
  daysOffMsg.textContent = 'Is nice to see you again!';
} else if (1 < fromLastVisit) { 
  daysOffMsg.textContent = `We haven't heard from you this ${fromLastVisit} past days.`;
}

//form sign in date
function liveDate() {
  const date = new Date();
  const dateInput = document.getElementById("signinDate");
  dateInput.setAttribute("value", date);
  console.log(date);
  console.log(dateInput);
}

//-------------------Directory---------------------
const filePath = 'jason/data.json';
const cards = document.querySelector('.cards');
fetch(filePath)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const companies = jsonObject['companies'];
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    companies.forEach(company => displayCompanies(company));
  });

function displayCompanies(company) {
  // Create elements to add to the document
  let card = document.createElement('section');
  let name = document.createElement('h2');
  let logo = document.createElement('img');
  let address = document.createElement('p');
  let phone = document.createElement('p');
  let url = document.createElement('a');

  // Change the textContent property of the h2 element to contain the company's full name
  name.textContent = company.name;
  address.textContent = company.address;
  phone.textContent = company.phone;
  url.innerHTML = company.url;

// Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
  logo.setAttribute('src', company.image);
  logo.setAttribute('alt', 'Logo of ' + company.name + '.');
  logo.setAttribute('loading', 'lazy');

  // Add/append the section(card) with the h2 element
  card.appendChild(name);
  card.appendChild(logo);
  card.appendChild(address);
  card.appendChild(phone);
  card.appendChild(url);

  // Add/append the existing HTML div with the cards class with the section(card)
  document.querySelector('div.cards').appendChild(card);
}