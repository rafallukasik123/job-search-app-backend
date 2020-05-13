
const express = require('express')
const jobSeeker = require('../models/jobSeekerSignup')
const router = express.Router()

router.post('/jobSeekerSignup', async (req, res) => {
    // Create a new user
    try {
        const user = new jobSeeker(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router
