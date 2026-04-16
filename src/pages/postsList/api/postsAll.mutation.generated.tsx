import * as Types from '../../../types';

export type GetAllPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PostsPaginationModel', pagesCount: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Post', id: number, ownerId: number, description: string, createdAt: any, updatedAt: any, images?: Array<{ __typename?: 'ImagePost', url?: string | null }> | null, postOwner: { __typename?: 'PostOwnerModel', id: number, userName: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null }, userBan?: { __typename?: 'UserBan', createdAt: any, reason: string } | null }> } };

export type OnPostAddedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OnPostAddedSubscription = { __typename?: 'Subscription', postAdded: { __typename?: 'Post', id: number, ownerId: number, description: string, createdAt: any, updatedAt: any, images?: Array<{ __typename?: 'ImagePost', url?: string | null }> | null, postOwner: { __typename?: 'PostOwnerModel', id: number, userName: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null }, userBan?: { __typename?: 'UserBan', createdAt: any, reason: string } | null } };
