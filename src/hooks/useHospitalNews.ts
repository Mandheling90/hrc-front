import { useQuery } from '@apollo/client/react'
import { HOSPITAL_NEWS_QUERY } from '@/graphql/hospital/sns-queries'

export interface HospitalNewsArticle {
  articleNo: number
  title: string
  linkUrl: string | null
  thumbnailUrl: string | null
  category: string | null
  createdDt: string
  hospitalName: string
  writer: string
}

interface HospitalNewsData {
  hospitalNews: {
    articles: HospitalNewsArticle[]
    totalCount: number
  }
}

export function useHospitalNews(pageRow: number = 10, startIndex: number = 1) {
  const { data, loading, error } = useQuery<HospitalNewsData>(HOSPITAL_NEWS_QUERY, {
    variables: { pageRow, startIndex },
    fetchPolicy: 'cache-and-network'
  })

  return {
    articles: data?.hospitalNews?.articles ?? [],
    totalCount: data?.hospitalNews?.totalCount ?? 0,
    loading,
    error
  }
}
