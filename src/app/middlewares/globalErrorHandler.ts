/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSouce } from '../interface/error'
import config from '../config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //### setting default values start
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong!!!'

  // array of object
  let errorSouces: TErrorSouce = [
    {
      path: '',
      message: 'Something went wrong!!!',
    },
  ]
  //### setting default value ends

  const handleZodError = (err: ZodError) => {
    const errorSouces: TErrorSouce = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      }
    })
    statusCode = 400
    // message = 'ami zod error'

    return {
      statusCode,
      message: 'Common Validation Error.',
      errorSouces,
    }
  }

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSouces = simplifiedError?.errorSouces
    // console.log(simplifiedError)
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSouces,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
  // next()
}

export default globalErrorHandler

// pattern

/*
  success
  message
  errorSouces:[
    path:'',
    message:''
  ],
  stack:
*/
