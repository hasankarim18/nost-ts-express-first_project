import { NextFunction, Request, Response } from 'express'
import { studentServices } from './student.service'
// import studentValidationSchema from './student.zod.validation'

// get single student

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const result = await studentServices.getSingleStudentFromDb(studentId)
    //  console.log(result)
    if (result === null || undefined) {
      res.status(404).send({
        success: false,
        message: 'Student Not Existed',
        data: result,
      })
    }

    res.status(200).send({
      success: true,
      message: 'Student Find Successfully',
      data: result,
      dataType: typeof result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getAllStudentsFromDb()
    res.status(200).send({
      success: true,
      message: 'Student Find Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const result = await studentServices.deleteSingleStudentFromDb(studentId)
    res.status(200).send({
      success: true,
      message: 'Student delete Successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
