// WEATHER DASHBOARD
// variables setup
let weatherData = {};
let allWeatherData = {};
let uvi = "";

// dom selector variables
let cityEl = document.getElementById("city-input");
let searchEl = document.getElementById("search-button");
let currentIconEl = document.getElementById("weather-icon");
let cityNameEl = document.getElementById("city-given");
let tempEl = document.getElementById("temp");
let humidityEl = document.getElementById("humidity");
let windSpeedEl = document.getElementById("wind-speed");
let uvIndexEl = document.getElementById("uv-index");
let currentWeatherEl = document.getElementById("current-weather");



// Assigning a unique API key to a variable
const APIKey = "3a91f7f0ab2106256c3b3aafbbd9cd58";


// a function that when the user enters a city in the search bar it creates the url for the weather forcast
function createWeather(cityName) {
    // trying out different very cool url format
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`
    // let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

    // after url is formed, fetch data
    fetch(weatherURL)
        .then(function (response) {
            // testing output
            response.json().then(function (result) {
                weatherData = result;
                currentWeatherEl.classList.remove("d-none");
                // date variables
                const currentDate = new Date(weatherData.dt * 1000);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                // format date into created html
                cityNameEl.innerHTML = weatherData.name + " (" + month + "/" + day + "/" + year + ") ";
                // current weather icon
                let weatherIcon = weatherData.weather[0].icon;
                currentIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
                currentIconEl.setAttribute("alt", result.weather[0].description);
                // fetch temperature, humidity, wind speed, uv index
                tempEl.innerHTML = "Temperature: " + weatherData.main.temp + " 	&#8457";
                humidityEl.innerHTML = "Humidity: " + weatherData.main.humidity + "%";
                windSpeedEl.innerHTML = "WindSpeed: " + weatherData.wind.speed + " mph";

                // create specific URL for UV Index?
                let longitude = weatherData.coord.lon;
                let latitude = weatherData.coord.lat;
                let uvURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&units=imperial&appid=${APIKey}`;
                fetch(uvURL)
                    .then(function (response) {
                        // testing output
                        response.json().then(function (result) {
                            allWeatherData = result;
                            uvi = result.current.uvi;
                            let uviEl = document.createElement("span");

                            // add a color attribute that matches the severity of UV index
                            if (uvi < 4) {
                                uviEl.setAttribute("class", "badge bg-success");
                            }
                            else if (uvi < 8) {
                                uviEl.setAttribute("class", "badge bg-warning");
                            }
                            else {
                                uviEl.setAttribute("class", "badge bg-danger");
                            }

                            uviEl.innerHTML = uvi;
                            uvIndexEl.innerHTML = "UV Index: ";
                            uvIndexEl.append(uviEl);
                            fiveDay(cityName);
                        })
                    });
            });
        });
}

// function for five day forecast
function fiveDay(cityname) {
    const fiveDayEl = document.querySelectorAll(".five-day");
    for (i = 0; i < fiveDayEl.length; i++) {

        // setting dates for for the five day cards
        fiveDayEl[i].innerHTML = "";
        console.log(JSON.stringify(allWeatherData));
        const fiveDayDate = new Date(allWeatherData.daily[i].dt * 1000);
        const fiveDayDay = fiveDayDate.getDate();
        const fiveDayMonth = fiveDayDate.getMonth() + 1;
        const fiveDayYear = fiveDayDate.getFullYear();
        const fiveDayDateEl = document.createElement("p");
        fiveDayDateEl.setAttribute("class", "date mt-3 mb1");
        fiveDayDateEl.innerHTML = fiveDayMonth + "/" + fiveDayDay + "/" + fiveDayYear;
        fiveDayEl[i].append(fiveDayDateEl);

        // setting the icon for the five day cards
        const fiveDayIconEl = document.createElement("img");
        fiveDayIconEl.setAttribute("src", `https://openweathermap.org/img/wn/${allWeatherData.daily[i].weather[0].icon}@2x.png`);
        fiveDayIconEl.setAttribute("alt", allWeatherData.daily[i].weather[0].description);
        fiveDayEl[i].append(fiveDayIconEl);
        // setting the temperature for the five day cards
        const fiveDayTempEl = document.createElement("p");
        fiveDayTempEl.innerHTML = "High: " + allWeatherData.daily[i].temp.day + " &#8457";
        console.log(allWeatherData.daily[i].temp.day);
        fiveDayEl[i].append(fiveDayTempEl);
        // setting the humidity for the five day cards
        const fiveDayHumidityEl = document.createElement("p");
        fiveDayHumidityEl.innerHTML = "Humidity: " + allWeatherData.daily[i].humidity + "%";
        fiveDayEl[i].append(fiveDayHumidityEl);
    }

}

// function to retrieve city name on button click.
searchEl.addEventListener("click", function () {
    const searchInput = cityEl.value;

    createWeather(searchInput);
    // fiveDay(searchInput);
});



// remove any previous data that might have been displayed





// fetch the five day forecast data
// five day specific url?
// parse promise reponse for five day forecast data display
// icons for the five days

// function to change temp data from Kelvin to Fahrenheit
function K2F(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}

// set city search history in local storage
// function with a loop that creates a list of clickable text-box element with previously searched cities
    // include a event listener that when they are clicked, page loads that city's weather data


