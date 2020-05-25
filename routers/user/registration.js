
const express = require('express');
const User = require('../../models/User');
const JobSeekerData = require('../../models/jobSeekerData')
const router = express.Router();
const multer = require('multer');
const fs = require('fs-extra')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

router.post('/registration',upload.single('img'),async(req,res) => {
    try {
    // Create a new user
    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    var finalImg = {
        contentType: req.file.mimetype,
        data:  new Buffer(encode_image, 'base64')
    };
        var data = JSON.parse(req.body.data);
        const user = new User(data)
        user.img.data = finalImg.data;
        user.img.contentType = finalImg.contentType;
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router
