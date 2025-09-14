import "./styles.css";

const tempDisplayer = document.querySelectorAll(".temprature-display");
const minTempDisplayer = document.querySelectorAll(".min-temp");
const maxTempDisplayer = document.querySelectorAll(".max-temp");
const humidityDisplayer = document.querySelectorAll(".humidity");
const conditionDisplyer = document.querySelectorAll(".condition");
const cityDisplayer = document.querySelector(".city-name");
let degreeSymbol = "°C";
const token = "FFHMVH7KNE73CCGFAANMNBSY7";


async function getInfo (url) {
	try {
		const response = await fetch(url)
		const data = await response.json();
		return data;
	} catch(e) {
		cityDisplayer.textContent = "Failed to fetch data";
		console.log(e);
	}
}

function todayWeatherData (response) {
	tempDisplayer[0].textContent = response.days[0].temp + degreeSymbol;
	minTempDisplayer[0].textContent = `min-temp:  ${response.days[0].tempmin + degreeSymbol}`;
	maxTempDisplayer[0].textContent = `max-temp: ${response.days[0].tempmax + degreeSymbol}`;
	humidityDisplayer[0].textContent = `humidity: ${response.days[0].humidity}%`;
	conditionDisplyer[0].textContent = `condition: ${response.days[0].conditions}`;
}

function tommorowWeatherData (response) {
	tempDisplayer[1].textContent = response.days[1].temp + degreeSymbol;
	minTempDisplayer[1].textContent = `min-temp:  ${response.days[1].tempmin + degreeSymbol}`;
	maxTempDisplayer[1].textContent = `max-temp: ${response.days[1].tempmax + degreeSymbol}`;
	humidityDisplayer[1].textContent = `humidity: ${response.days[1].humidity}%`;
	conditionDisplyer[1].textContent = `condition: ${response.days[1].conditions}`;
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	let cityName = formData.get("City");
	cityDisplayer.textContent = cityName;


	getInfo(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${token}`)
	.then((response) => {
		todayWeatherData(response);
		tommorowWeatherData(response);
	}).then(() => {
		document.querySelector(".content").style.visibility = "visible";
	});

	form.reset();

})
