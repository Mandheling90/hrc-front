'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { useHospital } from '@/hooks'
import { useAuthContext } from '@/contexts/AuthContext'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { Radio } from '@/components/atoms/Radio/Radio'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { PrivacyConsentContent } from '@/components/molecules/PrivacyConsentContent/PrivacyConsentContent'
import { FormField } from '@/components/molecules/FormField/FormField'
import { DoctorSearchModal } from '@/components/molecules/DoctorSearchModal/DoctorSearchModal'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './page.module.scss'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { ConfirmButtons } from '@/components/molecules/ConfirmButtons/ConfirmButtons'
import type { Doctor } from '@/components/molecules/DoctorSearchModal/DoctorSearchModal'
import { CREATE_ECONSULT_MUTATION } from '@/graphql/econsult/mutations'
import { ECONSULT_CONSULTANTS_QUERY } from '@/graphql/econsult/queries'
import { HospitalCode } from '@/graphql/__generated__/types'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useMedicalStaff } from '@/hooks/useMedicalStaff'
import { DEV_ECONSULT_CONSULTANTS } from '@/utils/devDefaultData'

const isDev = process.env.NODE_ENV === 'development'

const HOSPITAL_CODE_MAP: Record<string, HospitalCode> = {
  anam: HospitalCode.Anam,
  guro: HospitalCode.Guro,
  ansan: HospitalCode.Ansan
}

export default function EConsultPage() {
  const { isAnam, hospitalId } = useHospital()
  const { user } = useAuthContext()
  const router = useHospitalRouter()

  // 폼 상태
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [hospitalName, setHospitalName] = useState('')
  const [email, setEmail] = useState('')
  const [emailConsent, setEmailConsent] = useState('agree')
  const [consultingDoctor, setConsultingDoctor] = useState('')
  const [selectedDoctorId, setSelectedDoctorId] = useState('')
  const [selectedDoctorName, setSelectedDoctorName] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [contentByteCount, setContentByteCount] = useState(0)
  const [isDoctorSearchModalOpen, setIsDoctorSearchModalOpen] = useState(false)
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  })

  // 로그인 사용자 정보로 폼 초기화 + 자문의 검색 팝업 자동 열기
  useEffect(() => {
    if (user) {
      setApplicantName(user.userName || '')
      setHospitalName(user.profile?.hospName || '')
      setEmail(user.email || '')
      setEmailConsent(user.profile?.emailConsent ? 'agree' : 'disagree')

      setIsDoctorSearchModalOpen(true)
    }
  }, [user])

  // 자문의 목록 조회
  const hospitalCodeEnum = HOSPITAL_CODE_MAP[hospitalId] || HospitalCode.Anam
  const { data: consultantsData, loading: consultantsLoading } = useQuery<{ adminEconsultConsultants: Array<{ id: string; doctorId: string; name: string; email: string; departmentName: string; photoUrl: string; specialty: string; isActive: boolean }> }>(ECONSULT_CONSULTANTS_QUERY, {
    variables: { hospitalCode: hospitalCodeEnum },
    skip: isDev
  })

  // dev: medicalStaffList 조회 → 하드코딩 자문의 ID와 매칭하여 진료과 정보 보강
  const { fetchMedicalStaff, staffList, loading: staffLoading } = useMedicalStaff()
  const [devStaffFetched, setDevStaffFetched] = useState(false)
  useEffect(() => {
    if (isDev) {
      fetchMedicalStaff().then(() => setDevStaffFetched(true))
    }
  }, [fetchMedicalStaff])
  const devLoading = isDev && (!devStaffFetched || staffLoading)

  const econsultDoctors: Doctor[] = useMemo(() => {
    if (!isDev) {
      return (consultantsData?.adminEconsultConsultants ?? [])
        .filter(c => c.isActive)
        .map(c => ({
          id: c.id,
          doctorId: c.doctorId,
          name: c.name,
          email: c.email || '',
          department: c.departmentName || '',
          photoUrl: c.photoUrl || undefined,
          bio: c.specialty || undefined,
          selected: false
        }))
    }

    // medicalStaffList에서 doctorId → staff 정보 매핑
    const staffMap = new Map<string, { departmentName: string; photoUrl: string | null; bio: string | null }>()
    for (const s of staffList) {
      if (s.doctorId) {
        staffMap.set(s.doctorId, { departmentName: s.departmentName, photoUrl: s.photoUrl, bio: s.bio })
      }
    }

    return DEV_ECONSULT_CONSULTANTS.map(c => {
      const staff = staffMap.get(c.doctorId)
      return {
        id: c.id,
        doctorId: c.doctorId,
        name: c.name,
        email: c.email,
        department: staff?.departmentName || c.departmentName,
        photoUrl: staff?.photoUrl || undefined,
        bio: staff?.bio || undefined,
        selected: false
      }
    })
  }, [consultantsData, staffList])

  // GraphQL Mutation
  const [createEConsult, { loading: submitting }] = useMutation(CREATE_ECONSULT_MUTATION)

  // 텍스트 영역 바이트 계산
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setContent(text)
    const byteCount = new Blob([text]).size
    setContentByteCount(byteCount)
  }

  // 자문의 검색 핸들러
  const handleSearchDoctor = () => {
    setIsDoctorSearchModalOpen(true)
  }

  // 자문의 선택 확인 핸들러
  const handleDoctorConfirm = (selectedDoctors: Doctor[]) => {
    if (selectedDoctors.length > 0) {
      const doctor = selectedDoctors[0]
      const doctorNames = selectedDoctors
        .map(d => (d.department ? `${d.department} ${d.name}` : d.name))
        .join(', ')
      setConsultingDoctor(doctorNames)
      setSelectedDoctorId(doctor.id || doctor.doctorId || '')
      setSelectedDoctorName(doctor.name || '')
      setSelectedDepartment(doctor.department || '')
    }
  }

  // 유효성 검사
  const validateForm = (): string | null => {
    if (!privacyConsent) return '개인정보 수집 및 이용 목적에 동의해주세요.'
    if (!applicantName.trim()) return '신청자명을 입력해주세요.'
    if (!hospitalName.trim()) return '의료기관명을 입력해주세요.'
    if (!email.trim()) return '이메일을 입력해주세요.'
    if (!selectedDoctorId) return '자문의를 선택해주세요.'
    if (!title.trim()) return '제목을 입력해주세요.'
    if (!content.trim()) return '내용을 입력해주세요.'
    if (contentByteCount > 1500) return '내용은 1500 bytes를 초과할 수 없습니다.'
    return null
  }

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    const error = validateForm()
    if (error) {
      setAlertModal({ isOpen: true, message: error })
      return
    }

    try {
      const hospitalCodeEnum = HOSPITAL_CODE_MAP[hospitalId] || HospitalCode.Anam

      await createEConsult({
        variables: {
          input: {
            hospitalCode: hospitalCodeEnum,
            consultantId: selectedDoctorId,
            title: title.trim(),
            content: content.trim()
          }
        }
      })

      setAlertModal({ isOpen: true, message: 'e-Consult 신청이 완료되었습니다.\n자문의 답변 완료 시 등록하신 이메일을 통해 안내드리겠습니다.' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'e-Consult 신청에 실패했습니다.'
      setAlertModal({ isOpen: true, message })
    }
  }

  // 알림 모달 닫기 핸들러
  const handleAlertClose = () => {
    const wasSuccess = alertModal.message === 'e-Consult 신청이 완료되었습니다.\n자문의 답변 완료 시 등록하신 이메일을 통해 안내드리겠습니다.'
    setAlertModal({ isOpen: false, message: '' })
    if (wasSuccess) {
      router.push('/mypage/e-consult')
    }
  }

  // 취소 핸들러
  const handleCancel = () => {
    router.back()
  }

  // 안내사항 메시지
  const noticeMessages = isAnam
    ? [
        '고려대학교안암병원 자문의를 통하여 온라인으로 진료상담이 가능합니다.',
        '희망하시는 진료과의 자문의를 선택하여 문의하실 수 있습니다.',
        '답변이 등록되면, 신청자분의 e-mail로 안내드릴 예정이며, 답변은 마이페이지에서 조회가 가능합니다.'
      ]
    : [
        '의학적 자문을 요청하는 커뮤니티입니다.',
        '환자관련 개인정보가 노출되지 않도록 유의하여 주시길 바랍니다.',
        '진료협력센터(직통) : 02-920-5964, 5893, 5894'
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
                showBullets={!isAnam}
                className={styles.noticeBox}
                contentAlign='center'
                textAlign={isAnam ? 'center' : undefined}
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
                  <InputLabel htmlFor='hospital-name' required>
                    의료기관명
                  </InputLabel>
                  <Input
                    id='hospital-name'
                    value={hospitalName}
                    onChange={e => setHospitalName(e.target.value)}
                    placeholder='의료기관명을 입력하세요'
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
                  placeholder='자문의를 검색해주세요'
                  value={consultingDoctor}
                  onChange={e => setConsultingDoctor(e.target.value)}
                  readOnly
                  buttonText='자문의 검색'
                  onButtonClick={handleSearchDoctor}
                  buttonIcon={<SearchIcon width={22} height={22} fill='#fff' />}
                  error=''
                  mobileStack
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
                    <span className={styles.required}></span>
                    <span>{contentByteCount} / 1500 bytes</span>
                  </div>
                </div>
              </div>
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

            {/* 버튼 */}
            <ConfirmButtons
              primaryButton={{
                label: submitting ? '등록 중...' : '컨설팅 등록',
                onClick: handleSubmit,
                disabled: submitting
              }}
              secondaryButton={{
                label: '취소',
                onClick: handleCancel
              }}
              noMargin
            />
          </div>
        </div>
      </main>
      <Footer />

      {/* 자문의 검색 모달 */}
      <DoctorSearchModal
        isOpen={isDoctorSearchModalOpen}
        onClose={() => setIsDoctorSearchModalOpen(false)}
        onConfirm={handleDoctorConfirm}
        closeOnBackdropClick={true}
        externalDoctors={econsultDoctors}
        externalLoading={isDev ? devLoading : consultantsLoading}
      />

      {/* 알림 모달 */}
      <AlertModal isOpen={alertModal.isOpen} message={alertModal.message} onClose={handleAlertClose} />
    </div>
  )
}
