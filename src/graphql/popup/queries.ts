import { gql } from '@apollo/client'

export const SLIDE_BANNERS_QUERY = gql`
  query SlideBanners($hospitalCode: HospitalCode!) {
    slideBanners(hospitalCode: $hospitalCode) {
      id
      hospitalCode
      popupType
      isActive
      alwaysVisible
      targetBlank
      imageUrl
      imageDarkUrl
      mobileImageUrl
      mobileDarkImageUrl
      linkUrl
      altText
      mainSlogan
      subSlogan
      mediaType
      videoUrl
      sortOrder
    }
  }
`

export const MINI_BANNERS_QUERY = gql`
  query MiniBanners($hospitalCode: HospitalCode!) {
    miniBanners(hospitalCode: $hospitalCode) {
      id
      hospitalCode
      popupType
      isActive
      targetBlank
      imageUrl
      mobileImageUrl
      linkUrl
      altText
      sortOrder
    }
  }
`

export const ACTIVE_POPUPS_QUERY = gql`
  query ActivePopups($hospitalCode: HospitalCode!) {
    activePopups(hospitalCode: $hospitalCode) {
      id
      hospitalCode
      popupType
      isActive
      alwaysVisible
      targetBlank
      imageUrl
      imageDarkUrl
      mobileImageUrl
      mobileDarkImageUrl
      linkUrl
      altText
      mainSlogan
      subSlogan
      mediaType
      videoUrl
      sortOrder
    }
  }
`
