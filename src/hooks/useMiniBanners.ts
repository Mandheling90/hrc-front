import { useQuery } from '@apollo/client/react'
import { MINI_BANNERS_QUERY } from '@/graphql/popup/queries'

export interface MiniBanner {
  id: string
  hospitalCode: string
  popupType: string
  isActive: boolean
  targetBlank: boolean
  imageUrl: string | null
  mobileImageUrl: string | null
  linkUrl: string | null
  altText: string | null
  sortOrder: number | null
}

interface MiniBannersData {
  miniBanners: MiniBanner[]
}

export function useMiniBanners() {
  const { data, loading, error } = useQuery<MiniBannersData>(MINI_BANNERS_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  return {
    banners: data?.miniBanners ?? [],
    loading,
    error
  }
}
