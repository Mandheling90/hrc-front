'use client'

import React from 'react'
import Image from 'next/image'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import styles from './page.module.scss'

export default function GreetingPage() {
  const { pageContent, hospitalId, isAnam, isGuro, isAnsan } = useHospital()
  const greetingInfo = pageContent.aboutGreeting

  // 병원별 배경 이미지 경로
  const backgroundImageSrc = `/images/building-${hospitalId}.png`
  // 안암/구로: 슬로건 이미지 사용
  const hasSlogan = isAnam || isGuro
  const sloganImageSrc = `/images/${hospitalId}/slogan.png`

  // greetingInfo가 없으면 빈 화면 반환
  if (!greetingInfo) {
    return null
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>센터장 인사말</h1>

          {/* 모바일: 슬로건 (페이지 타이틀 아래) */}
          {hasSlogan && (
            <div className={styles.sloganMobile}>
              <Image
                src={sloganImageSrc}
                alt='원장님의 진료 여정에 함께하는 든든한 동반자가 되겠습니다.'
                width={400}
                height={80}
                className={styles.sloganImage}
                priority
              />
            </div>
          )}

          {/* Figma: 데스크톱 - 좌측 이미지 | 우측에 슬로건·본문·서명, 태블릿 - 이미지 중앙 + 슬로건 오버레이 + 본문 아래 */}
          <div className={styles.content}>
            {/* 이미지 영역: 센터장 사진 + 배경 + 슬로건 오버레이 (태블릿) */}
            <div className={styles.imageWrapper}>
              {/* 배경: 건물 스케치 */}
              <div className={styles.backgroundImage}>
                <Image src={backgroundImageSrc} alt='' fill className={styles.buildingBg} priority />
              </div>
              {/* 전면: 센터장 사진 */}
              {greetingInfo.image && (
                <Image
                  src={greetingInfo.image.src}
                  alt={greetingInfo.image.alt}
                  width={greetingInfo.image.width}
                  height={greetingInfo.image.height}
                  className={styles.directorImage}
                  priority
                />
              )}
              {/* 태블릿: 슬로건 오버레이 (이미지 오른쪽 부분) */}
              {hasSlogan && (
                <div className={styles.sloganOverlay}>
                  <Image
                    src={sloganImageSrc}
                    alt='원장님의 진료 여정에 함께하는 든든한 동반자가 되겠습니다.'
                    width={400}
                    height={80}
                    className={styles.sloganImage}
                    priority
                  />
                </div>
              )}
            </div>

            {/* 데스크톱: 오른쪽 텍스트 영역 (슬로건 + 인사말 본문 + 서명) */}
            <div className={styles.textWrapper}>
              {/* 데스크톱에서만 표시되는 슬로건 */}
              {hasSlogan && (
                <div className={styles.sloganDesktop}>
                  <Image
                    src={sloganImageSrc}
                    alt='원장님의 진료 여정에 함께하는 든든한 동반자가 되겠습니다.'
                    width={600}
                    height={120}
                    className={styles.sloganImage}
                    priority
                  />
                </div>
              )}
              <div className={styles.greetingText}>
                {greetingInfo.message.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className={styles.signature}>
                <p className={styles.signatureTitle}>{greetingInfo.signature.title}</p>
                <p className={styles.signatureName}>{greetingInfo.signature.name}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
