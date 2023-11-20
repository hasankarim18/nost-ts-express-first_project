import express from 'express'
import { studentController } from './student.controller'

const router = express.Router()

// will call controller function
// --  localhost:5000/api/v1/students/create-student --- post call
router.post('/create-student', studentController.createStudent)
router.get('/students', studentController.getAllStudents)
router.get('/:studentId', studentController.getSingleStudent)

export const StudentRoutes = router
