import express from 'express'
import { AcademicFacultyControllers } from './academicFaculty.controller'
import ValidateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  ValidateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
)
// update
router.patch(
  '/:facultId',
  ValidateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
)

// get all

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties)
router.get('/:facultId', AcademicFacultyControllers.getSingleAcademicFaculty)

export const AcademicFacultyRoutes = router
