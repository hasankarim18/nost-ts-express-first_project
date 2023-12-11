import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()
  // 2030   03   0001
  return lastStudent?.id ? lastStudent.id : undefined
}

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time
  let currentId = (0).toString()

  const lastStudentId = await findLastStudentId()
  // 2030 01 0001
  const lastStudentYear = lastStudentId?.substring(0, 4) // 2030
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) //01
  // const lastStudentRoll = lastStudentId?.substring(6, 10) // 0001
  const currentSemesterCode = payload.code
  const currentYear = payload.year

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6) // 0001
  }

  let incrementId = (parseInt(currentId, 10) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
