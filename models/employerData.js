const mongoose = require('mongoose')
const validator = require('validator')

const employerDataSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
const employerData = mongoose.model('employerData', employerDataSchema)


module.exports = employerData
