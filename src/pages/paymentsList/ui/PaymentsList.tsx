'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { SearchInput } from '@/shared/ul/SearchInput/SearchInput'
import { Icon } from '@/shared/ul/Icon/Icon'
import { formatToDDMMYYYY } from '@/shared/utils/dateFormat'
import { GET_PAYMENTS } from '../api/payments'
import { GetPaymentsQuery, GetPaymentsQueryVariables } from '../api/payments.generated'
import { PaymentMethod, SortDirection, SubscriptionType } from '@/types'
import s from './PaymentsList.module.scss'

type SortField = 'userName' | 'createdAt' | 'amount' | 'paymentMethod'

const PAGE_SIZE = 6

const formatPaymentMethod = (value?: PaymentMethod | null) => {
  switch (value) {
    case PaymentMethod.Paypal:
      return 'PayPal'
    case PaymentMethod.Stripe:
      return 'Stripe'
    case PaymentMethod.CreditCard:
      return 'Credit Card'
    default:
      return '-'
  }
}

const formatSubscriptionType = (value?: SubscriptionType | null) => {
  switch (value) {
    case SubscriptionType.Day:
      return '1 day'
    case SubscriptionType.Weekly:
      return '7 days'
    case SubscriptionType.Monthly:
      return '1 month'
    default:
      return '-'
  }
}

export const PaymentsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortField>('createdAt')
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchValue.trim())
      setCurrentPage(1)
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [searchValue])

  const { data, previousData, loading, error } = useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GET_PAYMENTS,
    {
      variables: {
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
        searchTerm: searchTerm || undefined,
        sortBy,
        sortDirection,
      },
      notifyOnNetworkStatusChange: true,
    }
  )

  const handleSort = (field: SortField, defaultDirection: SortDirection) => {
    setCurrentPage(1)

    if (sortBy === field) {
      setSortDirection(prev =>
        prev === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
      )

      return
    }

    setSortBy(field)
    setSortDirection(defaultDirection)
  }

  const queryData = data ?? previousData
  const payments = queryData?.getPayments.items ?? []
  const totalPages = queryData?.getPayments.pagesCount ?? 1
  const totalCount = queryData?.getPayments.totalCount ?? 0

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (loading && !queryData) {
    return <div className={s.status}>Loading payments...</div>
  }

  if (error) {
    return <div className={s.status}>Error: {error.message}</div>
  }

  return (
    <div className={s.container}>
      <div className={s.topBar}>
        <SearchInput
          placeholder={'Search by username'}
          value={searchValue}
          onValueChange={setSearchValue}
        />
      </div>

      <div className={s.tableWrapper}>
        <div className={`${s.tableRow} ${s.tableHead}`}>
          <button
            type="button"
            className={`${s.sortButton} ${s.usernameColumn}`}
            onClick={() => handleSort('userName', SortDirection.Asc)}
          >
            Username
            <Icon iconId={'sortingUser'} size={12} viewBox={'0 0 8 12'} />
          </button>
          <button
            type="button"
            className={`${s.sortButton} ${s.dateColumn}`}
            onClick={() => handleSort('createdAt', SortDirection.Desc)}
          >
            Date added
            <Icon iconId={'sortingUser'} size={12} viewBox={'0 0 8 12'} />
          </button>
          <button
            type="button"
            className={`${s.sortButton} ${s.amountColumn}`}
            onClick={() => handleSort('amount', SortDirection.Asc)}
          >
            Amount
            <Icon iconId={'sortingUser'} size={12} viewBox={'0 0 8 12'} />
          </button>
          <div className={s.subscriptionColumn}>Subscription</div>
          <button
            type="button"
            className={`${s.sortButton} ${s.methodColumn}`}
            onClick={() => handleSort('paymentMethod', SortDirection.Asc)}
          >
            Payment Method
            <Icon iconId={'sortingUser'} size={12} viewBox={'0 0 8 12'} />
          </button>
        </div>

        {payments.length ? (
          payments.map(payment => {
            const avatarUrl = payment.avatars?.[0]?.url
            const userInitial = payment.userName?.slice(0, 1).toUpperCase() || '?'

            return (
              <div key={payment.id} className={s.tableRow}>
                <div className={s.usernameColumn}>
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className={s.avatar} src={avatarUrl} alt={payment.userName} />
                  ) : (
                    <div className={s.avatarFallback}>{userInitial}</div>
                  )}
                  <span>{payment.userName}</span>
                </div>
                <div className={s.dateColumn}>
                  {formatToDDMMYYYY(payment.createdAt ?? undefined) || '-'}
                </div>
                <div className={s.amountColumn}>${payment.amount ?? 0}</div>
                <div className={s.subscriptionColumn}>
                  {formatSubscriptionType(payment.type)}
                </div>
                <div className={s.methodColumn}>
                  {formatPaymentMethod(payment.paymentMethod)}
                </div>
              </div>
            )
          })
        ) : (
          <div className={s.emptyState}>No payments found.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className={s.pagination}>
          <button
            type="button"
            className={s.paginationButton}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className={s.paginationButton}
            onClick={handleNextPage}
            disabled={currentPage === totalPages || !totalCount}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
