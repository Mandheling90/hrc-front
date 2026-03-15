import { useCallback } from 'react'
import { useApolloClient, useMutation } from '@apollo/client/react'
import { IMAGING_REQUEST_OVERLAY_QUERY } from '@/graphql/hospital/queries'
import { REQUEST_IMAGING_EXAM_MUTATION } from '@/graphql/hospital/mutations'
import { PRESIGNED_DOWNLOAD_URL_QUERY } from '@/graphql/menu/queries'

export type ImagingDisplayState = 'REQUESTABLE' | 'PENDING_IMAGE' | 'VIEWABLE' | 'REJECTED' | 'EXPIRED'

export interface ImagingAttachment {
  id: string
  originalName: string
  mimeType: string
  fileSize: number
  storedPath: string
  createdAt: string
}

export interface ImagingOverlayResult {
  id: string
  displayState: ImagingDisplayState
  status: string
  requestedAt?: string
  expiresAt?: string
  attachments?: ImagingAttachment[]
}

interface OverlayInput {
  ptntNo: string
  examDate: string
  orderCode: string
  pacsAccessNo?: string | null
}

interface RequestInput {
  hospitalCode: string
  ptntNo: string
  examDate: string
  orderCode: string
  pacsAccessNo?: string | null
}

export function useImagingOverlay() {
  const client = useApolloClient()

  const fetchOverlay = useCallback(
    async (input: OverlayInput) => {
      const { data } = await client.query<{
        imagingRequestOverlay: ImagingOverlayResult | null
      }>({
        query: IMAGING_REQUEST_OVERLAY_QUERY,
        variables: input,
        fetchPolicy: 'network-only'
      })
      return data?.imagingRequestOverlay ?? null
    },
    [client]
  )

  return { fetchOverlay }
}

export function useRequestImagingExam() {
  const [mutate, { loading, error }] = useMutation<{
    requestImagingExam: ImagingOverlayResult
  }>(REQUEST_IMAGING_EXAM_MUTATION)

  const requestImagingExam = useCallback(
    async (input: RequestInput) => {
      const { data } = await mutate({ variables: { input } })
      return data?.requestImagingExam ?? null
    },
    [mutate]
  )

  return { requestImagingExam, loading, error }
}

export function usePresignedImageUrls() {
  const client = useApolloClient()

  const fetchPresignedUrls = useCallback(
    async (attachments: ImagingAttachment[]): Promise<string[]> => {
      const urls = await Promise.all(
        attachments.map(async (attachment) => {
          try {
            const { data } = await client.query<{ presignedDownloadUrl: string }>({
              query: PRESIGNED_DOWNLOAD_URL_QUERY,
              variables: { attachmentId: attachment.id },
              fetchPolicy: 'network-only'
            })
            return data?.presignedDownloadUrl ?? ''
          } catch {
            return ''
          }
        })
      )
      return urls.filter(Boolean)
    },
    [client]
  )

  return { fetchPresignedUrls }
}
