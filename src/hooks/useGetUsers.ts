import {
    Query,
    QueryGetUsersArgs,
    SortDirection,
    UserBlockStatus
} from '@/types';
import {GET_USERS} from "@/queries/users";
import {useQuery} from "@apollo/client/react";

type GetUsersResponse = Pick<Query, 'getUsers'>;
type GetUsersVariables = QueryGetUsersArgs;

export const useGetUsers = (variables: GetUsersVariables = {}) => {
    const { data, loading, error, refetch } = useQuery<GetUsersResponse>(GET_USERS, {
        variables: {
            pageNumber: 1,
            pageSize: 10,
            sortBy: 'createdAt',
            sortDirection: SortDirection.Desc,
            statusFilter: UserBlockStatus.All,
            ...variables
        },
        fetchPolicy: 'cache-and-network',
    });

    return {
        users: data?.getUsers.users || [],
        pagination: data?.getUsers.pagination || {
            page: 1,
            pageSize: 10,
            pagesCount: 1,
            totalCount: 0
        },
        loading,
        error,
        refetch: (newVars?: Partial<GetUsersVariables>) =>
            refetch({ ...variables, ...newVars })
    };
};