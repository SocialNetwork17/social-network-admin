'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {useQuery} from '@apollo/client/react'
import Pagination, {Option} from '@/shared/ul/Pagination/Pagination'
import {formatToDDMMYYYY} from '@/shared/utils/dateFormat'
import {
    GET_USER_DETAILS,
    GET_USER_FOLLOWERS,
    GET_USER_FOLLOWING,
    GET_USER_PHOTOS,
    GET_USER_PAYMENTS,
} from '@/pages/usersList/api/userDetails'
import {
    GetUserDetailsQuery,
    GetUserDetailsQueryVariables,
    GetUserFollowersQuery,
    GetUserFollowersQueryVariables,
    GetUserFollowingQuery,
    GetUserFollowingQueryVariables,
    GetUserPaymentsQuery,
    GetUserPaymentsQueryVariables,
    GetUserPhotosQuery,
    GetUserPhotosQueryVariables,
} from '@/pages/usersList/api/userDetails.generated'
import {SortDirection} from '@/types'
import s from './UserDetailsPage.module.scss'
import {Icon} from "@/shared/ul/Icon/Icon";

type UserDetailsPageProps = {
    userId: number
}

type TabKey = 'uploadedPhotos' | 'payments' | 'followers' | 'following'


const pageSizeOptions: Option[] = [
    {id: '1', label: '10'},
    {id: '2', label: '20'},
    {id: '3', label: '30'},
]

const tabs: Array<{ key: TabKey; label: string }> = [
    {key: 'uploadedPhotos', label: 'Uploaded photos'},
    {key: 'payments', label: 'Payments'},
    {key: 'followers', label: 'Followers'},
    {key: 'following', label: 'Following'},
]

const formatProfileLink = (userName: string) => `https://inctagram.work/profile/${userName}`
const formatPaymentMethod = (value?: string | null) => value?.replaceAll('_', ' ') ?? '-'
const getFullName = (item: { firstName?: string | null; lastName?: string | null }) => {
    const fullName = [item.firstName, item.lastName].filter(Boolean).join(' ')
    return fullName || '-'
}

export const UserDetailsPage = ({userId}: UserDetailsPageProps) => {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<TabKey>('uploadedPhotos')
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(Number(pageSizeOptions[0].label))

    // GraphQL запросы
    const {data, loading, error} = useQuery<GetUserDetailsQuery, GetUserDetailsQueryVariables>(GET_USER_DETAILS, {
        variables: {userId},
        skip: Number.isNaN(userId), // - если userId не число, запрос не выполняется.
    })

    const photosQuery = useQuery<GetUserPhotosQuery, GetUserPhotosQueryVariables>(GET_USER_PHOTOS, {
        variables: {userId},
        skip: Number.isNaN(userId),
    })

    const paymentsQuery = useQuery<GetUserPaymentsQuery, GetUserPaymentsQueryVariables>(GET_USER_PAYMENTS, {
        variables: {
            userId,
            pageNumber: currentPage,
            pageSize: itemsPerPage,
            sortBy: 'dateOfPayment',
            sortDirection: SortDirection.Desc,
        },
        skip: Number.isNaN(userId) || activeTab !== 'payments', //активная вкладка не "payments"/ запрос на платежи выполняется только когда открыта вкладка payments
    })

    const followersQuery = useQuery<GetUserFollowersQuery, GetUserFollowersQueryVariables>(GET_USER_FOLLOWERS, {
        variables: {
            userId,
            pageNumber: currentPage,
            pageSize: itemsPerPage,
            sortBy: 'createdAt',
            sortDirection: SortDirection.Desc,
        },
        skip: Number.isNaN(userId) || activeTab !== 'followers',
    })

    const followingQuery = useQuery<GetUserFollowingQuery, GetUserFollowingQueryVariables>(GET_USER_FOLLOWING, {
        variables: {
            userId,
            pageNumber: currentPage,
            pageSize: itemsPerPage,
            sortBy: 'createdAt',
            sortDirection: SortDirection.Desc,
        },
        skip: Number.isNaN(userId) || activeTab !== 'following',
    })

    const user = data?.getUser
    const uploadedPhotos = photosQuery.data?.getPostsByUser.items?.filter(photo => photo?.url) ?? []

    //У нас есть несколько вкладок, и у каждой свой GraphQL-запрос со своими loading, error и totalCount.
    // Вместо того чтобы в JSX постоянно проверять, какая вкладка активна и к какому запросу обращаться, мы один раз выбираем нужные значения и сохраняем их в универсальные переменные.
    let currentLoading = false
    let currentError = null
    let currentTotalItems = 0

    if (activeTab === 'uploadedPhotos') {
        currentLoading = photosQuery.loading
        currentError = photosQuery.error
        currentTotalItems = photosQuery.data?.getPostsByUser.totalCount ?? 0
    } else if (activeTab === 'payments') {
        currentLoading = paymentsQuery.loading
        currentError = paymentsQuery.error
        currentTotalItems = paymentsQuery.data?.getPaymentsByUser.totalCount ?? 0
    } else if (activeTab === 'followers') {
        currentLoading = followersQuery.loading
        currentError = followersQuery.error
        currentTotalItems = followersQuery.data?.getFollowers?.totalCount ?? 0
    } else {
        currentLoading = followingQuery.loading
        currentError = followingQuery.error
        currentTotalItems = followingQuery.data?.getFollowing?.totalCount ?? 0
    }

    //Обработчик смены вкладки
    const handleTabChange = (tab: TabKey) => {
        setActiveTab(tab)
        setCurrentPage(1)
    }

    //Обработчик смены page size
    const handlePageSizeChange = (option: Option) => {
        setItemsPerPage(Number(option.label))
        setCurrentPage(1)
    }

    //Защита от невалидного userId
    if (Number.isNaN(userId)) {
        return <div className={s.status}>Invalid user id.</div>
    }

    //Состояние загрузки шапки
    if (loading) {
        return <div className={s.status}>Loading user details...</div>
    }

    //Ошибка загрузки шапки
    if (error || !user) {
        return <div className={s.status}>Failed to load user details.</div>
    }

    return (
        <div className={s.container}>

            {/*Кнопка назад*/}
            <button className={s.backButton} onClick={() => router.push('/admin/users')}>
                <Icon iconId={'arrowBack'} size={24} viewBox={'0 0 24 24'}/>
                Back to users list
            </button>

            {/*Шапка страницы*/}
            <section className={s.header}>
                <div className={s.avatarWrapper}>
                    {user.profile.avatars?.[0]?.url ? (
                        <img className={s.avatar} src={user.profile.avatars[0].url} alt={user.userName}/>
                    ) : (
                        <div className={s.avatarFallback}>{user.userName.slice(0, 1).toUpperCase()}</div>
                    )}
                </div>
                <div className={s.userName}>
                    <h1 className={s.title}>{user.userName}</h1>
                    <a className={s.link} href={formatProfileLink(user.userName)} target="_blank" rel="noreferrer">
                        {formatProfileLink(user.userName)}
                    </a>
                </div>
            </section>

            {/*Секция с дополнительной информацией*/}
            <section className={s.info}>
                <div className={s.metaItem}>
                    <span className={s.metaLabel}>User ID</span>
                    <span>{user.id}</span>
                </div>
                <div className={s.metaItem}>
                    <span className={s.metaLabel}>Profile Creation Date</span>
                    <span>{formatToDDMMYYYY(user.createdAt)}</span>
                </div>
            </section>

            {/*Контентная секция*/}
            <section className={s.content}>
                <div className={s.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.key}
                            className={`${s.tab} ${activeTab === tab.key ? s.activeTab : ''}`}
                            onClick={() => handleTabChange(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {currentLoading ? <div className={s.status}>Loading tab data...</div> : null}
                {currentError ? <div className={s.status}>Failed to load tab data.</div> : null}

                {!currentLoading && !currentError ? (
                    <>
                        {activeTab === 'uploadedPhotos' ? (
                            uploadedPhotos.length ? (
                                <div>
                                    <div className={s.sectionHeader}>
                                        <h2 className={s.sectionTitle}>Uploaded photos</h2>
                                        <span className={s.sectionCount}>
                                            {photosQuery.data?.getPostsByUser.totalCount ?? 0}
                                        </span>
                                    </div>
                                    <div className={s.photosGrid}>
                                        {uploadedPhotos.map((photo, index) => (
                                            <div key={photo.id ?? index} className={s.photoCard}>
                                                <img
                                                    className={s.photo}
                                                    src={photo.url ?? ''}
                                                    alt={`${user.userName} uploaded photo ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className={s.emptyState}>No uploaded photos found.</div>
                            )
                        ) : null}
                        {activeTab === 'payments' ? (
                            (paymentsQuery.data?.getPaymentsByUser.items ?? []).length ? (
                                <div className={s.tableWrapper}>
                                    <div className={`${s.tableRow} ${s.tableHead} ${s.paymentsTable}`}>
                                        <div>Date of Payment</div>
                                        <div>End Date</div>
                                        <div>Amount</div>
                                        <div>Type</div>
                                        <div>Method</div>
                                        <div>Status</div>
                                    </div>
                                    {(paymentsQuery.data?.getPaymentsByUser.items ?? []).map(item => (
                                        <div key={item.id} className={`${s.tableRow} ${s.paymentsTable}`}>
                                            <div>{formatToDDMMYYYY(item.dateOfPayment ?? undefined) || '-'}</div>
                                            <div>{formatToDDMMYYYY(item.endDate ?? undefined) || '-'}</div>
                                            <div>${item.price}</div>
                                            <div>{item.type}</div>
                                            <div>{formatPaymentMethod(item.paymentType)}</div>
                                            <div>{item.status}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={s.emptyState}>No payments found.</div>
                            )
                        ) : null}
                        {activeTab === 'followers' ? (
                            (followersQuery.data?.getFollowers?.items ?? []).length ? (
                                <div className={s.tableWrapper}>
                                    <div className={`${s.tableRow} ${s.tableHead} ${s.followsTable}`}>
                                        <div>ID</div>
                                        <div>Username</div>
                                        <div>Full name</div>
                                        <div>Followed at</div>
                                    </div>
                                    {(followersQuery.data?.getFollowers?.items ?? []).map(item => (
                                        <div key={`${item.id}-${item.userId}`} className={`${s.tableRow} ${s.followsTable}`}>
                                            <div>{item.userId}</div>
                                            <div>{item.userName || '-'}</div>
                                            <div>{getFullName(item)}</div>
                                            <div>{formatToDDMMYYYY(item.createdAt)}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={s.emptyState}>No users found.</div>
                            )
                        ) : null}
                        {activeTab === 'following' ? (
                            (followingQuery.data?.getFollowing?.items ?? []).length ? (
                                <div className={s.tableWrapper}>
                                    <div className={`${s.tableRow} ${s.tableHead} ${s.followsTable}`}>
                                        <div>ID</div>
                                        <div>Username</div>
                                        <div>Full name</div>
                                        <div>Followed at</div>
                                    </div>
                                    {(followingQuery.data?.getFollowing?.items ?? []).map(item => (
                                        <div key={`${item.id}-${item.userId}`} className={`${s.tableRow} ${s.followsTable}`}>
                                            <div>{item.userId}</div>
                                            <div>{item.userName || '-'}</div>
                                            <div>{getFullName(item)}</div>
                                            <div>{formatToDDMMYYYY(item.createdAt)}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={s.emptyState}>No users found.</div>
                            )
                        ) : null}

                        <div className={s.pagination}>
                            <Pagination
                                totalItems={currentTotalItems}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                                onSelectChange={handlePageSizeChange}
                            />
                        </div>
                    </>
                ) : null}
            </section>
        </div>
    )
}
