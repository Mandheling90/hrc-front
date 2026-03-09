'use client'

import React from 'react'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ApolloWrapper } from '@/lib/apollo'
import { AuthProvider } from '@/contexts/AuthContext'
import { HospitalProvider } from '@/contexts/HospitalContext'
import { DraftApplicationProvider } from '@/contexts/DraftApplicationContext'
import { ScrollRevealProvider } from '@/components/providers/ScrollRevealProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AntdRegistry>
      <ApolloWrapper>
        <AuthProvider>
          <HospitalProvider>
            <DraftApplicationProvider>
              <ScrollRevealProvider>{children}</ScrollRevealProvider>
            </DraftApplicationProvider>
          </HospitalProvider>
        </AuthProvider>
      </ApolloWrapper>
    </AntdRegistry>
  )
}
