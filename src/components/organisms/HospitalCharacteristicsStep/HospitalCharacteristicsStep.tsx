'use client'

import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react'
import { Textarea } from '@/components/atoms/Textarea/Textarea'
import { Button } from '@/components/atoms/Button/Button'
import { FileUploadIcon } from '@/components/icons/FileUploadIcon'
import { FileRemoveIcon } from '@/components/icons/FileRemoveIcon'
import { AlertModal } from '@/components/molecules/AlertModal/AlertModal'
import { useHospital } from '@/hooks'
import type { HospitalCharacteristicsStepData, StepRef } from '@/types/partner-application'
import styles from './HospitalCharacteristicsStep.module.scss'

export interface HospitalCharacteristicsStepProps {
  /** 현재 스텝 번호 */
  currentStep?: number
  /** 전체 스텝 수 */
  totalSteps?: number
  /** 초기값 (임시저장 불러오기용) */
  defaultValues?: Partial<HospitalCharacteristicsStepData>
}

export const HospitalCharacteristicsStep = forwardRef<
  StepRef<HospitalCharacteristicsStepData>,
  HospitalCharacteristicsStepProps
>(({ currentStep = 8, totalSteps = 8, defaultValues }, ref) => {
  const { hospital } = useHospital()

  // 병원 특성 및 기타사항 상태
  const [hospitalCharacteristics, setHospitalCharacteristics] = useState<string>(
    defaultValues?.hospitalCharacteristics ?? ''
  )

  // 첨부파일 상태
  const [files, setFiles] = useState<File[]>(defaultValues?.files ?? [])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // AlertModal 상태
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: ''
  })

  useImperativeHandle(ref, () => ({
    getData: () => ({
      hospitalCharacteristics,
      files
    })
  }))

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
          setAlertModal({
            isOpen: true,
            message: `${file.name}: JPG, PNG, PDF 파일만 업로드 가능합니다.`
          })
          return false
        }
        if (!validateFileSize(file)) {
          setAlertModal({
            isOpen: true,
            message: `${file.name}: 파일 크기는 5MB를 초과할 수 없습니다.`
          })
          return false
        }
        return true
      })
      // 최대 2개까지만 허용
      const totalFiles = [...files, ...validFiles]
      const newFiles = totalFiles.slice(0, 2)
      setFiles(newFiles)
      if (totalFiles.length > 2) {
        setAlertModal({
          isOpen: true,
          message: '첨부 파일 업로드 개수 초과입니다. (최대 2개)'
        })
      }
    }
    // 같은 파일을 다시 선택할 수 있도록 리셋
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
          setAlertModal({
            isOpen: true,
            message: `${file.name}: JPG, PNG, PDF 파일만 업로드 가능합니다.`
          })
          return false
        }
        if (!validateFileSize(file)) {
          setAlertModal({
            isOpen: true,
            message: `${file.name}: 파일 크기는 5MB를 초과할 수 없습니다.`
          })
          return false
        }
        return true
      })
      // 최대 2개까지만 허용
      const totalFiles = [...files, ...validFiles]
      const newFiles = totalFiles.slice(0, 2)
      setFiles(newFiles)
      if (totalFiles.length > 2) {
        setAlertModal({
          isOpen: true,
          message: '첨부 파일 업로드 개수 초과입니다. (최대 2개)'
        })
      }
    }
  }

  // 파일 삭제 핸들러
  const handleFileRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
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

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
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
                파일 첨부가 어려우신 경우 사업자등록증, 차량등록증을
                <br />
                팩스 {hospital.contact.fax} 로 보내주십시오.
              </p>
            </div>
          </div>

          {/* 파일 업로드 영역 */}
          <div className={styles.fileUploadArea} onDragOver={handleDragOver} onDrop={handleDrop}>
            {/* 업로드된 파일 목록 */}
            {files.length > 0 && (
              <>
                <div className={styles.fileList}>
                  {files.map((file, index) => (
                    <div key={index} className={styles.fileItem}>
                      <FileRemoveIcon
                        width={22}
                        height={22}
                        stroke='var(--gray-11)'
                        onClick={() => handleFileRemove(index)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span className={styles.fileName}>{file.name}</span>
                      <span className={styles.fileSize}>{formatFileSize(file.size)}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.fileDivider}></div>
              </>
            )}

            {/* 파일 선택 영역 */}
            <div className={styles.fileSelectArea}>
              <p className={styles.uploadText}>첨부할 파일을 끌어다 놓거나, 파일 선택 버튼을 직접 선택해주세요.</p>
              <Button
                variant='primary'
                size='small'
                onClick={handleFileButtonClick}
                className={styles.fileSelectButton}
              >
                <FileUploadIcon width={20} height={20} fill='#fff' />
                <span className={styles.fileSelectButtonText}>파일 선택</span>
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='.jpg,.jpeg,.png,.pdf'
              multiple
              onChange={handleFileSelect}
              className={styles.hiddenInput}
            />
          </div>
        </div>
      </div>

      {/* AlertModal */}
      <AlertModal
        isOpen={alertModal.isOpen}
        message={alertModal.message}
        closeButtonText='닫기'
        onClose={() => setAlertModal({ isOpen: false, message: '' })}
        closeOnBackdropClick={true}
      />
    </div>
  )
})
HospitalCharacteristicsStep.displayName = 'HospitalCharacteristicsStep'
