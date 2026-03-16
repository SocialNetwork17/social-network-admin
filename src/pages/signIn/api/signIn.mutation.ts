import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
    mutation SignIn($email: String!, $password: String!) {
        loginAdmin(email: $email, password: $password) {
            logged
        }
    }
`;
