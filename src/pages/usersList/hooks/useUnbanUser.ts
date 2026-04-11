import {GET_USERS, UNBAN_USER} from '@/pages/usersList/api/users';
import { UnbanUserMutation, UnbanUserMutationVariables } from '@/pages/usersList/api/users.generated';
import {useMutation} from "@apollo/client/react";

export const useUnbanUser = () => {
    const [unbanUserMutation, { loading, error, data }] = useMutation<UnbanUserMutation, UnbanUserMutationVariables>(UNBAN_USER);

    const unbanUser = async (userId: number): Promise<boolean> => {
        try {
            const response = await unbanUserMutation({
                variables: {
                    userId
                },
                refetchQueries: [{ query: GET_USERS }],
                awaitRefetchQueries: true
            });

            return response.data?.unbanUser ?? false;
        } catch (err) {
            console.error('Error unbanning user:', err);
            throw err;
        }
    };

    return {
        unbanUser,
        loading,
        error,
        data
    };
};