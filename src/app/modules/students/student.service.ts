import { TStudent } from './student.interface'
import { Student } from './student.model'

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
  return result
}

// get single student

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id: id })
  const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}
const deleteSingleStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id: id }, { isDeleted: true })
  return result
}

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteSingleStudentFromDb,
}
