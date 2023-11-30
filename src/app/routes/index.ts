import { Router } from 'express'
import { StudentRoutes } from '../modules/students/student.route'
import { UserRoutes } from '../modules/user/user.route'

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
]

// router.use('/students', StudentRoutes)
// router.use('/users', UserRoutes)

modulesRoutes.forEach(route => router.use(route.path, route.route))

export default router
