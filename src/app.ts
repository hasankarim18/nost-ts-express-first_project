import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoutes } from './app/modules/students/student.route'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

/*****
 * Application Routes
 */

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/', StudentRoutes)

const getHelloController = (req: Request, res: Response) => {
  // const a = 1

  res.send({
    message: 'Hello world, how are you',
  })
}

app.get('/', getHelloController)

export default app
