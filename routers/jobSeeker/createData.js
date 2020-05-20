
const express = require('express')
const JobSeeker = require('../../models/jobSeekerData')
const router = express.Router()
const Auth = require('../../middleware/auth')
const errorMessages = require('../../static/errorMessages');
router.post('/jobSeeker/createData',Auth,async(req,res) => {
    // Create job Seeker data
    try {
        const jobSeeker = new JobSeeker(req.body)
        await jobSeeker.save()
        res.status(201).send({ jobSeeker })
    } catch (error) {
        res.status(400).send(errorMessages.createData)
    }
})



module.exports = router
