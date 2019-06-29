const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/eaef5aed17bdadab6799511efe362b59/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + (body.currently.precipProbability)*100 + '% chance of rain, with a humidity of ' + (body.currently.humidity)*100 + '%')
        }
    })
}

//data, temperature, precipProbability, humidity

module.exports = forecast