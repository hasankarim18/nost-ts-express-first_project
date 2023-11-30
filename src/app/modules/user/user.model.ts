import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import config from '../../config'
import bycrpt from 'bcrypt'

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

/** hashing the password */
/** Pre save middleware/hook */

userSchema.pre('save', async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bycrpt.hash(
    user.password,
    Number(config.bycrpt_salt_rounds),
  )
  user.isDeleted = false
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

/*** Creating model  */
export const User = model<TUser>('user', userSchema)
