import { prisma } from '../../lib/prisma.js'
import bcrypt from 'bcrypt'
import { CreateUserInput, LoginUserInput } from './user.controller.js'

export class UserService {
  async register(data: CreateUserInput) {
    const { name, email, password } = data

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async login(data: LoginUserInput) {
    const { email, password } = data

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
        jobs: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async updateUser(id: string, data: { name?: string; bio?: string; avatar?: string }) {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      throw new Error('User not found')
    }

    const updated = await prisma.user.update({
      where: { id },
      data
    })

    const { password: _, ...userWithoutPassword } = updated
    return userWithoutPassword
  }
}
