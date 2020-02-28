const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath, {extensions:['html']}))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'eetnar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'eetnar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text. See? Ah yes, feel helped.',
        title: 'Help',
        name: 'eetnar the 2nd'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Woops! Need a location :)'
        })
    }

    const location = req.query.address

    geocode(location, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error: 'Something went wrong: ' + error
            })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Something went wrong: ' + error
                })
            }

            res.send({
                address: req.query['address'],
                location: location,
                forecast: forecastData,
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    res.send({
        products: [req.query['search']]
    }) 

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'did you need help?',
        name: 'woops inc',
        title: 'HELP ARTICLE NOT FOUND'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 nothing here',
        name: 'The mistake company',
        title: '404 PAGE NOT FOUND'
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}, :)`)
})

