import styles from './Spinner.module.scss'

type Props ={
width?: number
height?: number 
}

export const Spinner = ({width, height}: Props) => {
  return (
    <div className={styles.skChase} style={{
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
      <div className={styles.skChaseDot}></div>
    </div>
  )
}
