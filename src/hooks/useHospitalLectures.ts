import { useQuery } from '@apollo/client/react'
import { HOSPITAL_LECTURES_QUERY } from '@/graphql/hospital/sns-queries'

export interface HospitalLectureArticle {
  articleNo: number
  title: string
  linkUrl: string | null
  thumbnailUrl: string | null
  category: string | null
  createdDt: string
  hospitalName: string
  writer: string
}

interface HospitalLecturesData {
  hospitalLectures: {
    articles: HospitalLectureArticle[]
    totalCount: number
  }
}

export function useHospitalLectures(pageRow: number = 10, startIndex: number = 1) {
  const { data, loading, error } = useQuery<HospitalLecturesData>(HOSPITAL_LECTURES_QUERY, {
    variables: { pageRow, startIndex },
    fetchPolicy: 'cache-and-network'
  })

  return {
    articles: data?.hospitalLectures?.articles ?? [],
    totalCount: data?.hospitalLectures?.totalCount ?? 0,
    loading,
    error
  }
}
