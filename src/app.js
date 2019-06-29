const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Root website (localhost:3000)
app.get('', (req, res) => {
    res.render('index', {  //index.hbx
        title: 'Weather',
        name: 'Chris Bennett'
    })
})

// About website (localhost:3000/about)
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chris Bennett'
    })
})

// Help website (localhost:3000/help)
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Chris Bennett'
    })
})

// Weather site (localhost:3000/weather)
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// this will match any page that hasn't been matched yet and that has help/ in it
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris Bennett',
        errorMessage: 'Help article not found.'
    })
})

// * is a wildcard that says match anything that hasn't been matched above
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris Bennett',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Serving is up on port 3000.')
})




