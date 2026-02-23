'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  delay?: number
}

/**
 * 스크롤 시 요소가 뷰포트에 진입하면 reveal 애니메이션을 트리거하는 훅
 * - delay(ms)를 주면 시차 애니메이션 가능
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const { threshold = 0.05, rootMargin = '0px 0px -60px 0px', once = true, delay = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.setAttribute('data-reveal', 'hidden')
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-reveal', 'visible')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.setAttribute('data-reveal', 'hidden')
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once, delay])

  return ref
}
