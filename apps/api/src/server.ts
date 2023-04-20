import { config } from 'dotenv'
config()
import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import bodyParser from 'body-parser'

//TRPC routes
import { appRouter } from './trpc/appRouter'


const PORT = process.env.PORT || 4001
const app = express()

const AdminURL =
  process.env.NODE_ENV === 'production'
    ? (process.env.ADMIN_URL as string)
    : 'http://localhost:3001'
const ClientURL =
  process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_URL as string)
    : 'http://localhost:3000'

app.use(
  cors({
    origin: [AdminURL, ClientURL],
    credentials: true
  })
)
app.use(helmet())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.get('/hp', (req, res) => {
  res.status(200).send('!working')
})

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter
  })
)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
