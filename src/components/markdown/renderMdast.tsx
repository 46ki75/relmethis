/** @jsxImportSource @emotion/react */

import React, { ReactNode, Suspense } from 'react'
import { css } from '@emotion/react'

import { Definition, PhrasingContent, RootContent } from 'mdast'

// components
import { BlockFallback } from '../fallback/BlockFallback'
import { InlineCode } from '../inline/InlineCode'
import { InlineLink } from '../inline/InlineLink'
import { Heading1 } from '../typography/Heading1'
import { Heading2 } from '../typography/Heading2'
import { Heading3 } from '../typography/Heading3'
import { Heading4 } from '../typography/Heading4'
import { Heading5 } from '../typography/Heading5'
import { Heading6 } from '../typography/Heading6'
import { Divider } from '../typography/Divider'
import { Alert } from '../typography/Alert'
import { NumberedList } from '../typography/NumberedList'
import { BulletedList } from '../typography/BulletedList'
import { Blockquote } from '../typography/Blockquote'
import { TableOfContents } from '../navigation/TableOfContents'

import type { CodeBlock as CodeBlockType } from '../code/CodeBlock'
// eslint-disable-next-line react-refresh/only-export-components
const CodeBlock = React.lazy(() =>
  import('../code/CodeBlock').then((module) => ({
    default: module.CodeBlock
  }))
) as React.ComponentType<React.ComponentProps<typeof CodeBlockType>>

import type { ImageWithModal as ImageWithModalType } from '../image/ImageWithModal'
// eslint-disable-next-line react-refresh/only-export-components
const ImageWithModal = React.lazy(() =>
  import('../image/ImageWithModal').then((module) => ({
    default: module.ImageWithModal
  }))
) as React.ComponentType<React.ComponentProps<typeof ImageWithModalType>>

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const tableStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
`

const supStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? '#6987b8' : '#4c6da2'};
`

// # --------------------------------------------------------------------------------
//
// utils
//
// # --------------------------------------------------------------------------------

const mdastToString = (nodes: PhrasingContent[]): string => {
  const results: string[] = []
  for (const node of nodes) {
    switch (node.type) {
      case 'text':
      case 'inlineCode': {
        results.push(node.value)
        break
      }

      case 'delete':
      case 'emphasis':
      case 'link':
      case 'strong':
      case 'linkReference': {
        results.push(mdastToString(node.children))
        break
      }

      case 'break': {
        results.push('  \n')
        break
      }

      case 'footnoteReference':
      case 'html':
      case 'image':
      case 'imageReference': {
        break
      }
    }
  }

  return results.join('')
}

export const renderMdast = ({
  mdastNodes,
  definitions,
  isDark
}: {
  mdastNodes: RootContent[]
  definitions: Definition[]
  isDark: boolean
}): {
  markdownComponent: ReactNode[]
  definitions: Definition[]
  tableOfContentsComponent: ReactNode
} => {
  const markdownComponent: ReactNode[] = []

  const color = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'

  const headings: Array<{
    text: string
    level: 1 | 2 | 3 | 4 | 5 | 6
    identifier?: string
  }> = []

  for (const node of mdastNodes) {
    switch (node.type) {
      // # --------------------------------------------------------------------------------
      //
      // inline
      //
      // # --------------------------------------------------------------------------------

      case 'text': {
        markdownComponent.push(<>{node.value}</>)
        break
      }

      case 'inlineCode': {
        markdownComponent.push(<InlineCode text={node.value} isDark={isDark} />)
        break
      }

      case 'strong': {
        markdownComponent.push(
          <strong style={{ color }}>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .markdownComponent
            }
          </strong>
        )
        break
      }

      case 'emphasis': {
        markdownComponent.push(
          <em style={{ color }}>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .markdownComponent
            }
          </em>
        )
        break
      }

      case 'delete': {
        markdownComponent.push(
          <del style={{ color }}>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .markdownComponent
            }
          </del>
        )
        break
      }

      case 'link': {
        markdownComponent.push(
          <InlineLink
            text={mdastToString(node.children)}
            href={node.url}
            isDark={isDark}
          />
        )
        break
      }

      case 'break': {
        markdownComponent.push(<br />)
        break
      }

      // # --------------------------------------------------------------------------------
      //
      // block
      //
      // # --------------------------------------------------------------------------------

      case 'paragraph': {
        markdownComponent.push(
          <p style={{ color }}>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .markdownComponent
            }
          </p>
        )
        break
      }

      case 'blockquote': {
        const regex = /\[!(NOTE)|(TIP)|(IMPORTANT)|(WARNING)|(CAUTION)\]/

        const firstChild = node.children[0]

        if (
          firstChild != null &&
          firstChild.type === 'paragraph' &&
          firstChild.children[0] != null &&
          firstChild.children[0].type === 'text' &&
          firstChild.children[0].value
            .trim()
            .substring(0, 12)
            .toUpperCase()
            .match(regex)
        ) {
          const matches = firstChild.children[0].value
            .trim()
            .toUpperCase()
            .match(regex)

          if (matches != null && matches.length > 0) {
            const alertType = matches[0]
              .replace(/[![\]]/g, '')
              .trim()
              .toLowerCase()

            if (
              alertType === 'note' ||
              alertType === 'tip' ||
              alertType === 'important' ||
              alertType === 'warning' ||
              alertType === 'caution'
            ) {
              const newChildren = node.children.map((child, index) => {
                if (
                  index === 0 &&
                  firstChild.children[0] != null &&
                  firstChild.children[0].type === 'text'
                ) {
                  firstChild.children[0].value = firstChild.children[0].value
                    .replace(regex, '')
                    .replace(/[![\]]/g, '')
                    .trim()
                  return firstChild
                } else {
                  return child
                }
              })

              markdownComponent.push(
                <Alert type={alertType}>
                  {
                    renderMdast({
                      mdastNodes: newChildren,
                      definitions,
                      isDark
                    }).markdownComponent
                  }
                </Alert>
              )
              break
            }
          }
        }

        markdownComponent.push(
          <Blockquote isDark={isDark}>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .markdownComponent
            }
          </Blockquote>
        )

        break
      }

      case 'thematicBreak': {
        markdownComponent.push(<Divider />)
        break
      }

      case 'code': {
        markdownComponent.push(
          <Suspense fallback={<BlockFallback />}>
            <CodeBlock
              code={node.value}
              language={node.lang ?? 'txt'}
              isDark={isDark}
              caption={node.meta ?? node.lang ?? 'txt'}
            />
          </Suspense>
        )
        break
      }

      case 'heading': {
        const text = mdastToString(node.children)

        headings.push({ level: node.depth, text })

        if (node.depth === 1) {
          markdownComponent.push(<Heading1 text={text} isDark={isDark} />)
        } else if (node.depth === 2) {
          markdownComponent.push(<Heading2 text={text} isDark={isDark} />)
        } else if (node.depth === 3) {
          markdownComponent.push(<Heading3 text={text} isDark={isDark} />)
        } else if (node.depth === 4) {
          markdownComponent.push(<Heading4 text={text} isDark={isDark} />)
        } else if (node.depth === 5) {
          markdownComponent.push(<Heading5 text={text} isDark={isDark} />)
        } else if (node.depth === 6) {
          markdownComponent.push(<Heading6 text={text} isDark={isDark} />)
        }
        break
      }

      case 'image': {
        markdownComponent.push(
          <Suspense fallback={<BlockFallback />}>
            <ImageWithModal
              src={node.url}
              alt={node.alt ?? node.title ?? 'image'}
            />
          </Suspense>
        )
        break
      }

      case 'table': {
        let thead: ReactNode
        const tbodyTrArray: ReactNode[] = []
        for (const [index, tableRow] of node.children.entries()) {
          if (index === 0) {
            thead = (
              <thead>
                <tr>
                  {tableRow.children.map((tableCell) => (
                    <th>
                      {
                        renderMdast({
                          mdastNodes: tableCell.children,
                          definitions,
                          isDark
                        }).markdownComponent
                      }
                    </th>
                  ))}
                </tr>
              </thead>
            )
          } else {
            tbodyTrArray.push(
              <tr>
                {tableRow.children.map((tableCell) => (
                  <td>
                    {
                      renderMdast({
                        mdastNodes: tableCell.children,
                        definitions,
                        isDark
                      }).markdownComponent
                    }
                  </td>
                ))}
              </tr>
            )
          }
        }

        markdownComponent.push(
          <table css={tableStyle({ isDark })}>
            {thead}
            <tbody>{tbodyTrArray}</tbody>
          </table>
        )

        break
      }

      case 'tableCell':
      case 'tableRow': {
        break
      }

      case 'list': {
        markdownComponent.push(
          node.ordered ? (
            <NumberedList isDark={isDark}>
              {
                renderMdast({ mdastNodes: node.children, definitions, isDark })
                  .markdownComponent
              }
            </NumberedList>
          ) : (
            <BulletedList isDark={isDark}>
              {
                renderMdast({ mdastNodes: node.children, definitions, isDark })
                  .markdownComponent
              }
            </BulletedList>
          )
        )
        break
      }

      case 'listItem': {
        markdownComponent.push(
          <>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .markdownComponent
            }
          </>
        )
        break
      }

      case 'linkReference': {
        const linkDefinition = definitions.find(
          (definition) => definition.identifier === node.identifier
        )

        if (linkDefinition != null) {
          markdownComponent.push(
            <InlineLink
              text={linkDefinition.title ?? linkDefinition.url}
              href={linkDefinition.url}
            />
          )
        }

        break
      }

      case 'imageReference': {
        const imageDefinition = definitions.find(
          (definition) => definition.identifier === node.identifier
        )

        if (imageDefinition != null) {
          markdownComponent.push(
            <Suspense fallback={<BlockFallback />}>
              <ImageWithModal
                src={imageDefinition.url}
                alt={imageDefinition.title ?? imageDefinition.url}
              />
            </Suspense>
          )
        }

        break
      }

      case 'footnoteDefinition': {
        markdownComponent.push(
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '0.5rem'
            }}
          >
            <a
              css={supStyle({ isDark })}
              href={`#footnote-reference-${node.identifier}`}
              id={`footnote-definition-${node.identifier}`}
            >
              <sup>{node.identifier}</sup>
            </a>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .markdownComponent
            }
          </div>
        )
        break
      }

      case 'footnoteReference': {
        markdownComponent.push(
          <a
            css={supStyle({ isDark })}
            href={`#footnote-definition-${node.identifier}`}
            id={`footnote-reference-${node.identifier}`}
          >
            <sup>{node.identifier}</sup>
          </a>
        )
        break
      }

      case 'definition':
      case 'html':
      case 'yaml': {
        break
      }
    }
  }

  return {
    markdownComponent: markdownComponent,
    definitions,
    tableOfContentsComponent: (
      <TableOfContents headings={headings} isDark={isDark} />
    )
  }
}
