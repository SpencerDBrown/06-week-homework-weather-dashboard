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

    let searchHistory = JSON.parse(localStorage.getItem('search')) || [];

    console.log(searchHistory);
}