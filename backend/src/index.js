import express from 'express'
const app = express()
import connectDB from '../config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'
import apiRouters from './routes/index.js'
import { notFound, errorHandler } from './middlewares/errorHandler.js'
import path from 'path'


app.use(express.json())
const __dirname = path.resolve()

export default class App {
    constructor() {
        this.setConfig()
        this.setupExpress()
        this.connectMongo()
        this.setRoutersAndMiddlewares()
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

    setRoutersAndMiddlewares() {
        app.use(apiRouters)
        app.get('/uploads', express.static(path.join(__dirname, '/uploads')))

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '/frontend/build')))

            app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
        } else {
            app.get('/', (req, res) => {
                res.send('API is running...')
            })
        }

        app.use(notFound)
        app.use(errorHandler)

    }
}