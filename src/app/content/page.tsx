'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@apollo/client/react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { CONTENT_BY_ID_QUERY } from '@/graphql/menu/queries'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './page.module.scss'

interface ContentData {
  contentById: {
    id: string
    title: string
    body: string
    hospitalCode: string
    contentGroupName: string
    updatedAt: string
  } | null
}

export default function ContentPage() {
  return (
    <Suspense>
      <ContentPageInner />
    </Suspense>
  )
}

function ContentPageInner() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data, loading, error } = useQuery<ContentData>(CONTENT_BY_ID_QUERY, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'cache-first'
  })

  const content = data?.contentById

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          {loading && (
            <div>
              <Skeleton width='60%' height={24} variant='text' />
              <div style={{ height: 16 }} />
              <Skeleton width='100%' height={300} variant='rounded' />
            </div>
          )}
          {error && <div className={styles.error}>콘텐츠를 불러올 수 없습니다.</div>}
          {content && <div className={styles.contentBody} dangerouslySetInnerHTML={{ __html: content.body }} />}
          {!loading && !error && !content && id && <div className={styles.error}>콘텐츠를 찾을 수 없습니다.</div>}
        </div>
      </main>
      <Footer />
    </div>
  )
}
