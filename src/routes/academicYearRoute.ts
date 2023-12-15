import express from 'express'
import { checkLogin } from '../middlewares/authentication'
import { createAcademicYear, deleteAcademicYear, getAcademicYear, updateAcademicYear } from '../controllers/academicYearController'

const academicYearRoute = express.Router()

academicYearRoute.get('/academic-year', checkLogin, getAcademicYear)
academicYearRoute.post('/academic-year', checkLogin, createAcademicYear)
academicYearRoute.put('/academic-year', checkLogin, updateAcademicYear)
academicYearRoute.delete('/academic-year', checkLogin, deleteAcademicYear)

export default academicYearRoute