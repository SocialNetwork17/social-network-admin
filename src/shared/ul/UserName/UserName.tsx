'use client'

import styles from './UserName.module.scss'
import { Card } from '../Card/Card'
import { Post } from '@/types'

type Props = {
  post?: Post
}

export const UserName = (props: Props) => {
  const { post } = props

  if (!post) {
    return null
  }

  const avatarUrl = post.postOwner.avatars?.[0]?.url
  const userName = post.postOwner.userName

  return (
    <div className={styles.userInfo}>
      {avatarUrl ? (
        <Card images={avatarUrl} width={36} height={36} variant="circular" />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {(userName.charAt(0) || 'U').toUpperCase()}
        </div>
      )}
      <div>{userName}</div>
    </div>
  )
}
