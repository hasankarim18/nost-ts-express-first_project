// import { Schema, model, connect } from 'mongoose'

export type UserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type Guardian = {
  fatherName: string
  fatherOcupation: string
  fatherContact: string
  motherName: string
  motherOcupation: string
  motherContact: string
}

export type LocalGuardian = {
  name: string
  address: string
  occupation: string
  contact: string
}

export type Student = {
  id: string
  name: UserName
  gender: 'male' | 'female' | 'other' // union type literal gender must be either "male" or "female"
  email: string
  phone: string
  bloodGroup?: {
    group: 'A' | 'B' | 'AB' | 'O'
    RH: '+' | '-'
  }
  presentAddress: string
  permanantAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImg?: string
  isActive: 'active' | 'inactive'
}
