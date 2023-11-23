import { Request, Response } from 'express'
import { studentServices } from './student.service'
import studentValidationSchema from './student.zod.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using joi

    // send response

    /**   // data validation using Joi
    const { error, value } = studentValidationSchema.validate(studentData)
    if (error) {
      res.status(400).json({
        success: false,
        message: 'somthing went wrong in joi',
        error: error.details,
      })
    }
    // validate using joi ends **/

    // will call service to functin to send this dataa

    /******************creating schema validation using zod *********************************/

    const { student: studentData } = req.body
    const zodParseData = studentValidationSchema.parse(studentData)

    const result = await studentServices.createStudentIntoDb(zodParseData)

    // response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error) {
    // console.log(error)
    // const { message } = error
    if (error instanceof Error) {
      const { message } = error
      res.status(400).json({
        success: false,
        message: ` ${message}}}`,
      })
    }
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDb()
    res.status(200).send({
      success: true,
      message: 'Student Find Successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch student data',
    })
  }
}

// get single student

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await studentServices.getSingleStudentFromDb(studentId)
    res.status(200).send({
      success: true,
      message: 'Student Find Successfully',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to fetch student data',
    })
  }
}

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
