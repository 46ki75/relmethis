/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'
import React from 'react'
import { createPortal } from 'react-dom'
import { darken, lighten } from 'polished'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const move = keyframes`
  25% {
    opacity: 1;
  }
  33% {
    opacity: 1;
    transform: translateY(20px);
  }
  67% {
    opacity: 1;
    transform: translateY(50px);
  }
  100% {
    opacity: 0;
    transform: translateY(65px) scale3d(0.5, 0.5, 0.5);
  }
`

const containerStyle = css`
  -webkit-tap-highlight-color: transparent;
  position: fixed;
  bottom: 8px;
  width: 56px;
  height: 56px;
  cursor: pointer;
  transition: all 0.7s;
  transform-origin: center;
`

const chevronStyle = ({ isDark }: { isDark: boolean }) => css`
  position: absolute;
  width: 56px;
  height: 16px;
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
  animation: ${move} 3s ease-out infinite;

  &:nth-of-type(1) {
    animation: ${move} 3s ease-out 1s infinite;
  }

  &:nth-of-type(2) {
    animation: ${move} 3s ease-out 2s infinite;
  }

  &:before,
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    height: 100%;
    width: 51%;
    background: ${isDark
      ? lighten(0.1, 'rgb(128, 128, 128)')
      : darken(0.1, 'rgb(128, 128, 128)')};
  }

  &:before {
    border-radius: 0 0 3px 0;
    left: 0px;
    transform: skew(0deg, 30deg);
  }

  &:after {
    border-radius: 0 0 0 3px;
    right: 0px;
    width: 51%;
    transform: skew(0deg, -30deg);
  }
`

const textStyle = ({
  position,
  isVisible,
  isDark
}: {
  position: 'right' | 'left'
  isVisible: boolean
  isDark: boolean
}) => css`
  font-family: sans-serif;
  position: fixed;
  z-index: 50;
  bottom: 1px;
  font-size: 11px;
  color: ${isDark
    ? lighten(0.1, 'rgb(128, 128, 128)')
    : darken(0.1, 'rgb(128, 128, 128)')};
  transition: all 0.2s ease-out 0.5s;
  user-select: none;
  ${position}: 8px;
  opacity: ${isVisible ? 1 : 0};
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface PagetopProps {
  position?: 'left' | 'right'

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

export const PagetopComponent = ({
  position = 'right',
  isDark = false
}: PagetopProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true)
  const { y } = useWindowScroll()

  useEffect(() => {
    if (y > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [y])

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return createPortal(
    <>
      <nav
        css={css`
          ${containerStyle};
          ${position}: 8px;
          transform: ${isVisible
            ? 'translateY(0px) rotate(180deg)'
            : 'translateY(100px) rotate(-180deg)'};
        `}
        onClick={toTop}
      >
        <div css={chevronStyle({ isDark })}></div>
        <div css={chevronStyle({ isDark })}></div>
        <div css={chevronStyle({ isDark })}></div>
      </nav>
      <span css={textStyle({ position, isVisible, isDark })}>Back to Top</span>
    </>,
    document.body
  )
}

// # --------------------------------------------------------------------------------
//
// default props
//
// # --------------------------------------------------------------------------------

PagetopComponent.defaultProps = {
  position: 'right'
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Pagetop = React.memo(PagetopComponent)
