const request = require('request')

// Callback function that returns geo-coordinates for input city

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2FsZWF6ZXIiLCJhIjoiY2ttMHo4aHUzMjV0czJvbjYxbHI0bTJhYSJ9.ti17jNV0L3fxDJaQ3cUflw&limit=1"
    request({ url, json: true}, (error, { body }) => {  // Request takes in URL and JSON argument, returns error or destructured object body
        if (error) {  // Returns the error below if it can't connect to the api
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {  // Returns the error below if the api doesn't recognize the input provided
            callback('Unable to find location. Try another search.', undefined)
        } else {  // Returns the requested data from the object
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

// Exports the function to be available elsewhere in the app
module.exports = geocode
