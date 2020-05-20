
const express = require('express')
const Employer = require('../../models/employerData')
const router = express.Router()
const Auth = require('../../middleware/auth')
const errorMessages = require('../../static/errorMessages');
router.post('/employer/createData',Auth,async(req,res) => {
    // Create employer data
    try {
        const employer = new Employer(req.body)
        await employer.save()
        res.status(201).send({ employer })
    } catch (error) {
        res.status(400).send(errorMessages.createData)
    }
})
module.exports = router
