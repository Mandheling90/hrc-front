import { useMutation, useQuery } from '@apollo/client/react'
import { useAuthContext } from '@/contexts/AuthContext'
import { LOGIN_MUTATION, SIGNUP_MUTATION, LOGOUT_MUTATION } from '@/graphql/auth/mutations'
import { ME_QUERY } from '@/graphql/auth/queries'
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

export function useMe() {
  const { data, loading, error } = useQuery<{ me: AuthUser }>(ME_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  return { user: data?.me ?? null, loading, error }
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
