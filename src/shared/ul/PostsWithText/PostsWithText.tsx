'use client'
import styles from './PostsWithText.module.scss'
import {PostWithTextSkeleton} from './PostWithTextSkeleton/PostWithTextSkeleton'
import { CardWithText } from '../CardWithText/CardWithText'

type Props = {
  posts: AllPosts
}

export const PostsWithText = ({ posts }: Props) => {

  return (
    <>
      <div className={styles.container}>
        {!posts.items && PostWithTextSkeleton}
        {posts.items?.map(el => (
          <CardWithText post={el} key={el.id} />
        ))}
      </div>
    </>
  )
}
