require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const teamsRoutes = require('./routes/teams')
const userRoutes = require('./routes/user')

const app = express()

app.use(cors({
    origin: "https://enchanting-shortbread-13fe9b.netlify.app"
}))
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/teams', teamsRoutes)
app.use('/api/user', userRoutes)

const PORT = 4000
mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`connected to database and listening on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })