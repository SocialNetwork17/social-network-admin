'use client'
import styles from './PostsWithText.module.scss'
import { PostWithTextSkeleton } from './PostWithTextSkeleton/PostWithTextSkeleton'
import { CardWithText } from '../CardWithText/CardWithText'
import { Post } from '@/types'

type Props = {
  posts: Post[]
  onBanButtonAction?: () => void;
}

export const PostsWithText = ({ posts, onBanButtonAction }: Props) => {

  return (
    <>
      <div className={styles.container}>
        {!posts && PostWithTextSkeleton}
        {posts.map(el => (
          <CardWithText post={el} key={el.id} onBanButtonAction={onBanButtonAction}/>
        ))}
      </div>
    </>
  )
}
