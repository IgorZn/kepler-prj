const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path')
const morgan = require('morgan')

const { planetsRouter } = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')

const staticFiles = path.join(__dirname, '..', 'public')

// CORS
app.use(cors({
    origin: 'http://localhost:3000',
}))
// Logging
app.use(morgan('combined'))

app.use(express.json())

// Routes
app.use('/planets', planetsRouter)
app.use('/launches', launchesRouter)

// Core route
// app.get('/*', ((req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
// }))

// Static files
app.use(express.static(staticFiles))

module.exports = app;