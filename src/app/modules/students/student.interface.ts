// import { Schema, model, connect } from 'mongoose'} from 'mongodb'
import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TGuardian = {
  fatherName: string
  fatherOcupation: string
  fatherContact: string
  motherName: string
  motherOcupation: string
  motherContact: string
}

export type TLocalGuardian = {
  name: string
  address: string
  occupation: string
  contact: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  //  password: string
  name: TUserName
  gender: 'male' | 'female' | 'other' // union type literal gender must be either "male" or "female"
  email: string
  phone: string
  bloodGroup?: {
    group: 'A' | 'B' | 'AB' | 'O'
    RH: '+' | '-'
  }
  presentAddress: string
  permanantAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  dateOfBirth?: Date
  admissionSemester: Types.ObjectId
  isDeleted: boolean
}

/** For creating static */

// export interface StudentModel extends Model<TStudent> {
//   isUserExists(id: string): Promise<TStudent | null>
// }

/** For creating instance */
export type StudentMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>
}

export type StudentModel = Model<
  TStudent,
  Record<string, never>,
  StudentMethods
>
