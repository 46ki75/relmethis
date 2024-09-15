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
import { SimpleTooltip } from '../containment/SimpleTooltip'

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
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false
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
        <SimpleTooltip content='Failed to Update' isDark={isDark}>
          <ExclamationTriangleIcon
            className={styles['edit__icon']}
            style={{ color: '#b8a36e' }}
          />
        </SimpleTooltip>
      )
    } else if (inputStatus === 'pending') {
      return (
        <SimpleTooltip content='Updating' isDark={isDark}>
          <ArrowPathIcon className={styles['edit__icon--load']} />
        </SimpleTooltip>
      )
    } else if (localValue === remoteValue) {
      return (
        <SimpleTooltip content='Synced!' isDark={isDark}>
          <CheckIcon
            className={styles['edit__icon']}
            style={{ color: '#59b57c' }}
          />
        </SimpleTooltip>
      )
    } else {
      return (
        <SimpleTooltip content='Changes not submitted' isDark={isDark}>
          <EllipsisHorizontalIcon className={styles['edit__icon']} />
        </SimpleTooltip>
      )
    }
  }

  const actionIcon = () => {
    if (inputStatus === 'display' || inputStatus === 'success') {
      return (
        <>
          <SimpleTooltip content='Edit' isDark={isDark}>
            <PencilSquareIcon
              className={styles['edit__icon--clickable']}
              onClick={() => {
                setInputStatus('edit')
                if (inputRef.current !== null) inputRef.current.focus()
              }}
            />
          </SimpleTooltip>
          {localValue !== remoteValue && (
            <SimpleTooltip content='Discard Changes' isDark={isDark}>
              <ArrowUturnLeftIcon
                className={styles['edit__icon--clickable']}
                onClick={handleRevert}
              />
            </SimpleTooltip>
          )}
        </>
      )
    } else if (inputStatus === 'edit' || inputStatus === 'error') {
      return (
        <>
          <SimpleTooltip content='Pause Editing' isDark={isDark}>
            <XMarkIcon
              className={styles['edit__icon--clickable']}
              onClick={() => {
                setInputStatus('display')
              }}
            />
          </SimpleTooltip>

          <SimpleTooltip content='Submit Changes' isDark={isDark}>
            <PaperAirplaneIcon
              className={styles['edit__icon--clickable']}
              onClick={handleSubmit}
            />
          </SimpleTooltip>
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
