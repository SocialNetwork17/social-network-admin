'use client'

import styles from './PaymentsList.module.scss'
import Pagination from "@/shared/ul/Pagination/Pagination";
import {Icon} from "@/shared/ul/Icon/Icon";
import {SearchInput} from "@/shared/ul/SearchInput/SearchInput";
import {BaseOption} from "@/shared/ul/select-box/SelectBox";
import { ThreeDotsMenu } from './ThreeDotsMenu/ThreeDotsMenu';
import {useState} from "react";
import {useQuery} from "@apollo/client/react";
import {GET_USERS} from "@/pages/usersList/api/users";
import {formatToDDMMYYYY} from "@/shared/utils/dateFormat";
import {GetUsersQuery, GetUsersQueryVariables} from "@/pages/usersList/api/users.generated";
import {SortDirection, UserBlockStatus} from '@/types';

type SortField = 'createdAt' | 'userName'

export const PaymentsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    // сортировка
    const [sortBy, setSortBy] = useState<SortField>('createdAt')
    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Desc)

    const { data, loading, error } = useQuery<GetUsersQuery, GetUsersQueryVariables>(
        GET_USERS,
        {
            variables: {
                pageNumber: currentPage,
                pageSize: itemsPerPage,
                sortBy,
                sortDirection,
                searchTerm: searchTerm || undefined,
                statusFilter: UserBlockStatus.All,
            },
            fetchPolicy: 'cache-first',
        }
    );

    if (loading) return <div>Loading...</div>;

    const users = data?.getUsers?.users || [];


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

    const pagination = data?.getUsers?.pagination;

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
                            <div className={styles.userIsBaned}>
                                {user.userBan ? <Icon iconId={"icon-cancel"}/> : ''}
                            </div>
                            {user.id}
                        </div>
                        <div className={styles.profileLink}>{user.email}</div>
                        <div className={styles.username}>{user.userName}</div>
                        <div className={styles.dateAdded}>{formatToDDMMYYYY(user.createdAt)}</div>
                        <div className={styles.threeDotsArea}>
                            <ThreeDotsMenu userId={user.id} />
                        </div>
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