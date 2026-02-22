import { useQuery } from '@apollo/client/react'
import { SLIDE_BANNERS_QUERY } from '@/graphql/popup/queries'

export interface SlideBanner {
  id: string
  hospitalCode: string
  popupType: string
  isActive: boolean
  alwaysVisible: boolean
  targetBlank: boolean
  imageUrl: string | null
  imageDarkUrl: string | null
  mobileImageUrl: string | null
  mobileDarkImageUrl: string | null
  linkUrl: string | null
  altText: string | null
  mainSlogan: string | null
  subSlogan: string | null
  mediaType: string | null
  videoUrl: string | null
  sortOrder: number | null
}

interface SlideBannersData {
  slideBanners: SlideBanner[]
}

export function useSlideBanners() {
  const { data, loading, error } = useQuery<SlideBannersData>(SLIDE_BANNERS_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  return {
    banners: data?.slideBanners ?? [],
    loading,
    error
  }
}
