let appID = '2d3745898c628a6b74224a44f0a04ae6';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q'; 
}
//call to the api and conver the response to json object
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}`).then(result => {
        return result.json();
        }).then(result => {
            init(result);
        })
    }

    function init(resultFromServer) {
        //change the background color based on the weather response from the server
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
        let temperatureElement = document.getElementById('temperature');
        let humudityElement = document.getElementById('humidity');
        let windSpeedElement = document.getElementById('windSpeed');
        let cityHeader = document.getElementById('cityHeader');
        let weatherIcon = document.getElementById('documentIconImg');

        weatherIcon.src = 'https://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png'; //getting an error here with the icon not loading

        console.log(resultFromServer);
        
        let resultDescription = resultFromServer.weather[0].description;
        weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

        temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
        windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
        cityHeader.innerHTML = resultFromServer.name + ',' + ' ' + resultFromServer.sys.country;
        humudityElement.innerHTML = 'Humidity is at ' + resultFromServer.main.humidity + '%';

        setPositionForWeatherInfo();

    }
    function setPositionForWeatherInfo() {
        let weatherContainer = document.getElementById('weatherContainer');
        let weatherContainerHeight = weatherContainer.clientHeight;
        let weatherContainerWidth = weatherContainer.clientWidth;

        weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
        weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/2}px)`;
        weatherContainer.style.visibility = 'visible';
    }
    

    document.getElementById('searchBtn').addEventListener('click', () => {
        let searchTerm = document.getElementById('searchInput').value;
        if (searchTerm)
            searchWeather(searchTerm);
    })