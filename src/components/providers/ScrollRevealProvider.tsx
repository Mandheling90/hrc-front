'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const STAGGER_DELAY = 120

/**
 * 모든 페이지에서 스크롤 시 콘텐츠가 부드럽게 나타나는 효과를 자동 적용하는 Provider
 * - main 내부 .container 직접 자식, main#contents 직접 자식을 대상으로 관찰
 * - 페이지 전환 시 자동으로 새 요소 탐색
 * - 이미 뷰포트 안에 있는 요소는 즉시 표시
 */
export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // 이전 observer 정리
    observerRef.current?.disconnect()

    const init = () => {
      const selectors = [
        'main .container > *',
        'main#contents > section',
      ]

      const elements = document.querySelectorAll<HTMLElement>(selectors.join(', '))
      if (elements.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).setAttribute('data-reveal', 'visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
      )

      observerRef.current = observer
      let staggerIndex = 0

      elements.forEach((el) => {
        // 이미 처리된 요소 스킵
        if (el.getAttribute('data-reveal')) return

        const rect = el.getBoundingClientRect()
        const isAboveFold = rect.top < window.innerHeight * 0.85

        if (isAboveFold) {
          el.setAttribute('data-reveal', 'visible')
        } else {
          el.setAttribute('data-reveal', 'hidden')
          el.style.transitionDelay = `${staggerIndex * STAGGER_DELAY}ms`
          observer.observe(el)
          staggerIndex++
        }
      })
    }

    // DOM 렌더 완료 후 실행
    const rafId = requestAnimationFrame(init)

    return () => {
      cancelAnimationFrame(rafId)
      observerRef.current?.disconnect()
    }
  }, [pathname])

  return <>{children}</>
}
