let appID = '2d3745898c628a6b74224a44f0a04ae6';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q'; 
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}`).then(result => {
        return result.json();
        }).then(result => {
            init(result);
        })
    }

    function init(resultFromServer) {
        switch(resultFromServer.weather[0].main) {
            case 'Clear':
                document.body.style.backgroundImage = 'url("clear.jpg")';
                break;

            case 'Clouds':
                document.body.style.backgroundImage = 'url("clouds.jpg")';
                break;

            case 'Rain':
            case 'Drizzle':
            case 'Mist':
                document.body.style.backgroundImage = 'url("rain.jpg")';
                break;
            case 'Snow':
                document.body.style.backgroundImage = 'url("snow.jpg")';
                break;
            case 'Thunderstorm':
                document.body.style.backgroundImage = 'url("storm.jpg")';
                break;
            default:
                break;
        }

        let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
        let temperatureElement = document.getElementById('temeperature');
        let humudityElement = document.getElementById('humidity');
        let windSpeedElement = document.getElementById('windSpeed');
        let cityHeader = document.getElementById('cityHeader');
        let weatherIcon = document.getElementById('documentIconImg');

        weatherIcon.src = 'https://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

        console.log(resultFromServer);
    }

    document.getElementById('searchBtn').addEventListener('click', () => {
        let searchTerm = document.getElementById('searchInput').value;
        if (searchTerm)
            searchWeather(searchTerm);
    })