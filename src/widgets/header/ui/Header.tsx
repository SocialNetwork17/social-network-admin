'use client'

import React, { useState } from 'react'
import styles from './Header.module.scss'
import { HeaderMenu } from '@/widgets/header/ui/HeaderMenu/HeaderMenu'
import { useAuth } from '@/shared/auth/authContext'

export const Header = () => {
  const { isLoggedIn } = useAuth()
  const [countNotices, setCountNotices] = useState<number>(0)

  const onClickHandler = () => {
    setCountNotices(countNotices + 1)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <h1 className={styles.logo}>Unitygram<span>SuperAdmin</span></h1>

          <HeaderMenu
            countMessage={countNotices}
            isLoggedIn={isLoggedIn}
            onClickHandler={onClickHandler}
          />
        </div>
      </div>
    </header>
  )
}
