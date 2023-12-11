import httpStatus from 'http-status'
import catchAsync from '../../utils/catAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async function (req, res) {
  const result = await AcademicDepartmentServices.createAcademiDepartmentIntoDb(
    req.body,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department created successfully',
    data: result,
  })
})

const getAllAcademicDepartments = catchAsync(async function (req, res) {
  const result = await AcademicDepartmentServices.getAcademicDepartmentFromDb()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic department fetched successfully',
    data: result,
  })
})

/**  update academic faculty */

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentID } = req.params
  // const { payload } = req.body
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(
      departmentID,
      req.body,
    )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic department updated successfully',
    data: result,
  })
})

const getSingleAcademicDepartment = catchAsync(async function (req, res) {
  const { departmentID } = req.params
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(
      departmentID,
    )
  if (result === null) {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'No such Academic department found!!!',
      data: result,
    })
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Academic Department fetched successfully',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  updateAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
}
