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
export const StudentValidationSchema = z.object({
  id: z.string().min(1, { message: 'Student ID is required' }),
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
  isActive: z.enum(['active', 'inactive']).default('active'),
})

export default StudentValidationSchema

// // Example usage:
// const studentData = {
//   // Your student data here
// }

// try {
//   // Validate the student data against the schema
//   StudentValidationSchema.parse(studentData)
//   console.log('Validation successful')
// } catch (error) {
//   if (error instanceof ZodError) {
//     console.error('Validation failed:', error.errors)
//   } else {
//     console.error('Error during validation:', error)
//   }
// }
