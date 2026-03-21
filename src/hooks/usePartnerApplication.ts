import { useMutation, useQuery, useLazyQuery } from '@apollo/client/react'
import {
  APPLY_PARTNER_HOSPITAL_MUTATION,
  SAVE_DRAFT_PARTNER_APPLICATION_MUTATION,
  SUBMIT_PARTNER_APPLICATION_MUTATION,
  CANCEL_PARTNER_APPLICATION_MUTATION
} from '@/graphql/partner/mutations'
import {
  MY_PARTNER_APPLICATION_QUERY,
  MY_PARTNER_APPLICATIONS_QUERY,
  PARTNER_APPLICATION_BY_ID_QUERY
} from '@/graphql/partner/queries'
import type {
  ApplyPartnerHospitalMutation,
  ApplyPartnerHospitalMutationVariables,
  SaveDraftPartnerApplicationMutation,
  SaveDraftPartnerApplicationMutationVariables,
  SubmitPartnerApplicationMutation,
  SubmitPartnerApplicationMutationVariables,
  CancelPartnerApplicationMutation,
  CancelPartnerApplicationMutationVariables,
  MyPartnerApplicationQuery,
  MyPartnerApplicationQueryVariables,
  MyPartnerApplicationsQuery,
  MyPartnerApplicationsQueryVariables,
  PartnerApplicationByIdQuery,
  PartnerApplicationByIdQueryVariables
} from '@/graphql/__generated__/types'
import { HospitalCode } from '@/graphql/__generated__/types'

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

/** 협력 병·의원 임시저장 */
export function useSaveDraftPartnerApplication() {
  const [saveDraftMutation, { loading, error }] = useMutation<
    SaveDraftPartnerApplicationMutation,
    SaveDraftPartnerApplicationMutationVariables
  >(SAVE_DRAFT_PARTNER_APPLICATION_MUTATION)

  const saveDraft = async (input: SaveDraftPartnerApplicationMutationVariables['input']) => {
    const { data } = await saveDraftMutation({ variables: { input } })
    return data?.saveDraftPartnerApplication ?? null
  }

  return { saveDraft, loading, error }
}

/** 임시저장된 신청서 최종 제출 */
export function useSubmitPartnerApplication() {
  const [submitMutation, { loading, error }] = useMutation<
    SubmitPartnerApplicationMutation,
    SubmitPartnerApplicationMutationVariables
  >(SUBMIT_PARTNER_APPLICATION_MUTATION)

  const submitPartnerApplication = async (id: string) => {
    const { data } = await submitMutation({ variables: { id } })
    return data?.submitPartnerApplication ?? null
  }

  return { submitPartnerApplication, loading, error }
}

/** 협력 병·의원 신청 취소 */
export function useCancelPartnerApplication() {
  const [cancelMutation, { loading, error }] = useMutation<
    CancelPartnerApplicationMutation,
    CancelPartnerApplicationMutationVariables
  >(CANCEL_PARTNER_APPLICATION_MUTATION)

  const cancelPartnerApplication = async (id: string) => {
    const { data } = await cancelMutation({ variables: { id } })
    return data?.cancelPartnerApplication ?? false
  }

  return { cancelPartnerApplication, loading, error }
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
