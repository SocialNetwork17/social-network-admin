import * as Types from '../../../types';

export type GetPaymentsQueryVariables = Types.Exact<{
  pageNumber?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  pageSize?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
}>;


export type GetPaymentsQuery = { __typename?: 'Query', getPayments: { __typename?: 'PaymentsPaginationModel', page: number, pageSize: number, pagesCount: number, totalCount: number, items: Array<{ __typename?: 'SubscriptionPaymentsModel', id?: number | null, userName: string, createdAt?: any | null, amount?: number | null, type: Types.SubscriptionType, paymentMethod: Types.PaymentMethod, avatars?: Array<{ __typename?: 'Avatar', url?: string | null }> | null }> } };
