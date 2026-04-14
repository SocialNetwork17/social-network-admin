export type ModalStack = ModalState[]
export type ModalState =
    | DeleteUserModalType
    | BanUserModalType
    | UnbanUserModalType

export type DeleteUserModalType = ReturnType<typeof deleteUserModalAC>
export type BanUserModalType = ReturnType<typeof banUserModalAC>
export type UnbanUserModalType = ReturnType<typeof unbanUserModalAC>

export const banUserModalAC = (payload: {
    title: string;
    description: string | React.ReactNode; // Изменяем на React.ReactNode
    userId: number;
    onConfirm?: (banReason: string) => void;
}) => {
    return {
        type: 'BAN_USER',
        payload: { ...payload, onConfirm: payload.onConfirm || (() => {}) }
    } as const
}

export const unbanUserModalAC = (payload: {
    title: string;
    description: string | React.ReactNode; // Изменяем на React.ReactNode
    userId: number;
    onConfirm?: () => void;
}) => {
    return {
        type: 'UNBAN_USER',
        payload: { ...payload, onConfirm: payload.onConfirm || (() => {}) }
    } as const
}

export const deleteUserModalAC = (payload: {
    title: string;
    description: string | React.ReactNode; // Изменяем на React.ReactNode
    userId: number;
    onConfirm?: () => void;
}) => {
    return {
        type: 'DELETE_USER',
        payload: { ...payload, onConfirm: payload.onConfirm || (() => {}) }
    } as const
}


