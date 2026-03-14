import { useQuery } from '@apollo/client/react'
import { useAuthContext } from '@/contexts/AuthContext'
import { CONSULTANT_ASSIGNED_ECONSULTS_QUERY } from '@/graphql/econsult/queries'

interface ConsultantAssignedEConsultsData {
  consultantAssignedEConsults: {
    items: Array<{ id: string }>
    totalCount: number
    hasNextPage: boolean
  }
}

export const useConsultantEConsults = () => {
  const { user, isAuthenticated } = useAuthContext()
  const doctorId = user?.doctorId

  const { data, loading } = useQuery<ConsultantAssignedEConsultsData>(CONSULTANT_ASSIGNED_ECONSULTS_QUERY, {
    variables: {
      doctorId,
      pagination: { page: 1, limit: 1 }
    },
    skip: !isAuthenticated || !doctorId,
    fetchPolicy: 'cache-first'
  })

  const totalCount = data?.consultantAssignedEConsults?.totalCount ?? 0
  const hasAssignedEConsults = totalCount > 0

  return {
    hasAssignedEConsults,
    isLoading: loading,
    totalCount
  }
}
