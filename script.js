document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '1c198389f8271cb00341a3d44070029a';
    const loadingDiv = document.getElementById('loading');
    const errorMessageDiv = document.getElementById('errorMessage');
    const weatherInfoDiv = document.getElementById('weatherInfo');

    if (city) {
        loadingDiv.classList.remove('hidden');
        errorMessageDiv.classList.add('hidden');
        weatherInfoDiv.style.display = 'none';
        weatherInfoDiv.style.opacity = 0;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        console.log('Fetching weather data from:', apiUrl);

        fetch(apiUrl)
            .then(response => {
                loadingDiv.classList.add('hidden');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    showError(data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                showError(error.message);
            });
    } else {
        alert('Please enter a city name');
    }
});

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    const temperatureClass = data.main.temp > 20 ? 'temperature-warm' : 'temperature-cool';

    weatherInfoDiv.innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p class="${temperatureClass}"><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    weatherInfoDiv.style.display = 'block';
    setTimeout(() => {
        weatherInfoDiv.style.opacity = 1;
    }, 50);
}

function showError(message) {
    const errorMessageDiv = document.getElementById('errorMessage');
    errorMessageDiv.textContent = message;
    errorMessageDiv.classList.remove('hidden');
}
