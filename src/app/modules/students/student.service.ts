import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import httpStatus from 'http-status'

const createStudentIntoDb = async (studentData: TStudent) => {
  // if (await Student.isUserExists(studentData.id)) {
  //   throw new Error(`Students already exists at id:  ${studentData.id}`)
  // }

  // same can be done by instance
  // const student = new Student(studentData)

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!')
  // }

  // const result = await student.save() // built in instance method provided by mongoose

  const result = await Student.create(studentData) // built in static method

  return result
}

// get all students
const getAllStudentsFromDb = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

// get single student

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id: id })
  const result = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

/** delete student from db */
const deleteSingleStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
}
