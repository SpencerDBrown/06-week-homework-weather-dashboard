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


        })

}
init();