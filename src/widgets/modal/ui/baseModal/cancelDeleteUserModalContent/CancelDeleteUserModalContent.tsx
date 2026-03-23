// @flow
import * as React from 'react';
import styles from "./CancelDeleteUserModalContent.module.scss"
import { DeleteUserModalType} from "@/widgets/modal/model/modal.types";
import {Button} from "@/shared/ul/Button/Button";
import {useModal} from "@/widgets/modal/model/modal.context";
import {useSnackbar} from "@/widgets/snackbar/model/snackbar.context";
import {useRemoveUser} from "@/pages/usersList/hooks/useRemoveUser";


type Props = {
    modal: DeleteUserModalType
}

export const CancelDeleteUserModalContent = ({modal}: Props) => {
    const {clearModals, popModal} = useModal()

    const userId = modal.payload.userId

    const { removeUser, loading: removing, error: removeError } = useRemoveUser();

    const { successSnackbar} = useSnackbar()


    const handleDeleteConfirm = async () => {
        try {
            if (userId) {
                await removeUser(userId)
                clearModals()
                successSnackbar('Removal was successful')
            }
        } catch (error) {
             console.log(error)
            }
    }

    return (
        <>
            <p className={styles.description}>{modal.payload.description}</p>
            <div className={styles.buttonsContainer}>
                <Button variant={'outline'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={handleDeleteConfirm}
                >
                    {removing ? 'Deleting...' : 'YES' }
                </Button>
                <Button variant={'primary'}
                        width={108}
                        height={36}
                        disabled={false}
                        onClick={popModal}
                >
                    NO
                </Button>
            </div>
        </>
    )
}