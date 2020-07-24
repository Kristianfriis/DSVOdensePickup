require('dotenv').config()
//Require statements
const express = require('express')
const slimauth = require('slimauth')
const expressLayouts = require('express-ejs-layouts')
const firebase = require('firebase')
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
            '/auth/changepassword',
            '/'
        ]
    })
app.use(slimauth.requestAuthenticator)              // enables authentication handling

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: "dsv-odense-pickup",
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//Get Routes
const authRoutes = require('./routes/auth')
const pickupRoutes = require('./routes/pickup')

app.get('/', (req, res) => {
    res.render('home')
})

//use Routes
app.use('/auth', authRoutes)
app.use('/pickup', pickupRoutes)


app.listen(port, () => console.log(`Listening at http://localhost:${port}`))