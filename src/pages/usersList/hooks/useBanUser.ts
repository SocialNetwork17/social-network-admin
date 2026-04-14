import {useMutation} from "@apollo/client/react";
import {BAN_USER, GET_USERS} from '@/pages/usersList/api/users';
import { BanUserMutation, BanUserMutationVariables } from '@/pages/usersList/api/users.generated';

export const useBanUser = () => {
    const [banUserMutation, { loading, error }] = useMutation<BanUserMutation, BanUserMutationVariables>(
        BAN_USER,
        {
            refetchQueries: [{ query: GET_USERS }],
            awaitRefetchQueries: true,
            onError: (error) => {
                console.error('GraphQL error:', error);
            }
        }
    );

    const banUser = async (userId: number, banReason: string): Promise<boolean> => {
        try {
            const response = await banUserMutation({
                variables: {
                    userId,
                    banReason
                }
            });

            // Проверяем структуру ответа
            if (response && response.data) {
                return response.data.banUser ?? false;
            }
            return false;
        } catch (err) {
            console.error('Error banning user:', err);
            throw err;
        }
    };

    return {
        banUser,
        loading,
        error
    };
};