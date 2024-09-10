/** @jsxImportSource @emotion/react */

import React, { CSSProperties, ReactNode, useMemo } from 'react'
import { css } from '@emotion/react'
import { isEqual } from 'lodash'
import { getLuminance, rgba } from 'polished'
import { Property } from 'csstype'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const inlineTextStyle = ({
  color,
  isDark
}: {
  color: string
  isDark: boolean
}) => css`
  color: ${rgba(color, 0.7)};

  &::selection,
  *::selection {
    background-color: ${rgba(color, 0.8)};
    color: ${getLuminance(color) < 0.5
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.7)'};
  }

  strong {
    color: ${rgba(color, 0.8)};
  }

  del {
    color: ${rgba(color, 0.5)};
    text-decoration-color: ${rgba(color, 0.4)};
  }

  &::before,
  &::after {
    color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

type ColorPresetName =
  | 'crimson'
  | 'amber'
  | 'gold'
  | 'emerald'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'slate'

const COLOR_PRESET: Record<ColorPresetName, string> = {
  crimson: '#b36472',
  amber: '#bf7e71',
  gold: '#b8a36e',
  emerald: '#59b57c',
  blue: '#6987b8',
  purple: '#9771bd',
  pink: '#c9699e',
  slate: '#868e9c'
}

export interface InlineTextProps {
  style?: CSSProperties

  /**
   * The text to be displayed
   */
  text: string

  /**
   * Whether to use the dark theme
   */
  isDark?: boolean

  /**
   * Make the text bold using the `<strong></strong>` tag for markup.
   */
  bold?: boolean

  /**
   * Make the text italic using the `<em></em>` tag for markup.
   */
  italic?: boolean

  /**
   * Add a strikethrough to the text using the `<del></del>` tag for markup.
   */
  strikethrough?: boolean

  /**
   * Underline the text using the `<ins></ins>` tag for markup.
   */
  underline?: boolean

  /**
   * Render the text as a citation using the `<cite></cite>` tag.
   * If set to `true`, options for bold, italic, strikethrough, and underline will be ignored.
   */
  cite?: boolean

  /**
   * Render the text as a quote using the `<q></q>` tag.
   * If set to `true`, options for bold, italic, strikethrough, and underline will be ignored.
   */
  quote?: boolean

  /**
   * The color of the text
   */
  color?: Property.Color

  /**
   * Preset color. This takes precedence if `color` is also set.
   */
  presetColorName?: ColorPresetName
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const InlineTextComponent = ({
  style,
  text,
  isDark = false,
  bold = false,
  italic = false,
  strikethrough = false,
  underline = false,
  color,
  presetColorName,
  cite = false,
  quote = false
}: InlineTextProps) => {
  const fgColor = useMemo(
    () =>
      color != null
        ? color
        : presetColorName != null
          ? COLOR_PRESET[presetColorName]
          : isDark
            ? 'rgba(255, 255, 255, 1)'
            : 'rgba(0, 0, 0, 1)',
    [color, isDark, presetColorName]
  )

  if (cite)
    return (
      <cite
        css={inlineTextStyle({ color: fgColor, isDark })}
        style={{ marginInline: '0.5rem', paddingInline: '0.5rem', ...style }}
      >
        {text}
      </cite>
    )

  if (quote)
    return (
      <q
        css={inlineTextStyle({ color: fgColor, isDark })}
        style={{ marginInline: '0.5rem', paddingInline: '0.5rem', ...style }}
      >
        {text}
      </q>
    )

  const renderInnerContent = () => {
    let result: ReactNode = <>{text}</>

    if (italic) result = <em>{result}</em>
    if (bold) result = <strong>{result}</strong>
    if (underline) result = <ins>{result}</ins>
    if (strikethrough) result = <del>{result}</del>

    return result
  }

  return (
    <span css={inlineTextStyle({ color: fgColor, isDark })} style={style}>
      {renderInnerContent()}
    </span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const InlineText = React.memo(InlineTextComponent, isEqual)
