import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'

/***************************
 *  Schema and model
 *
 */

/*************
 *  Schema
 *
 */

const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOcupation: { type: String, required: true },
  fatherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOcupation: { type: String, required: true },
  motherContact: { type: String, required: true },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  address: { type: String },
  occupation: { type: String },
  contact: { type: String },
})

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bloodGroup: {
    group: ['A', 'B', 'AB', 'O'],
    RH: ['+', '-'],
  },
  presentAddress: String,
  permanantAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'inactive'],
})

/*******************************
 *
 * Creating Model
 *
 * ******************************
 */

export const StudentModel = model<Student>('Student', studentSchema)
