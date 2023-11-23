import { Schema, model } from 'mongoose'
import { Guardian, LocalGuardian, Student, UserName } from './student.interface'
// import validator from 'validator'

/***************************
 *  Schema and model
 *
 */

/*************
 *  Schema
 *
 */

// last name is  validate using npm validator

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'first name is reqired'],
    maxlength: [20, 'Name length cannot be more than 20 charecter'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        if (value !== firstNameStr) {
          return false
        }
        return true
      },
      message: '{VALUE} is not in capitalize format.',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is requred'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: `"{VALUE}" is not valid`,
    // },
  },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOcupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContact: {
    type: String,
    required: [true, 'Father contact is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOcupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContact: {
    type: String,
    required: [true, 'Mother contact is required'],
  },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Name is required for the local guardian'],
  },
  address: {
    type: String,
    required: [true, 'Address is required for the local guardian'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required for the local guardian'],
  },
  contact: {
    type: String,
    required: [true, 'Contact is required for the local guardian'],
  },
})

const studentSchema = new Schema<Student>({
  id: { type: String, require: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: `{VALUE} field can only be one of the following: 'male', 'female' or 'other'`,
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //   validator: (value: string) => validator.isEmail(value),
    //   message: `{VALUE} email is not valid`,
    // },
  },
  phone: { type: String, required: true },
  bloodGroup: {
    group: {
      type: String,
      enum: ['A', 'B', 'AB', 'O'],
    },
    RH: {
      type: String,
      enum: ['+', '-'],
    },
  },
  presentAddress: String,
  permanantAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
})

/*******************************
 *
 * Creating Model
 *
 * ******************************
 */

export const StudentModel = model<Student>('Student', studentSchema)
