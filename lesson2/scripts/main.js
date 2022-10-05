const date = new Date();
let year = date.getFullYear();
let lastMdf = document.lastModified;
document.getElementById("year").innerHTML = year;
document.getElementById("lastUpdate").innerHTML = "Last Update: " + lastMdf;