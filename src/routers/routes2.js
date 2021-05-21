import {Router} from 'express'
import authController from './authController2'


const routes = Router()

routes.post('/register', authController.register)
routes.post('/authenticate', authController.authenticate)


export default routes