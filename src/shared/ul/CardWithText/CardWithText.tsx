import styles from "./CardWithText.module.scss";
import { Card } from "../Card/Card";
import { UserName } from "../UserName/UserName";
import { ExpandText } from "./ExpandText/ExpandText";
import { Post } from "@/types";
import { Icon } from "../Icon/Icon";

type Props = {
  post: Post;
  onClick?: () => void;
};

export const CardWithText = (props: Props) => {
  const { post, onClick } = props;

  const urls = post.images
    ? post.images
        .map((image) => image.url)
        .filter((url): url is string => Boolean(url)) // фильтруем null/undefined и сужаем тип
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card images={urls} slider={true} />
      </div>
      <div className={styles.userInfo}>
        <UserName post={post} />
        <Icon iconId={"icon-cancel"} size={24} />
      </div>
      <ExpandText post={post} />
    </div>
  );
};
