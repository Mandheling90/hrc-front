import { gql } from '@apollo/client'

export const MENUS_QUERY = gql`
  query Menus($menuType: MenuType!) {
    menus(menuType: $menuType) {
      id
      name
      path
      sortOrder
      menuTargetType
      targetBoardType
      targetBoardId
      targetContentId
      externalUrl
      gnbExposure
      iconName
      firstChildPath
      children {
        id
        name
        path
        sortOrder
        menuTargetType
        targetBoardType
        targetBoardId
        targetContentId
        externalUrl
        gnbExposure
        iconName
      }
    }
  }
`

export const BOARD_POSTS_QUERY = gql`
  query BoardPosts($boardId: String!, $pagination: PaginationInput, $search: String) {
    boardPosts(boardId: $boardId, pagination: $pagination, search: $search) {
      items {
        id
        title
        content
        createdAt
        thumbnailUrl
        isPinned
        viewCount
      }
      totalCount
    }
    pinnedPosts(boardId: $boardId) {
      id
      title
      content
      createdAt
      thumbnailUrl
      isPinned
      viewCount
    }
  }
`

export const BOARD_POST_BY_ID_QUERY = gql`
  query BoardPostById($boardId: String!, $id: String!) {
    boardPostById(boardId: $boardId, id: $id) {
      id
      title
      content
      createdAt
      thumbnailUrl
      isPinned
      viewCount
    }
  }
`

export const ATTACHMENTS_QUERY = gql`
  query Attachments($entityId: ID!, $entityType: AttachmentEntityType!) {
    attachments(entityId: $entityId, entityType: $entityType) {
      id
      originalName
      storedPath
      mimeType
      fileSize
      createdAt
    }
  }
`

export const PRESIGNED_DOWNLOAD_URL_QUERY = gql`
  query PresignedDownloadUrl($attachmentId: ID!) {
    presignedDownloadUrl(attachmentId: $attachmentId)
  }
`

export const CONTENT_BY_ID_QUERY = gql`
  query ContentById($id: String!) {
    contentById(id: $id) {
      id
      title
      body
      hospitalCode
      contentGroupName
      updatedAt
    }
  }
`
