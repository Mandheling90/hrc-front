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

export const HOSPITAL_NEWS_QUERY = gql`
  query HospitalNews($pageRow: Int, $startIndex: Int) {
    hospitalNews(pageRow: $pageRow, startIndex: $startIndex) {
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

export const HOSPITAL_LECTURES_QUERY = gql`
  query HospitalLectures($pageRow: Int, $startIndex: Int) {
    hospitalLectures(pageRow: $pageRow, startIndex: $startIndex) {
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
