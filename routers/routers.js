

const loginRouter = require('./user/login')
const registrationRouter = require('./user/registration')
const jobSeekerCreateData = require('./jobSeeker/createData')
const employerCreateData  = require('./employer/createData')
const announcementCreate  = require('./announcement/createAnnouncement')
const getBasicData  = require('./jobSeeker/getBasicData')
module.exports = function(app) {
    app.use(loginRouter);
    app.use(registrationRouter);
    app.use(jobSeekerCreateData);
    app.use(employerCreateData);
    app.use(announcementCreate);
    app.use(getBasicData);

};



