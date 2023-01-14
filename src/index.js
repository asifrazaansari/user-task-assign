require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./routes/route')


app.use(express.json())

const PORT = process.env.PORT || 8000
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL)
    .then(() => console.log("MongoDb is connected"))
    .catch((error) => console.log(error))


app.use('/', route)

app.listen(PORT, () => console.log('Express is running on port' + PORT))