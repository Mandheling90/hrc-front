'use client'

import React from 'react'
import styles from './page.module.scss'

const BASE_URL = 'https://hrc-front.vercel.app'

interface PageItem {
  name: string
  path: string
  status: 'complete' | 'progress' | 'pending'
}

interface SubCategory {
  name: string
  pages: PageItem[]
}

interface Category {
  title: string
  subCategories: SubCategory[]
}

const pageData: Category[] = [
  {
    title: '메인화면',
    subCategories: [
      {
        name: '메인페이지',
        pages: [
          { name: '메인페이지', path: '/', status: 'complete' },
          { name: '로그인', path: '/login', status: 'complete' },
          { name: '회원가입', path: '/signup', status: 'complete' },
          { name: '아이디/비밀번호 찾기', path: '/find-user', status: 'complete' },
          { name: '비밀번호 재설정', path: '/reset-password', status: 'complete' }
        ]
      }
    ]
  },
  {
    title: '진료의뢰',
    subCategories: [
      {
        name: '진료의뢰시스템',
        pages: [
          { name: '진료의뢰시스템 소개', path: '/referral', status: 'complete' },
          { name: '진료협력센터 의뢰', path: '/referral/request', status: 'complete' },
          { name: '진료정보교류 의뢰', path: '/referral/request/exchange', status: 'complete' },
          { name: '심평원중계시스템 의뢰', path: '/referral/request/hira', status: 'complete' },
          { name: '진료과 안내', path: '/referral/department', status: 'complete' }
        ]
      }
    ]
  },
  {
    title: '협력네트워크',
    subCategories: [
      {
        name: '협력네트워크',
        pages: [
          { name: '협력네트워크 소개&신청', path: '/network', status: 'complete' },
          { name: '협력병원 신청', path: '/network/hospital-application', status: 'complete' },
          { name: '협력병원 신청 완료', path: '/network/hospital-application/complete', status: 'complete' },
          { name: '협력의원 신청', path: '/network/clinic-application', status: 'complete' },
          { name: '협력병의원 현황', path: '/network/status', status: 'complete' },
          { name: '교수직통 핫라인', path: '/network/hotline', status: 'complete' }
        ]
      },
      {
        name: 'e-Consult',
        pages: [
          { name: 'e-Consult 신청', path: '/network/e-consult', status: 'complete' },
          { name: 'e-Consult 로그인', path: '/network/e-consult/login', status: 'complete' },
          { name: 'e-Consult 목록', path: '/network/e-consult/list', status: 'complete' },
          { name: 'e-Consult 상세', path: '/network/e-consult/list/[id]', status: 'complete' }
        ]
      }
    ]
  },
  {
    title: '공지/정보',
    subCategories: [
      {
        name: '공지사항',
        pages: [
          { name: '공지사항 목록', path: '/notice/list', status: 'complete' },
          { name: '공지사항 상세', path: '/notice/list/[id]', status: 'complete' },
          { name: '병원소식', path: '/notice/news', status: 'complete' },
          { name: '교육/행사', path: '/notice/event', status: 'complete' }
        ]
      }
    ]
  },
  {
    title: '진료협력센터 소개',
    subCategories: [
      {
        name: '센터소개',
        pages: [
          { name: '진료협력센터 소개', path: '/about/intro', status: 'complete' },
          { name: '센터장 인사말', path: '/about/greeting', status: 'complete' },
          { name: '조직도/연락처', path: '/about/organization', status: 'complete' },
          { name: '오시는 길', path: '/about/location', status: 'complete' }
        ]
      }
    ]
  },
  {
    title: '마이페이지',
    subCategories: [
      {
        name: '회원정보',
        pages: [
          { name: '마이페이지', path: '/mypage', status: 'complete' },
          { name: '회원정보 수정', path: '/mypage/edit-profile', status: 'complete' },
          { name: '협력병원 정보수정', path: '/mypage/edit-hospital', status: 'complete' },
          { name: '협력의원 정보수정', path: '/mypage/edit-clinic', status: 'complete' },
          { name: '의뢰환자 조회', path: '/mypage/patient-inquiry', status: 'complete' },
          { name: '의뢰환자 결과', path: '/mypage/patient-result', status: 'complete' },
          { name: '회원탈퇴', path: '/mypage/withdraw', status: 'complete' }
        ]
      }
    ]
  },
  {
    title: '기타',
    subCategories: [
      {
        name: '개발용',
        pages: [{ name: '스타일 가이드', path: '/style-guide', status: 'complete' }]
      }
    ]
  }
]

const getStatusLabel = (status: PageItem['status']) => {
  switch (status) {
    case 'complete':
      return { text: '완료', className: styles.complete }
    case 'progress':
      return { text: '진행중', className: styles.progress }
    case 'pending':
      return { text: '대기', className: styles.pending }
  }
}

export default function PageListPage() {
  const totalPages = pageData.reduce(
    (acc, category) => acc + category.subCategories.reduce((subAcc, sub) => subAcc + sub.pages.length, 0),
    0
  )
  const completedPages = pageData.reduce(
    (acc, category) =>
      acc + category.subCategories.reduce((subAcc, sub) => subAcc + sub.pages.filter((p) => p.status === 'complete').length, 0),
    0
  )

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>2026 진료협력센터 프로젝트</h1>
      <p className={styles.subtitle}>
        진행률: {completedPages} / {totalPages} ({Math.round((completedPages / totalPages) * 100)}%)
      </p>

      {pageData.map((category, categoryIndex) => (
        <div key={categoryIndex} className={styles.category}>
          <div className={styles.categoryHeader}>
            <h2>{category.title}</h2>
          </div>

          <div className={styles.categoryBody}>
            {category.subCategories.map((subCategory, subIndex) => (
              <React.Fragment key={subIndex}>
                {category.subCategories.length > 1 || subCategory.name !== category.title ? (
                  <div className={styles.subCategoryRow}>
                    <div className={styles.subCategoryName}>{subCategory.name}</div>
                    <div className={styles.pageList}>
                      {subCategory.pages.map((page, pageIndex) => {
                        const status = getStatusLabel(page.status)
                        return (
                          <div key={pageIndex} className={styles.pageItem}>
                            <span className={styles.pageName}>{page.name}</span>
                            <a
                              href={`${BASE_URL}${page.path}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              className={styles.pageUrl}
                            >
                              {`${BASE_URL}${page.path}`}
                            </a>
                            <span className={`${styles.status} ${status.className}`}>● {status.text}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className={styles.simplePageList}>
                    {subCategory.pages.map((page, pageIndex) => {
                      const status = getStatusLabel(page.status)
                      return (
                        <div key={pageIndex} className={styles.pageItem}>
                          <span className={styles.pageName}>{page.name}</span>
                          <a
                            href={`${BASE_URL}${page.path}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className={styles.pageUrl}
                          >
                            {`${BASE_URL}${page.path}`}
                          </a>
                          <span className={`${styles.status} ${status.className}`}>● {status.text}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
