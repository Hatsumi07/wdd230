const temperature = document.getElementById("temperature").innerHTML;
const windSpeed = document.getElementById("windSpeed").innerHTML;
const windChill = document.getElementById("windChill");
function getWindChill () {
    console.log("reached getwindchill function");
    const temperatureToF =  (temperature * 9/5) + 32;
    const speedToMiles = windSpeed * 0.621371;
    if (temperatureToF <= 50 && speedToMiles > 3.0) {
        const windChillFactor = 35.74 + (0.6215 * temperatureToF) - (35.75 * (speedToMiles ** 0.16)) + (0.4275 * temperatureToF * (speedToMiles ** 0.16));
        windChill.innerHTML = windChillFactor.toFixed(4);
    }
    else {
        console.log("didn't match requirements");
        windChill.innerHTML = "N/A";
    }
}