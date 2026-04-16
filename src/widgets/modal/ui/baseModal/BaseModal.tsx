'use client'

import {
    BanUserModalType, DeleteUserModalType, UnbanUserModalType
} from "@/widgets/modal/model/modal.types";
import styles from './BaseModal.module.scss'
import {useModal} from "@/widgets/modal/model/modal.context";
import {ReactNode} from "react";
import {IconButton} from "@/shared/ul/IconButton/IconButton";
import {
    CancelDeleteUserModalContent
} from "@/widgets/modal/ui/baseModal/cancelDeleteUserModalContent/CancelDeleteUserModalContent";
import {BanUserModalContent} from "@/widgets/modal/ui/baseModal/BanUserModalContent/BanUserModalContent";
import {UnbanUserModalContent} from "@/widgets/modal/ui/baseModal/UnbanUserModalContent/UnbanUserModalContent";

type Props = {
    modal: DeleteUserModalType | BanUserModalType | UnbanUserModalType
}

export const BaseModal = ({modal}: Props) => {

    const {stack, clearModals, popModal} = useModal()
    console.log("DELETE")
    const currentContent = (): ReactNode | null => {
        switch (modal.type) {
            case "DELETE_USER":
                return <CancelDeleteUserModalContent modal={modal} />
            case "BAN_USER":
                console.log("BAN_USER")
                return <BanUserModalContent modal={modal} />

            case "UNBAN_USER":
                console.log("UNBAN_USER")
                return <UnbanUserModalContent modal={modal} />
            default:
                return null
        }
    }


    return(
        <div className={styles.modal}>
            <div className={styles.titleWrapper}>
                <div className={styles.title}>{modal.payload.title}</div>
                <IconButton iconId={'logoutBtnCloseSvg'} size={24} onClick={()=>stack.length > 1  ? popModal(): clearModals()} />
            </div>
            {currentContent()}
        </div>
    )
}



