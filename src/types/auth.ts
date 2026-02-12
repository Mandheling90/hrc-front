export type UserType = 'ADMIN' | 'DOCTOR' | 'HOSPITAL' | 'MEMBER' | 'CONSULTANT'

export type HospitalCode = 'ANAM' | 'GURO' | 'ANSAN'

export type Gender = 'M' | 'F'

export type UserStatus = 'ACTIVE' | 'PENDING' | 'REJECTED' | 'WITHDRAWN'

export interface UserProfile {
  birthDate: string | null
  department: string | null
  gender: Gender | null
  hospAddress: string | null
  hospCode: string | null
  hospName: string | null
  licenseNo: string | null
  representative: string | null
  specialty: string | null
}

export interface AuthUser {
  id: string
  userId: string
  email: string
  userName: string
  userType: UserType
  hospitalCode: HospitalCode
  phone: string | null
  status: UserStatus
  mustChangePw: boolean
  profile: UserProfile | null
  createdAt: string
  updatedAt: string
}

export interface LoginFormData {
  userId: string
  password: string
}

export interface SignupFormData {
  userId: string
  userName: string
  email: string
  password: string
  hospitalCode: HospitalCode
  userType: UserType
  phone?: string
  department?: string
  birthDate?: string
  gender?: Gender
  licenseNo?: string
  specialty?: string
  hospName?: string
  hospCode?: string
  hospAddress?: string
  representative?: string
}
