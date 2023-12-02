import express, { NextFunction, Request, Response } from 'express'
import { UserController } from './user.controller'

const router = express.Router()

const middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(' I am a middleware')
  next()
}

router.post('/create-users', middleware, UserController.createStudent)

export const UserRoutes = router
