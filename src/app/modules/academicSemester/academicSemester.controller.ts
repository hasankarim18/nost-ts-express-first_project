import httpStatus from 'http-status'
import catchAsync from '../../utils/catAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  // console.log(req.body)
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Acadeic Semester Created Successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
}
