'use client'

import React from 'react'
import { ApolloWrapper } from '@/lib/apollo'
import { AuthProvider } from '@/contexts/AuthContext'
import { HospitalProvider } from '@/contexts/HospitalContext'
import { DraftApplicationProvider } from '@/contexts/DraftApplicationContext'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ApolloWrapper>
      <AuthProvider>
        <HospitalProvider>
          <DraftApplicationProvider>{children}</DraftApplicationProvider>
        </HospitalProvider>
      </AuthProvider>
    </ApolloWrapper>
  )
}
