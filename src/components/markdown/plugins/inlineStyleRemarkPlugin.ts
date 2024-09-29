/// <reference types="mdast-util-directive" />

'use client'

import { Root } from 'mdast'
import { visit } from 'unist-util-visit'

function isValidCSSProperty(key: string): key is keyof React.CSSProperties {
  return key in document.createElement('div').style
}

export default function inlineStyleRemarkPlugin() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'textDirective' && node.name === 'style') {
        const styleAttribute = node.attributes || {}

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const style: any = styleAttribute
        // const style: React.CSSProperties = styleAttribute

        Object.keys(styleAttribute).forEach((key) => {
          if (isValidCSSProperty(key)) {
            style[key] = styleAttribute[key]
          }
        })

        const text = node.children
          .map((child) => {
            if (child.type === 'text') {
              return child.value
            }
            return ''
          })
          .join('')

        node.data = {
          hName: 'span',
          hProperties: { style }
        }

        node.children = [{ type: 'text', value: text }]
      }
    })
  }
}
