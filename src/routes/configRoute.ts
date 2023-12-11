import express from 'express'
import { createConfig, getConfig, updateConfig } from '../controllers/configController'
import { checkToken } from '../middlewares/authentication'

const configRoute = express.Router()

configRoute.get('/config', checkToken, getConfig)
configRoute.post('/config', checkToken, createConfig)
configRoute.put('/config', checkToken, updateConfig)

export default configRoute