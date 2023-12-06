import express from 'express'
import { loginUser, registerUser } from '../controllers/userController'
import { generateToken } from '../middlewares/authentication'

const authRoute = express.Router()

authRoute.post('/register', registerUser)
authRoute.post('/login', loginUser, generateToken)

export default authRoute