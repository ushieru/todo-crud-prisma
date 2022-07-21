import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (name: string, description: string) => {
    return await prisma.task.create({
        data: { name, description }
    })
}

export const readTasks = async () => {
    return await prisma.task.findMany()
}

export const readOneTask = async (id: string) => {
    return await prisma.task.findUnique({ where: { id } })
}

export const updateTask = async (id: string, name: string, description: string) => {
    return await prisma.task.update({
        data: { name, description },
        where: { id }
    })
}

export const deleteTask = async (id: string) => {
    return await prisma.task.delete({ where: { id } })
}