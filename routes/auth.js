const express = require('express')
const router = express.Router()
const slimauth = require('slimauth')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.get('/signup', (req, res) =>{
    res.render('auth/signup')
})

router.get('/logout', (req, res) => {
    slimauth.deauthenticate(req.userID)
    res.redirect('/')
    // console.log('User logged out:', req.userID)
})

router.post('/login', (req, res) => {

    let email = req.body['email']
    let password = req.body['password']

    // valiate password and log the user in for next 30 days
    slimauth.authenticate(email, password, res)
        .then(
            // success
            () => {
                res.redirect('/pickup/pickups')
                // console.log('User logged in:', email)
            },
            // fail
            (err) => { res.send(err.message) }
        )
})

router.post('/signup', (req, res) => {
 
    // extract sign up form data
    let email = req.body.email
    let password = req.body.password
    let confirmpassword = req.body.confirmpassword

    if(password != confirmpassword) {
        res.redirect('/auth/signup')
    } else {
        slimauth.createUser(email, password)
        .then(
            //  success
            () => { 
                res.redirect('/auth/login')
                // console.log('User account created for', email)
            },
            // fail
            (err) => { res.end(err.message) }
        )
    }
})

router.get('/changepassword', (req, res) => {
    res.render('auth/changepassword')
})
module.exports = router