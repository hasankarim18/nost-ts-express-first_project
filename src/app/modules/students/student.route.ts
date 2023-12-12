import express from 'express'
import { studentController } from './student.controller'
import ValidateRequest from '../../middlewares/validateRequest'
import { updateStudentValidationSchema } from './student.zod.validation'

const router = express.Router()

// will call controller function

router.get('/', studentController.getAllStudents)
router.get('/:studentId', studentController.getSingleStudent)
router.delete('/:studentId', studentController.deleteStudent)
router.patch(
  '/:studentId',
  ValidateRequest(updateStudentValidationSchema),
  studentController.updateStudent,
)

export const StudentRoutes = router
