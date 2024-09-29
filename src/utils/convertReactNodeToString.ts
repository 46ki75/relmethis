import React, { type ReactNode } from 'react'

export const convertReactNodeToString = (children: ReactNode): string => {
  if (!children) return ''

  const result = React.Children.map(children, (child) => {
    if (typeof child === 'string') return child
    return ''
  })

  return result ? result.join('') : ''
}
