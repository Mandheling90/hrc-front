'use client'

import { print } from 'graphql'
import { REFRESH_TOKEN_MUTATION } from '@/graphql/auth/mutations'

// ── localStorage 키 (AuthContext / client.ts 와 동일) ──

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_REFRESH_TOKEN_KEY = 'auth_refresh_token'
const AUTH_USER_KEY = 'auth_user'

const VALID_HOSPITALS = ['anam', 'guro', 'ansan']

// ── 타입 ──

export interface UploadResult {
  originalName: string
  mimeType: string
  fileSize: number
  storedPath: string
  url: string
}

// ── 내부 헬퍼 ──

function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

function getRefreshTokenValue(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(AUTH_REFRESH_TOKEN_KEY)
}

function getHospitalCodeFromURL(): string {
  if (typeof window === 'undefined') return ''
  // 서브도메인 감지 우선 > pathname > 환경변수
  const hostname = window.location.hostname
  for (const id of VALID_HOSPITALS) {
    if (hostname.includes(id)) return id.toUpperCase()
  }
  const firstSegment = window.location.pathname.split('/')[1]
  const hospitalId = VALID_HOSPITALS.includes(firstSegment) ? firstSegment : null
  return (hospitalId || process.env.NEXT_PUBLIC_HOSPITAL_ID || '').toUpperCase()
}

function getGraphqlUrl(): string {
  return process.env.NODE_ENV === 'development'
    ? (process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql')
    : '/api/graphql'
}

// ── 토큰 리프레시 (동시 호출 시 하나의 요청만 수행) ──

let refreshPromise: Promise<boolean> | null = null

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = getRefreshTokenValue()
  if (!refreshToken) return false

  try {
    const res = await fetch(getGraphqlUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: print(REFRESH_TOKEN_MUTATION),
        variables: { refreshToken }
      }),
      signal: AbortSignal.timeout(300_000), // 5분
    })

    const json = await res.json()
    const data = json?.data?.refreshToken

    if (data?.accessToken) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.accessToken)
      localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, data.refreshToken)
      if (data.user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user))
      }
      return true
    }
  } catch {
    // refresh 실패
  }

  return false
}

function tryRefresh(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

function clearStoredAuth() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
  const firstSegment = window.location.pathname.split('/')[1]
  const hospitalId = VALID_HOSPITALS.includes(firstSegment) ? firstSegment : null
  window.location.href = hospitalId ? `/${hospitalId}/login` : '/login'
}

// ── 업로드 함수 ──

/** FormData로 POST /upload 호출 (Bearer 토큰 + 병원코드 헤더 포함) */
async function executeUpload(file: File): Promise<UploadResult> {
  const token = getAccessToken()
  const hospitalCode = getHospitalCodeFromURL()
  const formData = new FormData()
  formData.append('file', file)

  const headers: Record<string, string> = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  if (hospitalCode) {
    headers['x-hospital-code'] = hospitalCode
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers,
    body: formData,
    signal: AbortSignal.timeout(300_000), // 5분
  })

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

/** executeUpload 래퍼. 401 발생 시 토큰 리프레시 후 1회 재시도, 실패 시 /login으로 리다이렉트 */
export async function uploadFile(file: File): Promise<UploadResult> {
  try {
    return await executeUpload(file)
  } catch (err) {
    if (err instanceof Error && err.message.includes('401')) {
      const refreshed = await tryRefresh()
      if (refreshed) {
        return await executeUpload(file)
      }
      clearStoredAuth()
    }
    throw err
  }
}
