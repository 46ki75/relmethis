/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import React, { Suspense } from 'react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const iconStyle = css`
  animation-name: ${fade};
  animation-duration: 300ms;
  animation-fill-mode: both;
`

interface LanguageIconProps {
  size?: string
  color?: string
  language: string
}

const LanguageIconComponent = ({
  size = '20px',
  color,
  language
}: LanguageIconProps) => {
  let IconComponent: React.LazyExoticComponent<
    React.ComponentType<{ size: string; color?: string }>
  > | null = null

  switch (language) {
    case 'javascript':
      IconComponent = React.lazy(() =>
        import('./language/Javascript').then((module) => ({
          default: module.Javascript
        }))
      )
      break

    case 'typescript':
      IconComponent = React.lazy(() =>
        import('./language/Typescript').then((module) => ({
          default: module.Typescript
        }))
      )
      break

    case 'rust':
      IconComponent = React.lazy(() =>
        import('./language/Rust').then((module) => ({
          default: module.Rust
        }))
      )
      break

    default:
      return (
        <CodeBracketIcon
          style={{ width: size, height: size, color }}
          css={iconStyle}
        />
      )
  }

  return (
    <Suspense fallback={<div style={{ width: size, height: size, color }} />}>
      <div css={iconStyle}>
        {IconComponent && <IconComponent size={size} color={color} />}
      </div>
    </Suspense>
  )
}

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const LanguageIcon = React.memo(LanguageIconComponent)
