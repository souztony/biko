import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { JobService } from './job.service.js'

const jobService = new JobService()

export const createJobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10)
})

export class JobController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = createJobSchema.parse(request.body)
    const userId = request.user.sub

    try {
      const job = await jobService.create({ title, description, userId })
      return reply.status(201).send(job)
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const jobs = await jobService.listAll()
      return reply.status(200).send(jobs)
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
