'use client'

import { useRef, useState } from 'react'
import s from './ThreeDotsMenu.module.scss'
import {IconButton} from "@/shared/ul/IconButton/IconButton";
import {DropdownMenu} from "@/pages/usersList/ul/ThreeDotsMenu/DropdownMenu/DropdownMenu";
import {useClickOutside} from "@/pages/usersList/ul/ThreeDotsMenu/DropdownMenu/useClickOutside";
import {useModal} from "@/widgets/modal/model/modal.context";
import {banUserModalAC, deleteUserModalAC, unbanUserModalAC} from "@/widgets/modal/model/modal.types";
import { useRouter } from 'next/navigation'
import {useMutation} from "@apollo/client/react";
import {BAN_USER, UNBAN_USER} from "@/pages/usersList/api/users";

type ThreeDotsMenuProps = {
    userId: number
    userName?: string
    isBanned?: boolean
    onUserAction?: () => void
}

export const ThreeDotsMenu = ({ userId, isBanned = false, userName, onUserAction }: ThreeDotsMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    const {pushModal} = useModal()

    // Мутации
    const [banUser] = useMutation(BAN_USER);
    const [unbanUser] = useMutation(UNBAN_USER);

    // Закрытие меню при клике снаружи
    const menuRef = useRef<HTMLDivElement>(null)

    useClickOutside(menuRef, () => {
        if (isMenuOpen) setIsMenuOpen(false)
    })

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleBanUser = () => {
        setIsMenuOpen(false)
        pushModal(banUserModalAC({
            title: 'Ban User',
            description: `Are you sure to ban this user, ${userName || ''}?`,
            userId: userId,
            onConfirm: async (banReason: string) => {
                try {
                    await banUser({
                        variables: {
                            userId,
                            banReason: banReason
                        }
                    });
                    onUserAction?.(); // Обновляем список пользователей
                } catch (error) {
                    console.error('Error banning user:', error);
                    // Здесь можно добавить уведомление об ошибке
                }
            }
        }))
    }

    const handleUnbanUser = () => {
        setIsMenuOpen(false)
        pushModal(unbanUserModalAC({
            title: 'Un-Ban user',
            description: `Are you sure want to un-ban ${userName || ''}?`,
            userId: userId,
            onConfirm: async () => {
                try {
                    await unbanUser({
                        variables: { userId }
                    });
                    onUserAction?.(); // Обновляем список пользователей
                } catch (error) {
                    console.error('Error unbanning user:', error);
                    // Здесь можно добавить уведомление об ошибке
                }
            }
        }))
    }

    const handleDeleteUser = () => {
        setIsMenuOpen(false)
        console.log('delete')
        pushModal(deleteUserModalAC({
            title: 'Delete User',
            description: `Are you sure to delete user ${userName || ''}?`,
            userId: userId
        }))
    }

    const handleMoreInfo = () => {
        setIsMenuOpen(false)
        router.push(`/admin/users?userId=${userId}`)
    }

    return (
        <div className={s.menuWrapper} ref={menuRef}>
            <div className={s.menuButton} aria-expanded={isMenuOpen}>
                <IconButton
                    onClick={toggleMenu}
                    iconId="threeDots"
                    size={24}
                    viewBox="0 0 24 24"
                />
            </div>

            {isMenuOpen && (
                <DropdownMenu
                    onBanUser={isBanned ? handleUnbanUser : handleBanUser}
                    onDeleteUser={handleDeleteUser}
                    onMoreInfo={handleMoreInfo}
                    isBanned={isBanned}
                />
            )}
        </div>
    )
}
