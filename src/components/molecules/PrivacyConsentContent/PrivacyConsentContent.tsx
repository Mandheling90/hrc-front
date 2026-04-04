import React from 'react'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import styles from './PrivacyConsentContent.module.scss'

export interface PrivacyConsentSubItem {
  /** 서브 항목 텍스트 */
  text: string
  /** 링크 URL (선택적) */
  href?: string
}

export type PrivacyConsentItem =
  | {
      /** 아이템 타입: 일반 문단 */
      type: 'paragraph'
      /** 문단 텍스트 */
      text: string
    }
  | {
      /** 아이템 타입: 서브 리스트 */
      type: 'subList'
      /** 서브 리스트 제목 */
      title: string
      /** 서브 항목 목록 */
      items: PrivacyConsentSubItem[]
    }

export interface PrivacyConsentContentProps {
  /** 체크박스 ID */
  checkboxId?: string
  /** 체크박스 체크 상태 */
  checked: boolean
  /** 체크박스 변경 핸들러 */
  onChange: (checked: boolean) => void
  /** 체크박스 라벨 */
  checkboxLabel: string
  /** 필수사항 표시 여부 (기본값: true) */
  required?: boolean
  /** 콘텐츠 아이템 목록 (순서대로 렌더링) */
  items: PrivacyConsentItem[]
  /** 추가 클래스명 */
  className?: string
}

export const PrivacyConsentContent: React.FC<PrivacyConsentContentProps> = ({
  checkboxId = 'privacy-consent',
  checked,
  onChange,
  checkboxLabel,
  required = true,
  items,
  className = ''
}) => {
  return (
    <div className={`${styles.consentSection} ${className}`}>
      <div className={styles.consentHeader}>
        <Checkbox id={checkboxId} checked={checked} onChange={onChange} label={checkboxLabel} alwaysDark />
        {required && <span className={styles.required}>(필수사항)</span>}
      </div>
      <div className={styles.consentContent}>
        {items.map((item, index) => {
          if (item.type === 'paragraph') {
            return <p key={index} style={item.text.includes('\n') ? { whiteSpace: 'pre-line' } : undefined}>{item.text}</p>
          } else if (item.type === 'subList') {
            return (
              <div key={index} className={styles.consentSubList}>
                <p>{item.title}</p>
                <div className={styles.consentSubItems}>
                  {item.items.map((subItem, subIndex) => (
                    <div key={subIndex} className={styles.consentSubItem}>
                      <span className={styles.bullet}></span>
                      {subItem.href ? (
                        <a href={subItem.href} className={styles.link}>
                          {subItem.text}
                        </a>
                      ) : (
                        <span>{subItem.text}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
