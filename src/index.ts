import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { databaseConnection } from './config/database'

dotenv.config()

const StartServer = async () => {

    const app = express()
    const port = process.env.PORT || 3000

    await databaseConnection()

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cors())

    app.listen(port, () => {
        console.log(`Server berjalan di port ${port}`)
    }).on('error', err => {
        console.log(err)
        process.exit()
    })
}

StartServer()