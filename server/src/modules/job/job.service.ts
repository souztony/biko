import { prisma } from '../../lib/prisma.js'

export interface CreateJobInput {
  title: string
  description: string
  userId: string
}

export class JobService {
  async create(data: CreateJobInput) {
    return await prisma.job.create({
      data
    })
  }

  async listAll() {
    return await prisma.job.findMany({
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
