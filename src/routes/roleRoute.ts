import express from 'express'
import { getRole, createRole, updateRole, deleteRole } from '../controllers/roleController'

const roleRoute = express.Router()

roleRoute.get('/role', getRole)
roleRoute.post('/role', createRole)
roleRoute.put('/role', updateRole)
roleRoute.delete('/role', deleteRole)

export default roleRoute