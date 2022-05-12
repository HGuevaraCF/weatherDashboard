const history = [];
const APIKey = 'c0e8f455257235f308e6f6b97f8d9c8e';

$('.submitButton').on('click', function (event){
    $('.generalData').show();
    var button = $(event.target).text();
    if(button == 'Search'){
        var country = $('#CountryListSelect').val();
        history.push(country);
        console.log("history: " + history);
        localStorage.setItem('History', JSON.stringify(history));
        var historyButton = $('<button>').addClass('btn btn-secondary m-2 submitButton').text(country).attr('id', country);
        $('#searchHistoryContainer').append(historyButton);
    }else{
        var country = button;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APIKey}&units=metric`).then(response => response.text())
        .then(result => {
            var data = JSON.parse(result);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var date = moment.unix(data.dt).format('DD/MM/YYYY');
            $('#country').text(country + " ");
            $('#generalDate').text(date);
            $('#generalTemperature').text(data.main.temp);
            $('#generalWind').text(data.wind.speed);
            $('#generalHumidity').text(data.main.humidity);

            fetch(`https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&cnt=1`).then(response => response.text())
            .then(result => {
                var uvResult = JSON.parse(result);
                var uvIndex = uvResult[0].value / 100;
                if(uvIndex <= 2){
                    $('#generalUvIndex').text(uvIndex.toString().substring(0, 4)).addClass('low');
                } else if(uvIndex >= 3 && uvIndex <= 7){
                    $('#generalUvIndex').text(uvIndex.toString().substring(0, 3)).addClass('moderate');
                } else if(uvIndex >= 8 && uvIndex <= 10){
                    $('#generalUvIndex').text(uvIndex.toString().substring(0, 3)).addClass('high');
                } else if(uvIndex > 11){
                    $('#generalUvIndex').text(uvIndex.toString().substring(0, 3)).addClass('veryHigh');
                }
                // $('#generalUvIndex').text(uvIndex);
            })
            .catch(error => {
                console.log('Error: ' , error)
            })
            

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`).then(response => response.text())
            .then(result => {
                var forecastData = JSON.parse(result);
                //llenar campos de cada dia con result[3], result[6], result[13]. result[20], result[27] respectivamente
                $('#card1Date').text(moment.unix(forecastData.list[3].dt).format('DD/MM/YYYY'));
                $('#card1Icon').attr('src', `http://openweathermap.org/img/w/${forecastData.list[3].weather[0].icon}.png`);
                $('#card1Temperature').text(forecastData.list[3].main.temp);
                $('#card1Wind').text(forecastData.list[3].wind.speed);
                $('#card1Humidity').text(forecastData.list[3].main.humidity);

                $('#card2Date').text(moment.unix(forecastData.list[11].dt).format('DD/MM/YYYY'));
                $('#card2Icon').attr('src', `http://openweathermap.org/img/w/${forecastData.list[11].weather[0].icon}.png`);
                $('#card2Temperature').text(forecastData.list[11].main.temp);
                $('#card2Wind').text(forecastData.list[11].wind.speed);
                $('#card2Humidity').text(forecastData.list[11].main.humidity);

                $('#card3Date').text(moment.unix(forecastData.list[19].dt).format('DD/MM/YYYY'));
                $('#card3Icon').attr('src', `http://openweathermap.org/img/w/${forecastData.list[19].weather[0].icon}.png`);
                $('#card3Temperature').text(forecastData.list[19].main.temp);
                $('#card3Wind').text(forecastData.list[19].wind.speed);
                $('#card3Humidity').text(forecastData.list[19].main.humidity);

                $('#card4Date').text(moment.unix(forecastData.list[27].dt).format('DD/MM/YYYY'));
                $('#card4Icon').attr('src', `http://openweathermap.org/img/w/${forecastData.list[27].weather[0].icon}.png`);
                $('#card4Temperature').text(forecastData.list[27].main.temp);
                $('#card4Wind').text(forecastData.list[27].wind.speed);
                $('#card4Humidity').text(forecastData.list[27].main.humidity);

                $('#card5Date').text(moment.unix(forecastData.list[35].dt).format('DD/MM/YYYY'));
                $('#card5Icon').attr('src', `http://openweathermap.org/img/w/${forecastData.list[35].weather[0].icon}.png`);
                $('#card5Temperature').text(forecastData.list[35].main.temp);
                $('#card5Wind').text(forecastData.list[35].wind.speed);
                $('#card5Humidity').text(forecastData.list[35].main.humidity);
                
            })
            .catch(error => {
                console.log('error: ', error)
            });

        })
        .catch(error => {
            console.log('error: ', error)
        });
});

$(document).ready(function(){
    $('.generalData').hide();
    if(localStorage.getItem('History') != null){
        let historyData = JSON.parse(localStorage.getItem('History'));
        historyData.forEach(data => {
        var historyButton = $('<button>').addClass('btn btn-secondary m-2 submitButton').text(data).attr('id', data);
        $('#searchHistoryContainer').append(historyButton);
        // localStorage.setItem('History', JSON.stringify(history));
        });
    }
    console.log("history 2: " + history);
})
