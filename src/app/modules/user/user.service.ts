import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'
// import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.util'

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // if password is not given user default password
  userData.password = password || (config.default_password as string)
  // set student role
  userData.role = 'student'
  // manually gererated id
  // auto generate id of student
  // year, semester, 4 digit number

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  // condition check is required
  if (admissionSemester !== null) {
    userData.id = await generateStudentId(admissionSemester)
  }

  // create a user

  const newUser = await User.create(userData)

  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id
    payload.user = newUser._id // reference id
    const newStudent = await Student.create(payload)
    return newStudent
  }
  /** this is writting operation into two separate collection in a single route hit.
   * So transition and rollback will be needed.
   * Transition and rollback will be provided next
   *
   */
}

export const UserServices = {
  createStudentIntoDb,
}
