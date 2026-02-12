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
  userId: string
  userName: string
  email: string
  password: string
  hospitalCode: string
  userType: string
  phone?: string
  department?: string
  birthDate?: string
  gender?: string
  licenseNo?: string
  specialty?: string
  hospName?: string
  hospCode?: string
  hospAddress?: string
  representative?: string
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
  const { setAuth } = useAuthContext()
  const [signupMutation, { loading, error }] = useMutation<{ signup: AuthPayload }>(SIGNUP_MUTATION)

  const signup = async (input: SignupInput) => {
    const { data } = await signupMutation({ variables: { input } })

    if (data?.signup) {
      setAuth(data.signup.accessToken, data.signup.refreshToken, data.signup.user)
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
