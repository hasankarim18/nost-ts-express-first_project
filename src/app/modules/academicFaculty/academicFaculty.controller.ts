import httpStatus from 'http-status'
import catchAsync from '../../utils/catAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async function (req, res) {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(
    req.body,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})

const getAllAcademicFaculties = catchAsync(async function (req, res) {
  const result = await AcademicFacultyServices.getAcademicFacultiesFromDb()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty fetched successfully',
    data: result,
  })
})

/**  update academic faculty */

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultId } = req.params
  // const { payload } = req.body
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
    facultId,
    req.body,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty updated successfully',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(async function (req, res) {
  const { facultId } = req.params
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultId)
  if (result === null) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'No such Academic Faculty found!!!',
      data: result,
    })
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Academic Faculty fetched successfully',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
