import express from 'express';
import authRoute from './authRoute';
import roleRoute from './roleRoute';
import configRoute from './configRoute';
import classRoute from './classRoute';
import academicYearRoute from './academicYearRoute';
import studentRoute from './studentRoute';

export const routes = express.Router()

routes.use(authRoute)
routes.use(configRoute)
routes.use(roleRoute)
routes.use(studentRoute)
routes.use(classRoute)
routes.use(academicYearRoute)