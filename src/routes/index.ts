import express from 'express';
import authRoute from './authRoute';
import roleRoute from './roleRoute';

export const routes = express.Router()

routes.use(authRoute)
routes.use(roleRoute)