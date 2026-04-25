import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { userRoutes } from './modules/user/user.routes.js'
import { postRoutes } from './modules/post/post.routes.js'
import { jobRoutes } from './modules/job/job.routes.js'

const app = Fastify({
  logger: true
})

app.register(cors, {
  origin: true
})

app.register(jwt, {
  secret: process.env.JWT_SECRET || 'biko-secret-key-12345'
})

app.register(userRoutes, { prefix: '/auth' })
app.register(postRoutes)
app.register(jobRoutes)

app.get('/', async () => {
  return { message: 'Biko API 🚀' }
})

import { ZodError } from 'zod'

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format()
    })
  }

  reply.status(500).send({ message: 'Internal server error' })
})

const start = async () => {
  try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Server is running on http://localhost:3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()