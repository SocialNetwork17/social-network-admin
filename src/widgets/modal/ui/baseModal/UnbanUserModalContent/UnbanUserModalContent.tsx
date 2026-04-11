import * as React from 'react';
import styles from "./UnbanUserModalContent.module.scss"
import { UnbanUserModalType } from "@/widgets/modal/model/modal.types";
import { Button } from "@/shared/ul/Button/Button";
import { useModal } from "@/widgets/modal/model/modal.context";
import { useSnackbar } from "@/widgets/snackbar/model/snackbar.context";
import { useUnbanUser } from "@/pages/usersList/hooks/useUnbanUser";

type Props = {
    modal: UnbanUserModalType
}

export const UnbanUserModalContent = ({ modal }: Props) => {
    const { clearModals, popModal } = useModal();
    const userId = modal.payload.userId;
    const { unbanUser, loading: unbanning } = useUnbanUser();
    const { successSnackbar, errorSnackbar } = useSnackbar();

    const handleUnbanConfirm = async () => {
        try {
            if (userId) {
                await unbanUser(userId);
                clearModals();
                successSnackbar('User was successfully unbanned');
                modal.payload.onConfirm?.();
            }
        } catch (error) {
            console.log(error);
            errorSnackbar('Failed to unban user. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.description}>{modal.payload.description}</p>
            <div className={styles.buttonsContainer}>
                <Button
                    variant={'outline'}
                    width={108}
                    height={36}
                    disabled={unbanning}
                    onClick={handleUnbanConfirm}
                >
                    {unbanning ? 'Unbanning...' : 'YES'}
                </Button>
                <Button
                    variant={'primary'}
                    width={108}
                    height={36}
                    disabled={unbanning}
                    onClick={popModal}
                >
                    NO
                </Button>
            </div>
        </div>
    );
};