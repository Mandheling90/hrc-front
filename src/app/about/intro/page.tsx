'use client'

import React, { useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import { OperationInfoCards } from '@/components/molecules/OperationInfoCards/OperationInfoCards'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'
import { ProcedureFlow } from '@/components/molecules/ProcedureFlow/ProcedureFlow'
import { useHospital } from '@/hooks'
import { getIcon } from '@/config/iconRegistry'
import styles from './page.module.scss'

// 주요업무 라벨 배열
const MAIN_TASK_LABELS = ['진료의뢰 및 진료상담', '진료 회신', '회송', '협력네트워크']

export default function AboutIntroPage() {
  const { pageContent, hospitalId } = useHospital()
  const aboutIntro = pageContent.aboutIntro

  // 안산병원일 때 태블릿 스타일 적용
  const applyTabletStyle = hospitalId === 'ansan'

  // 운영 안내 카드 데이터 변환
  const operationCards = useMemo(() => {
    if (!aboutIntro) return []
    return aboutIntro.operationInfo.cards.map(card => ({
      icon: getIcon(card.icon),
      title: card.title,
      rows: card.rows
    }))
  }, [aboutIntro])

  // 진료의뢰 절차 단계 데이터 변환
  const procedureSteps = useMemo(() => {
    if (!aboutIntro) return []
    return aboutIntro.procedureFlow.steps.map(step => ({
      chip: step.chip,
      items: step.items,
      stepIcon: getIcon(step.stepIcon)
    }))
  }, [aboutIntro])

  // aboutIntro가 없으면 빈 화면 반환
  if (!aboutIntro) {
    return null
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>진료협력센터 소개</h1>

          {/* 상단 소개 영역 - InfoBox (guide, center) */}
          <InfoBox
            variant='guide'
            title={aboutIntro.introBox.title}
            messages={aboutIntro.introBox.messages}
            showBullets={false}
            contentAlign='center'
            className={styles.introBox}
          />

          {/* 주요업무 */}
          <section className={styles.section}>
            <SectionTitle title='주요업무' />

            {aboutIntro.mainTasks.map((task, index) => (
              <ProcedureList key={index} label={MAIN_TASK_LABELS[index]} items={[task]} />
            ))}
          </section>

          {/* 운영 안내 */}
          <section className={styles.section} aria-labelledby='operation-heading'>
            <SectionTitle title='운영안내' />

            <OperationInfoCards cards={operationCards} applyTabletStyle={applyTabletStyle} />

            {aboutIntro.operationInfo.note && <InfoNote message={aboutIntro.operationInfo.note} />}
          </section>

          {/* 진료의뢰 · 회신 · 회송 절차 */}
          <section className={styles.section} aria-labelledby='flow-heading'>
            <SectionTitle title='진료의뢰 · 회신· 회송 절차' />

            <ProcedureFlow steps={procedureSteps} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
