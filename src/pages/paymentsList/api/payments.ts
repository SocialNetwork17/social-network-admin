import { gql } from '@apollo/client'

export const GET_PAYMENTS = gql`
  query GetPayments(
    $pageNumber: Int
    $pageSize: Int
    $searchTerm: String
    $sortBy: String
    $sortDirection: SortDirection
  ) {
    getPayments(
      pageNumber: $pageNumber
      pageSize: $pageSize
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      items {
        id
        userName
        avatars {
          url
        }
        createdAt
        amount
        type
        paymentMethod
      }
      page
      pageSize
      pagesCount
      totalCount
    }
  }
`
