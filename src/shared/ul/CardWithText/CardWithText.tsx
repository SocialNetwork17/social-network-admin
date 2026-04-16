import styles from "./CardWithText.module.scss";
import { Card } from "../Card/Card";
import { UserName } from "../UserName/UserName";
import { ExpandText } from "./ExpandText/ExpandText";
import { Post } from "@/types";
import { BanButton } from "./BanButton/BanButton";

type Props = {
  post: Post;
  onBanButtonAction?: () => void;
};

export const CardWithText = (props: Props) => {
  const { post, onBanButtonAction } = props;

  const urls = post.images
    ? post.images
        .map((image) => image.url)
        .filter((url): url is string => Boolean(url)) // фильтруем null/undefined и сужаем тип
    : [];

    

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${post.userBan?.__typename? styles.blocked : ""}`}>
        <Card images={urls} slider={true} />
      </div>
      <div className={styles.userInfo}>
        <UserName post={post} />
        <BanButton isBanned={!!post.userBan} userName={post.postOwner.userName} userId={post.ownerId} onBanButtonAction={onBanButtonAction}/>
      </div>
      <ExpandText post={post} />
    </div>
  );
};
