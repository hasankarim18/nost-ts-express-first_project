/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSources } from '../interface/error'
import config from '../config'
import { handleZodError } from '../errors/handleZodError'
import { handleValidationError } from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //### setting default values start
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong!!!'

  // array of object
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!!!',
    },
  ]
  //### setting default value ends

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
    // console.log(simplifiedError)
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSouces: errorSources,
    err,
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
