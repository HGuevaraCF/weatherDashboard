// const moment = require("moment");

const APIKey = 'c0e8f455257235f308e6f6b97f8d9c8e';

$('#submitBtn').on('click', function (event) {
    var country = $('#CountryListSelect').val();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APIKey}&units=metric`).then(response => response.text())
        .then(result => {
            console.log(result);
            var data = JSON.parse(result);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var weatherDesc = data.weather.main;
            var weatherIcon = data.weather.icon;
            var date = moment.unix(data.dt).format('DD/MM/YYYY');
            $('#country').text(country + " ");
            $('#generalDate').text(date);
            $('#generalTemperature').text(data.main.temp);
            $('#generalWind').text(data.wind.speed);
            $('#generalHumidity').text(data.main.humidity);
            $('#generalUvIndex').text('1');

            fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`).then(response => response.text())
            .then(result => {



            })
            .catch(error => {
                console.log('error: ', error)
            });

        })
        .catch(error => {
            console.log('error: ', error)
        });
})

