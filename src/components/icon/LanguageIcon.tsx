import React, { Suspense } from 'react'
import { type LanguageIconSvgProps } from './language/Props'
import { CommandLineIcon } from '@heroicons/react/24/outline'

import isEqual from 'react-fast-compare'

import styles from './LanguageIcon.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

interface LanguageIconProps {
  size?: number
  color?: string
  language: string
  isDark?: boolean
}

const LanguageIconComponent = ({
  size = 20,
  color,
  language,
  isDark = false
}: LanguageIconProps) => {
  const { ref } = useCSSVariable({
    '--react-color': isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    '--react-size': size + 'px'
  })

  let IconComponent: React.LazyExoticComponent<
    React.ComponentType<LanguageIconSvgProps>
  > | null = null

  switch (language) {
    case 'javascript':
    case 'js':
      IconComponent = React.lazy(() =>
        import('./language/Javascript').then((module) => ({
          default: module.Javascript
        }))
      )
      break

    case 'typescript':
    case 'ts':
      IconComponent = React.lazy(() =>
        import('./language/Typescript').then((module) => ({
          default: module.Typescript
        }))
      )
      break

    case 'rust':
    case 'rs':
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
    case 'kt':
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
    case 'md':
      IconComponent = React.lazy(() =>
        import('./language/Markdown').then((module) => ({
          default: module.Markdown
        }))
      )
      break

    case 'mermaid':
      IconComponent = React.lazy(() =>
        import('./language/Mermaid').then((module) => ({
          default: module.Mermaid
        }))
      )
      break

    case 'bash':
    case 'sh':
    case 'shell':
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

    case 'go':
      IconComponent = React.lazy(() =>
        import('./language/Go').then((module) => ({
          default: module.Go
        }))
      )
      break

    case 'lua':
      IconComponent = React.lazy(() =>
        import('./language/Lua').then((module) => ({
          default: module.Lua
        }))
      )
      break

    case 'css':
      IconComponent = React.lazy(() =>
        import('./language/Css').then((module) => ({
          default: module.Css
        }))
      )
      break

    default:
      return <CommandLineIcon style={{ width: size, height: size, color }} />
  }

  return (
    <Suspense fallback={<div style={{ width: size, height: size, color }} />}>
      <div ref={ref} className={styles.wrapper}>
        {IconComponent && (
          <IconComponent size={size + 'px'} color={color} isDark={isDark} />
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

export const LanguageIcon = React.memo(LanguageIconComponent, isEqual)
