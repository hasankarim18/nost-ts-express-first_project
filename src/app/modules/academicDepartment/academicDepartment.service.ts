import { ObjectId } from 'mongodb'
import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademiDepartmentIntoDb = async function (
  payload: TAcademicDepartment,
) {
  const result = await AcademicDepartment.create(payload)
  return result
}

const updateAcademicDepartmentIntoDb = async function (
  departmentId: string,
  payload: Partial<TAcademicDepartment>,
) {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    payload,
    {
      new: true,
    },
  )
  return result
}

// get all academic
const getAcademicDepartmentFromDb = async function () {
  const result = await AcademicDepartment.find()
  return result
}
// get single academic
const getSingleAcademicDepartmentFromDb = async function (
  departmentId: string,
) {
  const result = AcademicDepartment.findOne({
    _id: new ObjectId(departmentId),
  })
  return result
}

export const AcademicDepartmentServices = {
  createAcademiDepartmentIntoDb,
  updateAcademicDepartmentIntoDb,
  getAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
}
