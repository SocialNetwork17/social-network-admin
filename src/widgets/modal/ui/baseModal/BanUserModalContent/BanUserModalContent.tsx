// @flow
import * as React from 'react';
import { useState } from 'react';
import styles from "./BanUserModalContent.module.scss"
import { BanUserModalType } from "@/widgets/modal/model/modal.types";
import { Button } from "@/shared/ul/Button/Button";
import { useModal } from "@/widgets/modal/model/modal.context";
import { useSnackbar } from "@/widgets/snackbar/model/snackbar.context";
import { useBanUser } from "@/pages/usersList/hooks/useBanUser";

type Props = {
    modal: BanUserModalType
}

export const BanUserModalContent = ({ modal }: Props) => {
    const [banReason, setBanReason] = useState('');
    const { clearModals, popModal } = useModal();
    const userId = modal.payload.userId;
    const { banUser, loading: banning } = useBanUser();
    const { successSnackbar, errorSnackbar } = useSnackbar();

    const handleBanConfirm = async () => {
        if (!banReason.trim()) {
            errorSnackbar('Please enter a ban reason');
            return;
        }

        try {
            if (userId) {
                await banUser(userId, banReason.trim());
                clearModals();
                successSnackbar('User was successfully banned');
                modal.payload.onConfirm?.(banReason.trim());
            }
        } catch (error) {
            console.log(error);
            errorSnackbar('Failed to ban user. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.description}>{modal.payload.description}</p>
            <textarea
                className={styles.textarea}
                placeholder="Enter ban reason..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                rows={4}
                autoFocus
                disabled={banning}
            />
            <div className={styles.buttonsContainer}>
                <Button
                    variant={'outline'}
                    width={108}
                    height={36}
                    disabled={banning || !banReason.trim()}
                    onClick={handleBanConfirm}
                >
                    {banning ? 'Banning...' : 'BAN'}
                </Button>
                <Button
                    variant={'primary'}
                    width={108}
                    height={36}
                    disabled={banning}
                    onClick={popModal}
                >
                    CANCEL
                </Button>
            </div>
        </div>
    );
};