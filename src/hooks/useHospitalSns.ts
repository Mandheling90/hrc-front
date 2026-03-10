import { useQuery } from '@apollo/client/react'
import { HOSPITAL_SNS_QUERY } from '@/graphql/hospital/sns-queries'

export interface HospitalSnsArticle {
  articleNo: number
  title: string
  linkUrl: string | null
  thumbnailUrl: string | null
  category: string | null
  createdDt: string
  hospitalName: string
  writer: string
}

interface HospitalSnsData {
  hospitalSns: {
    articles: HospitalSnsArticle[]
    totalCount: number
  }
}

export function useHospitalSns(pageRow: number = 4, startIndex: number = 1) {
  const { data, loading, error } = useQuery<HospitalSnsData>(HOSPITAL_SNS_QUERY, {
    variables: { pageRow, startIndex },
    fetchPolicy: 'cache-and-network'
  })

  return {
    articles: data?.hospitalSns?.articles ?? [],
    totalCount: data?.hospitalSns?.totalCount ?? 0,
    loading,
    error
  }
}
