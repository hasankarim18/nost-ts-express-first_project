import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.service'
// import { UserValidation } from './user.validation'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body
    //  const zodParsedData = UserValidation.userValidationSchema.parse(userData)

    const result = await UserServices.createStudentIntoDb(password, studentData)
    res.json({
      success: true,
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
