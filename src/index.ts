import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sequelize, testConnection } from './config/database'
import { routes } from './routes'
import bodyParser from 'body-parser'

dotenv.config()

const StartServer = async () => {

    const app = express()
    const port = process.env.PORT || 3000

    await testConnection()

    app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    app.use(cors())

    // Routes
    app.use('/', routes)

    // Sync Database
    sequelize.sync()

    app.listen(port, () => {
        console.log(`Server berjalan di port ${port}`)
    }).on('error', err => {
        console.log(err)
        process.exit()
    })
}

StartServer()