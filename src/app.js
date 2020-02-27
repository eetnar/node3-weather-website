const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public/'))

const app = express()


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
        title: 'Yo homie, this is the weather',
        name: 'They call me the arbitrarionator!!!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yolo smithigan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'This is the help page',
        name: 'It was created by meeeeeeee'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'aight aight'
        })
    }

    const location = req.query.address

    geocode(location, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            // return console.log(error)
            return res.send({
                error: 'something went wrong' + error
            })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                // return console.log(error)
                return res.send({
                    error: 'something went wrong' + error
                })
            }
            // console.log(location)
            // console.log(forecastData)

            res.send({
                address: req.query['address'],
                location: location,
                forecast: forecastData,
            })
        })
    })

    // res.send({
    //     forecast: 'forecast string',
    //     location: 'location string',
    //     name: 'haha ok',
    //     address: req.query['address']
    // })
    
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

app.listen(3000, () => {
    console.log('Server started on port 3000')
})

