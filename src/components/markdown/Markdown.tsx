/** @jsxImportSource @emotion/react */

import React, { useMemo } from 'react'

import { remark } from 'remark'
import gfm from 'remark-gfm'
import { Mdast } from './Mdast'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface MarkdownProps {
  markdown: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const parseMarkdownToMdast = (markdown: string) => {
  const processor = remark().use(gfm).parse(markdown)
  return processor
}

const MarkdownComponent = ({ markdown }: MarkdownProps) => {
  const mdast = useMemo(() => parseMarkdownToMdast(markdown), [markdown])

  return (
    <>
      <Mdast mdast={mdast.children} />
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Markdown = React.memo(MarkdownComponent)
