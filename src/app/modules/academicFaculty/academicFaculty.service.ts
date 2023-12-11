import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
import { ObjectId } from 'mongodb'

const createAcademicFacultyIntoDb = async function (payload: TAcademicFaculty) {
  const result = await AcademicFaculty.create(payload)
  return result
}

const updateAcademicFacultyIntoDb = async function (
  facultId: string,
  payload: Partial<TAcademicFaculty>,
) {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: facultId },
    payload,
    {
      new: true,
    },
  )
  return result
}

// get all academic
const getAcademicFacultiesFromDb = async function () {
  const result = await AcademicFaculty.find()
  return result
}
// get single academic
const getSingleAcademicFacultyFromDb = async function (facultId: string) {
  const result = AcademicFaculty.findOne({
    _id: new ObjectId(facultId),
  })
  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDb,
  updateAcademicFacultyIntoDb,
  getAcademicFacultiesFromDb,
  getSingleAcademicFacultyFromDb,
}
