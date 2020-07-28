const express = require('express')

const router = express.Router()
const firebase = require('firebase')
const db = firebase.firestore()


router.get('/pickups', async (req, res) => {
    let compiledData = [];
    const snapshot = await db.collection('test').get();
    snapshot.forEach((doc) => {
        compiledData.push(doc.data())
    });
    console.log(compiledData)
    res.render('pickup/pickups', { data: compiledData })
})

router.get('/newpickup', (req, res) => {
    res.render('pickup/newpickup')
})

router.get('/editpickup/:id', (req, res) => {
    res.render('pickup/editPickup')
})

router.post('/newpickup', async (req, res) => {
    try {
        let docRef = req.body.name.toString().replace('A/S', "")
        let fbDoc = db.collection('test').doc(docRef)  
        await fbDoc.set({
            name: req.body.name,
            address: req.body.address,
            postalcode: req.body.postalcode,
            city: req.body.city,
            phone: req.body.phone,
            mondayfrom: req.body.mondayfrom,
            mondayto: req.body.mondayto,
            tuesdayfrom: req.body.tuesdayfrom,
            tuesdayto: req.body.tuesdayto,
            wednesdayfrom: req.body.wednesdayfrom,
            wednesdayto: req.body.wednesdayto,
            thursdayfrom: req.body.thursdayfrom,
            thursdayto: req.body.thursdayto,
            fridayfrom: req.body.fridayfrom,
            fridayto: req.body.fridayto,
            weight: req.body.weight,
            collies: req.body.collies
        })
        res.redirect('/pickup/pickups')
    } catch (err){
        res.redirect('/pickup/newpickup')
        console.log(err)
    }

})

module.exports = router