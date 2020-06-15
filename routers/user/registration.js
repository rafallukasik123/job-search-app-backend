
const express = require('express');
const User = require('../../models/User');
const JobSeekerData = require('../../models/jobSeekerData')
const router = express.Router();


router.post('/user/registration',async(req,res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send()
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router
