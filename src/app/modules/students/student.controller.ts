import { studentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catAsync'

// writting a higher order asynchronous code for try catch

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await studentServices.getSingleStudentFromDb(studentId)

  //  console.log(result)
  if (
    result === null ||
    undefined
    // || result.length === 0
  ) {
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
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const getAllStudents = catchAsync(async (req, res) => {
  // console.log(req.query)
  const result = await studentServices.getAllStudentsFromDb(req.query)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Student found Successfully',
    data: result,
  })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await studentServices.deleteSingleStudentFromDb(studentId)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student delete Successfully',
    data: result,
  })
})
/**
 *
 * update student
 */
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const { student } = req.body
  const result = await studentServices.updateStudentIntoDb(studentId, student)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student updated Successfully',
    data: result,
  })
})

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
