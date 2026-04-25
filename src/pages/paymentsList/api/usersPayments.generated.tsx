import * as Types from '../../../types';

export type GetPaymentsQueryVariables = Types.Exact<{
  pageSize: Types.Scalars['Int']['input'];
  pageNumber: Types.Scalars['Int']['input'];
  sortBy?: Types.InputMaybe<Types.Scalars['String']['input']>;
  sortDirection?: Types.InputMaybe<Types.SortDirection>;
  searchTerm?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type GetPaymentsQuery = { __typename?: 'Query', getPayments: { __typename?: 'PaymentsPaginationModel', pagesCount: number, page: number, pageSize: number, totalCount: number, items: Array<{ __typename?: 'SubscriptionPaymentsModel', id?: number | null, userId?: number | null, paymentMethod: Types.PaymentMethod, amount?: number | null, currency?: Types.CurrencyType | null, createdAt?: any | null, endDate?: any | null, type: Types.SubscriptionType, userName: string, avatars?: Array<{ __typename?: 'Avatar', url?: string | null, width?: number | null, height?: number | null, fileSize?: number | null }> | null }> } };
