import { FastifyInstance } from 'fastify'
import { UserController } from './user.controller.js'
import { verifyJWT } from '../../middlewares/auth.js'

const userController = new UserController()

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', userController.register)
  app.post('/login', userController.login)
  app.get('/users/:id', userController.profile)
  app.put('/users/:id', { onRequest: [verifyJWT] }, userController.update)
}
