'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface DraftApplicationContextType {
  /** 임시저장된 신청서 ID (병원코드별) */
  getDraftId: (hospitalId: string) => string | null
  /** 임시저장 ID 설정 */
  setDraftId: (hospitalId: string, id: string) => void
  /** 임시저장 ID 제거 */
  clearDraftId: (hospitalId: string) => void
}

const DraftApplicationContext = createContext<DraftApplicationContextType | undefined>(undefined)

const STORAGE_PREFIX = 'draft_application_id_'

export const DraftApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draftIds, setDraftIds] = useState<Record<string, string>>({})

  // 클라이언트 마운트 시 localStorage에서 복원
  useEffect(() => {
    const restored: Record<string, string> = {}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(STORAGE_PREFIX)) {
        const hospitalId = key.slice(STORAGE_PREFIX.length)
        const value = localStorage.getItem(key)
        if (value) {
          restored[hospitalId] = value
        }
      }
    }
    if (Object.keys(restored).length > 0) {
      setDraftIds(restored)
    }
  }, [])

  const getDraftId = useCallback(
    (hospitalId: string): string | null => {
      return draftIds[hospitalId] ?? null
    },
    [draftIds]
  )

  const setDraftId = useCallback((hospitalId: string, id: string) => {
    localStorage.setItem(`${STORAGE_PREFIX}${hospitalId}`, id)
    setDraftIds(prev => ({ ...prev, [hospitalId]: id }))
  }, [])

  const clearDraftId = useCallback((hospitalId: string) => {
    localStorage.removeItem(`${STORAGE_PREFIX}${hospitalId}`)
    setDraftIds(prev => {
      const next = { ...prev }
      delete next[hospitalId]
      return next
    })
  }, [])

  const value = useMemo<DraftApplicationContextType>(
    () => ({ getDraftId, setDraftId, clearDraftId }),
    [getDraftId, setDraftId, clearDraftId]
  )

  return <DraftApplicationContext.Provider value={value}>{children}</DraftApplicationContext.Provider>
}

export const useDraftApplication = (): DraftApplicationContextType => {
  const context = useContext(DraftApplicationContext)
  if (context === undefined) {
    throw new Error('useDraftApplication must be used within a DraftApplicationProvider')
  }
  return context
}
