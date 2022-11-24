//Full date format for header
const now = new Date();

const datefieldUK = document.querySelector(".date");

const fulldateUK = new Intl.DateTimeFormat("en-UK", {
	dateStyle: "full"
}).format(now);

datefieldUK.innerHTML = `<em>${fulldateUK}</em>`;

const lastMdf = document.lastModified;
document.querySelector(".lastMdf").innerHTML = `Last Modified: ${lastMdf}`;

function toggleMenu() {
	document.getElementById("navigation").classList.toggle("open");
	document.querySelector(".menu button").classList.toggle("open");
}

const menuBtn = document.querySelector(".menu button");
menuBtn.onclick = toggleMenu;

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