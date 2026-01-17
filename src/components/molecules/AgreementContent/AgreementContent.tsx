import React from 'react'
import styles from './AgreementContent.module.scss'

export interface RadioOption {
  name: string
  value: string
  label: string
  defaultChecked?: boolean
}

export interface AgreementContentProps {
  /** 제목 (h3) */
  title?: string
  /** 설명 텍스트 (p) */
  description?: string
  /** 라디오 옵션 그룹 */
  radioOptions?: {
    label: string
    options: RadioOption[]
  }
  /** 스크롤 가능한 박스 내부 콘텐츠 */
  scrollableContent?: React.ReactNode
  /** 스크롤 박스 사용 여부 (기본값: true) */
  hasScrollBox?: boolean
  /** title, description, radioOptions를 scrollableBox 안에 포함할지 여부 (기본값: false) */
  wrapAllInScrollBox?: boolean
  /** 직접 자식 요소 (title, description, radioOptions 외의 추가 콘텐츠) */
  children?: React.ReactNode
  /** 추가 CSS 클래스명 */
  className?: string
}

export const AgreementContent: React.FC<AgreementContentProps> = ({
  title,
  description,
  radioOptions,
  scrollableContent,
  hasScrollBox = true,
  wrapAllInScrollBox = false,
  children,
  className
}) => {
  const hasScrollableContent = scrollableContent && hasScrollBox
  const shouldWrapInScrollBox = wrapAllInScrollBox && hasScrollBox

  // wrapAllInScrollBox가 true인 경우: title, description, radioOptions가 scrollableBox 안에 포함됨
  const hasStaticContent =
    !shouldWrapInScrollBox && (title || description || radioOptions || (!hasScrollBox && scrollableContent))

  const renderContentSection = () => {
    if (shouldWrapInScrollBox && hasScrollableContent) {
      // 모든 내용을 scrollableBox 안에 포함
      return (
        <div className={styles.scrollableBox}>
          <div className={styles.scrollableContent}>
            {title && <h3 className={styles.subTitle}>{title}</h3>}
            {description && <p className={styles.contentText}>{description}</p>}
            {radioOptions && (
              <div className={styles.radioGroup}>
                <span className={styles.radioLabel}>{radioOptions.label}</span>
                {radioOptions.options.map(option => (
                  <label key={option.value} className={styles.radio}>
                    <input
                      type='radio'
                      name={option.name}
                      value={option.value}
                      defaultChecked={option.defaultChecked}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
            {scrollableContent}
          </div>
        </div>
      )
    }

    // 일반적인 경우: title, description, radioOptions는 밖에, scrollableContent는 별도 scrollableBox
    return (
      <>
        {hasStaticContent && (
          <div className={styles.staticContent}>
            {title && <h3 className={styles.subTitle}>{title}</h3>}
            {description && <p className={styles.contentText}>{description}</p>}
            {radioOptions && (
              <div className={styles.radioGroup}>
                <span className={styles.radioLabel}>{radioOptions.label}</span>
                {radioOptions.options.map(option => (
                  <label key={option.value} className={styles.radio}>
                    <input
                      type='radio'
                      name={option.name}
                      value={option.value}
                      defaultChecked={option.defaultChecked}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
            {!hasScrollBox && scrollableContent && <div className={styles.content}>{scrollableContent}</div>}
          </div>
        )}

        {hasScrollableContent && (
          <div className={styles.scrollableBox}>
            <div className={styles.scrollableContent}>{scrollableContent}</div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className={`${styles.agreementContent} ${className || ''}`}>
      {renderContentSection()}
      {children && <div className={styles.children}>{children}</div>}
    </div>
  )
}
