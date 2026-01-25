'use client'

import React, { useState, useRef } from 'react'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { Button } from '@/components/atoms/Button/Button'
import { FileUploadIcon } from '@/components/icons/FileUploadIcon'
import styles from './HospitalCharacteristicsStep.module.scss'

export interface HospitalCharacteristicsStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
}

export const HospitalCharacteristicsStep: React.FC<HospitalCharacteristicsStepProps> = ({
  currentStep = 8,
  totalSteps = 8
}) => {
  // 병원 특성 및 기타사항 상태
  const [hospitalCharacteristics, setHospitalCharacteristics] = useState<string>('')

  // 첨부파일 상태
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 텍스트 영역 변경 핸들러
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHospitalCharacteristics(e.target.value)
  }

  // 파일 선택 핸들러
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      // 파일 검증
      const validFiles = selectedFiles.filter(file => {
        if (!validateFileType(file)) {
          alert(`${file.name}: JPG, PNG, PDF 파일만 업로드 가능합니다.`)
          return false
        }
        if (!validateFileSize(file)) {
          alert(`${file.name}: 파일 크기는 5MB를 초과할 수 없습니다.`)
          return false
        }
        return true
      })
      // 최대 2개까지만 허용
      const newFiles = [...files, ...validFiles].slice(0, 2)
      setFiles(newFiles)
      if (newFiles.length >= 2 && validFiles.length > 0) {
        alert('최대 2개까지만 업로드할 수 있습니다.')
      }
    }
    // 같은 파일을 다시 선택할 수 있도록 리셋
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 파일 삭제 핸들러
  const handleFileRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files) {
      const droppedFiles = Array.from(e.dataTransfer.files)
      // 파일 검증
      const validFiles = droppedFiles.filter(file => {
        if (!validateFileType(file)) {
          alert(`${file.name}: JPG, PNG, PDF 파일만 업로드 가능합니다.`)
          return false
        }
        if (!validateFileSize(file)) {
          alert(`${file.name}: 파일 크기는 5MB를 초과할 수 없습니다.`)
          return false
        }
        return true
      })
      // 최대 2개까지만 허용
      const newFiles = [...files, ...validFiles].slice(0, 2)
      setFiles(newFiles)
      if (newFiles.length >= 2 && validFiles.length > 0) {
        alert('최대 2개까지만 업로드할 수 있습니다.')
      }
    }
  }

  // 파일 선택 버튼 클릭 핸들러
  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  // 파일 크기 검증 (5MB)
  const validateFileSize = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024 // 5MB
    return file.size <= maxSize
  }

  // 파일 형식 검증 (JPG, PNG, PDF)
  const validateFileType = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    return allowedTypes.includes(file.type)
  }

  return (
    <div className={styles.stepContainer}>
      {/* 병원특성 및 기타사항 섹션 */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>병원특성 및 기타사항</h3>
          </div>
          <div className={styles.stepIndicator}>
            <span className={styles.stepNumber}>{currentStep}</span>
            <span className={styles.stepSeparator}>/</span>
            <span className={styles.stepTotal}>{totalSteps}</span>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          <Textarea
            id='hospitalCharacteristics'
            name='hospitalCharacteristics'
            placeholder='병원 특성 및 기타 추가 사항을 작성해 주시길 바랍니다.'
            value={hospitalCharacteristics}
            onChange={handleTextareaChange}
            className={styles.textarea}
          />
        </div>
      </div>

      {/* 첨부파일 섹션 */}
      <div className={styles.formSection}>
        <div className={styles.formHeader}>
          <div className={styles.formHeaderLeft}>
            <h3 className={styles.formTitle}>첨부파일(사업자등록증, 차량등록증)</h3>
          </div>
        </div>
        <div className={styles.formDivider}></div>

        <div className={styles.formContent}>
          {/* 안내 사항 */}
          <div className={styles.fileInfo}>
            <div className={styles.infoItem}>
              <span className={styles.bullet}></span>
              <p className={styles.infoText}>JPG, PNG, PDF 유형의 파일을 등록할 수 있습니다.</p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.bullet}></span>
              <p className={styles.infoText}>
                파일 1개당 크기는 5MB를 초과할 수 없으며, 최대 2개(사업자등록증, 차량등록증)까지 등록할 수 있습니다.
              </p>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.bullet}></span>
              <p className={styles.infoText}>
                파일 첨부가 어려우신 경우 사업자등록증, 차량등록증을 팩스 02-920-6523 로 보내주십시오.
              </p>
            </div>
          </div>

          {/* 파일 업로드 영역 */}
          <div className={styles.fileUploadArea} onDragOver={handleDragOver} onDrop={handleDrop}>
            <p className={styles.uploadText}>첨부할 파일을 끌어다 놓거나, 파일 선택 버튼을 직접 선택해주세요.</p>
            <Button variant='primary' size='small' onClick={handleFileButtonClick} className={styles.fileSelectButton}>
              <FileUploadIcon width={20} height={20} fill='#fff' />
              <span className={styles.fileSelectButtonText}>파일 선택</span>
            </Button>
            <input
              ref={fileInputRef}
              type='file'
              accept='.jpg,.jpeg,.png,.pdf'
              multiple
              onChange={handleFileSelect}
              className={styles.hiddenInput}
            />
          </div>

          {/* 업로드된 파일 목록 */}
          {files.length > 0 && (
            <div className={styles.fileList}>
              {files.map((file, index) => (
                <div key={index} className={styles.fileItem}>
                  <span className={styles.fileName}>{file.name}</span>
                  <button type='button' onClick={() => handleFileRemove(index)} className={styles.removeButton}>
                    삭제
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
