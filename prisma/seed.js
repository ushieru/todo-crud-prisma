const { PrismaClient } = require('@prisma/client')
const data = require('./data.json')

const prisma = new PrismaClient()

const main = async () => {
    for (const { name, description } of data) {
        await prisma.task.create({
            data: { name, description }
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })