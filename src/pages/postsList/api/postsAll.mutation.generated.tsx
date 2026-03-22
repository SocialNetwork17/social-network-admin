import * as Types from '../../../types';

export type GetAllPostsQueryVariables = Types.Exact<{
  endCursorPostId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PostsPaginationModel', pagesCount: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'Post', description: string, createdAt: any, images?: Array<{ __typename?: 'ImagePost', url?: string | null }> | null, postOwner: { __typename?: 'PostOwnerModel', userName: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null } }> } };
