import { useQuery } from '@apollo/client/react'
import { useMemo } from 'react'
import { ENUMS_QUERY } from '@/graphql/enum/queries'
import type { EnumsQuery } from '@/graphql/__generated__/types'

interface EnumOption {
  value: string
  label: string
}

/**
 * 전체 Enum 목록을 가져와 name 기준으로 옵션 배열을 반환하는 훅
 */
export function useEnums() {
  const { data, loading, error } = useQuery<EnumsQuery>(ENUMS_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  const enumMap = useMemo(() => {
    const map: Record<string, EnumOption[]> = {}
    if (data?.enums) {
      for (const enumInfo of data.enums) {
        map[enumInfo.name] = enumInfo.values.map(v => ({
          value: v.key,
          label: v.label
        }))
      }
    }
    return map
  }, [data])

  const getOptions = (name: string): EnumOption[] => {
    return enumMap[name] ?? []
  }

  return { enumMap, getOptions, loading, error }
}
