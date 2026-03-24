import { useMutation, useQuery } from '@apollo/client/react'
import { useAuthContext } from '@/contexts/AuthContext'
import { LOGIN_MUTATION, SIGNUP_MUTATION, LOGOUT_MUTATION, UPDATE_DOCTOR_PROFILE_MUTATION, CHANGE_PASSWORD_MUTATION, WITHDRAW_MEMBER_MUTATION } from '@/graphql/auth/mutations'
import { ME_QUERY, MY_PROFILE_QUERY } from '@/graphql/auth/queries'
import { AuthUser } from '@/types/auth'

interface LoginInput {
  userId: string
  password: string
}

interface SignupInput {
  userName: string
  birthDate: string
  phone: string
  doctorType: string
  userId: string
  password: string
  passwordConfirm: string
  email: string
  licenseNo: string
  isDirector: boolean
  school: string
  department: string
  specialty?: string
  smsConsent: boolean
  emailConsent: boolean
  replyConsent: boolean
  hospitalCode: string
  hospName: string
  careInstitutionNo: string
  hospZipCode: string
  hospAddress: string
  hospAddressDetail?: string
  hospPhone: string
  hospWebsite?: string
  ci?: string
  di?: string
  verificationToken: string
}

interface AuthPayload {
  accessToken: string
  refreshToken: string
  mustChangePw: boolean
  user: AuthUser
}

export function useLogin() {
  const { setAuth } = useAuthContext()
  const [loginMutation, { loading, error }] = useMutation<{ login: AuthPayload }>(LOGIN_MUTATION)

  const login = async (input: LoginInput) => {
    const { data } = await loginMutation({ variables: { input } })

    if (data?.login) {
      setAuth(data.login.accessToken, data.login.refreshToken, data.login.user)
      return data.login
    }

    return null
  }

  return { login, loading, error }
}

export function useSignup() {
  const [signupMutation, { loading, error }] = useMutation<{ signup: AuthPayload }>(SIGNUP_MUTATION)

  const signup = async (input: SignupInput) => {
    const { data } = await signupMutation({ variables: { input } })

    if (data?.signup) {
      return data.signup
    }

    return null
  }

  return { signup, loading, error }
}

export interface UpdateDoctorProfileInput {
  userName?: string
  email?: string
  phone?: string
  doctorType?: string
  licenseNo?: string
  isDirector?: boolean
  school?: string
  department?: string
  specialty?: string
  smsConsent?: boolean
  emailConsent?: boolean
  replyConsent?: boolean
  hospName?: string
  careInstitutionNo?: string
  hospZipCode?: string
  hospAddress?: string
  hospAddressDetail?: string
  hospPhone?: string
  hospWebsite?: string
  oldPassword?: string
  newPassword?: string
}

export function useUpdateProfile() {
  const { updateUser } = useAuthContext()
  const [updateProfileMutation, { loading, error }] = useMutation<{ updateDoctorProfile: AuthUser }>(
    UPDATE_DOCTOR_PROFILE_MUTATION,
    { refetchQueries: [{ query: MY_PROFILE_QUERY }] }
  )

  const updateProfile = async (input: UpdateDoctorProfileInput) => {
    const { data } = await updateProfileMutation({ variables: { input } })
    const updatedUser = data?.updateDoctorProfile ?? null
    if (updatedUser) {
      updateUser(updatedUser)
    }
    return updatedUser
  }

  return { updateProfile, loading, error }
}

export function useMe() {
  const { data, loading, error } = useQuery<{ me: AuthUser }>(ME_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  return { user: data?.me ?? null, loading, error }
}

export function useMyProfile() {
  const { data, loading, error } = useQuery<{ myProfile: AuthUser }>(MY_PROFILE_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  return { user: data?.myProfile ?? null, loading, error }
}

export interface ChangePasswordInput {
  oldPassword: string
  newPassword: string
}

export function useChangePassword() {
  const [changePasswordMutation, { loading, error }] = useMutation<{
    changePassword: { success: boolean; message: string }
  }>(CHANGE_PASSWORD_MUTATION)

  const changePassword = async (input: ChangePasswordInput) => {
    const { data } = await changePasswordMutation({ variables: { input } })
    return data?.changePassword ?? null
  }

  return { changePassword, loading, error }
}

export function useWithdrawMember() {
  const { clearAuth } = useAuthContext()
  const [withdrawMemberMutation, { loading, error }] = useMutation<{
    withdrawMember: { success: boolean; message: string }
  }>(WITHDRAW_MEMBER_MUTATION)

  const withdrawMember = async (password: string) => {
    const { data } = await withdrawMemberMutation({ variables: { input: { password } } })
    if (data?.withdrawMember?.success) {
      clearAuth()
    }
    return data?.withdrawMember ?? null
  }

  return { withdrawMember, loading, error }
}

export function useLogout() {
  const { clearAuth } = useAuthContext()
  const [logoutMutation, { loading }] = useMutation<{ logout: boolean }>(LOGOUT_MUTATION)

  const logout = async () => {
    try {
      await logoutMutation()
    } finally {
      clearAuth()
    }
  }

  return { logout, loading }
}
