const loginRouter = require('./user/login')
const registrationRouter = require('./user/registration')
const jobSeekerCreateData = require('./jobSeeker/jobSeeker/createData')
module.exports = function(app) {
    app.use(loginRouter);
    app.use(registrationRouter);
    app.use(jobSeekerCreateData);
};
