import { z } from 'zod'

// Define a schema for UserName
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'Name length cannot be more than 20 characters' })
    .refine(
      value => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return value === firstNameStr
      },
      { message: 'First name must be in capitalize format' },
    )
    .refine(value => !/\d/.test(value), {
      message: 'First name should not contain any numeric value',
    }),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
})

// Define a schema for Guardian
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOcupation: z
    .string()
    .min(1, { message: 'Father occupation is required' }),
  fatherContact: z.string().min(1, { message: 'Father contact is required' }),
  motherName: z.string().min(1, { message: 'Mother name is required' }),
  motherOcupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' }),
  motherContact: z.string().min(1, { message: 'Mother contact is required' }),
})

// Define a schema for LocalGuardian
const LocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required for the local guardian' }),
  address: z
    .string()
    .min(1, { message: 'Address is required for the local guardian' }),
  occupation: z
    .string()
    .min(1, { message: 'Occupation is required for the local guardian' }),
  contact: z
    .string()
    .min(1, { message: 'Contact is required for the local guardian' }),
})

// Define a schema for BloodGroup
const BloodGroupValidationSchema = z.object({
  group: z.enum(['A', 'B', 'AB', 'O']),
  RH: z.enum(['+', '-']),
})

// Define a schema for the entire Student
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: 'Zod says password can not be more than 20' }),
    student: z.object({
      name: UserNameValidationSchema.required(),
      gender: z.enum(['male', 'female', 'other']),
      email: z.string().email({ message: 'Email is not valid' }),
      phone: z.string().min(1, { message: 'Phone number is required' }),
      bloodGroup: BloodGroupValidationSchema.required(),
      presentAddress: z.string(),
      permanantAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: GuardianValidationSchema.required(),
      localGuardian: LocalGuardianValidationSchema.required(),
      profileImg: z.string(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      dateOfBirth: z.string().optional(),
    }),
  }),
})

/**
 *
 *
 *
 */

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'Name length cannot be more than 20 characters' })
    .refine(
      value => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
        return value === firstNameStr
      },
      { message: 'First name must be in capitalize format' },
    )
    .refine(value => !/\d/.test(value), {
      message: 'First name should not contain any numeric value',
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }).optional(),
})

// Define a schema for Guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: 'Father name is required' })
    .optional(),
  fatherOcupation: z
    .string()
    .min(1, { message: 'Father occupation is required' })
    .optional(),
  fatherContact: z
    .string()
    .min(1, { message: 'Father contact is required' })
    .optional(),
  motherName: z
    .string()
    .min(1, { message: 'Mother name is required' })
    .optional(),
  motherOcupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' })
    .optional(),
  motherContact: z
    .string()
    .min(1, { message: 'Mother contact is required' })
    .optional(),
})

const updateBloodGroupValidationSchema = z.object({
  group: z.enum(['A', 'B', 'AB', 'O']).optional(),
  RH: z.enum(['+', '-']).optional(),
})

const updateLocalGuardianValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required for the local guardian' })
    .optional(),
  address: z
    .string()
    .min(1, { message: 'Address is required for the local guardian' })
    .optional(),
  occupation: z
    .string()
    .min(1, { message: 'Occupation is required for the local guardian' })
    .optional(),
  contact: z
    .string()
    .min(1, { message: 'Contact is required for the local guardian' })
    .optional(),
})

/**update student validation schema */
export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: 'Zod says password can not be more than 20' })
      .optional(),
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      email: z.string().email({ message: 'Email is not valid' }).optional(),
      phone: z
        .string()
        .min(1, { message: 'Phone number is required' })
        .optional(),
      bloodGroup: updateBloodGroupValidationSchema.optional(),
      presentAddress: z.string().optional(),
      permanantAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' })
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      dateOfBirth: z.string().optional(),
    }),
  }),
})

export const StudentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
