
//For DOM content loading-:
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector('.search-details button');
    const locationInput = document.querySelector('.search-details input');
    const temperatureElement = document.querySelector('.tempreture');
    const descriptionElement = document.querySelector('.description');
    const humidityElement = document.querySelector('.info-humidity span');
    const windElement = document.querySelector('.info-wind span');
    const weatherImage = document.querySelector('.weather img')

    //click fucntion on the search-button-:
    searchButton.addEventListener('click', function () {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    });

    //fetch the weather condition with the API-:
    function fetchWeather(location) {
        const apiKey = "39aa6fb80168c57b5da77a133283acc3";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        
        
        //if the response isn't OKEY!, then-:
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        //then after collecting the data from JSON-:  
        .then(data => {
            updateWeather(data); // <--- assign the parsed JSON data to the data variable
            // ...
        })
        //if the response is not OKEY!, then(just for error handling purpose,)-:
        .catch(error => console.error('Error fetching weather data:', error));
    }
         
    //update all the weather condition-: 
    function updateWeather(data) {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const icon = data.weather[0].icon;
      
        // Update temperature element
        temperatureElement.innerHTML = `${Math.round(temp)}<span>°C</span>`;
      
        // Update description element
        descriptionElement.textContent = capitalizeFirstLetter(description);
      
        // Update humidity element
        humidityElement.textContent = `${humidity}%`;
      
        // Update wind speed element
        windElement.textContent = `${windSpeed} km/h`;
      
        // Update weather icon
        weatherImage.src = `https://openweathermap.org/img/wn/${icon}.png`;
      }

    //Given thing in input section-:
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

});