'use client'

import { Observable } from 'rxjs'
import { HttpLink } from '@apollo/client/link/http'
import { SetContextLink } from '@apollo/client/link/context'
import { from } from '@apollo/client/link'
import type { ApolloLink } from '@apollo/client/link'
import { ErrorLink } from '@apollo/client/link/error'
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs'
import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors'
import { print } from 'graphql'
import { REFRESH_TOKEN_MUTATION } from '@/graphql/auth/mutations'

const VALID_HOSPITALS = ['anam', 'guro', 'ansan']

function getHospitalIdFromURL(): string | null {
  if (typeof window === 'undefined') return null
  const firstSegment = window.location.pathname.split('/')[1]
  return VALID_HOSPITALS.includes(firstSegment) ? firstSegment : null
}

function getHospitalCodeFromURL(): string {
  const hospitalId = getHospitalIdFromURL()
  return (hospitalId || process.env.NEXT_PUBLIC_HOSPITAL_ID || '').toUpperCase()
}

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_REFRESH_TOKEN_KEY = 'auth_refresh_token'
const AUTH_USER_KEY = 'auth_user'

let isRefreshing = false
let pendingRequests: Array<() => void> = []

function resolvePendingRequests() {
  pendingRequests.forEach(callback => callback())
  pendingRequests = []
}

export function makeClient() {
  const graphqlUri = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql'

  const authLink = new SetContextLink(prevContext => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null

    return {
      headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}` : '',
        'x-hospital-code': getHospitalCodeFromURL()
      }
    }
  })

  const errorLink = new ErrorLink(({ error, operation, forward }) => {
    // 인증이 불필요한 mutation은 토큰 리프레시/리다이렉트 스킵
    const publicOperations = ['Login', 'Signup', 'FindUserIdByVerification', 'ResetPasswordByVerification', 'InitiateVerification', 'CompleteVerification']
    if (operation.operationName && publicOperations.includes(operation.operationName)) return

    // 401 감지: GraphQL UNAUTHENTICATED 에러 또는 네트워크 401
    const is401 =
      (CombinedGraphQLErrors.is(error) &&
        error.errors.some(err => err.extensions?.code === 'UNAUTHENTICATED' || err.message?.includes('401'))) ||
      (ServerError.is(error) && error.statusCode === 401)

    if (!is401) return

    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem(AUTH_REFRESH_TOKEN_KEY) : null

    if (!refreshToken) {
      // 저장된 토큰이 있을 때만 인증 초기화 및 로그인 리다이렉트
      // (비로그인 상태에서 401 응답은 무시 — 공개 페이지에서 불필요한 리다이렉트 방지)
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKEN_KEY) : null
      if (storedToken) {
        clearStoredAuth()
      }
      return
    }

    // 이미 리프레시 중이면 대기열에 추가
    if (isRefreshing) {
      return new Observable<ApolloLink.Result>(observer => {
        pendingRequests.push(() => {
          const newToken = localStorage.getItem(AUTH_TOKEN_KEY)
          if (newToken) {
            const oldHeaders = operation.getContext().headers || {}
            operation.setContext({
              headers: { ...oldHeaders, authorization: `Bearer ${newToken}` }
            })
            forward(operation).subscribe(observer)
          } else {
            observer.error(new Error('Token refresh failed'))
          }
        })
      })
    }

    isRefreshing = true

    return new Observable<ApolloLink.Result>(observer => {
      fetchRefreshToken(graphqlUri, refreshToken)
        .then(data => {
          if (data) {
            localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken)
            localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, data.refreshToken)
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user))

            const oldHeaders = operation.getContext().headers || {}
            operation.setContext({
              headers: { ...oldHeaders, authorization: `Bearer ${data.accessToken}` }
            })

            resolvePendingRequests()
            forward(operation).subscribe(observer)
          } else {
            clearStoredAuth()
            pendingRequests = []
            observer.error(new Error('Token refresh failed'))
          }
        })
        .catch(() => {
          clearStoredAuth()
          pendingRequests = []
          observer.error(new Error('Token refresh failed'))
        })
        .finally(() => {
          isRefreshing = false
        })
    })
  })

  const httpLink = new HttpLink({ uri: graphqlUri })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, httpLink])
  })
}

interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
  user: Record<string, unknown>
}

async function fetchRefreshToken(uri: string, refreshToken: string): Promise<RefreshTokenResponse | null> {
  const response = await fetch(uri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(REFRESH_TOKEN_MUTATION),
      variables: { refreshToken }
    })
  })

  const json = await response.json()
  return json.data?.refreshToken ?? null
}

function clearStoredAuth() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
  // URL에서 병원 ID를 추출하여 해당 병원 로그인 페이지로 리다이렉트
  const hospitalId = getHospitalIdFromURL()
  window.location.href = hospitalId ? `/${hospitalId}/login` : '/login'
}
