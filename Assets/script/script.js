const button = $('#submitBtn');
const country = $('#CountryListSelect').val();
const APIKey = 'c0e8f455257235f308e6f6b97f8d9c8e';
// console.log(moment().format('MMMM Do YYYY'));

button.on('click', function(event) {

    // Axios({
    //     method: 'get',
    //     url: `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APIKey}`,
    //     headers : {}
    // })
    // .then((response) => {
    //     console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${APIKey}`).then(response => response.text())
    .then(result => {
        console.log(result);
        var lat = result.lat;
        var lon = result.lon;

        // var date = moment.unix(result.date).format('MM/DD/YYYY');
        // console.log(date);


        // fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`).then(response => response.text())
        // .then(result => {
        //     console.log(result);
        //     var lat = result.lat;
        //     var lon = result.lon;
            
    
        // })
        // .catch(error => {
        //     console.log('error: ', error)
        // });

    })
    .catch(error => {
        console.log('error: ', error)
    });
})
