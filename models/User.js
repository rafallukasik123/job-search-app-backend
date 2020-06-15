

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorMessages = require('../static/errorMessages')
const userSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    role: {
        type: String,
        enum :['jobSeeker','employer']

    },
    token: {
        type: String
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Niepoprawny adres email.'})
            }
        }
    }

})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.token = token
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (login, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ login} )
    if (!user) {
        throw new Error(errorMessages.invalidLoginCredentials)
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error(errorMessages.invalidLoginCredentials)
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
