'use client'

import Link from 'next/link'
import { PATH } from '@/shared/constants/routings'
import styles from './UserName.module.scss'
import { SchemaPostViewModel, SchemaProfileViewModel } from '@/shared/api/schema'
import { Card } from '../Card/Card'
import { useModal } from '@/widgets/modal/model/modal.context'
import { Post } from '@/types'

type Props = {
  post?: Post
}

export const UserName = (props: Props) => {
  if (props.post?.images) {
    const { post } = props
    return (
      <div className={styles.userInfo}>
        {post.postOwner.avatars[0]?.url ? (
          <Card images={post.postOwner.avatars[0].url} width={36} height={36} variant="circular" />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {(post.postOwner.userName.charAt(0) || 'U').toUpperCase()}
          </div>
        )}
        <div>{post.postOwner.userName}</div>
      </div>
    )
  } else {
    return (
      <div className={styles.userInfo}>
        {post.avatarOwner ? (
          <Card images={post.postOwner.avatars.url} width={36} height={36} variant="circular" />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {(post.postOwner.userName?.charAt(0) || 'U').toUpperCase()}
          </div>
        )}
        <div>{post.postOwner.userName}</div>
      </div>
    )
  }
}
