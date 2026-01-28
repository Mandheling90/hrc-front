'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { ProcedureList } from '@/components/molecules/ProcedureList/ProcedureList'
import styles from './page.module.scss'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { OperationTimeIcon } from '@/components/icons/OperationTimeIcon'
import { OperationPhoneFaxIcon } from '@/components/icons/OperationPhoneFaxIcon'
import { InfoIcon } from '@/components/icons/InfoIcon'
import { FlowArrowIcon } from '@/components/icons/FlowArrowIcon'
import { FlowStep01Icon } from '@/components/icons/FlowStep01Icon'
import { FlowStep02Icon } from '@/components/icons/FlowStep02Icon'
import { FlowStep03Icon } from '@/components/icons/FlowStep03Icon'
import { FlowStep04Icon } from '@/components/icons/FlowStep04Icon'
import { FlowStep05Icon } from '@/components/icons/FlowStep05Icon'

export default function AboutIntroPage() {
  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>진료협력센터 소개</h1>

          {/* 상단 소개 영역 - InfoBox (guide, center) */}
          <InfoBox
            variant='guide'
            title='KRC (Korea University Anam Hospital Referral Center)'
            messages={[
              '고려대학교안암병원 진료협력센터(KRC)는 1·2차 의료기관에서 의뢰한 환자의 효율적인 진료를 위하여 환자의뢰, 진료결과 회신, 회송을 통해 지역사회 의료기관과 균형적인 의료발전을 도모하고, 의료전달 체계의 중심적 역할을 수행하여 지역주민 건강의 유지, 증진에 기여하고자 설립되었습니다.',
              '지역사회와의 상생을 기반으로 최적의 의료서비스를 제공하기 위해 협력 병·의원 원장님들과 긴밀하고 활발한 협력네트워크를 만들어 나가도록 하겠습니다.'
            ]}
            showBullets={false}
            contentAlign='center'
            className={styles.introBox}
          />

          {/* 주요업무 */}
          <section className={styles.section}>
            <SectionTitle title='주요업무' />

            <ProcedureList
              label='진료의뢰 및 진료상담'
              items={[{ text: '가능한 신속 정확한 진료가 이루어질 수 있도록 도와드리고 있습니다.' }]}
            />
            <ProcedureList
              label='진료 회신'
              items={[
                {
                  text: '개인정보공개 동의한 환자에 한하여, 의뢰한 환자의 진료결과, 진행사항에 대해 회신서를 제공하고 있습니다.'
                }
              ]}
            />
            <ProcedureList
              label='회송'
              items={[
                {
                  text: '급성기 치료 종료 후 지속적 치료가 필요한 경우 환자 및 보호자 상담을 통해 1,2차 의료기관으로 회송하고 있습니다.'
                }
              ]}
            />
            <ProcedureList
              label='협력네트워크'
              items={[{ text: '상호협력이 우수한 병·의원을 대상으로 협력병·의원 협약 체결을 진행하고 있습니다.' }]}
            />
          </section>

          {/* 운영 안내 */}
          <section className={styles.section} aria-labelledby='operation-heading'>
            <SectionTitle title='운영안내' />

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <div className={styles.infoIconCircle}>
                  <OperationTimeIcon width={60} height={60} />
                </div>
                <div className={styles.infoTexts}>
                  <p className={styles.infoTitle}>운영시간</p>
                  <div className={styles.infoRowGroup}>
                    <div className={styles.infoRow}>
                      <span>평일</span>
                      <span>08:30 ~ 17:30</span>
                    </div>
                    <div className={styles.infoRowDivider} />
                    <div className={styles.infoRow}>
                      <span>토요일</span>
                      <span>09:00 ~ 12:30</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIconCircle}>
                  <OperationPhoneFaxIcon width={60} height={60} />
                </div>
                <div className={styles.infoTexts}>
                  <p className={styles.infoTitle}>전용 전화 및 팩스</p>
                  <div className={styles.infoRowGroup}>
                    <div className={styles.infoRow}>
                      <span>Tel</span>
                      <span>02-920-5892</span>
                    </div>
                    <div className={styles.infoRowDivider} />
                    <div className={styles.infoRow}>
                      <span>Fax</span>
                      <span>02-920-6523</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className={styles.infoNote}>
              <InfoIcon width={24} height={24} fill='var(--gray-11)' />
              <span>일요일, 공휴일 휴무입니다.</span>
            </p>
          </section>

          {/* 진료의뢰 · 회신 · 회송 절차 */}
          <section className={styles.section} aria-labelledby='flow-heading'>
            <SectionTitle title='진료의뢰 · 회신· 회송 절차' />

            <div className={styles.flowRow}>
              <div className={styles.flowCard}>
                <span className={styles.flowChip}>진료의뢰</span>
                <ProcedureList items={[{ text: '진료의뢰서 작성' }]} />
                <div className={styles.flowStepNumber}>
                  <FlowStep01Icon />
                </div>
              </div>

              <div className={styles.flowArrow}>
                <FlowArrowIcon />
              </div>

              <div className={styles.flowCard}>
                <span className={styles.flowChip}>진료예약</span>
                <ProcedureList
                  items={[{ text: '전화의뢰' }, { text: '전자의뢰(심평원중계포털, 진료정보교류시스템)' }]}
                />
                <div className={styles.flowStepNumber}>
                  <FlowStep02Icon />
                </div>
              </div>

              <div className={styles.flowArrow}>
                <FlowArrowIcon />
              </div>

              <div className={styles.flowCard}>
                <span className={styles.flowChip}>환자진료</span>
                <ProcedureList items={[{ text: '신속, 정확한 진료' }]} />
                <div className={styles.flowStepNumber}>
                  <FlowStep03Icon />
                </div>
              </div>

              <div className={styles.flowArrow}>
                <FlowArrowIcon />
              </div>

              <div className={styles.flowCard}>
                <span className={styles.flowChip}>진료결과 회신</span>
                <ProcedureList
                  items={[{ text: '우편발송' }, { text: '인터넷 결과 조회 : KRC 홈페이지(https://refer.kumc.or.kr)' }]}
                />
                <div className={styles.flowStepNumber}>
                  <FlowStep04Icon />
                </div>
              </div>

              <div className={styles.flowArrow}>
                <FlowArrowIcon />
              </div>

              <div className={styles.flowCard}>
                <span className={styles.flowChip}>회송(되의뢰)</span>
                <ProcedureList
                  items={[
                    { text: '급성기 치료 종료 후 의뢰주신 병원으로 되의뢰' },
                    { text: '환자(보호자)와 충분한 상담 후 지속적 치료가 가능한 의료기관으로 회송' }
                  ]}
                />
                <div className={styles.flowStepNumber}>
                  <FlowStep05Icon />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
