import express from 'express';
import authRoute from './authRoute';
import roleRoute from './roleRoute';
import configRoute from './configRoute';

export const routes = express.Router()

routes.use(authRoute)
routes.use(configRoute)
routes.use(roleRoute)