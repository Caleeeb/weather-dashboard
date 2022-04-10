// WEATHER DASHBOARD
// variables setup
// dom selector variables
let cityEl = document.getElementById("city-input");
let searchEl = document.getElementById("search-button");



// Assigning a unique API key to a variable
const APIKey = "3a91f7f0ab2106256c3b3aafbbd9cd58";

// a function that when the user enters a city in the search bar it creates the url for the weather forcast
function createWeather(cityName) {
    console.log(cityName);
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    fetch(weatherURL)
        .then(function (response) {
            // testing output
            response.json().then(function (result) {
                // date variables
                const currentDate = new Date(result.dt * 1000);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                console.log(currentDate, day, month, year);
            });
        });
}
// function to retrieve city name on button click.
searchEl.addEventListener("click", function () {
    const searchInput = cityEl.value;

    createWeather(searchInput);
});
    // after url is formed, fetch data
    // parse the promise reponse to display current weather for given city
    // current date (day/month/year)
    // weather icon of what the weather is like
    // remove any previous data that might have been displayed previously
    // fetch temperature, humidity, wind speed, uv index
    // temperature
    // humidity
    // wind speed
// uv index. I'll need to add a color attribute that matches the severity of UV index (maybe use 'if' statement?)
    // create specific URL for UV Index?

// fetch the five day forecast data
    // five day specific url?
    // parse promise reponse for five day forecast data display
    // icons for the five days

// set city search history in local storage
// function with a loop that creates a list of clickable text-box element with previously searched cities
    // include a event listener that when they are clicked, page loads that city's weather data


