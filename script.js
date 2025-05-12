const apikey = "7e370b162fee0ca1be01c0f646d1f8c4";
const button = document.getElementById("getWeatherBtn");
const result = document.getElementById("weatherResult");
const err = document.getElementById("error");

button.addEventListener("click", async () => {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        err.textContent = "Please enter a city name.";
        result.innerHTML = "";
        return;
    }

    err.textContent = "";
    result.innerHTML = "";

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);

        if (!response.ok) {
            throw new Error("City not found.");
        }

        const data = await response.json();

        const weatherHTML = `
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Condition: ${data.weather[0].description}</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        result.innerHTML = weatherHTML;
    } catch (error) {
        err.textContent = error.message;
    }
});
