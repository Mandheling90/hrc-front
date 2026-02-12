'use client'

import React from 'react'
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs'
import { makeClient } from './client'

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>
}
