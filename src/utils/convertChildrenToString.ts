import React, { type ReactNode } from 'react'

export const convertChildrenToString = (children: ReactNode): string | null => {
  if (!children) return null

  const result = React.Children.map(children, (child) => {
    if (typeof child === 'string') return child
    return ''
  })

  return result ? result.join('') : null
}
