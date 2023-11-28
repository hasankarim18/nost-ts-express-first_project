/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/students/student.route'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

/*****
 * Application Routes
 */

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/', StudentRoutes)
app.use('/api/v1/users', UserRoutes)

const getHelloController = (req: Request, res: Response) => {
  // const a = 1

  res.send({
    message: 'Hello world, how are you',
  })
}

app.get('/', getHelloController)

app.use(globalErrorHandler)

export default app
