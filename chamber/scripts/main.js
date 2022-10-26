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