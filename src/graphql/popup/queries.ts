import { gql } from '@apollo/client'

export const SLIDE_BANNERS_QUERY = gql`
  query SlideBanners {
    slideBanners {
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
  query MiniBanners {
    miniBanners {
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
  query ActivePopups {
    activePopups {
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
