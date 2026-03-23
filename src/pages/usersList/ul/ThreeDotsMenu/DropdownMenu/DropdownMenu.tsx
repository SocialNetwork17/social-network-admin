'use client'

import React from 'react'
import s from './DropdownMenu.module.scss'
import {Icon} from "@/shared/ul/Icon/Icon";

type DropdownMenuProps = {
    onDeleteUser: () => void
    onBanUser: () => void
    onMoreInfo: () => void
}

export const DropdownMenu = ({ onDeleteUser, onBanUser, onMoreInfo }: DropdownMenuProps) => {
    return (
        <div className={s.dropdownMenu}>
            <button onClick={onDeleteUser} className={s.dropdownItem}>
                <span className={s.dropdownIcon}>
                  <Icon iconId="icon-delete-user" size={24}/>
                </span>
                <span className={s.dropdownText}>Delete User</span>
            </button>
            <button onClick={onBanUser} className={`${s.dropdownItem} ${s.deleteItem}`} >
                <span className={s.dropdownIcon}>
                  <Icon iconId="icon-cancel" size={24}/>
                </span>
                <span className={s.dropdownText}>Ban in the system</span>
            </button>
            <button onClick={onMoreInfo} className={`${s.dropdownItem} ${s.deleteItem}`} >
                <span className={s.dropdownIcon}>
                  <Icon iconId="threeDots" size={24}/>
                </span>
                <span className={s.dropdownText}>More Information</span>
            </button>
        </div>
    )
}