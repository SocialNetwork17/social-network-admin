'use client'
import React, { ChangeEvent, memo, useEffect, useState } from 'react'
import styles from './SearchInput.module.scss'
import { IconButton } from '../IconButton/IconButton'

type Props = {
  placeholder: string
  value?: string
  onValueChange?: (value: string) => void
    error?: boolean
  errorText?: string
  disabled?: boolean
}

export const SearchInput = memo((props: Props) => {
  const { placeholder, value, onValueChange, error, errorText, disabled } = props

  const [internalValue, setInternalValue] = useState<string>(value ?? '')
  const [hasError, setHasError] = useState(!!error)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value

    if (value === undefined) {
      setInternalValue(nextValue)
    }

    onValueChange?.(nextValue)
    error && setHasError(false)
  }

  const onClickHandler = () => {}
  const onKeyPressHandler = () => {}

  useEffect(() => {
    setHasError(!!error)
  }, [error])

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  const inputClassname = hasError ? `${styles.input} ${styles.errorInput}` : `${styles.input}`

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          value={value ?? internalValue}
          className={inputClassname}
          type={'text'}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          placeholder={placeholder}
          disabled={disabled}
        />
        <div className={styles.iconButtonContainer}>
          <IconButton
            iconId={'searchIcon'}
            size={24}
            viewBox={'0 0 24 24'}
            disabled={disabled}
            onClick={onClickHandler}
          />
        </div>
      </div>
      {hasError && <div className={styles.errorText}>{errorText}</div>}
    </div>
  )
})
