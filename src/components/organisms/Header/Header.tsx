'use client'

import Link from '@/components/atoms/HospitalLink'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { Suspense, useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useHospital } from '@/hooks'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useAuthContext } from '@/contexts/AuthContext'
import { useLogout } from '@/hooks/useAuth'

import { useMenus } from '@/hooks/useMenus'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
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
      { href: '/network', label: '협력네트워크 소개&신청' },
      { href: '/network/status', label: '협력병의원 현황' },
      { href: '/network/hotline', label: '교수직통 핫라인' },
      { href: '/network/e-consult', label: 'e-Consult 신청' }
    ]
  },
  {
    label: '공지/정보',
    subItems: [
      { href: '/notice/list', label: '공지사항' },
      { href: '/notice/news', label: '병원소식' },
      { href: '/notice/event', label: '교육/행사' }
    ]
  },
  {
    label: '진료협력센터 소개',
    subItems: [
      { href: '/about/intro', label: '진료협력센터 소개' },
      { href: '/about/greeting', label: '센터장 인사말' },
      { href: '/about/organization', label: '조직도/연락처' },
      { href: '/about/location', label: '오시는 길' }
    ]
  }
]

// 마이페이지 메뉴 (로그인 시)
const myPageMenu: MenuItem = {
  label: '마이페이지',
  subItems: [
    { href: '/mypage/edit-profile', label: '회원정보 수정' },
    { href: '/mypage/edit-clinic', label: '협력병의원 정보수정' },
    { href: '/mypage/patient-inquiry', label: '의뢰환자 조회' },
    { href: '/mypage/e-consult', label: 'e-Consult 조회' }
  ]
}

const HeaderInner: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<number>(0)
  const [activeMobileMenu, setActiveMobileMenu] = useState(0)
  const [openBreadcrumbDropdown, setOpenBreadcrumbDropdown] = useState<number | null>(null)
  const breadcrumbRef = useRef<HTMLElement>(null)
  const mobileBreadcrumbRef = useRef<HTMLDivElement>(null)
  const { hospital, hospitalId } = useHospital()
  const router = useHospitalRouter()
  const { isAuthenticated, user } = useAuthContext()
  const { logout } = useLogout()

  const logoUrl = `/images/common/${hospitalId}/logo-top.png`
  const pathname = usePathname()
  const searchParams = useSearchParams()
  // 쿼리스트링 포함 경로 (예: /content?id=xxx) - API 메뉴 매칭용
  const fullPath = useMemo(() => {
    const qs = searchParams.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }, [pathname, searchParams])

  // 메인페이지 여부 (투명 헤더)
  const isMainPage = pathname === '/'

  const isLoggedIn = isAuthenticated
  const { menus: apiMenus } = useMenus()

  // API 메뉴 데이터를 MenuItem 형식으로 변환
  const apiMenuItems: MenuItem[] = useMemo(() => {
    if (apiMenus.length === 0) return []
    return apiMenus
      .filter(menu => menu.gnbExposure)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(menu => ({
        label: menu.name,
        subItems: menu.children
          .filter(child => child.gnbExposure)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(child => {
            let href = child.path || '#'
            if (child.targetContentId) {
              href = `/content?id=${child.targetContentId}`
            } else if (child.targetBoardId) {
              href = `/board?boardId=${child.targetBoardId}`
            } else if (child.externalUrl) {
              href = child.externalUrl
            }
            return { href, label: child.name }
          })
      }))
      .filter(menu => menu.subItems.length > 0)
  }, [apiMenus])

  // 원장여부에 따라 마이페이지 메뉴 필터링
  const filteredMyPageMenu: MenuItem = useMemo(() => {
    if (user?.profile?.isDirector) return myPageMenu
    return {
      ...myPageMenu,
      subItems: myPageMenu.subItems.filter(item => item.href !== '/mypage/edit-clinic')
    }
  }, [user?.profile?.isDirector])

  // GNB 표시용 메뉴 (API 데이터 우선, 없으면 하드코딩 fallback)
  const menuItems = useMemo(() => {
    const baseMenus = apiMenuItems.length > 0 ? apiMenuItems : commonMenuItems

    return isLoggedIn ? [...baseMenus, filteredMyPageMenu] : baseMenus
  }, [isLoggedIn, apiMenuItems, filteredMyPageMenu])

  // Breadcrumb 매칭용 메뉴 (API 메뉴 + 하드코딩 메뉴 모두 포함)
  const breadcrumbMenuItems = useMemo(() => {
    if (apiMenuItems.length > 0) {
      const base = [...apiMenuItems, ...commonMenuItems]
      return isLoggedIn ? [...base, filteredMyPageMenu] : base
    }
    return menuItems
  }, [apiMenuItems, isLoggedIn, filteredMyPageMenu, menuItems])

  // 현재 경로가 메뉴 href와 일치하는지 확인
  const isCurrentPage = (href: string) => {
    return pathname === href || fullPath === href
  }

  // 메뉴 href가 현재 경로에 매칭되는지 확인 (정확도 점수 반환: 0=불일치, 1=경로만, 2=쿼리스트링 포함 완전일치)
  const getMatchScore = useCallback((href: string): number => {
    const hrefPath = href.split('?')[0]

    // 쿼리스트링 포함 완전 일치 (가장 높은 우선순위)
    if (fullPath === href || pathname === href) return 2
    // 경로만 일치 (쿼리스트링 무시)
    if (pathname === hrefPath || pathname.startsWith(hrefPath + '/')) return 1
    return 0
  }, [pathname, fullPath])

  // 하위 호환용 boolean 래퍼
  const isMatchingHref = useCallback((href: string) => {
    return getMatchScore(href) > 0
  }, [getMatchScore])

  // 현재 경로가 속한 메뉴 섹션 인덱스 (GNB 활성 표시용)
  const currentMenuIndex = useMemo(() => {
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].subItems.some(sub => isMatchingHref(sub.href))) {
        return i
      }
    }
    return -1
  }, [menuItems, isMatchingHref])

  // Breadcrumbs 표시 여부 (메인, 로그인, 회원가입, 아이디 비밀번호 찾기, 비밀번호 재설정, 자문의 로그인 제외)
  const shouldShowBreadcrumbs = useMemo(() => {
    const excludedPaths = ['/', '/login', '/signup', '/find-user', '/reset-password', '/network/e-consult/login']
    return !excludedPaths.includes(pathname)
  }, [pathname])

  // pathname 기반으로 Breadcrumbs 아이템 자동 생성 (드롭다운 옵션 포함)
  const breadcrumbItems = useMemo(() => {
    if (!shouldShowBreadcrumbs) return []

    interface DropdownOption {
      label: string
      href: string
      isActive: boolean
    }

    interface BreadcrumbItem {
      label: string
      href?: string
      isHome?: boolean
      dropdownItems?: DropdownOption[]
    }

    const items: BreadcrumbItem[] = []

    // 홈 아이콘
    items.push({ label: '', href: '/', isHome: true })

    // 현재 경로가 속한 메뉴 카테고리 찾기 (정확도 점수 → href 길이 순 우선)
    let currentCategory: MenuItem | null = null
    let currentSubItem: SubMenuItem | null = null
    let bestScore = 0
    let bestMatchLength = -1

    for (const menu of breadcrumbMenuItems) {
      for (const sub of menu.subItems) {
        const score = getMatchScore(sub.href)
        if (score > 0 && (score > bestScore || (score === bestScore && sub.href.length > bestMatchLength))) {
          bestScore = score
          bestMatchLength = sub.href.length
          currentCategory = menu
          currentSubItem = sub
        }
      }
    }

    if (currentCategory && currentSubItem) {
      // 레벨 1: 대분류 (메뉴 카테고리) - 드롭다운: 모든 카테고리
      items.push({
        label: currentCategory.label,
        dropdownItems: menuItems.map(menu => ({
          label: menu.label,
          href: menu.subItems[0].href,
          isActive: menu.label === currentCategory!.label
        }))
      })

      // 레벨 2: 소분류 (서브페이지) - 드롭다운: 현재 카테고리의 모든 서브페이지
      // 매칭된 카테고리에서 서브아이템 목록 가져오기 (API/하드코딩 모두 확인)
      const matchedCategory = breadcrumbMenuItems.find(m => m.label === currentCategory!.label)
      const subItems = matchedCategory?.subItems ?? currentCategory.subItems
      items.push({
        label: currentSubItem.label,
        dropdownItems: subItems
          .filter(sub => !sub.disabled)
          .map(sub => ({
            label: sub.label,
            href: sub.href,
            isActive: sub.href === currentSubItem!.href
          }))
      })
    }

    return items
  }, [pathname, fullPath, shouldShowBreadcrumbs, menuItems, breadcrumbMenuItems, isMatchingHref, getMatchScore])

  // 브래드크럼 드롭다운 토글
  const handleBreadcrumbToggle = useCallback((index: number) => {
    setOpenBreadcrumbDropdown(prev => (prev === index ? null : index))
  }, [])

  // 브래드크럼 드롭다운 외부 클릭 감지
  useEffect(() => {
    if (openBreadcrumbDropdown === null) return

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const isInsideBreadcrumb =
        breadcrumbRef.current?.contains(target) || mobileBreadcrumbRef.current?.contains(target)
      if (!isInsideBreadcrumb) {
        setOpenBreadcrumbDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openBreadcrumbDropdown])

  // 경로 변경 시 드롭다운 닫기
  useEffect(() => {
    setOpenBreadcrumbDropdown(null)
  }, [pathname])

  // 모바일 메뉴 열기
  const openMobileMenu = () => {
    setIsMenuOpen(true)
    setActiveMobileMenu(currentMenuIndex >= 0 ? currentMenuIndex : 0)
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
        setOpenBreadcrumbDropdown(null)
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
      <header
        className={`${styles.header} ${isMainPage ? styles.transparent : ''} ${isMainPage && isDropdownOpen ? styles.headerActive : ''}`}
      >
        <div className={styles.headerTop}>
          <div className={styles.container}>
            <div className={styles.headerInner}>
              {/* 로고 */}
              <h1 className={styles.logo}>
                <Link href='/' aria-label={`${hospital.name.full} 홈`} style={{ backgroundImage: `url(${logoUrl})` }}>
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
                      className={`${styles.gnbItem} ${isDropdownOpen && activeMenu === index ? styles.active : ''} ${currentMenuIndex === index ? styles.current : ''}`}
                      onMouseEnter={() => setActiveMenu(index)}
                    >
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          const firstSub = item.subItems.find(sub => !sub.disabled)
                          if (firstSub) router.push(firstSub.href)
                        }}
                      >{item.label}</span>
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
                      <button type='button' className={styles.textLink} onClick={() => logout()}>
                        로그아웃
                      </button>
                      <span className={styles.divider}>|</span>
                      <Link href='/mypage' className={styles.textLink}>
                        마이페이지
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
                  {isLoggedIn ? (
                    <>
                      <Link href='/mypage' className={styles.iconBtn} aria-label='마이페이지'>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                          <path
                            d='M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12ZM12 14C8.67 14 2 15.67 2 19V22H22V19C22 15.67 15.33 14 12 14Z'
                            fill='currentColor'
                          />
                        </svg>
                      </Link>
                      <button type='button' className={styles.iconBtn} aria-label='로그아웃' onClick={() => logout()}>
                        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M13 4H20C20.55 4 21 4.45 21 5V19C21 19.55 20.55 20 20 20H13' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                          <path d='M3 12H14.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                          <path d='M11 8.5L14.5 12L11 15.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <Link href='/login' className={styles.iconBtn} aria-label='로그인'>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path
                          d='M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12ZM12 14C8.67 14 2 15.67 2 19V22H22V19C22 15.67 15.33 14 12 14Z'
                          fill='currentColor'
                        />
                      </svg>
                    </Link>
                  )}
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
          {/* 장식 원형 배경 */}
          <img src='/images/common/dropdown-circles.svg' alt='' className={styles.dropdownCircles} aria-hidden='true' />
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

        {/* Breadcrumbs 영역 */}
        {shouldShowBreadcrumbs && (
          <div className={styles.breadcrumbsSection}>
            <div className={styles.container}>
              {/* 데스크톱/태블릿: 전체 Breadcrumbs */}
              <nav className={styles.breadcrumbsNav} aria-label='Breadcrumb' ref={breadcrumbRef}>
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <span className={styles.breadcrumbSeparator} aria-hidden='true' />}
                    {item.isHome ? (
                      <Link href='/' className={styles.breadcrumbHomeIcon}>
                        <HomeIcon width={20} height={20} fill='var(--gray-11)' />
                      </Link>
                    ) : (
                      <div className={styles.breadcrumbItemWrapper}>
                        <button
                          type='button'
                          className={`${styles.breadcrumbButton} ${openBreadcrumbDropdown === index ? styles.breadcrumbButtonActive : ''}`}
                          onClick={() => handleBreadcrumbToggle(index)}
                          aria-expanded={openBreadcrumbDropdown === index}
                        >
                          <span className={styles.breadcrumbText}>{item.label}</span>
                          <span
                            className={`${styles.breadcrumbChevron} ${openBreadcrumbDropdown === index ? styles.breadcrumbChevronOpen : ''}`}
                          >
                            <ChevronDownIcon width={14} height={14} fill='#000' />
                          </span>
                        </button>
                        {openBreadcrumbDropdown === index && item.dropdownItems && (
                          <div className={styles.breadcrumbDropdown}>
                            {item.dropdownItems.map((dropItem, dropIndex) => (
                              <Link
                                key={dropIndex}
                                href={dropItem.href}
                                className={`${styles.breadcrumbDropdownItem} ${dropItem.isActive ? styles.breadcrumbDropdownItemActive : ''}`}
                                onClick={() => setOpenBreadcrumbDropdown(null)}
                              >
                                {dropItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* 모바일: 현재 페이지만 표시 + 드롭다운 */}
              <div className={styles.breadcrumbsMobile} ref={mobileBreadcrumbRef}>
                <button
                  type='button'
                  className={styles.breadcrumbMobileButton}
                  onClick={() => handleBreadcrumbToggle(-1)}
                  aria-expanded={openBreadcrumbDropdown === -1}
                >
                  <span className={styles.breadcrumbMobileText}>
                    {breadcrumbItems.length > 1 ? breadcrumbItems[breadcrumbItems.length - 1]?.label || '' : ''}
                  </span>
                  <span
                    className={`${styles.breadcrumbMobileChevron} ${openBreadcrumbDropdown === -1 ? styles.breadcrumbMobileChevronOpen : ''}`}
                  >
                    <ChevronDownIcon width={12} height={12} fill='#000' />
                  </span>
                </button>
                {openBreadcrumbDropdown === -1 && breadcrumbItems.length > 1 && (
                  <div className={styles.breadcrumbMobileDropdown}>
                    {breadcrumbItems[breadcrumbItems.length - 1]?.dropdownItems?.map((dropItem, dropIndex) => (
                      <Link
                        key={dropIndex}
                        href={dropItem.href}
                        className={`${styles.breadcrumbDropdownItem} ${dropItem.isActive ? styles.breadcrumbDropdownItemActive : ''}`}
                        onClick={() => setOpenBreadcrumbDropdown(null)}
                      >
                        {dropItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 모바일 오버레이 */}
      {isMenuOpen && <div className={styles.overlay} onClick={closeMobileMenu} />}

      {/* 모바일 메뉴 (~768px) */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileHeader}>
          <Link
            href='/'
            className={styles.mobileLogo}
            onClick={closeMobileMenu}
            style={{ backgroundImage: `url(${logoUrl})` }}
          >
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
            <div className={styles.mobileSubLinks}>
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

            <div className={styles.mobileContactBox}>
              <div className={styles.mobileContact}>
                <div className={styles.mobileContactLabel}>
                  <PhoneIcon /> 문의
                </div>
                <a href={`tel:${hospital.contact.referralCenter.replace(/[^0-9]/g, '')}`}>
                  {hospital.contact.referralCenter}
                </a>
              </div>
              <div className={styles.mobileContact}>
                <div className={styles.mobileContactLabel}>
                  <FaxIcon /> FAX
                </div>
                <span>{hospital.contact.fax}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 태블릿 메뉴 (769px ~ 1024px) */}
      <div className={`${styles.tabletMenu} ${isMenuOpen ? styles.open : ''}`}>
        {/* 장식 원형 배경 */}
        <img src='/images/common/dropdown-circles.svg' alt='' className={styles.tabletCircles} aria-hidden='true' />
        <div className={styles.tabletHeader}>
          <Link
            href='/'
            className={styles.tabletLogo}
            onClick={closeMobileMenu}
            style={{ backgroundImage: `url(${logoUrl})` }}
          >
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

export const Header: React.FC = () => (
  <Suspense>
    <HeaderInner />
  </Suspense>
)
