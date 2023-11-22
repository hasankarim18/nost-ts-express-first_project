import Joi from 'joi'

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalized' })
    .message({
      'string.base': 'should be a string',
      'string.empty': 'should not be empty',
      'string.max': 'length cannot be more than 20 characters',
      'string.pattern.base': 'should be in capitalize format',
    }),
  middleName: Joi.string().allow(''),
  lastName: Joi.string()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .message(`"{VALUE}" is not valid`),
})

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOcupation: Joi.string().required(),
  fatherContact: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOcupation: Joi.string().required(),
  motherContact: Joi.string().required(),
})

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  occupation: Joi.string().required(),
  contact: Joi.string().required(),
})

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  bloodGroup: Joi.object({
    group: Joi.string().valid('A', 'B', 'AB', 'O'),
    RH: Joi.string().valid('+', '-'),
  }),
  presentAddress: Joi.string().allow(''),
  permanantAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().allow(''),
  isActive: Joi.string().valid('active', 'inactive').default('active'),
})

export default studentValidationSchema
