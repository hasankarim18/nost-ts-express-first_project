/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/students/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

/*****
 * Application Routes
 */

// app.use('/api/v1/students', StudentRoutes)
// app.use('/api/v1/users', UserRoutes)

app.use('/api/v1', router)
// app.use('/api/v1/', UserRoutes)
// app.use('/api/v1/', StudentRoutes)

const test = async (req: Request, res: Response) => {
  // Promise.reject()
  res.send('Hello Ph university test')
}

const getHelloController = (req: Request, res: Response) => {
  // const a = 1

  res.send({
    message: 'Hello world, how are you',
  })
}

app.get('/', test)

app.use(globalErrorHandler)
// not found
app.use(notFound)

export default app
