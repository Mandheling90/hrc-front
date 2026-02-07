'use client'

import React, { useState, useEffect } from 'react'
import styles from './page.module.scss'

// Atoms
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Select } from '@/components/atoms/Select/Select'

// Molecules
import { ServiceCard } from '@/components/molecules/ServiceCard/ServiceCard'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { ProgressSteps } from '@/components/molecules/ProgressSteps/ProgressSteps'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'

// Icons
import { CheckIcon } from '@/components/icons/CheckIcon'
import { ConsultingIcon } from '@/components/icons/ConsultingIcon'
import { EyeIcon } from '@/components/icons/EyeIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { InfoIcon } from '@/components/icons/InfoIcon'
import { IPinIcon } from '@/components/icons/IPinIcon'
import { LinkIcon } from '@/components/icons/LinkIcon'
import { NetworkIcon } from '@/components/icons/NetworkIcon'
import { PatientIcon } from '@/components/icons/PatientIcon'
import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { ReferralIcon } from '@/components/icons/ReferralIcon'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { ServiceTitleIcon } from '@/components/icons/ServiceTitleIcon'
import { ShieldIcon } from '@/components/icons/ShieldIcon'
import { SystemIcon } from '@/components/icons/SystemIcon'
import { WarningIcon } from '@/components/icons/WarningIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { PhoneRequestIcon } from '@/components/icons/PhoneRequestIcon'
import { DocumentReferralIcon } from '@/components/icons/DocumentReferralIcon'
import { HospitalPortalIcon } from '@/components/icons/HospitalPortalIcon'
import { SNSTalkIcon } from '@/components/icons/SNSTalkIcon'
import { ContinuityIcon } from '@/components/icons/ContinuityIcon'
import { SafetyIcon } from '@/components/icons/SafetyIcon'
import { QualityIcon } from '@/components/icons/QualityIcon'
import { ChartStepperIcon } from '@/components/icons/ChartStepperIcon'
import { DoctorIcon } from '@/components/icons/DoctorIcon'
import { FluentArrowCircleUpRight } from '@/components/icons/FluentArrowCircleUpRight'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'

// Color definitions
const primaryColors = [
  { name: 'Primary', hex: '#9f1836', scssVar: '$color-primary' },
  { name: 'Secondary', hex: '#c09c63', scssVar: '$color-secondary' },
  { name: 'Secondary BG', hex: '#fdf9f4', scssVar: '$color-secondary-bg' },
  { name: 'Secondary Hover', hex: '#dbbf93', scssVar: '$color-secondary-hover' },
  { name: 'Point', hex: '#ec5a29', scssVar: '$color-point' }
]

const baseColors = [
  { name: 'Background', hex: '#ffffff', scssVar: '$color-bg' },
  { name: 'Darken', hex: '#000000', scssVar: '$color-darken' },
  { name: 'White', hex: '#ffffff', scssVar: '$color-white' }
]

const systemColors = [
  { name: 'Error', hex: '#ff0000', scssVar: '$color-error' },
  { name: 'Red', hex: '#ff4141', scssVar: '$color-red' },
  { name: 'Blue', hex: '#418be2', scssVar: '$color-blue' }
]

const grayScale = [
  { name: 'Gray 1', hex: '#fdfdfd', scssVar: '$gray-1' },
  { name: 'Gray 2', hex: '#f9f9f9', scssVar: '$gray-2' },
  { name: 'Gray 3', hex: '#f0f0f0', scssVar: '$gray-3' },
  { name: 'Gray 4', hex: '#e8e8e8', scssVar: '$gray-4' },
  { name: 'Gray 5', hex: '#e1e1e1', scssVar: '$gray-5' },
  { name: 'Gray 6', hex: '#d9d9d9', scssVar: '$gray-6' },
  { name: 'Gray 7', hex: '#cecfcf', scssVar: '$gray-7' },
  { name: 'Gray 8', hex: '#bbbbbb', scssVar: '$gray-8' },
  { name: 'Gray 9', hex: '#8c8c8c', scssVar: '$gray-9' },
  { name: 'Gray 10', hex: '#828282', scssVar: '$gray-10' },
  { name: 'Gray 11', hex: '#636363', scssVar: '$gray-11' },
  { name: 'Gray 12', hex: '#202020', scssVar: '$gray-12' }
]

const darkModeColors = [
  { name: 'BG Dark', hex: '#0e0f10', scssVar: '$color-bg-dark' },
  { name: 'BG Dark Secondary', hex: '#16181b', scssVar: '$color-bg-dark-secondary' },
  { name: 'Text Dark', hex: '#f2f3f5', scssVar: '$color-text-dark' },
  { name: 'Text Dark Secondary', hex: '#d6dae1', scssVar: '$color-text-dark-secondary' }
]

// Typography definitions
const fontFamilies = [
  { name: 'Base (Pretendard)', scssVar: '$font-family-base' },
  { name: 'Paperozi', scssVar: '$font-family-paperozi' },
  { name: 'Paperlogy', scssVar: '$font-family-paperlogy' },
  { name: 'Mono', scssVar: '$font-family-mono' }
]

const fontSizes = [
  { name: 'xs', size: '12px', rem: '0.75rem', scssVar: '$font-size-xs' },
  { name: 'sm', size: '14px', rem: '0.875rem', scssVar: '$font-size-sm' },
  { name: 'base', size: '16px', rem: '1rem', scssVar: '$font-size-base' },
  { name: 'lg', size: '18px', rem: '1.125rem', scssVar: '$font-size-lg' },
  { name: 'xl', size: '20px', rem: '1.25rem', scssVar: '$font-size-xl' },
  { name: '2xl', size: '24px', rem: '1.5rem', scssVar: '$font-size-2xl' },
  { name: '3xl', size: '30px', rem: '1.875rem', scssVar: '$font-size-3xl' },
  { name: '4xl', size: '36px', rem: '2.25rem', scssVar: '$font-size-4xl' },
  { name: '5xl', size: '48px', rem: '3rem', scssVar: '$font-size-5xl' }
]

const fontWeights = [
  { name: 'Normal', value: 400, scssVar: '$font-weight-normal' },
  { name: 'Medium', value: 500, scssVar: '$font-weight-medium' },
  { name: 'Semibold', value: 600, scssVar: '$font-weight-semibold' },
  { name: 'Bold', value: 700, scssVar: '$font-weight-bold' }
]

const lineHeights = [
  { name: 'Tight', value: 1.25, scssVar: '$line-height-tight' },
  { name: 'Normal', value: 1.5, scssVar: '$line-height-normal' },
  { name: 'Relaxed', value: 1.75, scssVar: '$line-height-relaxed' }
]

// Spacing definitions
const spacings = [
  { name: 'spacing-1', size: '4px', rem: '0.25rem', scssVar: '$spacing-1' },
  { name: 'spacing-2', size: '8px', rem: '0.5rem', scssVar: '$spacing-2' },
  { name: 'spacing-3', size: '12px', rem: '0.75rem', scssVar: '$spacing-3' },
  { name: 'spacing-4', size: '16px', rem: '1rem', scssVar: '$spacing-4' },
  { name: 'spacing-5', size: '20px', rem: '1.25rem', scssVar: '$spacing-5' },
  { name: 'spacing-6', size: '24px', rem: '1.5rem', scssVar: '$spacing-6' },
  { name: 'spacing-8', size: '32px', rem: '2rem', scssVar: '$spacing-8' },
  { name: 'spacing-10', size: '40px', rem: '2.5rem', scssVar: '$spacing-10' },
  { name: 'spacing-12', size: '48px', rem: '3rem', scssVar: '$spacing-12' },
  { name: 'spacing-16', size: '64px', rem: '4rem', scssVar: '$spacing-16' },
  { name: 'spacing-20', size: '80px', rem: '5rem', scssVar: '$spacing-20' },
  { name: 'spacing-24', size: '96px', rem: '6rem', scssVar: '$spacing-24' }
]

// Border radius definitions
const radiuses = [
  { name: 'sm', size: '4px', rem: '0.25rem', scssVar: '$radius-sm' },
  { name: 'md', size: '8px', rem: '0.5rem', scssVar: '$radius-md' },
  { name: 'lg', size: '12px', rem: '0.75rem', scssVar: '$radius-lg' },
  { name: 'xl', size: '16px', rem: '1rem', scssVar: '$radius-xl' },
  { name: '2xl', size: '24px', rem: '1.5rem', scssVar: '$radius-2xl' },
  { name: 'full', size: '9999px', rem: '9999px', scssVar: '$radius-full' }
]

// Shadow definitions
const shadows = [
  { name: 'sm', value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', scssVar: '$shadow-sm' },
  { name: 'md', value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', scssVar: '$shadow-md' },
  {
    name: 'lg',
    value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    scssVar: '$shadow-lg'
  },
  {
    name: 'xl',
    value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    scssVar: '$shadow-xl'
  }
]

// Breakpoints
const breakpoints = [
  { name: 'sm', size: '500px', scssVar: '$breakpoint-sm' },
  { name: 'md', size: '768px', scssVar: '$breakpoint-md' },
  { name: 'lg', size: '1024px', scssVar: '$breakpoint-lg' },
  { name: 'xl', size: '1200px', scssVar: '$breakpoint-xl' },
  { name: '2xl', size: '1498px', scssVar: '$breakpoint-2xl' },
  { name: 'container', size: '1530px', scssVar: '$container-max-width' }
]

// Z-index
const zIndexes = [
  { name: 'dropdown', value: 1000, scssVar: '$z-index-dropdown' },
  { name: 'sticky', value: 1020, scssVar: '$z-index-sticky' },
  { name: 'fixed', value: 1030, scssVar: '$z-index-fixed' },
  { name: 'modal-backdrop', value: 1040, scssVar: '$z-index-modal-backdrop' },
  { name: 'modal', value: 1050, scssVar: '$z-index-modal' },
  { name: 'popover', value: 1060, scssVar: '$z-index-popover' },
  { name: 'tooltip', value: 1070, scssVar: '$z-index-tooltip' }
]

// Transitions
const transitions = [
  { name: 'fast', value: '150ms', scssVar: '$transition-fast' },
  { name: 'base', value: '200ms', scssVar: '$transition-base' },
  { name: 'slow', value: '300ms', scssVar: '$transition-slow' },
  { name: 'slower', value: '500ms', scssVar: '$transition-slower' }
]

// Icon list
const icons = [
  { name: 'CheckIcon', component: CheckIcon },
  { name: 'ChevronDownIcon', component: ChevronDownIcon },
  { name: 'ConsultingIcon', component: ConsultingIcon },
  { name: 'EyeIcon', component: EyeIcon },
  { name: 'HomeIcon', component: HomeIcon },
  { name: 'InfoIcon', component: InfoIcon },
  { name: 'IPinIcon', component: IPinIcon },
  { name: 'LinkIcon', component: LinkIcon },
  { name: 'NetworkIcon', component: NetworkIcon },
  { name: 'PatientIcon', component: PatientIcon },
  { name: 'PhoneIcon', component: PhoneIcon },
  { name: 'ReferralIcon', component: ReferralIcon },
  { name: 'SearchIcon', component: SearchIcon },
  { name: 'ServiceTitleIcon', component: ServiceTitleIcon },
  { name: 'ShieldIcon', component: ShieldIcon },
  { name: 'SystemIcon', component: SystemIcon },
  { name: 'WarningIcon', component: WarningIcon },
  { name: 'PhoneRequestIcon', component: PhoneRequestIcon },
  { name: 'DocumentReferralIcon', component: DocumentReferralIcon },
  { name: 'HospitalPortalIcon', component: HospitalPortalIcon },
  { name: 'SNSTalkIcon', component: SNSTalkIcon },
  { name: 'ContinuityIcon', component: ContinuityIcon },
  { name: 'SafetyIcon', component: SafetyIcon },
  { name: 'QualityIcon', component: QualityIcon },
  { name: 'ChartStepperIcon', component: ChartStepperIcon },
  { name: 'DoctorIcon', component: DoctorIcon },
  { name: 'FluentArrowCircleUpRight', component: FluentArrowCircleUpRight }
]

export default function StyleGuidePage() {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Initialize dark mode from document
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    setIsDarkMode(currentTheme === 'dark')
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    if (newMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  // State for interactive components
  const [checkbox1, setCheckbox1] = useState(false)
  const [checkbox2, setCheckbox2] = useState(true)
  const [checkbox3, setCheckbox3] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [selectValue, setSelectValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(2)

  const progressSteps = [
    { id: 1, label: '본인인증' },
    { id: 2, label: '약관동의' },
    { id: 3, label: '정보입력' },
    { id: 4, label: '가입완료' }
  ]

  const breadcrumbItems = [
    { label: '홈', icon: <HomeIcon width={16} height={16} />, href: '/' },
    { label: '회원서비스', href: '/member' },
    { label: '스타일 가이드' }
  ]

  const selectOptions = [
    { value: '', label: '선택하세요' },
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' }
  ]

  const radioOptions = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' }
  ]

  return (
    <div className={styles.container}>
      {/* Dark Mode Toggle */}
      <div className={styles.darkModeToggle}>
        <span className={styles.darkModeLabel}>다크모드</span>
        <button
          type='button'
          className={`${styles.toggleButton} ${isDarkMode ? styles.active : ''}`}
          onClick={toggleDarkMode}
          aria-label='다크모드 전환'
        >
          <span className={styles.toggleTrack}>
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleText}>{isDarkMode ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      <h1 className={styles.title}>Style Guide</h1>
      <p className={styles.subtitle}>HRC Front UI 컴포넌트 및 스타일 시스템</p>

      {/* Colors Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Colors</h2>

        <h3 className={styles.sectionSubtitle}>Primary Colors</h3>
        <div className={styles.colorGrid}>
          {primaryColors.map(color => (
            <div key={color.scssVar} className={styles.colorItem}>
              <div className={styles.colorSwatch} style={{ backgroundColor: color.hex }} />
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.colorVar}>{color.scssVar}</span>
              <span className={styles.colorHex}>{color.hex}</span>
            </div>
          ))}
        </div>

        <h3 className={styles.sectionSubtitle}>Base Colors</h3>
        <div className={styles.colorGrid}>
          {baseColors.map(color => (
            <div key={color.scssVar} className={styles.colorItem}>
              <div className={styles.colorSwatch} style={{ backgroundColor: color.hex }} />
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.colorVar}>{color.scssVar}</span>
              <span className={styles.colorHex}>{color.hex}</span>
            </div>
          ))}
        </div>

        <h3 className={styles.sectionSubtitle}>System Colors</h3>
        <div className={styles.colorGrid}>
          {systemColors.map(color => (
            <div key={color.scssVar} className={styles.colorItem}>
              <div className={styles.colorSwatch} style={{ backgroundColor: color.hex }} />
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.colorVar}>{color.scssVar}</span>
              <span className={styles.colorHex}>{color.hex}</span>
            </div>
          ))}
        </div>

        <h3 className={styles.sectionSubtitle}>Gray Scale</h3>
        <div className={styles.colorGrid}>
          {grayScale.map(color => (
            <div key={color.scssVar} className={styles.colorItem}>
              <div className={styles.colorSwatch} style={{ backgroundColor: color.hex }} />
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.colorVar}>{color.scssVar}</span>
              <span className={styles.colorHex}>{color.hex}</span>
            </div>
          ))}
        </div>

        <h3 className={styles.sectionSubtitle}>Dark Mode Colors</h3>
        <div className={styles.colorGrid}>
          {darkModeColors.map(color => (
            <div key={color.scssVar} className={styles.colorItem}>
              <div className={styles.colorSwatch} style={{ backgroundColor: color.hex }} />
              <span className={styles.colorName}>{color.name}</span>
              <span className={styles.colorVar}>{color.scssVar}</span>
              <span className={styles.colorHex}>{color.hex}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Typography</h2>

        <h3 className={styles.sectionSubtitle}>Font Families</h3>
        <div className={styles.typographyItem}>
          <span className={styles.typographyLabel}>Pretendard (Base) - {fontFamilies[0].scssVar}</span>
          <p className={`${styles.fontFamily} ${styles.pretendard}`} style={{ fontSize: '24px' }}>
            가나다라마바사 ABCDEFG 0123456789
          </p>
        </div>
        <div className={styles.typographyItem}>
          <span className={styles.typographyLabel}>Paperozi - {fontFamilies[1].scssVar}</span>
          <p className={`${styles.fontFamily} ${styles.paperozi}`} style={{ fontSize: '24px' }}>
            가나다라마바사 ABCDEFG 0123456789
          </p>
        </div>
        <div className={styles.typographyItem}>
          <span className={styles.typographyLabel}>Paperlogy - {fontFamilies[2].scssVar}</span>
          <p className={`${styles.fontFamily} ${styles.paperlogy}`} style={{ fontSize: '24px' }}>
            가나다라마바사 ABCDEFG 0123456789
          </p>
        </div>
        <div className={styles.typographyItem}>
          <span className={styles.typographyLabel}>Mono - {fontFamilies[3].scssVar}</span>
          <p style={{ fontSize: '24px', fontFamily: "'Courier New', monospace" }}>ABCDEFG 0123456789</p>
        </div>

        <h3 className={styles.sectionSubtitle}>Font Sizes</h3>
        {fontSizes.map(font => (
          <div key={font.name} className={styles.typographyItem}>
            <span className={styles.typographyLabel}>
              {font.scssVar} - {font.size} ({font.rem})
            </span>
            <p style={{ fontSize: font.rem, margin: 0 }}>텍스트 샘플 Text Sample</p>
          </div>
        ))}

        <h3 className={styles.sectionSubtitle}>Font Weights</h3>
        {fontWeights.map(weight => (
          <div key={weight.name} className={styles.typographyItem}>
            <span className={styles.typographyLabel}>
              {weight.scssVar} - {weight.name} ({weight.value})
            </span>
            <p style={{ fontSize: '18px', fontWeight: weight.value, margin: 0 }}>텍스트 샘플 Text Sample</p>
          </div>
        ))}

        <h3 className={styles.sectionSubtitle}>Line Heights</h3>
        {lineHeights.map(lh => (
          <div key={lh.name} className={styles.typographyItem}>
            <span className={styles.typographyLabel}>
              {lh.scssVar} - {lh.name} ({lh.value})
            </span>
            <p style={{ fontSize: '16px', lineHeight: lh.value, margin: 0 }}>
              줄간격 샘플 텍스트입니다. 여러 줄로 작성하면 줄간격을 확인할 수 있습니다.
              <br />
              Line height sample text for demonstration.
            </p>
          </div>
        ))}
      </section>

      {/* Spacing Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Spacing</h2>
        <div className={styles.spacingGrid}>
          {spacings.map(spacing => (
            <div key={spacing.name} className={styles.spacingItem}>
              <div className={styles.spacingBox} style={{ width: spacing.size, height: spacing.size }} />
              <span className={styles.spacingLabel}>{spacing.scssVar}</span>
              <span className={styles.spacingLabel}>{spacing.size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Border Radius</h2>
        <div className={styles.radiusGrid}>
          {radiuses.map(radius => (
            <div key={radius.name} className={styles.radiusItem}>
              <div className={styles.radiusBox} style={{ borderRadius: radius.size }} />
              <span className={styles.radiusLabel}>{radius.scssVar}</span>
              <span className={styles.radiusLabel}>{radius.size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shadow Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Shadow</h2>
        <div className={styles.shadowGrid}>
          {shadows.map(shadow => (
            <div key={shadow.name} className={styles.shadowItem}>
              <div className={styles.shadowBox} style={{ boxShadow: shadow.value }} />
              <span className={styles.shadowLabel}>{shadow.scssVar}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Breakpoints Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>6. Breakpoints (반응형)</h2>
        <div className={styles.variableTable}>
          {breakpoints.map(bp => (
            <div key={bp.name} className={styles.variableRow}>
              <span className={styles.variableVar}>{bp.scssVar}</span>
              <span className={styles.variableValue}>{bp.size}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Z-index Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>7. Z-index</h2>
        <div className={styles.variableTable}>
          {zIndexes.map(z => (
            <div key={z.name} className={styles.variableRow}>
              <span className={styles.variableVar}>{z.scssVar}</span>
              <span className={styles.variableValue}>{z.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Transitions Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>8. Transitions</h2>
        <div className={styles.variableTable}>
          {transitions.map(t => (
            <div key={t.name} className={styles.variableRow}>
              <span className={styles.variableVar}>{t.scssVar}</span>
              <span className={styles.variableValue}>{t.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Atoms Components Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>9. Atoms Components</h2>

        <h3 className={styles.sectionSubtitle}>Button</h3>
        <div className={styles.componentGrid}>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>primary / small</span>
            <Button variant='primary' size='small'>
              버튼
            </Button>
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>primary / medium</span>
            <Button variant='primary' size='medium'>
              버튼
            </Button>
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>primary / large</span>
            <Button variant='primary' size='large'>
              버튼
            </Button>
          </div>
        </div>
        <div className={styles.componentGrid} style={{ marginTop: '16px' }}>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>secondary / medium</span>
            <Button variant='secondary' size='medium'>
              버튼
            </Button>
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>outline / medium</span>
            <Button variant='outline' size='medium'>
              버튼
            </Button>
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>gray / medium</span>
            <Button variant='gray' size='medium'>
              버튼
            </Button>
          </div>
        </div>
        <div className={styles.componentGrid} style={{ marginTop: '16px' }}>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>disabled</span>
            <Button variant='primary' size='medium' disabled>
              버튼
            </Button>
          </div>
          <div className={styles.componentItem} style={{ width: '200px' }}>
            <span className={styles.componentLabel}>fullWidth</span>
            <Button variant='primary' size='medium' fullWidth>
              버튼
            </Button>
          </div>
        </div>

        <h3 className={styles.sectionSubtitle}>Input</h3>
        <div className={styles.inputGroup}>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>기본</span>
            <Input placeholder='텍스트를 입력하세요' />
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>라벨 포함</span>
            <Input label='이메일' placeholder='example@email.com' />
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>에러 상태</span>
            <Input label='비밀번호' type='password' error='비밀번호가 일치하지 않습니다.' />
          </div>
        </div>

        <h3 className={styles.sectionSubtitle}>InputLabel</h3>
        <div className={styles.componentGrid}>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>일반</span>
            <InputLabel>라벨 텍스트</InputLabel>
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>required</span>
            <InputLabel required>필수 입력</InputLabel>
          </div>
        </div>

        <h3 className={styles.sectionSubtitle}>Checkbox</h3>
        <div className={styles.checkboxGroup}>
          <Checkbox checked={checkbox1} onChange={setCheckbox1} label='체크되지 않음' />
          <Checkbox checked={checkbox2} onChange={setCheckbox2} label='체크됨' />
          <Checkbox checked={checkbox3} onChange={setCheckbox3} label='비활성화됨' disabled />
        </div>

        <h3 className={styles.sectionSubtitle}>Radio</h3>
        <div className={styles.radioGroup}>
          <Radio name='demo-radio' value={radioValue} options={radioOptions} onChange={setRadioValue} />
        </div>

        <h3 className={styles.sectionSubtitle}>Select</h3>
        <div className={styles.selectGroup}>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>기본</span>
            <Select options={selectOptions} value={selectValue} onChange={value => setSelectValue(value)} />
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>라벨 포함</span>
            <Select
              label='옵션 선택'
              options={selectOptions}
              value={selectValue}
              onChange={value => setSelectValue(value)}
            />
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>에러 상태</span>
            <Select
              label='필수 선택'
              options={selectOptions}
              value=''
              onChange={() => {}}
              error='필수 선택 항목입니다.'
            />
          </div>
        </div>
      </section>

      {/* Molecules Components Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>10. Molecules Components</h2>

        <h3 className={styles.sectionSubtitle}>ServiceCard</h3>
        <div className={styles.cardGrid}>
          <ServiceCard
            icon={<ReferralIcon width={32} height={32} />}
            title='진료의뢰'
            description='환자 진료의뢰 서비스를 이용하실 수 있습니다.'
          />
          <ServiceCard
            icon={<ConsultingIcon width={32} height={32} />}
            title='원격상담'
            description='원격으로 전문의 상담을 받을 수 있습니다.'
          />
          <ServiceCard
            icon={<NetworkIcon width={32} height={32} />}
            title='네트워크'
            description='협력병원 네트워크 정보를 확인하세요.'
          />
        </div>

        <h3 className={styles.sectionSubtitle}>AlertModal</h3>
        <div className={styles.modalTrigger}>
          <Button variant='primary' size='medium' onClick={() => setIsModalOpen(true)}>
            모달 열기
          </Button>
        </div>
        <AlertModal
          isOpen={isModalOpen}
          message='알림 메시지입니다. 확인 버튼을 클릭하여 닫을 수 있습니다.'
          closeButtonText='확인'
          onClose={() => setIsModalOpen(false)}
        />

        <h3 className={styles.sectionSubtitle}>InfoBox</h3>
        <div className={styles.infoBoxGroup}>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>info variant</span>
            <InfoBox variant='info' messages={['기본 정보 메시지입니다.', '여러 줄의 메시지를 표시할 수 있습니다.']} />
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>warning variant</span>
            <InfoBox
              variant='warning'
              title='주의사항'
              icon={<WarningIcon width={24} height={24} />}
              messages={['경고 메시지입니다.', '중요한 내용을 강조할 때 사용합니다.']}
            />
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>guide variant</span>
            <InfoBox
              variant='guide'
              title='이용 안내'
              icon={<InfoIcon width={24} height={24} />}
              showBullets
              messages={['첫 번째 안내 사항입니다.', '두 번째 안내 사항입니다.', '세 번째 안내 사항입니다.']}
            />
          </div>
        </div>

        <h3 className={styles.sectionSubtitle}>ProgressSteps</h3>
        <div className={styles.progressDemo}>
          <ProgressSteps steps={progressSteps} currentStep={currentStep} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
            {progressSteps.map(step => (
              <Button
                key={step.id}
                variant={currentStep === step.id ? 'primary' : 'outline'}
                size='small'
                onClick={() => setCurrentStep(step.id)}
              >
                Step {step.id}
              </Button>
            ))}
          </div>
        </div>

        <h3 className={styles.sectionSubtitle}>Breadcrumbs</h3>
        <div className={styles.breadcrumbsDemo}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <h3 className={styles.sectionSubtitle}>SectionTitle</h3>
        <div className={styles.componentGrid}>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>기본 (아이콘 포함)</span>
            <SectionTitle title='서비스 안내' />
          </div>
          <div className={styles.componentItem}>
            <span className={styles.componentLabel}>아이콘 없음</span>
            <SectionTitle title='서비스 안내' showIcon={false} />
          </div>
        </div>
      </section>

      {/* Organisms Components Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>11. Organisms Components</h2>

        <h3 className={styles.sectionSubtitle}>Header</h3>
        <div className={styles.infoBoxGroup}>
          <div className={styles.componentItem}>
            <InfoBox
              variant='info'
              title='Header 컴포넌트'
              icon={<InfoIcon width={24} height={24} />}
              showBullets
              messages={[
                '반응형 GNB 메가 드롭다운 메뉴',
                '데스크톱 (1430px+): 호버 시 메가 드롭다운 + 장식 원형 배경',
                '태블릿 (769px~1429px): 전체화면 슬라이드 다운 메뉴 + 장식 원형 배경',
                '모바일 (768px 이하): 우측 사이드 패널 메뉴 + 연락처 박스',
                '메뉴: 진료의뢰, 협력네트워크, 공지/정보, 진료협력센터 소개, 마이페이지(로그인 시)',
                'Breadcrumbs: pathname 기반 자동 생성'
              ]}
            />
          </div>
        </div>

        <h3 className={styles.sectionSubtitle}>Footer</h3>
        <div className={styles.infoBoxGroup}>
          <div className={styles.componentItem}>
            <InfoBox
              variant='info'
              title='Footer 컴포넌트'
              icon={<InfoIcon width={24} height={24} />}
              showBullets
              messages={[
                '파트너 슬라이더 (메인 페이지에서만 표시)',
                '무한 루프 슬라이딩 + CSS 애니메이션 (모바일)',
                '정책 링크: 인터넷이용약관, 개인정보처리방침, 환자권리장전, 이메일주소수집거부',
                '소셜 미디어 링크: NAVER, YOUTUBE',
                '인증마크: EMR 인증, ISMS 인증',
                '진료지원부서/패밀리사이트 드롭다운 버튼'
              ]}
            />
          </div>
        </div>

        <h3 className={styles.sectionSubtitle}>CardList</h3>
        <div className={styles.infoBoxGroup}>
          <div className={styles.componentItem}>
            <InfoBox
              variant='info'
              title='CardList 컴포넌트'
              icon={<InfoIcon width={24} height={24} />}
              showBullets
              messages={[
                "variant: 'default' | 'infoCard' (의뢰환자 조회 스타일)",
                'columns: 그리드 열 수 지정 (기본: 세로 나열)',
                'scrollableHeight: 스크롤 영역 높이 설정',
                '스크롤바 자동 감지 기능 (ResizeObserver, MutationObserver)',
                'onCardClick: 카드 클릭 핸들러',
                'InfoRowContent: 라벨-값 쌍 표시 서브컴포넌트'
              ]}
            />
          </div>
        </div>
      </section>

      {/* Icons Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>12. Icons</h2>
        <div className={styles.iconGrid}>
          {icons.map(icon => {
            const IconComponent = icon.component
            return (
              <div key={icon.name} className={styles.iconItem}>
                <IconComponent />
                <span className={styles.iconName}>{icon.name}</span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
