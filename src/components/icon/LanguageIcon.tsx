/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react'
import React, { Suspense } from 'react'
import { type LanguageIconSvgProps } from './language/Props'
import { CodeBracketIcon } from '@heroicons/react/24/outline'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const iconStyle = (size: string) => css`
  width: ${size};
  height: ${size};
  animation-name: ${fade};
  animation-duration: 300ms;
  animation-fill-mode: both;
`

interface LanguageIconProps {
  size?: string
  color?: string
  language: string
  isDark?: boolean
}

const LanguageIconComponent = ({
  size = '20px',
  color,
  language,
  isDark = false
}: LanguageIconProps) => {
  let IconComponent: React.LazyExoticComponent<
    React.ComponentType<LanguageIconSvgProps>
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

    case 'java':
      IconComponent = React.lazy(() =>
        import('./language/Java').then((module) => ({
          default: module.Java
        }))
      )
      break

    case 'kotlin':
      IconComponent = React.lazy(() =>
        import('./language/Kotlin').then((module) => ({
          default: module.Kotlin
        }))
      )
      break

    case 'json':
      IconComponent = React.lazy(() =>
        import('./language/Json').then((module) => ({
          default: module.Json
        }))
      )
      break

    case 'markdown':
      IconComponent = React.lazy(() =>
        import('./language/Markdown').then((module) => ({
          default: module.Markdown
        }))
      )
      break

    case 'bash':
      IconComponent = React.lazy(() =>
        import('./language/Bash').then((module) => ({
          default: module.Bash
        }))
      )
      break

    case 'tex':
    case 'katex':
    case 'latex':
      IconComponent = React.lazy(() =>
        import('./language/Tex').then((module) => ({
          default: module.Tex
        }))
      )
      break

    default:
      return (
        <CodeBracketIcon
          style={{ width: size, height: size, color }}
          css={iconStyle(size)}
        />
      )
  }

  return (
    <Suspense fallback={<div style={{ width: size, height: size, color }} />}>
      <div css={iconStyle(size)}>
        {IconComponent && (
          <IconComponent size={size} color={color} isDark={isDark} />
        )}
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
