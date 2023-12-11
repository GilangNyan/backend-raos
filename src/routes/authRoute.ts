import express from 'express'
import { loginUser, registerUser } from '../controllers/authController'
import { checkLogin } from '../middlewares/authentication'

const authRoute = express.Router()

authRoute.post('/register', registerUser)
authRoute.post('/login', checkLogin, loginUser)

export default authRoute