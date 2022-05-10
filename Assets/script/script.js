// const moment = require("moment");


const APIKey = 'c0e8f455257235f308e6f6b97f8d9c8e';


$('#submitBtn').on('click', function (event){
    var country = $('#CountryListSelect').val();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APIKey}&units=metric`).then(response => response.text())
        .then(result => {
            // console.log(result);
            var data = JSON.parse(result);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            // function getUvIndex() {
            //     fetch(`https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}appid=${APIKey}&cnt=1`).then(response => response.text())
            //     .then(result => {
            //         var uvIndex = result[0].value;
            //         resolve(uvIndex);
            //     })
            //     .catch(error => {
            //         console.log('error: ' , error)
            //     })
            // }

            var date = moment.unix(data.dt).format('DD/MM/YYYY');
            $('#country').text(country + " ");
            $('#generalDate').text(date);
            $('#generalTemperature').text(data.main.temp);
            $('#generalWind').text(data.wind.speed);
            $('#generalHumidity').text(data.main.humidity);
            $('#generalUvIndex').text('1');

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

