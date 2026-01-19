'use client'

import React from 'react'
import { HospitalProvider } from '@/contexts/HospitalContext'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <HospitalProvider>{children}</HospitalProvider>
}
