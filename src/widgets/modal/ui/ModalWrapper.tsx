import {deleteUserModalAC, ModalState} from "@/widgets/modal/model/modal.types";
import styles from './ModalWrapper.module.scss'
import {useModal} from "@/widgets/modal/model/modal.context";
import {useLockScroll} from "@/shared/hooks/useLockScroll";
import {BaseModal} from "@/widgets/modal/ui/baseModal/BaseModal";

export const ModalWrapper = () => {
    const {stack, clearModals, popModal, pushModal} = useModal()

    useLockScroll(stack.length > 0)

    if (!stack.length) return null

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return

        const topModal = stack[stack.length - 1]
        if (!topModal) return

        popModal();
    }

    const renderModal = (modal: ModalState) => {
            console.log(modal.payload.title)
        switch (modal.type) {
            case 'DELETE_USER':
            case 'BAN_USER':
            case 'UNBAN_USER':
            // case 'CONFIRM_REGISTRATION':
            // case 'CANCEL_CREATE_POST':
            // case "CANCEL_EDIT_POST":
            // case 'UPLOAD_ERROR':
            // case 'UPLOAD_AVATAR':
            // case 'DELETE_AVATAR':
            // case 'INFO':
                return <BaseModal modal={modal}/>
            default:
                return null
        }
    }

    return (
        <>
            {stack.map((modal, index) => (
                <div
                    className={styles.backdrop}
                    onClick={handleBackdropClick}
                    key={index}
                    style={{zIndex: 1000 + index}}
                >
                    {renderModal(modal)}
                </div>
            ))}
        </>
    )
}