import { gql } from '@apollo/client'

export const HOSPITAL_SNS_QUERY = gql`
  query HospitalSns($hospitalCode: HospitalCode!, $pageRow: Int) {
    hospitalSns(hospitalCode: $hospitalCode, pageRow: $pageRow) {
      totalCount
      articles {
        articleNo
        title
        linkUrl
        thumbnailUrl
        category
        createdDt
        hospitalName
        writer
      }
    }
  }
`
