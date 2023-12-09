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

// get all semester

const getAllSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemester()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Semester Found Successfully',
    data: result,
  })
})

// get a single semester

const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params

  const result =
    await AcademicSemesterServices.getSigleAcademicSemester(semesterId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Acadeic Semester Found Successfully',
    data: result,
  })
})

/** find one and update */
const updateAcademicSemester = catchAsync(async (req, res) => {
  // console.log(req.body)
  const { semesterId } = req.params
  const result = await AcademicSemesterServices.updateAcademicSemester(
    semesterId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Acadeic Semester Updated Successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getSingleSemester,
  getAllSemester,
  updateAcademicSemester,
}
