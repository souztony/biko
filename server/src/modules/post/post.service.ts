import { prisma } from '../../lib/prisma.js'

export interface CreatePostInput {
  content: string
  userId: string
}

export class PostService {
  async create(data: CreatePostInput) {
    return await prisma.post.create({
      data
    })
  }

  async listAll() {
    return await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }
}
