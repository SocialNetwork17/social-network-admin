import React from 'react'
import styles from './HeaderMenu.module.scss'
import { BaseOption, SelectBox } from '@/shared/ul/select-box/SelectBox'
import { IconButton } from '@/shared/ul/IconButton/IconButton'

type HeaderMenu = {
  isLoggedIn: boolean
  countMessage: number
  onClickHandler: () => void
}

export const HeaderMenu = (props: HeaderMenu) => {
  const { isLoggedIn, countMessage, onClickHandler } = props

  const languages = [
    { id: '1', label: 'Russian', countryCode: 'RU' },
    { id: '2', label: 'English', countryCode: 'GB' },
    { id: '3', label: 'Canadian', countryCode: 'CA' },
  ]

  const handleSelect = (option: BaseOption) => {
    console.log('Selected:', option)
  }

  return (
    <div className={`${styles.menuBox}`}>
      {isLoggedIn && (
        <div className={styles.iconBox}>
          <IconButton
            onClick={onClickHandler}
            iconId={'messageBell'}
            size={20}
            viewBox={'0 0 18 20'}
            fill={'white'}
          />
          {!!countMessage && <p className={styles.counterMessage}>{countMessage}</p>}
        </div>
      )}
      <SelectBox
        options={languages}
        onChange={handleSelect}
        defaultValue={languages[1]}
      />
    </div>
  )
}
