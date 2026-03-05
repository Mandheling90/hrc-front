import { useQuery } from '@apollo/client/react'
import { MENUS_QUERY } from '@/graphql/menu/queries'

export interface MenuChild {
  id: string
  name: string
  path: string | null
  sortOrder: number
  menuTargetType: string
  targetBoardType: string | null
  targetBoardId: string | null
  targetContentId: string | null
  externalUrl: string | null
  gnbExposure: boolean
  iconName: string | null
}

export interface ApiMenu {
  id: string
  name: string
  path: string | null
  sortOrder: number
  menuTargetType: string
  targetBoardType: string | null
  targetBoardId: string | null
  targetContentId: string | null
  externalUrl: string | null
  gnbExposure: boolean
  iconName: string | null
  firstChildPath: string | null
  children: MenuChild[]
}

interface MenusData {
  menus: ApiMenu[]
}

export function useMenus() {
  const { data, loading, error } = useQuery<MenusData>(MENUS_QUERY, {
    variables: { menuType: 'USER' },
    fetchPolicy: 'cache-and-network'
  })

  return {
    menus: data?.menus ?? [],
    loading,
    error
  }
}
