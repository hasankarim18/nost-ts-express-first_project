import { Router } from 'express'
import { StudentRoutes } from '../modules/students/student.route'
import { UserRoutes } from '../modules/user/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'

const router = Router()

const modulesRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
]

// router.use('/students', StudentRoutes)
// router.use('/users', UserRoutes)

modulesRoutes.forEach(route => router.use(route.path, route.route))

export default router
