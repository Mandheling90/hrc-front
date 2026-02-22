import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_HOSPITALS = ['anam', 'guro', 'ansan']
const DEFAULT_HOSPITAL = 'anam'

// 병원 prefix 처리가 필요 없는 경로
const BYPASS_PREFIXES = ['/_next', '/api', '/auth', '/images', '/assets', '/favicon']
const BYPASS_EXACT = ['/style-guide', '/page-list']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 정적 파일 및 내부 경로는 bypass
  if (BYPASS_PREFIXES.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  // 특수 페이지는 bypass
  if (BYPASS_EXACT.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next()
  }

  // 첫 번째 세그먼트 추출
  const segments = pathname.split('/')
  const firstSegment = segments[1] // '' for '/', 'anam' for '/anam/...'

  // 유효한 병원 ID가 첫 번째 세그먼트인 경우: rewrite로 prefix 제거
  if (VALID_HOSPITALS.includes(firstSegment)) {
    // /anam → /anam/ (trailing slash 정규화는 Next.js가 처리)
    // /anam/login → /login 으로 rewrite
    const restPath = '/' + segments.slice(2).join('/')
    const rewritePath = restPath === '/' ? '/' : restPath

    const url = request.nextUrl.clone()
    url.pathname = rewritePath

    const response = NextResponse.rewrite(url)
    // 헤더로 병원 ID 전달 (서버 컴포넌트에서 사용 가능)
    response.headers.set('x-hospital-id', firstSegment)
    return response
  }

  // 루트 경로는 병원 선택 페이지로 (rewrite 없이 통과)
  if (pathname === '/') {
    return NextResponse.next()
  }

  // 유효하지 않은 첫 세그먼트 (레거시 URL): 기본 병원으로 리다이렉트
  // 예: /login → /anam/login
  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_HOSPITAL}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)'
  ]
}
