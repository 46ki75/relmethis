/** @jsxImportSource @emotion/react */

import { CodeBracketIcon } from '@heroicons/react/24/outline'
import React, { Suspense } from 'react'

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
      return <CodeBracketIcon style={{ width: size, height: size, color }} />
  }

  return (
    <Suspense
      fallback={
        <CodeBracketIcon style={{ width: size, height: size, color }} />
      }
    >
      {IconComponent && <IconComponent size={size} color={color} />}
    </Suspense>
  )
}

// # --------------------------------------------------------------------------------
//
// Memoize
//
// # --------------------------------------------------------------------------------

export const LanguageIcon = React.memo(LanguageIconComponent)
