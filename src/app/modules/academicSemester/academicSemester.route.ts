import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import ValidateRequest from '../../middlewares/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'

const router = express.Router()

// create route
router.post(
  '/create-academic-semester',
  ValidateRequest(
    academicSemesterValidation.careateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

export const AcademicSemesterRoutes = router
