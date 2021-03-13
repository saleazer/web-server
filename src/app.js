const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//  Testing out what "__dirname" returns in the console so we know how to configure Express paths
// "an environment variable that tells you the absolute path of the directory containing the currently executing file"
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// Running the Express instance
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Configuring handlebars views and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve, but we don't use this once we set routes up
app.use(express.static(publicDirectoryPath))


// GET requests for each HTML page

app.get('', (req, res) => {     // Takes in browser route, then function with request/response
    res.render('index', {       // Renders the HTML page to 'view' from views (set up in the views path above)
        title: "Weather Page",  // Returns the following object
        name: 'Stephanie Leazer'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: 'Stephanie Leazer'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'Stephanie Leazer',
        message: "Help is on the way!  ...soon I promise"
    })
})

//  This endpoint uses a query string in the URL to return the weather in JSON on the page
app.get('/weather', (req, res) => {
    if (!req.query.address) {    // Error handling for when no query provided
        return res.send({
            error: 'You must provide an address.'
        })
    }
    // Functions to run to provide the data requested in the query string
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {  // Takes in query string, then returns destructured object with info
        if (error) {        
            return res.send({ error })  
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: {forecastData},
                location,
                address: req.query.address
            })
        })
    })
})

// ( * ) is a wildcard search, these functions need to be last to ensure correct route matching
app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: "404 Page",
        name: 'Stephanie',
        message: "404 Help Article Not Found"
    })
})
// ( * ) is a wildcard search, these functions need to be last to ensure correct route matching
app.get('*', (req, res) => {
    res.render('pageNotFound', {
        name: 'Stephanie',
        title: "404 Page",
        message: "404 Page Not Found"
    })
})

// Starts the server listening on port 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
