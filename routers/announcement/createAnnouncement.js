
const express = require('express')
//const Announcement = require('../../models/announcement')
const JobSeekerData = require('../../models/jobSeekerData')
const router = express.Router()
const Auth = require('../../middleware/auth')
const errorMessages = require('../../static/errorMessages');
router.post('/announcement/create',Auth,async(req,res) => {

    try {
        const announcement = {
            id : new Date().toISOString() + Math.random(),
            creationDate : new Date().toJSON().slice(0,10),
            title : req.body.title,
            description : req.body.description,
            typeOfJob : req.body.typeOfJob,
            typeOfContract : req.body.typeOfContract,
            localization : req.body.localization

        }



        JobSeekerData.findOneAndUpdate(
            { login: req.body.login },
            { $push: { announcements: announcement  } },
            function (error, success) {
                if (error) {
                    console.log("succes");
                } else {
               throw error();
                }
            })
        res.status(201).send({ announcement })
    } catch (error) {
        res.status(400).send(errorMessages.createAnnouncement)
    }
})
module.exports = router
