
const express = require('express');
const User = require('../../models/User');
const JobSeekerData = require('../../models/jobSeekerData')
const router = express.Router();

router.post('/registration',async(req,res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router
