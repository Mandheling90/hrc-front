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
  const mutationObserverRef = useRef<MutationObserver | null>(null)
  const mutationRafRef = useRef<number | null>(null)

  useEffect(() => {
    // 이전 observer 정리
    observerRef.current?.disconnect()
    mutationObserverRef.current?.disconnect()
    if (mutationRafRef.current !== null) {
      cancelAnimationFrame(mutationRafRef.current)
      mutationRafRef.current = null
    }

    let isActive = true

    const observer = new IntersectionObserver(
      entries => {
        if (!isActive) return
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.setAttribute('data-reveal', 'visible')
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -60px 0px' }
    )

    observerRef.current = observer

    const init = () => {
      if (!isActive) return

      const selectors = ['main .container > *', 'main#contents > section']

      const elements = document.querySelectorAll<HTMLElement>(selectors.join(', '))
      if (elements.length === 0) return

      let staggerIndex = 0

      elements.forEach(el => {
        // 이미 처리된 요소 스킵
        if (el.getAttribute('data-reveal') === 'visible') return

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
    const mutationObserver = new MutationObserver(() => {
      if (mutationRafRef.current !== null) {
        cancelAnimationFrame(mutationRafRef.current)
      }
      mutationRafRef.current = requestAnimationFrame(() => {
        mutationRafRef.current = null
        init()
      })
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })
    mutationObserverRef.current = mutationObserver

    return () => {
      isActive = false
      cancelAnimationFrame(rafId)
      if (mutationRafRef.current !== null) {
        cancelAnimationFrame(mutationRafRef.current)
        mutationRafRef.current = null
      }
      observerRef.current?.disconnect()
      mutationObserverRef.current?.disconnect()
    }
  }, [pathname])

  return <>{children}</>
}
