import { useQuery } from '@apollo/client/react'
import { ACTIVE_POPUPS_QUERY } from '@/graphql/popup/queries'

export interface ActivePopup {
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

interface ActivePopupsData {
  activePopups: ActivePopup[]
}

export function useActivePopups() {
  const { data, loading, error } = useQuery<ActivePopupsData>(ACTIVE_POPUPS_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  return {
    popups: data?.activePopups ?? [],
    loading,
    error
  }
}
