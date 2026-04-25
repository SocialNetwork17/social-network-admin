'use client'

import styles from './PaymentsList.module.scss'
import Pagination from "@/shared/ul/Pagination/Pagination";
import {Icon} from "@/shared/ul/Icon/Icon";
import {SearchInput} from "@/shared/ul/SearchInput/SearchInput";
import {BaseOption} from "@/shared/ul/select-box/SelectBox";
import {useState} from "react";
import {useQuery} from "@apollo/client/react";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";
import {SortDirection} from '@/types';
import {GET_PAYMENTS} from "@/pages/paymentsList/api/usersPayments";
import {GetPaymentsQuery, GetPaymentsQueryVariables} from "@/pages/paymentsList/api/usersPayments.generated";

type SortField = 'createdAt' | 'userName'

export const PaymentsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    // сортировка
    const [sortBy, setSortBy] = useState<SortField>('createdAt')
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

    const { data, loading, error } = useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
        GET_PAYMENTS,
        {
            variables: {
                pageSize: itemsPerPage,
                pageNumber: currentPage,
                sortBy,
                sortDirection,
                searchTerm: searchTerm || undefined,
            },
            fetchPolicy: 'cache-first',
        }
    );

    console.log('data', data)

    if (loading) return <div>Loading...</div>;

    const users = data?.getPayments?.items || [];


    const handleSelect = (option: BaseOption) => {
        console.log('Selected:', option)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (option: BaseOption) => {
        setItemsPerPage(parseInt(option.label));
        setCurrentPage(1); // Сброс на первую страницу
    };

    const pagination = data?.getPayments;

    // Общее количество элементов для пагинации
    const totalItems = pagination?.totalCount || 0;

    // сортировка - общая функция
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

    return (
        <div className={styles.container}>
            <div className={styles.userTop}>
                <SearchInput placeholder={"Search"}/>
            </div>
            <div className={styles.userListHeader}>
                <div className={styles.userID}>User ID</div>
                <div className={styles.profileLink}>Profile link</div>

                <button
                    type="button"
                    className={`${styles.sortButton} ${styles.username}`}
                    onClick={() => handleSort('userName', SortDirection.Asc)}
                >
                    Username
                    <Icon iconId={"sortingUser"} size={12}  viewBox="0 0 8 12"/>
                </button>

                <button
                    type="button"
                    className={`${styles.sortButton} ${styles.dateAdded}`}
                    onClick={() => handleSort('createdAt', SortDirection.Desc)}
                >
                    Date added
                    <Icon iconId={"sortingUser"} size={12}  viewBox="0 0 8 12"/>
                </button>

                <div className={styles.threeDotsArea}></div>


            </div>
            <ul className={styles.userListBody}>
                {users?.map((user) => (
                    <li key={user.id} className={styles.userListElement}>
                        <div className={styles.userID}>
                            {user.id}
                        </div>
                        <div className={styles.profileLink}>{user.paymentMethod}</div>
                        <div className={styles.username}>{user.userName}</div>
                        <div className={styles.dateAdded}>{formatToDDMMYYYY(user.createdAt)}</div>
                    </li>
                ))}
            </ul>
            <div className={styles.userListPagination}>
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onSelectChange={handlePageSizeChange}
                />
            </div>
        </div>
    )
}