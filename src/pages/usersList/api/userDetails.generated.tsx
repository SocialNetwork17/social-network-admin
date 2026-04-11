import * as Types from '../../../types';

export type GetUserDetailsQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
}>;


export type GetUserDetailsQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, userName: string, email: string, createdAt: any, profile: { __typename?: 'Profile', avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null }> | null } } };

export type GetUserPaymentsQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetUserPaymentsQuery = { __typename?: 'Query', getPaymentsByUser: { __typename?: 'PaymentPaginationModel', page: number, pageSize: number, pagesCount: number, totalCount: number, items: Array<{ __typename?: 'SubscriptionByPaymentModel', id: string, dateOfPayment?: any | null, endDate?: any | null, paymentType?: Types.PaymentMethod | null, price: number, status: Types.StatusSubscriptionType, type: Types.SubscriptionType }> } };

export type GetUserFollowersQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetUserFollowersQuery = { __typename?: 'Query', getFollowers: { __typename?: 'FollowPaginationModel', page: number, pageSize: number, pagesCount: number, totalCount: number, items: Array<{ __typename?: 'Follow', id: number, userId: number, userName?: string | null, firstName?: string | null, lastName?: string | null, createdAt: any }> } };

export type GetUserFollowingQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetUserFollowingQuery = { __typename?: 'Query', getFollowing: { __typename?: 'FollowPaginationModel', page: number, pageSize: number, pagesCount: number, totalCount: number, items: Array<{ __typename?: 'Follow', id: number, userId: number, userName?: string | null, firstName?: string | null, lastName?: string | null, createdAt: any }> } };

export type GetUserPhotosQueryVariables = Types.Exact<{
  userId: Types.Scalars['Int']['input'];
  endCursorId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type GetUserPhotosQuery = { __typename?: 'Query', getPostsByUser: { __typename?: 'PostsByUserModel', pageSize: number, pagesCount: number, totalCount: number, items?: Array<{ __typename?: 'ImagePost', id?: number | null, url?: string | null, width?: number | null, height?: number | null, createdAt?: any | null }> | null } };
