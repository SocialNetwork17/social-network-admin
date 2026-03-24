import {REMOVE_USER} from "@/pages/usersList/api/users";
import {useMutation} from "@apollo/client/react";
import {GetUsersQuery, RemoveUserMutation, RemoveUserMutationVariables} from "@/pages/usersList/api/users.generated";

export const useRemoveUser = () => {
    const [removeUserMutation, { loading, error }] = useMutation<RemoveUserMutation, RemoveUserMutationVariables>(REMOVE_USER, {
        // Обновляем кэш после удаления
        update(cache, { data }) {
            if (data?.removeUser) {
                // Принудительно перезапрашиваем список пользователей
                cache.evict({ fieldName: 'getUsers' });
                cache.gc();
            }
        },
    });

    const removeUser = async (userId: number) => {
        try {
            const { data } = await removeUserMutation({
                variables: { userId },
            });
            return data?.removeUser;
        } catch (err) {
            console.error('Error removing user:', err);
            throw err;
        }
    };

    return { removeUser, loading, error };
};