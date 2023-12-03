import { AnyZodObject } from 'zod'
import { NextFunction, Request, Response } from 'express'

const validateStudentCreanteRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // if everything is okay call next()
      await schema.parseAsync({
        body: req.body,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }
}

export const ValidateRequest = {
  validateStudentCreanteRequest,
}
