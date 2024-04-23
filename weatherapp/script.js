let appID = '2d3745898c628a6b74224a44f0a04ae6';
let units = 'imperial';
let searchMethod = 'zip';

function getSearchMethod(searchTerm) {
    getSearchMethod();
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q'; 
}

function searchWeather(searchTerm) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&APPID=${appID}&units=${units}`).then(result => {
        return result.json();
        }).then(result => {
            init(result);
        })
    }

    function init(resultFromServer) {
        console.log(resultFromServer);
    }

    document.getElementById('searchBtn').addEventListener('click', () => {
        let searchTerm = document.getElementById('searchInput').value;
        if (searchTerm)
            searchWeather(searchTerm);
    })