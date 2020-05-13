const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jobSeekerSingupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    localization: {
        type: String,
       enum :['dolnosląskie','kujawsko-pomorskie','lubelskie','lubuskie','łódzkie','małopolskie','mazowieckie','opolskie','podkarpackie','podlaskie','pomorskie','śląskie','świętokrzyskie','warmińsko-mazurskie','wielkopolskie','zachodniopomorskie'],
        default: 'mazowieckie'
    },
    language: {
        type: String,
        enum :['angielski','polski','francuski','niemiecki','rosyjski','hiszpanski'],
        default: 'polski'

    },
    education: {
        type: String,
        enum :['podstawowe','średnie','wyższe'],
        default: 'podstawowe'

    },
    role: {
        type: String,
        enum :['jobSeeker','employer'],
        default: 'jobSeeker'

    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

jobSeekerSingupSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
jobSeekerSingupSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
jobSeekerSingupSchema.statics.findByCredentials = async (login, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ login} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}


const User = mongoose.model('jobSeeker', jobSeekerSingupSchema)

module.exports = User
