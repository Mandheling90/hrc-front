import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_HOSPITALS = ['anam', 'guro', 'ansan'] as const

/**
 * hostname에서 병원 ID 추출
 * anamrefer.kumc.or.kr → anam
 * gurorefer.vercel.app → guro
 * localhost → null (env var fallback)
 */
function getHospitalFromHostname(hostname: string): string | null {
  for (const id of VALID_HOSPITALS) {
    if (hostname.includes(id)) return id
  }
  return null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 정적 파일 및 내부 경로는 bypass
  const BYPASS_PREFIXES = ['/_next', '/api', '/auth', '/images', '/assets', '/favicon']
  if (BYPASS_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  // 특수 페이지는 bypass
  const BYPASS_EXACT = ['/style-guide', '/page-list']
  if (BYPASS_EXACT.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next()
  }

  // 우선순위: hostname 감지 > 환경변수 > 기본값
  const hostname = request.headers.get('host') || ''
  const hospitalId = getHospitalFromHostname(hostname) || process.env.NEXT_PUBLIC_HOSPITAL_ID || 'anam'

  const response = NextResponse.next()
  response.headers.set('x-hospital-id', hospitalId)
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)'
  ]
}
