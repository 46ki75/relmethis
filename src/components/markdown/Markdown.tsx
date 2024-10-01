import React, { Suspense, useMemo } from 'react'

import type { Mdast as MdastType } from './Mdast'
import { BlockFallback } from '../fallback/BlockFallback'

const Mdast = React.lazy(() =>
  import('./Mdast').then((module) => ({
    default: module.Mdast
  }))
) as React.ComponentType<React.ComponentProps<typeof MdastType>>

import isEqual from 'react-fast-compare'
import { parseMarkdownToMdast } from './parseMarkdownToMdast'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface MarkdownProps {
  markdown: string
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  /**
   * Determines whether to display the table of contents
   */
  enableTableOfContents?: boolean
  locale?: 'en-US' | 'ja-JP'
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const MarkdownComponent = ({
  markdown,
  isDark,
  enableTableOfContents = true,
  locale = 'en-US'
}: MarkdownProps) => {
  const mdast = useMemo(() => parseMarkdownToMdast(markdown), [markdown])

  return (
    <Suspense fallback={<BlockFallback />}>
      <Mdast
        mdast={mdast.children}
        isDark={isDark}
        enableTableOfContents={enableTableOfContents}
        locale={locale}
      />
    </Suspense>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Markdown = React.memo(MarkdownComponent, isEqual)
