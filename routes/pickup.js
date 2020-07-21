const express = require('express')
const Airtable = require('airtable')
const router = express.Router()

Airtable.configure({ apiKey: 'keyJmwZBqjPCIRUMi' })
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appuGeLDoRIOhSoc7');

router.get('/pickups', async (req, res) => {
    let compiledData = [];
    const dataAir = await base('Adresses').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 2,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            //console.log('Retrieved', record.get('Name'));
            //console.log(record)
            let pickupObj = {
                name: record.get(('Name')),
                address: record.get(('Address')), 
                postalcode: record.get(('PostalCode')),
                city: record.get(('City')),
                mon: record.get(('Mon')),
                tue: record.get(('Tue')),
                wed: record.get(('Wed')),
                thu: record.get(('Thu')),
                fri: record.get(('Fri')),
                weight: record.get(('Weight'))
            }
            compiledData.push(pickupObj)
        });
        res.render('pickup/pickups', { data: compiledData })
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });


})

module.exports = router