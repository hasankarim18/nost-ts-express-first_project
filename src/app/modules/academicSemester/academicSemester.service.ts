import {
  TAcademicSemester,
  TacademicSemesterNameCodeMapper,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

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

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
}
