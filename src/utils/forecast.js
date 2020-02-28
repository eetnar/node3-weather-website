

const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/39a9698b0d417a01961de9ee16950fc0/${lat},${long}?lang=en`

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Cant connect', undefined)
        } else if (body.error) {
            callback(`${body.error}`, undefined)
        } else {
            const {temperature, precipProbability} = body.currently
            const message = `It is currently ${Math.round(temperature)}°F degrees. There is a ${precipProbability}% chance of rain.`

            callback(undefined, message)
        }
    })

}

module.exports = forecast