import { gql } from '@apollo/client'

export const GET_ASSET_QUERY = gql`
  query ($id: String!) {
    asset(id: $id) {
      title
      url
    }
  }
`
