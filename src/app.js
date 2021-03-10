const path = require('path')
const express = require('express')
const hbs = require('hbs')

//  Testing out what "__dirname" returns in the console
console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Configuring handlebars views and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// GET requests for each html page
app.get('', (req, res) => {
    res.render('index', {
        title: "Weather Page",
        name: 'Stephanie'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: 'Stephanie'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page",
        name: 'Stephanie',
        message: "Here's my example message."
    })
})
app.get('/weather', (req, res) => {
    res.send({
        location: 'Edmond',
        temperature: 77
    })
})
app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: "404 Page",
        name: 'Stephanie',
        message: "404 Help Article Not Found"
    })
})
app.get('*', (req, res) => {
    res.render('pageNotFound', {
        name: 'Stephanie',
        title: "404 Page",
        message: "404 Page Not Found"
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
