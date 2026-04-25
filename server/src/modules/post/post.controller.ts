import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PostService } from './post.service.js'

const postService = new PostService()

export const createPostSchema = z.object({
  content: z.string().min(1)
})

export class PostController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { content } = createPostSchema.parse(request.body)
    const userId = request.user.sub

    try {
      const post = await postService.create({ content, userId })
      return reply.status(201).send(post)
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const posts = await postService.listAll()
      return reply.status(200).send(posts)
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
