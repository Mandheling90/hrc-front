'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { CompleteStep } from '@/components/organisms/CompleteStep/CompleteStep'
import styles from './page.module.scss'

export default function HospitalApplicationCompletePage() {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>협력병원 신청</h1>
          <CompleteStep
            userId='test******'
            email='lee*******@naver.com'
            title='고려대학교 안암병원 진료협력센터 협력병원 신청이 완료되었습니다.'
            description={`담당자 확인 후 승인 절차가 진행되며, 승인 완료 시 협력병원 체결이 최종 완료됩니다.\n승인 결과는 등록하신 이메일 및 문자로 안내드릴 예정입니다.`}
            buttonText='Button'
            onGoToMain={() => {
              // TODO: 메인으로 이동 로직
              window.location.href = '/'
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
