document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "3fbf29810b8e3dfd0b67bd8e9241c1ae";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
  const searchBox = document.querySelector('.search input');
  const searchBtn = document.querySelector('.search button');
  const weatherIcon = document.querySelector('.weather-icon');
  const errorMessage = document.querySelector('.error-message');

  async function checkWeather(city) {
    try {
      if (!city) {
        errorMessage.textContent = 'Please enter a  city name.';
        errorMessage.style.color = 'black';
        return;
      }

      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.cod === 200) {
        document.querySelector('.weather').style.display = "flex";
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

        // Display the weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.src = iconUrl;
      } else {
        throw new Error('Weather information not available');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      errorMessage.textContent = 'City not found or there was a network error. Please try again.';
      errorMessage.style.color = 'black';
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });
});
