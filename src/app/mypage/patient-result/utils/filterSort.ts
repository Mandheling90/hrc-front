import type { SearchFilter } from '../components/SearchCard/SearchCard'

export interface FilterSortProps {
  sortOrder: string
  searchFilter: SearchFilter | null
  currentPage: number
  pageSize: number
  onTotalCountChange: (count: number) => void
}

/**
 * 날짜 문자열에서 숫자만 추출 (YYYYMMDD)
 * "2026-03-11" → "20260311", "20260311" → "20260311"
 */
function toCompact(dateStr: string): string {
  return dateStr.replace(/\D/g, '').slice(0, 8)
}

/**
 * YYYYMMDD → YYYY-MM-DD 포맷 변환
 * 이미 YYYY-MM-DD이면 그대로 반환
 */
export function formatDateDisplay(dateStr: string | null | undefined): string {
  if (!dateStr || dateStr === '-') return '-'
  const compact = dateStr.replace(/\D/g, '').slice(0, 8)
  if (compact.length < 8) return dateStr
  return `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}`
}

/**
 * 키워드 필터: 카테고리에 따라 해당 필드에서 검색
 */
export function matchesKeyword<T>(
  item: T,
  filter: SearchFilter | null,
  fieldMap: Partial<Record<string, keyof T>>
): boolean {
  if (!filter || !filter.keyword.trim()) return true

  const keyword = filter.keyword.trim().toLowerCase()
  const category = filter.category

  if (category === 'all') {
    return Object.values(fieldMap).some(field => {
      if (!field) return false
      const value = item[field]
      return typeof value === 'string' && value.toLowerCase().includes(keyword)
    })
  }

  const field = fieldMap[category]
  if (!field) return true
  const value = item[field]
  return typeof value === 'string' && value.toLowerCase().includes(keyword)
}

/**
 * 날짜 범위 필터: YYYYMMDD 또는 YYYY-MM-DD 어떤 포맷이든 비교 가능
 * 양쪽 모두 숫자만 추출(YYYYMMDD)해서 비교
 */
export function matchesDateRange(dateStr: string | undefined, filter: SearchFilter | null): boolean {
  if (!filter) return true
  if (!dateStr || dateStr === '-' || dateStr === '') return true

  const itemDate = toCompact(dateStr)
  if (itemDate.length < 8) return true

  const start = filter.startDate ? toCompact(filter.startDate) : ''
  const end = filter.endDate ? toCompact(filter.endDate) : ''

  const passed = !(start && itemDate < start) && !(end && itemDate > end)
  console.log('[matchesDateRange]', { dateStr, itemDate, start, end, passed })

  if (start && itemDate < start) return false
  if (end && itemDate > end) return false
  return true
}

/**
 * 날짜 기준 정렬 (숫자만 추출해서 비교)
 */
export function sortByDate<T>(items: T[], dateField: keyof T, order: string): T[] {
  return [...items].sort((a, b) => {
    const dateA = toCompact(String(a[dateField] ?? ''))
    const dateB = toCompact(String(b[dateField] ?? ''))
    if (order === 'newest') return dateB.localeCompare(dateA)
    return dateA.localeCompare(dateB)
  })
}

/**
 * 페이지네이션 slice
 */
export function paginate<T>(items: T[], currentPage: number, pageSize: number): T[] {
  const start = (currentPage - 1) * pageSize
  return items.slice(start, start + pageSize)
}
