import express from 'express'
import { checkLogin } from '../middlewares/authentication'
import { getStudent } from '../controllers/studentController'

const studentRoute = express.Router()

studentRoute.get('/student', checkLogin, getStudent)

export default studentRoute