import { FastifyInstance } from 'fastify'
import { JobController } from './job.controller.js'
import { verifyJWT } from '../../middlewares/auth.js'

const jobController = new JobController()

export async function jobRoutes(app: FastifyInstance) {
  app.get('/jobs', jobController.list)
  
  app.post('/jobs', { onRequest: [verifyJWT] }, jobController.create)
}
