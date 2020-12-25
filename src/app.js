const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Path definition
const publicDirPath = path.join(__dirname, '../public')
const viewsDirPath = path.join(__dirname, '../templates/views')
const partialsDirPath = path.join(__dirname, '../templates/partials')

//App definition
app = express()
const port = process.env.PORT || 80
app.use(express.static(publicDirPath))
app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsDirPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Partho Sutra Dhor'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name:'Partho Sutra Dhor'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:'Partho Sutra Dhor',
        helpText: 'This is help text. Fetch Weather by putting Location.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide an address.',
        })
    }

    geocode(req.query.search, (error, geocodeData) => {
        if(error){
            return res.send({
                error: 'You must provide an address.',
            })
        }
        forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: 'You must provide an address.',
                })
            }
            forecastMsg = forecastData.conditionText + ' thrughout the day. It is ' + forecastData.temp_c + ' degrees celcius out. There is a ' + forecastData.cloud + '% chance of rain.'
            res.send({
                location: geocodeData.location,
                forecastMsg: forecastMsg,
                conditionIcon: forecastData.conditionIcon
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:'Partho Sutra Dhor',
        errorMessage: 'Page not found'
    })
})

// Server port specification
app.listen(port, () => {
    console.log('Server is up at ' + port)
})