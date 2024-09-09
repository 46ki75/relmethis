/** @jsxImportSource @emotion/react */

import React, { useRef, useState } from 'react'
import { css, keyframes } from '@emotion/react'
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
import { isEqual } from 'lodash'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const wrapperStyle = css`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
`

const inputStyle = ({
  isEditable,
  isDark
}: {
  isEditable: boolean
  isDark: boolean
}) => css`
  all: unset;
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  width: auto;
  min-width: 32px;
  padding: 0.25rem;
  border-style: solid;
  border-width: 1px;
  border-color: ${isEditable
    ? rgba('#5879b0', 0.8)
    : 'rgba(128, 128, 128, 0.1)'};

  transition: border-color 200ms;

  &:focus {
    border-color: ${isEditable ? rgba('#59b57c', 0.8) : 'rgba(2, 0, 0, 0.1)'};
  }
`

const iconStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  padding: 4px;
  width: 16px;
  height: 16px;

  animation-name: ${fade};
  animation-duration: 200ms;
  animation-fill-mode: both;
`

const clickableIconStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  padding: 4px;
  width: 16px;
  height: 16px;

  animation-name: ${fade};
  animation-duration: 200ms;
  animation-fill-mode: both;

  border-radius: 50%;

  cursor: pointer;
  transition: background-color 200ms;

  &:hover {
    background-color: rgba(128, 128, 128, 0.2);
  }
`

const loadIconStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  padding: 4px;
  width: 16px;
  height: 16px;
  animation-name: ${keyframes`
    from { transform: rotateZ(0deg) }
    to { transform: rotateZ(360deg) }
  `};
  animation-duration: 600ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`

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
      return <ExclamationTriangleIcon css={iconStyle({ isDark })} />
    } else if (inputStatus === 'pending') {
      return <ArrowPathIcon css={loadIconStyle({ isDark })} />
    } else if (localValue === remoteValue) {
      return <CheckIcon css={iconStyle({ isDark })} />
    } else {
      return <EllipsisHorizontalIcon css={iconStyle({ isDark })} />
    }
  }

  const actionIcon = () => {
    if (inputStatus === 'display' || inputStatus === 'success') {
      return (
        <>
          <PencilSquareIcon
            css={clickableIconStyle({ isDark })}
            onClick={() => {
              setInputStatus('edit')
              if (inputRef.current !== null) inputRef.current.focus()
            }}
          />
          {localValue !== remoteValue && (
            <ArrowUturnLeftIcon
              css={clickableIconStyle({ isDark })}
              onClick={handleRevert}
            />
          )}
        </>
      )
    } else if (inputStatus === 'edit' || inputStatus === 'error') {
      return (
        <>
          <XMarkIcon
            css={clickableIconStyle({ isDark })}
            onClick={() => {
              setInputStatus('display')
            }}
          />
          <PaperAirplaneIcon
            css={clickableIconStyle({ isDark })}
            onClick={handleSubmit}
          />
        </>
      )
    } else if (inputStatus === 'pending') {
      return <></>
    }
  }

  return (
    <span css={wrapperStyle}>
      {statusIcon()}
      <input
        ref={inputRef}
        css={inputStyle({
          isEditable: inputStatus === 'edit' || inputStatus === 'error',
          isDark
        })}
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
