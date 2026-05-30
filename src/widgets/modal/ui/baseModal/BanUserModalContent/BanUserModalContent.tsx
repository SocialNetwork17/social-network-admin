// @flow
import * as React from 'react';
import { useState } from 'react';
import styles from "./BanUserModalContent.module.scss"
import { BanUserModalType } from "@/widgets/modal/model/modal.types";
import { Button } from "@/shared/ul/Button/Button";
import { useModal } from "@/widgets/modal/model/modal.context";
import { useSnackbar } from "@/widgets/snackbar/model/snackbar.context";
import { useBanUser } from "@/pages/usersList/hooks/useBanUser";
import { SelectBox, BaseOption } from "@/shared/ul/Select-box/SelectBox";
import { Input } from "@/shared/ul/Input/Input";

type Props = {
    modal: BanUserModalType
}

// Опции для причины бана
const banReasonOptions = [
    { id: 'bad_behavior', label: 'Bad behavior' },
    { id: 'advertising_placement', label: 'Advertising placement' },
    { id: 'another_reason', label: 'Another reason' },
];

export const BanUserModalContent = ({ modal }: Props) => {
    const [selectedReason, setSelectedReason] = useState<BaseOption | null>(null);
    const [customReason, setCustomReason] = useState('');
    const { clearModals, popModal } = useModal();
    const userId = modal.payload.userId;
    const { banUser, loading: banning } = useBanUser();
    const { successSnackbar, errorSnackbar } = useSnackbar();
    const isAnotherReasonSelected = selectedReason?.id === 'another_reason';
    const isBanDisabled = banning || !selectedReason || (isAnotherReasonSelected && !customReason.trim());

    const handleReasonSelect = (option: BaseOption) => {
        setSelectedReason(option);
        // Если выбрана не "Another reason", очищаем customReason
        if (option.id !== 'another_reason') {
            setCustomReason('');
        }
    };

    const handleBanConfirm = async () => {
        // Проверяем, выбрана ли причина
        if (!selectedReason) {
            errorSnackbar('Please select a ban reason');
            return;
        }

        // Формируем полную причину бана
        let fullBanReason = selectedReason.label;
        if (selectedReason.id === 'another_reason' && customReason.trim()) {
            fullBanReason = `${selectedReason.label}: ${customReason.trim()}`;
        } else if (selectedReason.id === 'another_reason' && !customReason.trim()) {
            errorSnackbar('Please enter a reason or select another option');
            return;
        }

        try {
            if (userId) {
                await banUser(userId, fullBanReason);
                clearModals();
                successSnackbar('User was successfully banned');
                modal.payload.onConfirm?.(fullBanReason);
            }
        } catch (error) {
            console.log(error);
            errorSnackbar('Failed to ban user. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <p className={styles.description}>{modal.payload.description}</p>

            <div className={styles.selectWrapper}>
                <SelectBox
                    placeholder="Reason for ban"
                    options={banReasonOptions}
                    onChange={handleReasonSelect}
                    defaultValue={selectedReason || undefined}
                    disabled={banning}
                />
            </div>

            {isAnotherReasonSelected && (
                <div className={styles.customReasonWrapper}>
                    <Input
                        type="text"
                        required
                        label="Reason"
                        placeholder="Enter reason for ban"
                        value={customReason}
                        onChange={(event) => setCustomReason(event.currentTarget.value)}
                        disabled={banning}
                    />
                </div>
            )}

            <div className={styles.buttonsContainer}>
                <Button
                    variant={'primary'}
                    width={130}
                    height={36}
                    disabled={banning}
                    onClick={popModal}
                >
                    NO
                </Button>
                <Button
                    variant={'outline'}
                    width={130}
                    height={36}
                    disabled={isBanDisabled}
                    onClick={handleBanConfirm}
                >
                    {banning ? 'Banning...' : 'YES'}
                </Button>

            </div>
        </div>
    );
};
