require('dotenv').config()
const express = require('express')
const userRouter = require('./routers/user')
const jobSeeker = require('./routers/jobSeekerSignup')
const authentication = require('./routers/authentication')
const port = process.env.PORT
require('./db/db')
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(jobSeeker)
app.use(authentication)
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
