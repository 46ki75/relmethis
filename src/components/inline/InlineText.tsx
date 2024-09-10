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

const inlineTextStyle = ({ color }: { color: string }) => css`
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
   * Make the text bold. Uses the `strong` tag for markup.
   */
  bold?: boolean

  /**
   * Make the text italic. Uses the `em` tag for markup.
   */
  italic?: boolean

  /**
   * Add a strikethrough to the text. Uses the `del` tag for markup.
   */
  strikethrough?: boolean

  /**
   * Underline the text. Uses the `ins` tag for markup.
   */
  underline?: boolean

  /**
   * テキストの色
   */
  color?: Property.Color

  /**
   * プリセットの色。`color` が設定されている場合はそちらが優先される。
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
  presetColorName
}: InlineTextProps) => {
  const content = useMemo(() => {
    let result: ReactNode = <>{text}</>

    if (italic) result = <em>{result}</em>
    if (bold) result = <strong>{result}</strong>
    if (underline) result = <ins>{result}</ins>
    if (strikethrough) result = <del>{result}</del>

    return result
  }, [text, bold, italic, underline, strikethrough])

  const c = useMemo(
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

  return (
    <span css={inlineTextStyle({ color: c })} style={style}>
      {content}
    </span>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const InlineText = React.memo(InlineTextComponent, isEqual)
