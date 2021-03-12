const request = require('request')

// Callback function that takes in lat/long and returns weather information from WeatherStack api

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a881442ca3b9f7e89ca6149054c1fbc1&query="+latitude+","+longitude+"&units=f"
    request({ url, json: true }, (error, { body }) => {  // Request takes in URL and JSON argument, returns error or destructured object body
        if (error) {  // Returns the error below if it can't connect to the api
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {  // Returns the error below if the api doesn't recognize the input provided
                callback("Unable to find location", undefined)
        } else {  // Returns the destructured body of the object
            callback(undefined, {body})
        }
    })
}

// Exports the function to be available elsewhere in the app
module.exports = forecast