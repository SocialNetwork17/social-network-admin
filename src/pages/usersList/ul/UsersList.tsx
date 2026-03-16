'use client'

import styles from './UsersList.module.scss'
import Pagination from "@/shared/ul/Pagination/Pagination";
import {Icon} from "@/shared/ul/Icon/Icon";
import {SearchInput} from "@/shared/ul/SearchInput/SearchInput";
import {BaseOption, SelectBox} from "@/shared/ul/select-box/SelectBox";
import { ThreeDotsMenu } from './ThreeDotsMenu/ThreeDotsMenu';

type User = {
    isBaned: boolean,
    userID: string
    profileLink: string
    Username: string
    dateAdded: string
}

export const UsersList = () => {
    const optionsOfBan = [
        { id: '1', label: 'Not selected'},
        { id: '2', label: 'Blocked'},
        { id: '3', label: 'Not Blocked'},
    ]

    const handleSelect = (option: BaseOption) => {
        console.log('Selected:', option)
    }

    const users: User[] = [
        {
            isBaned: true,
            userID: "21331QErQe21",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: false,
            userID: "21331QErQe22",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: true,
            userID: "21331QErQe23",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: false,
            userID: "21331QErQe24",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: true,
            userID: "21331QErQe25",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: true,
            userID: "21331QErQe26",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: true,
            userID: "21331QErQe27",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: false,
            userID: "21331QErQe28",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: true,
            userID: "21331QErQe29",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: false,
            userID: "21331QErQe30",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: true,
            userID: "21331QErQe31",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: true,
            userID: "21331QErQe32",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: false,
            userID: "21331QErQe33",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        },
        {
            isBaned: true,
            userID: "21331QErQe34",
            profileLink: "Ivan.sr.yakimenko",
            Username: "Ivan Yakymenko",
            dateAdded: "12.12.2022"
        }
    ]

    return (
        <div className={styles.container}>
            <div className={styles.userTop}>
                <SearchInput
                    placeholder={"Search"}
                />
                <SelectBox
                    placeholder={"Not selected"}
                    options={optionsOfBan}
                    onChange={handleSelect}
                    defaultValue={optionsOfBan[0]}
                />
            </div>
            <div className={styles.userListHeader}>
                <div className={styles.userID}>User ID</div>
                <div className={styles.profileLink}>Profile link</div>
                <div className={styles.username}>Username</div>
                <div className={styles.dateAdded}>Date added</div>
                <div className={styles.threeDotsArea}></div>
            </div>
            <ul className={styles.userListBody}>
                {users?.map((user) => (
                    <li key={user.userID} className={styles.userListElement}>
                        <div className={styles.userID}>
                            <div className={styles.userIsBaned}>
                                {user.isBaned ? <Icon iconId={"icon-cancel"}/> : ''}
                            </div>
                            {user.userID}
                        </div>
                        <div className={styles.profileLink}>{user.profileLink}</div>
                        <div className={styles.username}>{user.Username}</div>
                        <div className={styles.dateAdded}>{user.dateAdded}</div>
                        <div className={styles.threeDotsArea}>
                            <ThreeDotsMenu postId={123} />
                        </div>
                    </li>
                ))}
            </ul>
            <div className={styles.userListPagination}>
                <Pagination
                    totalItems={11}
                    itemsPerPage={10}
                    currentPage={1}
                    // onPageChange={handlePageChange}
                    // onSelectChange={handlePageSizeChange}
                />
            </div>
        </div>
    )
}