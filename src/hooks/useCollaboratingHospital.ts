import { useCallback } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client/react'
import { EHR_HOSPITAL_SEARCH_QUERY } from '@/graphql/hospital/queries'
import { REGISTER_HOSPITAL_MUTATION } from '@/graphql/hospital/mutations'

interface HospitalModel {
  id?: string
  name: string
  address?: string
  addressDetail?: string
  phisCode?: string
  classificationCode?: string
  phone?: string
  faxNumber?: string
  representative?: string
  website?: string
  zipCode?: string
}

interface HospitalSearchResult {
  hospitals: HospitalModel[]
  totalCount: number
}

interface SearchCollaboratingHospitalsInput {
  hospitalCode: string
  hsptNm?: string
  adrsNm?: string
  hsptClsfCd?: string
}

interface RegisterHospitalInput {
  hospitalCode: string
  hospitalName: string
  representative: string
  careInstitutionNo: string
  zipCode: string
  address: string
  addressDetail?: string
  phone: string
}

export function useSearchCollaboratingHospitals() {
  const [searchQuery, { data, loading, error }] = useLazyQuery<{
    ehrGetCollaboratingHospitals: HospitalSearchResult
  }>(EHR_HOSPITAL_SEARCH_QUERY)

  const searchHospitals = useCallback(async (input: SearchCollaboratingHospitalsInput) => {
    const result = await searchQuery({ variables: { input } })
    return result.data?.ehrGetCollaboratingHospitals ?? null
  }, [searchQuery])

  return {
    searchHospitals,
    hospitals: data?.ehrGetCollaboratingHospitals?.hospitals ?? [],
    totalCount: data?.ehrGetCollaboratingHospitals?.totalCount ?? 0,
    loading,
    error
  }
}

export function useRegisterHospital() {
  const [registerMutation, { loading, error }] = useMutation<{
    registerHospital: HospitalModel
  }>(REGISTER_HOSPITAL_MUTATION)

  const registerHospital = async (input: RegisterHospitalInput) => {
    const { data } = await registerMutation({ variables: { input } })

    if (data?.registerHospital) {
      return data.registerHospital
    }

    return null
  }

  return { registerHospital, loading, error }
}
