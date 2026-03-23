export type ModalStack = ModalState[]
export type ModalState =
    | DeleteUserModalType

export type DeleteUserModalType = ReturnType<typeof deleteUserModalAC>

export const deleteUserModalAC = (payload: { title: string, description: string, userId: number }) => {
    console.log("DELETE_USERAC")
    return {type: 'DELETE_USER', payload: {...payload}} as const
}


