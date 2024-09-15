import React, { useRef, useState } from 'react'
import {
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  XMarkIcon
} from '@heroicons/react/16/solid'
import { rgba } from 'polished'
import isEqual from 'react-fast-compare'

import styles from './Edit.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

type InputStatus = 'display' | 'edit' | 'pending' | 'error' | 'success'

export interface EditProps {
  /**
   * Initial value
   */
  firstValue?: string

  /**
   * Function to execute when the submit button is pressed.
   * @param value The value entered in the form. Use this value to perform the mutation.
   * @returns {Promise<boolean>} Returns `true` if successful, `false` otherwise.
   */
  mutateFunction: (value: string) => Promise<boolean>

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const EditComponent = ({
  firstValue,
  mutateFunction,
  isDark = false
}: EditProps) => {
  const [inputStatus, setInputStatus] = useState<InputStatus>('success')
  const [remoteValue, setRemoteValue] = useState(firstValue ?? '')
  const [localValue, setLocalValue] = useState(firstValue ?? '')

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    if (localValue === remoteValue) {
      setInputStatus('success')
    } else {
      setInputStatus('pending')
      try {
        const success = await mutateFunction(localValue)
        if (success) {
          setInputStatus('success')
          setRemoteValue(localValue)
        } else {
          setInputStatus('error')
          if (inputRef.current !== null) inputRef.current.focus()
        }
      } catch {
        setInputStatus('error')
        if (inputRef.current !== null) inputRef.current.focus()
      }
    }
  }

  const handleRevert = () => {
    setLocalValue(remoteValue)
    setInputStatus('success')
  }

  const statusIcon = () => {
    if (inputStatus === 'error') {
      return (
        <ExclamationTriangleIcon
          className={styles['edit__icon']}
          style={{ color: '#b8a36e' }}
        />
      )
    } else if (inputStatus === 'pending') {
      return <ArrowPathIcon className={styles['edit__icon--load']} />
    } else if (localValue === remoteValue) {
      return (
        <CheckIcon
          className={styles['edit__icon']}
          style={{ color: '#59b57c' }}
        />
      )
    } else {
      return <EllipsisHorizontalIcon className={styles['edit__icon']} />
    }
  }

  const actionIcon = () => {
    if (inputStatus === 'display' || inputStatus === 'success') {
      return (
        <>
          <PencilSquareIcon
            className={styles['edit__icon--clickable']}
            onClick={() => {
              setInputStatus('edit')
              if (inputRef.current !== null) inputRef.current.focus()
            }}
          />
          {localValue !== remoteValue && (
            <ArrowUturnLeftIcon
              className={styles['edit__icon--clickable']}
              onClick={handleRevert}
            />
          )}
        </>
      )
    } else if (inputStatus === 'edit' || inputStatus === 'error') {
      return (
        <>
          <XMarkIcon
            className={styles['edit__icon--clickable']}
            onClick={() => {
              setInputStatus('display')
            }}
          />
          <PaperAirplaneIcon
            className={styles['edit__icon--clickable']}
            onClick={handleSubmit}
          />
        </>
      )
    } else if (inputStatus === 'pending') {
      return <></>
    }
  }

  const { ref } = useCSSVariable({
    '--react-color': isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    '--react-editable-border-color':
      inputStatus === 'edit' || inputStatus === 'error'
        ? rgba('#5879b0', 0.8)
        : 'rgba(128, 128, 128, 0.2)',
    '--react-focus-border-color':
      inputStatus === 'edit' || inputStatus === 'error'
        ? rgba('#59b57c', 0.8)
        : 'rgba(2, 0, 0, 0.1)'
  })

  return (
    <span ref={ref} className={styles.edit}>
      {statusIcon()}
      <input
        className={styles['edit__input']}
        ref={inputRef}
        readOnly={inputStatus !== 'edit' && inputStatus !== 'error'}
        value={localValue}
        onChange={(event) => {
          setLocalValue(event.target.value)
        }}
      />
      {actionIcon()}
    </span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Edit = React.memo(EditComponent, isEqual)
