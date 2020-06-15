require('dotenv').config()
const express = require('express')
const app = express()
const setHeaders = require('./middleware/headers');
app.use(express.json())

app.use(setHeaders);
require('./routers/routers')(app);
const port = process.env.PORT
require('./db/db')

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
