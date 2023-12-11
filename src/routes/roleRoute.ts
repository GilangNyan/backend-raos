import express from 'express'
import { getRole, createRole, updateRole, deleteRole } from '../controllers/roleController'
import { checkToken } from '../middlewares/authentication'

const roleRoute = express.Router()

roleRoute.get('/role', checkToken, getRole)
roleRoute.post('/role', checkToken, createRole)
roleRoute.put('/role', checkToken, updateRole)
roleRoute.delete('/role', checkToken, deleteRole)

export default roleRoute