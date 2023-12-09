import {
  TAcademicSemester,
  TacademicSemesterNameCodeMapper,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'
import { ObjectId } from 'mongodb'

// create semester into db
const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  }
  // academicSemesterNameCodeMapper['Fall'] !== '03'
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemester.create(payload)

  return result
}

/** get all semeste */
const getAllSemester = async () => {
  const result = await AcademicSemester.find()

  return result
}

/** get a single semester */
const getSigleAcademicSemester = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({
    _id: new ObjectId(semesterId), // Convert the string id to ObjectId
  })

  return result
}

/** update academicSemesters */

const updateAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  }
  // academicSemesterNameCodeMapper['Fall'] !== '03'
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code')
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getSigleAcademicSemester,
  getAllSemester,
  updateAcademicSemester,
}
