import { gql } from '@apollo/client'

export const HOSPITAL_SNS_QUERY = gql`
  query HospitalSns($pageRow: Int, $startIndex: Int) {
    hospitalSns(pageRow: $pageRow, startIndex: $startIndex) {
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
