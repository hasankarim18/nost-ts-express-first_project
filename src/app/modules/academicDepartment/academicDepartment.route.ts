import express from 'express'
import ValidateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-academic-department',
  ValidateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)
// update
router.patch(
  '/:departmentID',
  ValidateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
)

// get all

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments)
router.get(
  '/:departmentID',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
