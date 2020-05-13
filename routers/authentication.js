const express = require('express')
const jobSeeker = require('../models/jobSeekerSignup')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { login, password } = req.body
        const user = await jobSeeker.findByCredentials(login, password)
        if (!user) {
            return res.status(401).send({error: 'Niepoprawne dane logowania'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send({error: 'Niepoprawne dane logowania'})
    }

})
module.exports = router
