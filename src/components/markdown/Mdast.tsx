/** @jsxImportSource @emotion/react */

import React, { ReactNode, useEffect, useState } from 'react'
import { css } from '@emotion/react'

import { Definition, PhrasingContent, RootContent } from 'mdast'

// components
import { InlineCode } from '../inline/InlineCode'
import { InlineLink } from '../inline/InlineLink'
import { CodeBlock } from '../code/CodeBlock'
import { Heading1 } from '../typography/Heading1'
import { Heading2 } from '../typography/Heading2'
import { Heading3 } from '../typography/Heading3'
import { ImageWithModal } from '../image/ImageWithModal'
import { Divider } from '../typography/Divider'

import { visit } from 'unist-util-visit'
import { Alert } from '../typography/Alert'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const blockquoteStyle = css`
  box-sizing: border-box;
  margin-left: 0;
  padding: 0.25rem 1rem;
  border-left: solid 4px rgba(128, 128, 128, 0.4);
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface MdastProps {
  mdast: RootContent[]
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

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

const renderMdast = ({
  mdastNodes,
  definitions,
  isDark
}: {
  mdastNodes: RootContent[]
  definitions: Definition[]
  isDark: boolean
}): { reactNodes: ReactNode[]; definitions: Definition[] } => {
  const reactNodes: ReactNode[] = []

  for (const node of mdastNodes) {
    switch (node.type) {
      // # --------------------------------------------------------------------------------
      //
      // inline
      //
      // # --------------------------------------------------------------------------------

      case 'text': {
        reactNodes.push(<>{node.value}</>)
        break
      }

      case 'inlineCode': {
        reactNodes.push(<InlineCode text={node.value} />)
        break
      }

      case 'strong': {
        reactNodes.push(
          <strong>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .reactNodes
            }
          </strong>
        )
        break
      }

      case 'emphasis': {
        reactNodes.push(
          <em>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .reactNodes
            }
          </em>
        )
        break
      }

      case 'delete': {
        reactNodes.push(
          <del>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .reactNodes
            }
          </del>
        )
        break
      }

      case 'link': {
        reactNodes.push(
          <InlineLink text={mdastToString(node.children)} href={node.url} />
        )
        break
      }

      case 'break': {
        reactNodes.push(<br />)
        break
      }

      // # --------------------------------------------------------------------------------
      //
      // block
      //
      // # --------------------------------------------------------------------------------

      case 'paragraph': {
        reactNodes.push(
          <p>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .reactNodes
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
          firstChild.children[0].value.trim().toUpperCase().match(regex)
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

              reactNodes.push(
                <Alert type={alertType}>
                  {
                    renderMdast({
                      mdastNodes: newChildren,
                      definitions,
                      isDark
                    }).reactNodes
                  }
                </Alert>
              )
              break
            }
          }
        }

        reactNodes.push(
          <blockquote css={blockquoteStyle}>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .reactNodes
            }
          </blockquote>
        )

        break
      }

      case 'thematicBreak': {
        reactNodes.push(<Divider />)
        break
      }

      case 'code': {
        reactNodes.push(
          <CodeBlock code={node.value} language={node.lang ?? 'txt'} />
        )
        break
      }

      case 'heading': {
        if (node.depth === 1) {
          reactNodes.push(<Heading1 text={mdastToString(node.children)} />)
        } else if (node.depth === 2) {
          reactNodes.push(<Heading2 text={mdastToString(node.children)} />)
        } else if (node.depth === 3) {
          reactNodes.push(<Heading3 text={mdastToString(node.children)} />)
        } else if (node.depth === 4) {
          reactNodes.push(<h4>{mdastToString(node.children)}</h4>)
        } else if (node.depth === 5) {
          reactNodes.push(<h5>{mdastToString(node.children)}</h5>)
        } else if (node.depth === 6) {
          reactNodes.push(<h6>{mdastToString(node.children)}</h6>)
        }
        break
      }

      case 'image': {
        reactNodes.push(
          <ImageWithModal
            src={node.url}
            alt={node.alt ?? node.title ?? 'image'}
          />
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
                        }).reactNodes
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
                      }).reactNodes
                    }
                  </td>
                ))}
              </tr>
            )
          }
        }

        reactNodes.push(
          <table>
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
        reactNodes.push(
          node.ordered ? (
            <ol>
              {
                renderMdast({ mdastNodes: node.children, definitions, isDark })
                  .reactNodes
              }
            </ol>
          ) : (
            <ul>
              {
                renderMdast({ mdastNodes: node.children, definitions, isDark })
                  .reactNodes
              }
            </ul>
          )
        )
        break
      }

      case 'listItem': {
        reactNodes.push(
          <li>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .reactNodes
            }
          </li>
        )
        break
      }

      case 'linkReference': {
        const linkDefinition = definitions.find(
          (definition) => definition.identifier === node.identifier
        )

        if (linkDefinition != null) {
          reactNodes.push(
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
          reactNodes.push(
            <ImageWithModal
              src={imageDefinition.url}
              alt={imageDefinition.title ?? imageDefinition.url}
            />
          )
        }

        break
      }

      case 'footnoteDefinition': {
        reactNodes.push(
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '0.5rem'
            }}
          >
            <a
              href={`#footnote-reference-${node.identifier}`}
              id={`footnote-definition-${node.identifier}`}
            >
              {node.identifier}
            </a>
            {
              renderMdast({ mdastNodes: node.children, definitions, isDark })
                .reactNodes
            }
          </div>
        )
        break
      }

      case 'footnoteReference': {
        reactNodes.push(
          <a
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

  return { reactNodes, definitions }
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const MdastComponent = ({ mdast, isDark = false }: MdastProps) => {
  const [components, setComponents] = useState<ReactNode[]>([<>LOADING</>])

  useEffect(() => {
    const definitions: Definition[] = []

    for (const node of mdast) {
      visit(node, 'definition', (definition) => {
        definitions.push(definition)
      })
    }

    const mdastComponents = renderMdast({
      mdastNodes: mdast,
      definitions,
      isDark
    }).reactNodes

    setComponents(mdastComponents)
  }, [isDark, mdast])

  return <>{components}</>
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Mdast = React.memo(MdastComponent)
