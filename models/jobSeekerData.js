const mongoose = require('mongoose')
const validator = require('validator')


const jobSeekerDataSchema = mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
    },
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
    language: {
        type: String,
        enum :['angielski','polski','francuski','niemiecki','rosyjski','hiszpanski'],
        default: 'polski'

    },
    localization: {
        type: String,
        enum :['dolnosląskie','kujawsko-pomorskie','lubelskie','lubuskie','łódzkie','małopolskie','mazowieckie','opolskie','podkarpackie','podlaskie','pomorskie','śląskie','świętokrzyskie','warmińsko-mazurskie','wielkopolskie','zachodniopomorskie'],
        default: 'mazowieckie'
    },

    education: {
        type: String,
        enum :['podstawowe','średnie','wyższe'],
        default: 'podstawowe'

    },
    announcements :{
        type : Array,
    }
})





const jobSeekerData = mongoose.model('jobSeekerData', jobSeekerDataSchema)


module.exports = jobSeekerData
