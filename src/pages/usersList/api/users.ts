import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query GetUsers(
        $pageNumber: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
        $searchTerm: String
        $statusFilter: UserBlockStatus
    ) {
        getUsers(
            pageNumber: $pageNumber
            pageSize: $pageSize
            sortBy: $sortBy
            sortDirection: $sortDirection
            searchTerm: $searchTerm
            statusFilter: $statusFilter
        ) {
            users {
                id
                userName
                email
                createdAt
                userBan {
                    reason
                    createdAt
                }
            }
            pagination {
                page
                pageSize
                pagesCount
                totalCount
            }
        }
    }
`;

export const REMOVE_USER = gql`
    mutation RemoveUser($userId: Int!) {
        removeUser(userId: $userId)
    }
`;