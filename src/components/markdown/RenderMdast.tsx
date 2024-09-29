import React, { ReactNode, Suspense } from 'react'

import type { Definition, RootContent } from 'mdast'

// components
import { BlockFallback } from '../fallback/BlockFallback'
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

import type { CodeBlock as CodeBlockType } from '../code/CodeBlock'
const CodeBlock = React.lazy(() =>
  import('../code/CodeBlock').then((module) => ({
    default: module.CodeBlock
  }))
) as React.ComponentType<React.ComponentProps<typeof CodeBlockType>>

import type { Image as ImageWithModalType } from '../media/Image'
import { mdastToString } from './mdastToString'
import { Table } from '../data/Table'
import { KaTex } from '../code/KaTex'
import {
  colorPresetName,
  convertStringToColorPresetName,
  InlineText
} from '../inline/InlineText'
import { Bookmark } from '../typography/Bookmark'
import { Toggle } from '../containment/Toggle'
const Image = React.lazy(() =>
  import('../media/Image').then((module) => ({
    default: module.Image
  }))
) as React.ComponentType<React.ComponentProps<typeof ImageWithModalType>>

// # --------------------------------------------------------------------------------
//
// utils
//
// # --------------------------------------------------------------------------------

export const RenderMdast = ({
  mdastNodes,
  footnoteComponent,
  definitions,
  isDark,
  locale
}: {
  mdastNodes: RootContent[]
  footnoteComponent: ReactNode[]
  definitions: Definition[]
  isDark: boolean
  locale: 'en-US' | 'ja-JP'
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
      // directives
      //
      // # --------------------------------------------------------------------------------

      case 'textDirective': {
        if (node.name === 'style') {
          markdownComponent.push(
            <span style={node.attributes as React.CSSProperties}>
              {mdastToString(node.children)}
            </span>
          )
        } else if (node.name === 'color' && node.attributes != null) {
          const color = node.attributes.class
          markdownComponent.push(
            <InlineText presetColorName={convertStringToColorPresetName(color)}>
              {mdastToString(node.children)}
            </InlineText>
          )
        } else if (node.name === 'rich-text' && node.attributes != null) {
          const classes = node.attributes.class?.split(' ')
          const color = classes?.find((c) => colorPresetName.includes(c))
          const bold = classes?.includes('bold')
          const italic = classes?.includes('italic')
          const strikethrough = classes?.includes('strikethrough')
          const underline = classes?.includes('underline')
          const code = classes?.includes('code')
          markdownComponent.push(
            <InlineText
              presetColorName={convertStringToColorPresetName(color)}
              bold={bold}
              italic={italic}
              strikethrough={strikethrough}
              underline={underline}
              code={code}
            >
              {mdastToString(node.children)}
            </InlineText>
          )
        } else if (node.name === 'embed') {
          markdownComponent.push(
            <iframe
              src={String(node.attributes?.src)}
              width={'100%'}
              height={500}
            />
          )
        }
        break
      }

      case 'leafDirective': {
        markdownComponent.push(
          RenderMdast({
            mdastNodes: node.children,
            definitions,
            isDark,
            footnoteComponent,
            locale
          }).markdownComponent
        )
        break
      }

      case 'containerDirective': {
        if (node.name === 'bookmark' && node.children[0].type === 'paragraph') {
          markdownComponent.push(
            <Bookmark
              title={node.attributes?.title ?? ''}
              description={mdastToString(node.children[0].children)}
              url={node.attributes?.url ?? ''}
              image={node.attributes?.image ?? ''}
            />
          )
        } else if (node.name === 'toggle') {
          markdownComponent.push(
            <Toggle summary={node.attributes?.summary ?? 'Show More'}>
              {
                RenderMdast({
                  mdastNodes: node.children,
                  definitions,
                  isDark,
                  footnoteComponent,
                  locale
                }).markdownComponent
              }
            </Toggle>
          )
        }
        break
      }

      // # --------------------------------------------------------------------------------
      //
      // inline
      //
      // # --------------------------------------------------------------------------------

      case 'text': {
        markdownComponent.push(
          <InlineText isDark={isDark}>{node.value}</InlineText>
        )
        break
      }

      case 'inlineMath': {
        markdownComponent.push(<KaTex display={false} equation={node.value} />)
        break
      }

      case 'math': {
        markdownComponent.push(<KaTex display={true} equation={node.value} />)
        break
      }

      case 'inlineCode': {
        markdownComponent.push(
          <InlineText isDark={isDark} code={true}>
            {node.value}
          </InlineText>
        )
        break
      }

      case 'strong': {
        markdownComponent.push(
          <strong>
            {
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent,
                locale
              }).markdownComponent
            }
          </strong>
        )
        break
      }

      case 'emphasis': {
        markdownComponent.push(
          <em>
            {
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent,
                locale
              }).markdownComponent
            }
          </em>
        )
        break
      }

      case 'delete': {
        markdownComponent.push(
          <del>
            {
              RenderMdast({
                mdastNodes: node.children,
                definitions,
                isDark,
                footnoteComponent,
                locale
              }).markdownComponent
            }
          </del>
        )
        break
      }

      case 'link': {
        markdownComponent.push(
          <InlineLink href={node.url} isDark={isDark}>
            {mdastToString(node.children)}
          </InlineLink>
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
                footnoteComponent,
                locale
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
                      footnoteComponent,
                      locale
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
                footnoteComponent,
                locale
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
        const meta = node.meta
        let title = node.meta
        let highlightLines: string[] = []
        if (meta != null) {
          title = meta.match(/\[(.*?)\]/)?.[1]
          highlightLines = meta.match(/\{(.*?)\}/)?.[1].split(',') ?? []
        }

        markdownComponent.push(
          <Suspense fallback={<BlockFallback />}>
            <CodeBlock
              code={node.value}
              language={node.lang ?? 'txt'}
              isDark={isDark}
              caption={title ?? node.lang ?? 'txt'}
              highlightLines={highlightLines}
              locale={locale}
            />
          </Suspense>
        )
        break
      }

      case 'heading': {
        const text = mdastToString(node.children)

        headings.push({ level: node.depth, text })

        if (node.depth === 1) {
          markdownComponent.push(
            <Heading1 isDark={isDark} locale={locale}>
              {text}
            </Heading1>
          )
        } else if (node.depth === 2) {
          markdownComponent.push(
            <Heading2 isDark={isDark} locale={locale}>
              {text}
            </Heading2>
          )
        } else if (node.depth === 3) {
          markdownComponent.push(
            <Heading3 isDark={isDark} locale={locale}>
              {text}
            </Heading3>
          )
        } else if (node.depth === 4) {
          markdownComponent.push(
            <Heading4 isDark={isDark} locale={locale}>
              {text}
            </Heading4>
          )
        } else if (node.depth === 5) {
          markdownComponent.push(
            <Heading5 isDark={isDark} locale={locale}>
              {text}
            </Heading5>
          )
        } else if (node.depth === 6) {
          markdownComponent.push(
            <Heading6 isDark={isDark} locale={locale}>
              {text}
            </Heading6>
          )
        }
        break
      }

      case 'image': {
        markdownComponent.push(
          <Suspense fallback={<BlockFallback />}>
            <Image
              src={node.url}
              alt={node.alt ?? node.title ?? 'image'}
              locale={locale}
            />
          </Suspense>
        )
        break
      }

      case 'table': {
        const [tableHeaderRow, ...tableBodyRows] = node.children

        const rowNodes: ReactNode[][] = []

        rowNodes.push(
          tableHeaderRow.children.map((tableCell) => (
            <span>{mdastToString(tableCell.children)}</span>
          ))
        )

        for (const tableBodyRow of tableBodyRows) {
          rowNodes.push(
            tableBodyRow.children.map((tableCell) => {
              return RenderMdast({
                mdastNodes: tableCell.children,
                definitions,
                isDark,
                footnoteComponent,
                locale
              }).markdownComponent
            })
          )
        }

        const align =
          node.align != null
            ? node.align.map((a) => (a != null ? a : 'left'))
            : []

        markdownComponent.push(
          <Table rows={rowNodes} isDark={isDark} align={align} />
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
                  footnoteComponent,
                  locale
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
                  footnoteComponent,
                  locale
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
                footnoteComponent,
                locale
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
            <InlineLink href={linkDefinition.url}>
              {linkDefinition.title ?? linkDefinition.url}
            </InlineLink>
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
              <Image
                src={imageDefinition.url}
                alt={imageDefinition.title ?? imageDefinition.url}
                locale={locale}
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
              style={{ color: isDark ? '#6987b8' : '#4c6da2' }}
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
                footnoteComponent,
                locale
              }).markdownComponent
            }
          </div>
        )
        break
      }

      case 'footnoteReference': {
        markdownComponent.push(
          <a
            style={{ color: isDark ? '#6987b8' : '#4c6da2' }}
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
