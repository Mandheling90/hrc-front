import { gql } from '@apollo/client'

export const ENUMS_QUERY = gql`
  query Enums {
    enums {
      name
      description
      values {
        key
        label
      }
    }
  }
`

export const ENUM_BY_NAME_QUERY = gql`
  query EnumByName($name: String!) {
    enumByName(name: $name) {
      name
      description
      values {
        key
        label
      }
    }
  }
`
