import { gql } from '@apollo/client';
// Импортируем типы из client-preset
import type { GetUsersQuery, GetUsersQueryVariables } from '@/gql/graphql';

// Используем обычный gql тег, типы будут подхвачены отдельно
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
                profile {
                    firstName
                    lastName
                    avatars {
                        url
                        width
                        height
                    }
                }
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

// Экспортируем типы для использования в компонентах
export type { GetUsersQuery, GetUsersQueryVariables };