import {useMutation} from "@apollo/client/react";
import {BAN_USER, GET_USERS} from '@/pages/usersList/api/users';
import { BanUserMutation, BanUserMutationVariables } from '@/pages/usersList/api/users.generated';

export const useBanUser = () => {
    const [banUserMutation, { loading, error, data }] = useMutation<BanUserMutation, BanUserMutationVariables>(BAN_USER);

    const banUser = async (userId: number, banReason: string): Promise<boolean> => {
        try {
            const response = await banUserMutation({
                variables: {
                    userId,
                    banReason
                },
                refetchQueries: [{ query: GET_USERS }],
                awaitRefetchQueries: true
            });

            return response.data?.banUser ?? false;
        } catch (err) {
            console.error('Error banning user:', err);
            throw err;
        }
    };

    return {
        banUser,
        loading,
        error,
        data
    };
};