import express from 'express'
import { createRole } from '../controllers/roleController'

const roleRoute = express.Router()

roleRoute.post('/role', createRole)

export default roleRoute