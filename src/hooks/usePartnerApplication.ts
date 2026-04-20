import { useMutation, useQuery, useLazyQuery } from '@apollo/client/react'
import {
  APPLY_PARTNER_HOSPITAL_MUTATION,
  UPDATE_PARTNER_APPLICATION_MUTATION
} from '@/graphql/partner/mutations'
import {
  MY_PARTNER_APPLICATION_QUERY,
  MY_PARTNER_APPLICATIONS_QUERY,
  MY_PARTNER_UPDATE_REQUEST_QUERY,
  PARTNER_APPLICATION_BY_ID_QUERY
} from '@/graphql/partner/queries'
import type {
  ApplyPartnerHospitalMutation,
  ApplyPartnerHospitalMutationVariables,
  UpdatePartnerApplicationMutation,
  UpdatePartnerApplicationMutationVariables,
  MyPartnerApplicationQuery,
  MyPartnerApplicationQueryVariables,
  MyPartnerApplicationsQuery,
  MyPartnerApplicationsQueryVariables,
  PartnerApplicationByIdQuery,
  PartnerApplicationByIdQueryVariables,
  PartnerUpdateRequestModel,
  PartnerUpdateRequestStatus
} from '@/graphql/__generated__/types'
import { HospitalCode, UpdatePartnerApplicationInput } from '@/graphql/__generated__/types'

type MyPartnerUpdateRequestResult = Pick<PartnerUpdateRequestModel, 'id' | 'partnerApplicationId'> & {
  status: PartnerUpdateRequestStatus
}
type MyPartnerUpdateRequestQuery = {
  myPartnerUpdateRequest: MyPartnerUpdateRequestResult | null
}
type MyPartnerUpdateRequestQueryVariables = {
  partnerApplicationId: string
}

/** 협력 병·의원 신청 (저장+제출) */
export function useApplyPartnerHospital() {
  const [applyMutation, { loading, error }] = useMutation<
    ApplyPartnerHospitalMutation,
    ApplyPartnerHospitalMutationVariables
  >(APPLY_PARTNER_HOSPITAL_MUTATION)

  const applyPartnerHospital = async (input: ApplyPartnerHospitalMutationVariables['input']) => {
    const result = await applyMutation({ variables: { input } })
    if (result.error) {
      throw result.error
    }
    return result.data?.applyPartnerHospital ?? null
  }

  return { applyPartnerHospital, loading, error }
}

/** 내 협력 신청 조회 (병원코드 기준 단건) */
export function useMyPartnerApplication(hospitalCode: HospitalCode, skip?: boolean) {
  const { data, loading, error, refetch } = useQuery<MyPartnerApplicationQuery, MyPartnerApplicationQueryVariables>(
    MY_PARTNER_APPLICATION_QUERY,
    {
      variables: { hospitalCode },
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
      skip
    }
  )

  return {
    application: data?.myPartnerApplication ?? null,
    loading,
    error,
    refetch
  }
}

/** 내 협력 신청 목록 조회 */
export function useMyPartnerApplications(pagination?: { page?: number; limit?: number }) {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    MyPartnerApplicationsQuery,
    MyPartnerApplicationsQueryVariables
  >(MY_PARTNER_APPLICATIONS_QUERY, {
    variables: { pagination },
    fetchPolicy: 'cache-and-network'
  })

  return {
    applications: data?.myPartnerApplications?.items ?? [],
    totalCount: data?.myPartnerApplications?.totalCount ?? 0,
    hasNextPage: data?.myPartnerApplications?.hasNextPage ?? false,
    loading,
    error,
    refetch,
    fetchMore
  }
}

/** 협력 병·의원 정보 수정 (APPROVED 상태면 수정요청 생성) */
export function useUpdatePartnerApplication() {
  const [updateMutation, { loading, error }] = useMutation<
    UpdatePartnerApplicationMutation,
    UpdatePartnerApplicationMutationVariables
  >(UPDATE_PARTNER_APPLICATION_MUTATION)

  const updatePartnerApplication = async (input: UpdatePartnerApplicationInput) => {
    const result = await updateMutation({ variables: { input } })
    if (result.error) {
      throw result.error
    }
    return result.data?.updatePartnerApplication ?? null
  }

  return { updatePartnerApplication, loading, error }
}

/** 내 협력 수정요청 단건 조회 (partnerApplicationId 기준) */
export function useMyPartnerUpdateRequest(partnerApplicationId: string | undefined, skip?: boolean) {
  const { data, loading, error, refetch } = useQuery<
    MyPartnerUpdateRequestQuery,
    MyPartnerUpdateRequestQueryVariables
  >(MY_PARTNER_UPDATE_REQUEST_QUERY, {
    variables: { partnerApplicationId: partnerApplicationId ?? '' },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
    skip: skip || !partnerApplicationId
  })

  return {
    updateRequest: data?.myPartnerUpdateRequest ?? null,
    loading,
    error,
    refetch
  }
}

/** 협력 신청 상세 조회 (ID 기준) */
export function usePartnerApplicationById(id?: string) {
  const [fetchApplication, { data, loading, error }] = useLazyQuery<
    PartnerApplicationByIdQuery,
    PartnerApplicationByIdQueryVariables
  >(PARTNER_APPLICATION_BY_ID_QUERY, {
    fetchPolicy: 'cache-and-network'
  })

  const getPartnerApplication = async (applicationId: string) => {
    const result = await fetchApplication({ variables: { id: applicationId } })
    return result.data?.partnerApplicationById ?? null
  }

  return {
    getPartnerApplication,
    application: data?.partnerApplicationById ?? null,
    loading,
    error
  }
}
