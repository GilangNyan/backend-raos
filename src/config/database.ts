import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

const db = process.env.DB_NAME || 'db_raos'
const user = process.env.DB_USER || 'postgres'
const password = process.env.DB_PASSWORD || ''

export const sequelize = new Sequelize(db, user, password, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
})

export async function testConnection(): Promise<void> {
    try {
        await sequelize.authenticate()
        console.log("Database terkoneksi!")
    } catch (error) {
        console.log("Database belum terkoneksi:", error)
    }
}