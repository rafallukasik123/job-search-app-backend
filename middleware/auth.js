const jwt = require('jsonwebtoken')
const User = require('../models/User')
const errorMessage = require('../static/errorMessages')
const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findOne({ _id: data._id, 'tokens.token': token, login : req.body.login })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send(errorMessage.notAuthorized)
    }

}
module.exports = auth
