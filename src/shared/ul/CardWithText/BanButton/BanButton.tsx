import { useModal } from "@/widgets/modal/model/modal.context";
import { IconButton } from "../../IconButton/IconButton";
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
        onConfirm: () => {
          onBanButtonAction?.();
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
        onConfirm: () => {
          onBanButtonAction?.();
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
