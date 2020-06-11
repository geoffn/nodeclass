const request = require('postman-request')

//const url = 'http://api.weatherstack.com/current?access_key=4e09ceb9bd5e607a084094726fdbcc61&query=48.710930,-122.402046&units=f'

// request({ url: url, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out.  It feels like ' + response.body.current.feelslike + ' degrees')
//     }

// })

const forecast = (latitude, longitude, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=4e09ceb9bd5e607a084094726fdbcc61&query=' + latitude + ',' + longitude + '&units=f'

    //console.log(URL)
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                current: body.current.temperature,
                feelslike: body.current.feelslike

            })
        }


    })
}


module.exports = forecast

// request({ url: URL, json: true }, (error, { error, weather_descriptions, temperature, feelslike }) => {

//     if (error) {
//         callback('Unable to connect to weather service!', undefined)
//     } else if (response.body.error) {
//         callback('Unable to find location', undefined)
//     } else {
//         callback(undefined, {
//             description: response.body.current.weather_descriptions[0],
//             current: response.body.current.temperature,
//             feelslike: response.body.current.feelslike

//         })
//     }


// })
// }