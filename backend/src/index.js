import express from 'express'
const app = express()
import connectDB from '../config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import apiRouters from './routes/index.js'

app.use(express.json())

export default class App {
    constructor() {
        this.setConfig()
        this.setupExpress()
        this.connectMongo()
        this.setRouters()
    }

    connectMongo() {
        connectDB()
    }

    setupExpress() {
        const PORT = process.env.PORT || 5000
        app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))
    }

    setConfig() {
        app.enable('trust proxy')
        dotenv.config()
    }

    setRouters() {
        app.use(apiRouters)
    }
}