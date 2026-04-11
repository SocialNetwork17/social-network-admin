export type ModalStack = ModalState[]
export type ModalState =
    | DeleteUserModalType
    | BanUserModalType
    | UnbanUserModalType

export type DeleteUserModalType = ReturnType<typeof deleteUserModalAC>
export type BanUserModalType = ReturnType<typeof banUserModalAC>
export type UnbanUserModalType = ReturnType<typeof unbanUserModalAC>

export const deleteUserModalAC = (payload: { title: string, description: string, userId: number }) => {
    console.log("DELETE_USERAC")
    return {type: 'DELETE_USER', payload: {...payload}} as const
}

export const banUserModalAC = (payload: {
    title: string;
    description: string;
    userId: number;
    onConfirm?: (banReason: string) => void; // Колбэк с причиной бана
}) => {
    console.log("BAN_USER_AC")
    return {
        type: 'BAN_USER',
        payload: { ...payload, onConfirm: payload.onConfirm || (() => {}) }
    } as const
}

export const unbanUserModalAC = (payload: {
    title: string;
    description: string;
    userId: number;
    onConfirm?: () => void;
}) => {
    console.log("UNBAN_USER_AC")
    return {
        type: 'UNBAN_USER',
        payload: { ...payload, onConfirm: payload.onConfirm || (() => {}) }
    } as const
}


