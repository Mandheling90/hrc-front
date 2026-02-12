'use client'

import { HttpLink } from '@apollo/client/link/http'
import { SetContextLink } from '@apollo/client/link/context'
import { from } from '@apollo/client/link'
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs'

export function makeClient() {
  const authLink = new SetContextLink(prevContext => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

    return {
      headers: {
        ...prevContext.headers,
        authorization: token ? `Bearer ${token}` : '',
        'x-hospital-id': process.env.NEXT_PUBLIC_HOSPITAL_ID || ''
      }
    }
  })

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql'
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, httpLink])
  })
}
