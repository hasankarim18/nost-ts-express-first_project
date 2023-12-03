import express from 'express'
import { UserController } from './user.controller'
import { StudentValidation } from '../students/student.zod.validation'
import { ValidateRequest } from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-users',
  ValidateRequest.validateStudentCreanteRequest(
    StudentValidation.createStudentValidationSchema,
  ),
  UserController.createStudent,
)

export const UserRoutes = router
