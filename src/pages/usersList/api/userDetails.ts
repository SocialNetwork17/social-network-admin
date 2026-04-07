import { gql } from '@apollo/client';

export const GET_USER_DETAILS = gql`
    query GetUserDetails($userId: Int!) {
        getUser(userId: $userId) {
            id
            userName
            email
            createdAt
            profile {
                avatars {
                    url
                    width
                    height
                }
            }
        }
    }
`;

export const GET_USER_PAYMENTS = gql`
    query GetUserPayments(
        $userId: Int!
        $pageNumber: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
    ) {
        getPaymentsByUser(
            userId: $userId
            pageNumber: $pageNumber
            pageSize: $pageSize
            sortBy: $sortBy
            sortDirection: $sortDirection
        ) {
            items {
                id
                dateOfPayment
                endDate
                paymentType
                price
                status
                type
            }
            page
            pageSize
            pagesCount
            totalCount
        }
    }
`;

export const GET_USER_FOLLOWERS = gql`
    query GetUserFollowers(
        $userId: Int!
        $pageNumber: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
    ) {
        getFollowers(
            userId: $userId
            pageNumber: $pageNumber
            pageSize: $pageSize
            sortBy: $sortBy
            sortDirection: $sortDirection
        ) {
            items {
                id
                userId
                userName
                firstName
                lastName
                createdAt
            }
            page
            pageSize
            pagesCount
            totalCount
        }
    }
`;

export const GET_USER_FOLLOWING = gql`
    query GetUserFollowing(
        $userId: Int!
        $pageNumber: Int
        $pageSize: Int
        $sortBy: String
        $sortDirection: SortDirection
    ) {
        getFollowing(
            userId: $userId
            pageNumber: $pageNumber
            pageSize: $pageSize
            sortBy: $sortBy
            sortDirection: $sortDirection
        ) {
            items {
                id
                userId
                userName
                firstName
                lastName
                createdAt
            }
            page
            pageSize
            pagesCount
            totalCount
        }
    }
`;

export const GET_USER_PHOTOS = gql`
    query GetUserPhotos($userId: Int!, $endCursorId: Int) {
        getPostsByUser(userId: $userId, endCursorId: $endCursorId) {
            items {
                id
                url
                width
                height
                createdAt
            }
            pageSize
            pagesCount
            totalCount
        }
    }
`;
