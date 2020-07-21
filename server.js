require('dotenv').config()
//Require statements
const express = require('express')
const slimauth = require('slimauth')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

//Use statements
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true })) 

// SETUP SLIMAUTH
slimauth.setOptions(
    {
        'loginPageURL': '/auth/login',              // URL to redirect unauthorized requests
        'privateURLArray': [                        // An array of routes that require authorization
            '/pickup/pickups',
            '/auth/signup',
            '/auth/changepassword'
        ]
    })
app.use(slimauth.requestAuthenticator)              // enables authentication handling

//Get Routes
const authRoutes = require('./routes/auth')
const pickupRoutes = require('./routes/pickup')

app.get('/', (req, res) => {
    res.render('auth/login')
})

//use Routes
app.use('/auth', authRoutes)
app.use('/pickup', pickupRoutes)


app.listen(port, () => console.log(`Listening at http://localhost:${port}`))