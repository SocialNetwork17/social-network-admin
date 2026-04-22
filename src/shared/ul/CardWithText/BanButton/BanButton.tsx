import { useModal } from "@/widgets/modal/model/modal.context";
import { IconButton } from "../../IconButton/IconButton";
import { useMutation } from "@apollo/client/react";
import { BAN_USER, UNBAN_USER } from "@/pages/usersList/api/users";
import { banUserModalAC, unbanUserModalAC } from "@/widgets/modal/model/modal.types";

type Props = {
  isBanned: boolean;
  userName: string
  userId: number
  onBanButtonAction?: () => void
};

export const BanButton = (props: Props) => {
  const { isBanned, userName, userId, onBanButtonAction } = props;

  const { pushModal } = useModal();

  // Мутации
  const [banUser] = useMutation(BAN_USER);
  const [unbanUser] = useMutation(UNBAN_USER);

  const handleBanUser = () => {
    pushModal(
      banUserModalAC({
        title: "Ban User",
        description: (
          <>
            Are you sure to ban this user,{" "}
            <strong>{userName || "this user"}</strong>?
          </>
        ),
        userId: userId,
        onConfirm: async (banReason: string) => {
          try {
            await banUser({
              variables: {
                userId,
                banReason: banReason,
              },
            });
            onBanButtonAction?.();
          } catch (error) {
            console.error("Error banning user:", error);
          }
        },
      }),
    );
  };

  const handleUnbanUser = () => {
    pushModal(
      unbanUserModalAC({
        title: "Un-Ban user",
        description: (
          <>
            Are you sure want to un-ban{" "}
            <strong>{userName || "this user"}</strong>?
          </>
        ),
        userId: userId,
        onConfirm: async () => {
          try {
            await unbanUser({
              variables: { userId },
            });
            onBanButtonAction?.();
          } catch (error) {
            console.error("Error unbanning user:", error);
          }
        },
      }),
    );
  };

  return (
    <div>
      <IconButton
        onClick={isBanned ? handleUnbanUser : handleBanUser}
        iconId={"icon-cancel"}
        size={24}
      />
    </div>
  );
};
