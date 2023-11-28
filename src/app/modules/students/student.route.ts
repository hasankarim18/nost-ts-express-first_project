import express from 'express'
import { studentController } from './student.controller'

const router = express.Router()

// will call controller function

router.get('/students', studentController.getAllStudents)
router.get('/:studentId', studentController.getSingleStudent)
router.delete('/:studentId', studentController.deleteStudent)

export const StudentRoutes = router
