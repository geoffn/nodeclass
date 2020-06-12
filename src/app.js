const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT || 3000

//Setup static content location
app.use(express.static(path.join(__dirname, '../public')))

//Set hadlebars template location
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

//set templeting engine to hbs
app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'GeoffN'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'GeoffN'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Dont double click the back button',
        name: 'GeoffN'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            Error: 'Address is required!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {

        if (error) {
            return console.log('Error: ', error)
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return console.log('Error', error)
            }

            console.log(location)
            console.log(forecastData)
            res.send({
                address: req.query.address,
                Temperature: forecastData.current,
                description: forecastData.description
            })
        })


    })
})

//Handling 404 - * is a wildcard
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errorMessage: 'Help page not found',
        name: 'GeoffN'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'GeoffN'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

