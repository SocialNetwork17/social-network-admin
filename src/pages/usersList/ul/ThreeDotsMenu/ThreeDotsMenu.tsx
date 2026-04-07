'use client'

import { useRef, useState } from 'react'
import s from './ThreeDotsMenu.module.scss'
import {IconButton} from "@/shared/ul/IconButton/IconButton";
import {DropdownMenu} from "@/pages/usersList/ul/ThreeDotsMenu/DropdownMenu/DropdownMenu";
import {useClickOutside} from "@/pages/usersList/ul/ThreeDotsMenu/DropdownMenu/useClickOutside";
import {useModal} from "@/widgets/modal/model/modal.context";
import { deleteUserModalAC} from "@/widgets/modal/model/modal.types";
import { useRouter } from 'next/navigation'

type ThreeDotsMenuProps = {
    userId: number
}

export const ThreeDotsMenu = ({ userId }: ThreeDotsMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()

    const {pushModal} = useModal()

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

    }

    const handleDeleteUser = () => {
        setIsMenuOpen(false)
        console.log('delete')
        pushModal(deleteUserModalAC({
            title: 'Delete Post',
            description: 'Are you sure you want to delete this post?',
            userId: userId
        }))
    }

    const handleMoreInfo = () => {
        setIsMenuOpen(false)
        router.push(`/admin/users?userId=${userId}`)
        //1 Когда URL меняется: Next заново вызывает page-компонент, в него приходят новые searchParams
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
                    onBanUser={handleBanUser}
                    onDeleteUser={handleDeleteUser}
                    onMoreInfo={handleMoreInfo}
                />
            )}
        </div>
    )
}
