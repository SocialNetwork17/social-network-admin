import styles from "./CardWithText.module.scss";
import { Card } from "../Card/Card";
import { UserName } from "../UserName/UserName";
import { ExpandText } from "./ExpandText/ExpandText";
import { Post } from "@/types";
import { IconButton } from "../IconButton/IconButton";

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

  // todo
  const onClickHandler = () => {
    console.log(post.userBan ? true : false);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${post.userBan?.createdAt ? styles.blocked : ""}`}>
        <Card images={urls} slider={true} />
      </div>
      <div className={styles.userInfo}>
        <UserName post={post} />
        <IconButton onClick={onClickHandler} iconId={"icon-cancel"} size={24} />
      </div>
      <ExpandText post={post} />
    </div>
  );
};
