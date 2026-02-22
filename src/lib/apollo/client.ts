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
        'x-hospital-code': (process.env.NEXT_PUBLIC_HOSPITAL_ID || '').toUpperCase()
      }
    }
  })

  const errorLink = new ErrorLink(({ error, operation, forward }) => {
    // 401 감지: GraphQL UNAUTHENTICATED 에러 또는 네트워크 401
    const is401 =
      (CombinedGraphQLErrors.is(error) &&
        error.errors.some(err => err.extensions?.code === 'UNAUTHENTICATED' || err.message?.includes('401'))) ||
      (ServerError.is(error) && error.statusCode === 401)

    if (!is401) return

    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem(AUTH_REFRESH_TOKEN_KEY) : null

    if (!refreshToken) {
      clearStoredAuth()
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
  window.location.href = '/login'
}
