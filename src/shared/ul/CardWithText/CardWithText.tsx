import styles from './CardWithText.module.scss'
import { Card } from '../Card/Card'
import { UserName } from '../UserName/UserName'
import { ExpandText } from './ExpandText/ExpandText'
import { Post } from '@/types'

type Props = {
  post: Post
  onClick?: () => void
}

export const CardWithText = (props: Props) => {
  const { post, onClick } = props

  const urls = post.images.map(image => image.url)
  console.log(urls)
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Card images={urls} slider={true} />
      </div>
      <UserName post={post} />
      <ExpandText post={post} />
    </div>
  )
}
