/** @jsxImportSource @emotion/react */

import React, { ReactNode, Suspense } from 'react'
import { css } from '@emotion/react'

import type { Definition, RootContent } from 'mdast'

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
import { Paragraph } from '../typography/Paragraph'

import { darken, lighten } from 'polished'

import type { CodeBlock as CodeBlockType } from '../code/CodeBlock'
const CodeBlock = React.lazy(() =>
  import('../code/CodeBlock').then((module) => ({
    default: module.CodeBlock
  }))
) as React.ComponentType<React.ComponentProps<typeof CodeBlockType>>

import type { ImageWithModal as ImageWithModalType } from '../image/ImageWithModal'
import { mdastToString } from './mdastToString'
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
  width: fit-content;
  max-width: 100%;
  display: block;
  overflow-x: auto;
  scrollbar-width: thin;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);

  &::-webkit-scrollbar {
    height: 6px;
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(138, 148, 191, 0.8);
    border-radius: 3px;
    opacity: 0.6;
  }

  &::-webkit-scrollbar-track {
    background-color: #f3f3f3;
  }

  th,
  td {
    padding: 12px 15px;
    white-space: nowrap;
  }

  thead {
    tr {
      background-color: ${isDark
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(0, 0, 0, 0.8)'};

      text-align: left;

      th {
        border-right: 1px dashed rgba(128, 128, 128, 0.4);

        * {
          color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};

          &::selection {
            background-color: ${!isDark
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(0, 0, 0, 0.8)'};
            color: ${!isDark
              ? 'rgba(0, 0, 0, 0.8)'
              : 'rgba(255, 255, 255, 0.8)'};
          }
        }

        &:last-child {
          border-right: none;
        }
      }
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid rgba(128, 128, 128, 0.4);

      transition: background-color 300ms;

      &:nth-of-type(odd) {
        background-color: ${isDark ? 'rgb(40,40,40)' : 'rgb(240,240,240)'};
      }

      &:nth-of-type(even) {
        background-color: ${isDark ? 'rgb(60,60,60)' : 'rgb(250,250,250)'};
      }

      &:hover {
        background-color: ${isDark
          ? darken(0.35, '#6987b8')
          : lighten(0.35, '#6987b8')};
      }

      td {
        border-right: 1px dashed rgba(128, 128, 128, 0.4);

        &:last-child {
          border-right: none;
        }

        *::selection {
          background-color: ${isDark
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(0, 0, 0, 0.8)'};
          color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
        }
      }
    }
  }
`

const supStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? '#6987b8' : '#4c6da2'};
`

const inlineStyle = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};

  *::selection {
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
    color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }
`

// # --------------------------------------------------------------------------------
//
// utils
//
// # --------------------------------------------------------------------------------

export const RenderMdast = ({
  mdastNodes,
  footnoteComponent,
  definitions,
  isDark
}: {
  mdastNodes: RootContent[]
  footnoteComponent: ReactNode[]
  definitions: Definition[]
  isDark: boolean
}): {
  markdownComponent: ReactNode[]
  footnoteComponent: ReactNode[]
  definitions: Definition[]
  headings: Array<{
    text: string
    level: 1 | 2 | 3 | 4 | 5 | 6
    identifier?: string
  }>
} => {
  const markdownComponent: ReactNode[] = []

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
        markdownComponent.push(
          <span css={inlineStyle({ isDark })}>{node.value}</span>
        )
        break
      }

      case 'inlineCode': {
        markdownComponent.push(<InlineCode text={node.value} isDark={isDark} />)
        break
      }

      case 'strong': {
        markdownComponent.push(
          <strong css={inlineStyle({ isDark })}>
            {
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent
              }).markdownComponent
            }
          </strong>
        )
        break
      }

      case 'emphasis': {
        markdownComponent.push(
          <em css={inlineStyle({ isDark })}>
            {
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent
              }).markdownComponent
            }
          </em>
        )
        break
      }

      case 'delete': {
        markdownComponent.push(
          <del css={inlineStyle({ isDark })}>
            {
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent
              }).markdownComponent
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
          <Paragraph isDark={isDark}>
            {
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent
              }).markdownComponent
            }
          </Paragraph>
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
                    RenderMdast({
                      mdastNodes: newChildren,
                      definitions,
                      isDark,
                      footnoteComponent
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
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent
              }).markdownComponent
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
                        RenderMdast({
                          mdastNodes: tableCell.children,
                          definitions,
                          isDark,
                          footnoteComponent
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
                      RenderMdast({
                        mdastNodes: tableCell.children,
                        definitions,
                        isDark,
                        footnoteComponent
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
                RenderMdast({
                  mdastNodes: node.children,
                  definitions,
                  isDark,
                  footnoteComponent
                }).markdownComponent
              }
            </NumberedList>
          ) : (
            <BulletedList isDark={isDark}>
              {
                RenderMdast({
                  mdastNodes: node.children,
                  definitions,
                  isDark,
                  footnoteComponent
                }).markdownComponent
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
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent
              }).markdownComponent
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
        footnoteComponent.push(
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
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent
              }).markdownComponent
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
    markdownComponent,
    footnoteComponent,
    definitions,
    headings
  }
}
