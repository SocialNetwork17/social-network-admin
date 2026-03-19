import {gql} from '@apollo/client';

export const GET_USER = gql`query GetUser($userId: Int!) {
    getUser(userId: $userId) {
        id
        userName
        email
        createdAt
        profile {
            id
            userName
            firstName
            lastName
            city
            country
            region
            dateOfBirth
            aboutMe
            createdAt
            avatars {
                url
                width
                height
                fileSize
            }
        }
        userBan {
            reason
            createdAt
        }
    }
}`;

