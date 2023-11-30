import { RequestHandler } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

// import { UserValidation } from './user.validation'

/**
 * This is the old fashined way ofhandling request I can use catchAsync here but for demonestration purpose it has been omited.
 */
const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body
    //  const zodParsedData = UserValidation.userValidationSchema.parse(userData)

    const result = await UserServices.createStudentIntoDb(password, studentData)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error) {
    // res.status(400).send({})
    next(error)
  }
}

export const UserController = {
  createStudent,
}
