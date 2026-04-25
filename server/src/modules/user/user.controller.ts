import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserService } from './user.service.js'

const userService = new UserService()

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
})

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  bio: z.string().max(300).optional(),
  avatar: z.string().url().optional()
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>

export class UserController {
  async register(request: FastifyRequest, reply: FastifyReply) {
    const body = createUserSchema.parse(request.body)

    try {
      const user = await userService.register(body)
      return reply.status(201).send(user)
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = loginUserSchema.parse(request.body)

    try {
      const user = await userService.login(body)
      const token = await reply.jwtSign({
        sub: user.id,
        name: user.name
      })

      return reply.status(200).send({ user, token })
    } catch (error: any) {
      return reply.status(401).send({ message: error.message })
    }
  }

  async profile(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    try {
      const user = await userService.getUserById(id)
      return reply.status(200).send(user)
    } catch (error: any) {
      return reply.status(404).send({ message: error.message })
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const requestUserId = request.user.sub

    if (id !== requestUserId) {
      return reply.status(403).send({ message: 'Forbidden: cannot update another user' })
    }

    const body = updateUserSchema.parse(request.body)

    try {
      const user = await userService.updateUser(id, body)
      return reply.status(200).send(user)
    } catch (error: any) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
