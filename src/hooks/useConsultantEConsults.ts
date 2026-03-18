import { useQuery } from '@apollo/client/react'
import { useAuthContext } from '@/contexts/AuthContext'
import { MY_ASSIGNED_ECONSULTS_QUERY } from '@/graphql/econsult/queries'

interface MyAssignedEConsultsData {
  myAssignedEConsults: {
    items: Array<{ id: string }>
    totalCount: number
    hasNextPage: boolean
  }
}

export const useConsultantEConsults = () => {
  const { user, isAuthenticated } = useAuthContext()
  const consultantDoctorId = user?.doctorId

  const { data, loading } = useQuery<MyAssignedEConsultsData>(MY_ASSIGNED_ECONSULTS_QUERY, {
    variables: {
      consultantDoctorId,
      pagination: { page: 1, limit: 1 }
    },
    skip: !isAuthenticated || !consultantDoctorId,
    fetchPolicy: 'cache-first'
  })

  const totalCount = data?.myAssignedEConsults?.totalCount ?? 0
  const hasAssignedEConsults = totalCount > 0

  return {
    hasAssignedEConsults,
    isLoading: loading,
    totalCount
  }
}
