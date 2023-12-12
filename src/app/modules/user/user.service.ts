import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../students/student.interface'
import { Student } from '../students/student.model'
import { TUser } from './user.interface'
// import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.util'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

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

  /** Transaction and rollback */
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    if (admissionSemester !== null) {
      userData.id = await generateStudentId(admissionSemester)
    }

    // create a user(transaction-1)
    const newUser = await User.create([userData], { session }) // array

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id // reference id

    // create a student(transaction-2)
    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // transaction successful
    await session.commitTransaction()
    await session.endSession()
    // returning the result
    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student.')
  }
}

export const UserServices = {
  createStudentIntoDb,
}
