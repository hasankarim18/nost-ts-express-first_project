import mongoose from 'mongoose'
import { TStudent } from './student.interface'
import { Student } from './student.model'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSearchableField } from './student.constant'

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

/**
 *
 *  get all students done with raw method it is save only for educational purpoe
 *
 *   */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const getAllStudentsFromDbRaw = async (query: Record<string, unknown>) => {
  const queryObj = { ...query } // copy of query
  const studentSearchableField: string[] = [
    'email',
    'name.firstName',
    'presentAddress',
  ]
  // {email:{ $regex: query.searchTerm, $options: i }}
  // {presentAddress:{ $regex: query.searchTerm, $options: i }}
  // {name.firstName:{ $regex: query.searchTerm, $options: i }}

  // if searchTerm is not provided
  let searchTerms = ''

  /** if searchTerm is provided */
  if (query?.searchTerms) {
    searchTerms = query?.searchTerms as string
  }

  const searchQuery = Student.find({
    $or: studentSearchableField.map(field => ({
      [field]: { $regex: searchTerms, $options: 'i' },
    })),
  })

  // filtering
  const excludeFields = ['searchTerms', 'sort', 'limit', 'page', 'fields']
  excludeFields.forEach(el => delete queryObj[el])

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  let sort = '-createdAt'

  if (query.sort) {
    sort = query.sort as string
  }

  const sortQuery = filterQuery.sort(sort)
  let page = 1
  let limit = 100
  let skip = 0

  if (query.limit) {
    limit = Number(query.limit) as number
  }

  if (query.page) {
    page = Number(query.page)
    skip = (page - 1) * limit
  }

  const paginateQuery = sortQuery.skip(skip)

  const limitQuery = paginateQuery.limit(limit)

  // fieldLimiting

  let fields = '-__v'
  // fields: 'name,email' -----> 'name email'
  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ')
  }

  const fieldQuery = await limitQuery.select(fields)

  return fieldQuery
}

/**
 * Query using queryBuilder
 */
const getAllStudentsFromDb = async (query: Record<string, unknown>) => {
  // {email:{ $regex: query.searchTerm, $options: i }}
  // {presentAddress:{ $regex: query.searchTerm, $options: i }}
  // {name.firstName:{ $regex: query.searchTerm, $options: i }}

  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery

  return result

  // end
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
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Student creating failed')
  }
}

/**
 * Update students
 */

const updateStudentIntoDb = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }
  /*
  gurdian: {
    fatherOcupation:"Teacher"
  }

  gurdian.fatherOcupation = Teacher
  name.firstName = 'Mezba'
  name.l
  
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }
  //console.log(modifiedUpdatedData)

  const result = await Student.findOneAndUpdate(
    { id: studentId },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
  updateStudentIntoDb,
}
