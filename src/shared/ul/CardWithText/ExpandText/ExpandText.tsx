'use client'
import styles from './ExpandText.module.scss'
import { useEffect, useRef, useState } from 'react'
import { getTimeAgo } from '@/shared/utils/getTimeAgo'
import { Post } from '@/types'

type Props = {
  post: Post
}

export const ExpandText = (props: Props) => {
  const { post } = props

  // todo - переделать на css ellipses
  const [isExpanded, setIsExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkHeight = () => {
      const charCount = post.description.length
      //переделать 23 строку
      const needsExpansion = charCount > 120
      if (isExpanded) {
        setShowButton(true)
      } else {
        setShowButton(needsExpansion)
      }
    }
    checkHeight()
  }, [post.description, isExpanded])

  const dateTime = getTimeAgo(post.createdAt)
  return (
    <div className={styles.postDesc}>
      <div className={styles.time}>{dateTime}</div>
      <div className={styles.textContainer}>
        <span ref={textRef} className={`${styles.text} ${isExpanded ? styles.expanded : ''}`}>
          {post.description}
        </span>
        {showButton && (
          <button onClick={() => setIsExpanded(!isExpanded)} className={styles.buttonInline}>
            {isExpanded ? 'Hide' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  )
}
