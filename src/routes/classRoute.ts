import express from 'express'
import { checkLogin } from '../middlewares/authentication'
import { createGrade, deleteGrade, getGrade, updateGrade } from '../controllers/gradeController'

const classRoute = express.Router()

classRoute.get('/class', checkLogin, getGrade)
classRoute.post('/class', checkLogin, createGrade)
classRoute.put('/class', checkLogin, updateGrade)
classRoute.delete('/class', checkLogin, deleteGrade)

export default classRoute