import express from 'express'
import { registerUser } from '../controllers/userController'

const authRoute = express.Router()

authRoute.post('/user', registerUser)

export default authRoute