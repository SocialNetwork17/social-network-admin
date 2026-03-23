'use client'

import {DeleteUserModalType
} from "@/widgets/modal/model/modal.types";
import styles from './BaseModal.module.scss'
import {useModal} from "@/widgets/modal/model/modal.context";
import {ReactNode} from "react";
import {IconButton} from "@/shared/ul/IconButton/IconButton";
import {
    CancelDeleteUserModalContent
} from "@/widgets/modal/ui/baseModal/cancelDeleteUserModalContent/CancelDeleteUserModalContent";

type Props = {
    modal: DeleteUserModalType
}

export const BaseModal = ({modal}: Props) => {

    const {stack, clearModals, popModal} = useModal()
    console.log("DELETE")
    const currentContent = (): ReactNode | null => {
        switch (modal.type) {
            case "DELETE_USER":
                console.log("DELETE_USER")
                return <CancelDeleteUserModalContent modal={modal} />
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



