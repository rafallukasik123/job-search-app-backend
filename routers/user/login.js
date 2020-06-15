

const express = require('express')
const User = require('../../models/User')
const router = express.Router()
const errorMessage = require('../../static/errorMessages')
router.post('/user/login',async(req,res) => {
    // Create a new user
    try {
        const {login,password} = req.body
        const user = await User.findByCredentials(login,password);
        if (!user) {
            return res.status(401).send(errorMessage.invalidLoginCredentials)
        }
        const token = await user.generateAuthToken()
        let {role} = user;
        res.send({login,password,role,token})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router
