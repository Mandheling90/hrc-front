export type UserRole = 'DOCTOR' | 'STAFF' | 'ADMIN'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: UserRole
  hospitalId: string
  department: string | null
  phone: string | null
  createdAt: string
  updatedAt: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
  name: string
  role: UserRole
  hospitalId: string
  department?: string
  phone?: string
}
