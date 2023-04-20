import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const usernames = ['walter_white', 'jesse_pinkman']
async function main() {
  Promise.all(
    usernames.map(async (username) => {
      try {
        await prisma.user.upsert({
          where: { username },
          update: {},
          create: {
            username
          }
        })
      } catch (error) {
        console.log('user exist')
      }
    })
  )
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
