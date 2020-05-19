require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
require('./routers/routers')(app);

const port = process.env.PORT
require('./db/db')

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
