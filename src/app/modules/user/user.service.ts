import config from '../../config'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'
// import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // if password is not given user default password
  userData.password = password || (config.default_password as string)
  // set student role
  userData.role = 'student'
  // manually gererated id
  userData.id = '2030100001'

  // create a user
  const newUser = await User.create(userData)

  // create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id
    studentData.user = newUser._id // reference id
    const newStudent = await Student.create(studentData)
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
