'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useHospital } from '@/hooks'
import styles from './Header.module.scss'

// 전화 아이콘
const PhoneIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
    <path
      d='M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z'
      fill='currentColor'
    />
  </svg>
)

// 팩스 아이콘
const FaxIcon = () => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
    <path
      d='M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z'
      fill='currentColor'
    />
  </svg>
)

// 메뉴 데이터 타입
interface SubMenuItem {
  href: string
  label: string
  disabled?: boolean // 아직 개발되지 않은 페이지
}

interface MenuItem {
  label: string
  subItems: SubMenuItem[]
}

// 공통 메뉴
const commonMenuItems: MenuItem[] = [
  {
    label: '진료의뢰',
    subItems: [
      { href: '/referral', label: '진료의뢰시스템 소개' },
      { href: '/referral/request', label: '진료협력센터 의뢰' },
      { href: '/referral/request/exchange', label: '진료정보교류 의뢰' },
      { href: '/referral/request/hira', label: '심평원중계시스템 의뢰' },
      { href: '/referral/department', label: '진료과 안내' }
    ]
  },
  {
    label: '협력네트워크',
    subItems: [
      { href: '/referral/network', label: '협력네트워크 소개&신청' },
      { href: '/network/hospital-apply', label: '협력병원 신청', disabled: true },
      { href: '/network/hospital-list', label: '협력병의원 현황', disabled: true },
      { href: '/network/hotline', label: '교수직통 핫라인', disabled: true },
      { href: '/network/e-consult', label: 'e-Consult 신청', disabled: true }
    ]
  },
  {
    label: '공지/정보',
    subItems: [
      { href: '/notice/list', label: '공지사항', disabled: true },
      { href: '/notice/news', label: '병원소식', disabled: true },
      { href: '/notice/event', label: '교육/행사', disabled: true }
    ]
  },
  {
    label: '진료협력센터 소개',
    subItems: [
      { href: '/about/intro', label: '진료협력센터 소개', disabled: true },
      { href: '/about/greeting', label: '센터장 인사말', disabled: true },
      { href: '/about/organization', label: '조직도/연락처', disabled: true },
      { href: '/about/location', label: '오시는 길', disabled: true }
    ]
  }
]

// 마이페이지 메뉴 (로그인 시)
const myPageMenu: MenuItem = {
  label: '마이페이지',
  subItems: [
    { href: '/mypage/info', label: '회원정보 수정', disabled: true },
    { href: '/mypage/hospital-info', label: '협력병원 정보수정', disabled: true },
    { href: '/mypage/patients', label: '의뢰환자 조회', disabled: true },
    { href: '/mypage/e-consult', label: 'e-Consult 조회', disabled: true }
  ]
}

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<number>(0)
  const [activeMobileMenu, setActiveMobileMenu] = useState(0)
  const { hospital } = useHospital()
  const pathname = usePathname()

  // 임시 로그인 상태
  const isLoggedIn = false
  const menuItems = isLoggedIn ? [...commonMenuItems, myPageMenu] : commonMenuItems

  // 현재 경로가 메뉴 href와 정확히 일치하는지 확인
  const isCurrentPage = (href: string) => {
    return pathname === href
  }

  // 모바일 메뉴 열기
  const openMobileMenu = () => {
    setIsMenuOpen(true)
    setActiveMobileMenu(0)
    document.body.style.overflow = 'hidden'
  }

  // 모바일 메뉴 닫기
  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
  }

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false)
        closeMobileMenu()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      {/* 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.container}>
            <div className={styles.headerInner}>
              {/* 로고 */}
              <h1 className={styles.logo}>
                <Link href='/' aria-label={`${hospital.name.full} 홈`}>
                  {hospital.name.full}
                </Link>
              </h1>

              {/* 데스크톱 GNB */}
              <nav
                className={styles.gnb}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <ul className={styles.gnbList}>
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className={`${styles.gnbItem} ${isDropdownOpen && activeMenu === index ? styles.active : ''}`}
                      onMouseEnter={() => setActiveMenu(index)}
                    >
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* 유틸 영역 */}
              <div className={styles.util}>
                {/* 데스크톱 */}
                <div className={styles.utilDesktop}>
                  {isLoggedIn ? (
                    <>
                      <button type='button' className={styles.textLink}>
                        로그아웃
                      </button>
                      <span className={styles.divider}>|</span>
                      <Link href='/mypage/info' className={styles.textLink}>
                        정보수정
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href='/login' className={styles.textLink}>
                        로그인
                      </Link>
                      <span className={styles.divider}>|</span>
                      <Link href='/signup' className={styles.textLink}>
                        회원가입
                      </Link>
                    </>
                  )}
                </div>

                {/* 모바일/태블릿 */}
                <div className={styles.utilMobile}>
                  <Link href='/login' className={styles.iconBtn} aria-label='로그인'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path
                        d='M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12ZM12 14C8.67 14 2 15.67 2 19V22H22V19C22 15.67 15.33 14 12 14Z'
                        fill='currentColor'
                      />
                    </svg>
                  </Link>
                  <button type='button' className={styles.iconBtn} onClick={openMobileMenu} aria-label='메뉴'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                      <path d='M3 6H21V8H3V6ZM3 11H21V13H3V11ZM3 16H21V18H3V16Z' fill='currentColor' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 드롭다운 메뉴 */}
        <div
          className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className={styles.container}>
            <div className={styles.dropdownInner}>
              {/* 좌측 안내 */}
              <div className={styles.dropdownInfo}>
                <h2>이용안내</h2>
                <p>REFERRAL CENTER Information</p>
                <div className={styles.contactBox}>
                  <div className={styles.contactItem}>
                    <PhoneIcon />
                    <span>문의</span>
                    <a href={`tel:${hospital.contact.referralCenter.replace(/[^0-9]/g, '')}`}>
                      {hospital.contact.referralCenter}
                    </a>
                  </div>
                  <div className={styles.contactItem}>
                    <FaxIcon />
                    <span>FAX</span>
                    <span>{hospital.contact.fax}</span>
                  </div>
                </div>
              </div>

              {/* 빌딩 이미지 */}
              <div className={styles.buildingImage} aria-hidden='true' />

              {/* 메뉴 컬럼들 */}
              <div className={styles.dropdownMenus}>
                {menuItems.map((menu, index) => (
                  <div key={index} className={`${styles.menuColumn} ${activeMenu === index ? styles.active : ''}`}>
                    <h3>{menu.label}</h3>
                    <ul>
                      {menu.subItems.map((sub, subIndex) => (
                        <li key={subIndex}>
                          {sub.disabled ? (
                            <span className={styles.disabled}>{sub.label}</span>
                          ) : (
                            <Link href={sub.href} className={isCurrentPage(sub.href) ? styles.highlight : ''}>
                              {sub.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* 우측 여백 (util 영역과 정렬) */}
              <div className={styles.dropdownUtil} />
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 오버레이 */}
      {isMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu} />}

      {/* 모바일 메뉴 (~768px) */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileHeader}>
          <Link href='/' className={styles.mobileLogo} onClick={closeMobileMenu}>
            {hospital.name.full}
          </Link>
          <button type='button' className={styles.closeBtn} onClick={closeMobileMenu} aria-label='닫기'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>

        <div className={styles.mobileBody}>
          <ul className={styles.mobileMainMenu}>
            {menuItems.map((item, index) => (
              <li key={index} className={activeMobileMenu === index ? styles.active : ''}>
                <button type='button' onClick={() => setActiveMobileMenu(index)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.mobileSubMenu}>
            {menuItems[activeMobileMenu]?.subItems.map((sub, index) =>
              sub.disabled ? (
                <span key={index} className={styles.disabled}>
                  {sub.label}
                </span>
              ) : (
                <Link
                  key={index}
                  href={sub.href}
                  className={isCurrentPage(sub.href) ? styles.highlight : ''}
                  onClick={closeMobileMenu}
                >
                  {sub.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div className={styles.mobileFooter}>
          <div className={styles.mobileContact}>
            <span>
              <PhoneIcon /> 문의
            </span>
            <a href={`tel:${hospital.contact.referralCenter.replace(/[^0-9]/g, '')}`}>
              {hospital.contact.referralCenter}
            </a>
          </div>
          <div className={styles.mobileContact}>
            <span>
              <FaxIcon /> FAX
            </span>
            <span>{hospital.contact.fax}</span>
          </div>
        </div>
      </div>

      {/* 태블릿 메뉴 (769px ~ 1024px) */}
      <div className={`${styles.tabletMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.tabletHeader}>
          <Link href='/' className={styles.tabletLogo} onClick={closeMobileMenu}>
            {hospital.name.full}
          </Link>
          <button type='button' className={styles.closeBtn} onClick={closeMobileMenu} aria-label='닫기'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z'
                fill='currentColor'
              />
            </svg>
          </button>
        </div>

        <div className={styles.tabletBody}>
          {menuItems.map((menu, index) => (
            <div key={index} className={styles.tabletSection}>
              <h3>
                <span className={styles.bullet} />
                {menu.label}
              </h3>
              <div className={styles.tabletLinks}>
                {menu.subItems.map((sub, subIndex) =>
                  sub.disabled ? (
                    <span key={subIndex} className={styles.disabled}>
                      {sub.label}
                    </span>
                  ) : (
                    <Link
                      key={subIndex}
                      href={sub.href}
                      className={isCurrentPage(sub.href) ? styles.highlight : ''}
                      onClick={closeMobileMenu}
                    >
                      {sub.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tabletFooter}>
          <div className={styles.tabletContact}>
            <span>
              <PhoneIcon /> 문의
            </span>
            <a href={`tel:${hospital.contact.referralCenter.replace(/[^0-9]/g, '')}`}>
              {hospital.contact.referralCenter}
            </a>
          </div>
          <div className={styles.tabletContact}>
            <span>
              <FaxIcon /> FAX
            </span>
            <span>{hospital.contact.fax}</span>
          </div>
        </div>
      </div>
    </>
  )
}
