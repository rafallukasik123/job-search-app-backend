const express = require('express')
const router = express.Router()
const errorMessages = require('../../static/errorMessages');
router.get('/jobSeeker/getLanguageList',async(req,res) => {

    try {
        const list = ['angielski','polski','francuski','niemiecki','rosyjski','hiszpanski'];
        res.status(200).send(list)
    } catch (error) {
        res.status(400).send(errorMessages.createData)
    }
})

router.get('/jobSeeker/getLocalizationList',async(req,res) => {

    try {
        const list = ['dolnosląskie','kujawsko-pomorskie','lubelskie','lubuskie','łódzkie','małopolskie','mazowieckie','opolskie','podkarpackie','podlaskie','pomorskie','śląskie','świętokrzyskie','warmińsko-mazurskie','wielkopolskie','zachodniopomorskie'];
        res.status(200).send(list)
    } catch (error) {
        res.status(400).send(errorMessages.createData)
    }
})

router.get('/jobSeeker/getEducationList',async(req,res) => {

    try {
        const list = ['podstawowe','średnie','wyższe'];
        res.status(200).send(list)
    } catch (error) {
        res.status(400).send(errorMessages.createData)
    }
})



module.exports = router
