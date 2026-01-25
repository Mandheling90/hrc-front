'use client'

import React, { useState } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { Radio } from '@/components/atoms/Radio/Radio'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { PrivacyConsentContent } from '@/components/molecules/PrivacyConsentContent/PrivacyConsentContent'
import { FormField } from '@/components/molecules/FormField/FormField'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './page.module.scss'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'

export default function EConsultPage() {
  // 폼 상태
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [applicantName, setApplicantName] = useState('김철수')
  const [hospitalPhone, setHospitalPhone] = useState('고대협력병원')
  const [email, setEmail] = useState('abc123@korea.com')
  const [emailConsent, setEmailConsent] = useState('agree')
  const [consultingDoctor, setConsultingDoctor] = useState('')
  const [title, setTitle] = useState('소아청소년과 김철수 선생님 자문을 요청드립니다.')
  const [content, setContent] = useState('')
  const [contentByteCount, setContentByteCount] = useState(0)

  // 텍스트 영역 바이트 계산
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setContent(text)
    // 한글은 3바이트, 영문/숫자는 1바이트로 계산
    const byteCount = new Blob([text]).size
    setContentByteCount(byteCount)
  }

  // 자문의 검색 핸들러
  const handleSearchDoctor = () => {
    // TODO: 자문의 검색 기능 구현
    console.log('자문의 검색')
  }

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 폼 제출 로직 구현
    console.log('폼 제출')
  }

  // 취소 핸들러
  const handleCancel = () => {
    // TODO: 취소 로직 구현
    console.log('취소')
  }

  // 안내사항 메시지
  const noticeMessages = [
    '의학적 자문을 요청하는 커뮤니티입니다.',
    '환자관련 개인정보가 노출되지 않도록 유의하여 주시길 바랍니다.',
    '진료협력센터(직통) : 02-920-5892, 5893, 5894'
  ]

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>e-Consult 신청</h1>

          <div className={styles.content}>
            {/* 안내사항 */}
            <div className={styles.section}>
              <SectionTitle title='안내사항' size='small' className={styles.sectionTitle} noMargin />
              <InfoBox
                variant='guide'
                messages={noticeMessages}
                showBullets={true}
                className={styles.noticeBox}
                contentAlign='center'
              />
            </div>

            {/* 개인정보 동의 */}
            <div className={styles.section}>
              <PrivacyConsentContent
                checkboxId='privacy-consent'
                checked={privacyConsent}
                onChange={setPrivacyConsent}
                checkboxLabel='개인정보 수집 및 이용 목적에 대한 동의'
                required={true}
                items={[
                  {
                    type: 'paragraph',
                    text: "1. 개인정보 등의 수집 · 이용목적 : 고려대학교의료원은 'e-Consult' 서비스 이용 시 기초 자료 수집을 위하여 다음과 같이 귀하의 개인정보를 수집 이용합니다."
                  },
                  {
                    type: 'paragraph',
                    text: '2. 수집하려는 개인정보 항목 : (필수) 이름, 의료기관명, 이메일'
                  },
                  {
                    type: 'subList',
                    title: '3. 개인정보 등의 보유 및 이용기간',
                    items: [
                      { text: '홈페이지 회원 탈퇴 시 파기', href: '#' },
                      { text: '답변일로부터 2년', href: '#' }
                    ]
                  },
                  {
                    type: 'paragraph',
                    text: "4. 동의를 거부할 권리 / 동의거부에 따른 안내 개인정보 수집 및 이용에 대해 거부할 권리가 있으며 다만, 개인정보 수집동의 거부 시에는 'e-Consult' 서비스 이용이 제한됩니다."
                  }
                ]}
              />
            </div>

            {/* 신청자 정보 */}
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>신청자 정보</h2>
                <p className={styles.formSubtitle}>필수 입력 항목을 모두 입력해주세요.</p>
                <div className={styles.divider}></div>
              </div>
              <div className={styles.formFields}>
                <div className={styles.field}>
                  <InputLabel htmlFor='applicant-name' required>
                    신청자명
                  </InputLabel>
                  <Input
                    id='applicant-name'
                    value={applicantName}
                    onChange={e => setApplicantName(e.target.value)}
                    placeholder='신청자명을 입력하세요'
                    className={styles.input}
                    disabled
                  />
                </div>
                <div className={styles.field}>
                  <InputLabel htmlFor='hospital-phone' required>
                    병원 전화번호
                  </InputLabel>
                  <Input
                    id='hospital-phone'
                    value={hospitalPhone}
                    onChange={e => setHospitalPhone(e.target.value)}
                    placeholder='병원 전화번호를 입력하세요'
                    className={styles.input}
                    disabled
                  />
                </div>
                <div className={styles.field}>
                  <InputLabel htmlFor='email' required>
                    이메일
                  </InputLabel>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='이메일을 입력하세요'
                    className={styles.input}
                    disabled
                  />
                </div>
                <div className={styles.field}>
                  <InputLabel required>E-mail 동의 여부</InputLabel>
                  <Radio
                    name='email-consent'
                    value={emailConsent}
                    options={[
                      { value: 'agree', label: '동의' },
                      { value: 'disagree', label: '비동의' }
                    ]}
                    onChange={setEmailConsent}
                    className={styles.radio}
                  />
                </div>
                <FormField
                  label='자문의'
                  required
                  id='consulting-doctor'
                  name='consulting-doctor'
                  type='text'
                  placeholder='소아청소년과 김철수'
                  value={consultingDoctor}
                  onChange={e => setConsultingDoctor(e.target.value)}
                  buttonText='자문의 검색'
                  onButtonClick={handleSearchDoctor}
                  buttonIcon={<SearchIcon width={22} height={22} fill='#fff' />}
                  error=''
                />
              </div>
            </div>

            {/* e-Consult 신청 */}
            <div className={styles.formSection}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>e-Consult 신청</h2>
                <p className={styles.formSubtitle}>필수 입력 항목을 모두 입력해주세요.</p>
                <div className={styles.divider}></div>
              </div>
              <div className={styles.formFields}>
                <div className={styles.field}>
                  <InputLabel htmlFor='title' required>
                    제목
                  </InputLabel>
                  <Input
                    id='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='제목을 입력하세요'
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <InputLabel htmlFor='content' required>
                    내용
                  </InputLabel>
                  <Textarea
                    id='content'
                    value={content}
                    onChange={handleContentChange}
                    placeholder='입력예시 : 내원 시 미열(37.8℃), 기침과 객담 호소, 약간의 호습곤란 있음.
활력징후: 혈압 130/80mmHg, 맥박 92회/분, 호흡수 18회/분, 체온 37.8℃.
주호소: 1주일 전부터 심해진 기침과 무기력.'
                    rows={10}
                    className={styles.textarea}
                    maxLength={1500}
                  />
                  <div className={styles.byteCounter}>
                    <span className={styles.required}>*</span>
                    <span>{contentByteCount} / 1500 bytes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className={styles.buttonGroup}>
              <button type='button' onClick={handleCancel} className={styles.cancelButton}>
                취소
              </button>
              <button type='submit' onClick={handleSubmit} className={styles.submitButton}>
                등록
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
