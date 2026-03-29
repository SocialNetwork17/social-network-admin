import { gql } from "@apollo/client";

export const POSTS_ALL_QUERY = gql`
  query GetAllPosts(
    $endCursorPostId: Int
    $searchTerm: String
    $pageSize: Int = 12
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      pagesCount
      pageSize
      totalCount
      items {
        images {
          url
        }
        id
        ownerId
        description
        createdAt
        updatedAt
        postOwner {
          id
          userName
          avatars {
            url
          }
        }
        userBan {
          createdAt
          reason
        }
      }
    }
  }
`;

export const POSTS_SUBSCRIPTION = gql`
    subscription OnPostAdded {
        postAdded {
            images {
                url
            }
            id
            ownerId
            description
            createdAt
            updatedAt
            postOwner {
                id
                userName
                avatars {
                    url
                }
            }
            userBan {
                createdAt
                reason
            }
        }
    }
`;