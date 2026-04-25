import { FastifyInstance } from 'fastify'
import { PostController } from './post.controller.js'
import { verifyJWT } from '../../middlewares/auth.js'

const postController = new PostController()

export async function postRoutes(app: FastifyInstance) {
  app.get('/posts', postController.list)
  
  app.post('/posts', { onRequest: [verifyJWT] }, postController.create)
}
