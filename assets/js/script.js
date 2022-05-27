function init() {
    const searchEl = document.getElementById("button-search");
    const inputEl = document.getElementById("input-city");
    const nameEl = document.getElementById("name-city");
    const clearEl = document.getElementById("history-clear");
    const tempEl = document.getElementById("temperature");
    const humidityEl = document.getElementById("humidity");
    const windEl = document.getElementById("wind-speed");
    const UVindexEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    const iconEl = document.getElementById("icon-current");

    let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

    console.log(searchHistory);

    const APIKey = "";

    function retrieverWeather(nameCity)
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
        .then(function(response) {

            console.log(response);

            const todaysDate = new Date(reponse.data.dt*2000)
            console.log(todaysDate);

            const today = todaysDate.getDate();
            const month = todaysDate.getMonth() + 1;
            const year = todaysDate.getFullYear();

            nameEl.innerHTML = response.data.time + " (" + month + "/" + today + "/" + year + ") ";

            let weatherIcon = response.data.weather[0].icon;

            iconEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            iconEl.setAttribute("alt",response.data.weather[0].description);

            tempEl.innerHTML = "temperature: " + k2f(response.data.main.temp) + " &#176F";
            humidityEl.innerHTML = 'humidity: ' + response.data.main.humidity + "%";
            windEl.innerHTML = "wind speed: " + response.data.main.wind.speed + " MPH";

            let long = response.data.coord.lon;
            let lata = reponse.data.coord.lat;

            let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lata + "&lon=" + long + "&appid=" + APIKey + "&cnt=1";

            axios.get(UVQueryURL)
            .then(function(response){

                let UVindex = document.createElement("span");

                UVindex.setAttribute("class","badge badge-danger");
                UVindex.innerHTML = response.data[0].value;

                UVindexEl.innerHTML = "UV Index: ";
                UVindexEl.append(UVindex);

            })
        });

    let idCity = response.data.id;
    let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;

    axios.get(forecastQueryURL)
    .then(function(response){

        console.log(reponse);

        const forecastEl = document.querySelectorAll(".forecast");

        for (i = 0; i < forecastEl.length; i++) {
            forecastEl[i].innerHTML = '';

            const indexForecast = i*8 + 4;
            const dateForecast = new Date(response.data.list[indexForecast].dt * 1000)
            const dateForecastEl = document.createElement("p");
            const dayForecast = forecastDate.getDate();
            const monthForecast = forecastDate.getMonth() + 1;
            const yearForecast = forecastDate.getFullYear();

            dateForecastEl.setAttribute("class", "mt-3 mb-0 forecast-date");

            dateForecastEl.innerHTML = monthForecast + "/" + dayForecast + "/" + yearForecast;
            forecastEl[i].append(dateForecastEl);

            const weatherForecastEl = document.createElemnt("img");

            weatherForecastEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
            weatherForecastEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);

            forecastEl[i].append(weatherForecastEl);

            const tempForecastEl = document.createElement("p");

            tempForecastEl.innerHTML = "Temperature: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
            forecastEl[i].append(tempForecastEl);

            const humidityForecastEl = document.createElement("p");
            
            humidityForecastEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
            forecastEl[i].append(humidityForecastEl);
        }
    });
}
init();