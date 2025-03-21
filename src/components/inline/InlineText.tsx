import React, { CSSProperties, ReactNode, useMemo } from 'react'

import isEqual from 'react-fast-compare'
import { getLuminance, rgba } from 'polished'
import { Property } from 'csstype'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './InlineText.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export type ColorPresetName =
  | 'crimson'
  | 'amber'
  | 'gold'
  | 'emerald'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'slate'

// eslint-disable-next-line react-refresh/only-export-components
export const colorPresetName = [
  'crimson',
  'amber',
  'gold',
  'emerald',
  'blue',
  'purple',
  'pink',
  'slate'
]

// eslint-disable-next-line react-refresh/only-export-components
export const isColorPresetName = (
  colorName: string | null | undefined
): boolean => {
  if (colorName == null) return false
  return colorPresetName.includes(colorName)
}

// eslint-disable-next-line react-refresh/only-export-components
export const convertStringToColorPresetName = (
  colorName: string | null | undefined
): ColorPresetName => {
  if (colorName == null) return 'slate'
  if (colorPresetName.includes(colorName)) {
    return colorName as ColorPresetName
  } else {
    switch (colorName) {
      case 'red':
        return 'crimson'

      case 'orange':
        return 'amber'

      case 'yellow':
        return 'gold'

      case 'green':
        return 'emerald'

      case 'skyblue':
      case 'darkblue':
        return 'blue'

      case 'magenta':
        return 'pink'

      default:
        return 'slate'
    }
  }
}

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
  children: string

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

  code?: boolean

  /**
   * The color of the text
   */
  color?: Property.Color

  /**
   * Preset color. This takes precedence if `color` is also set.
   */
  presetColorName?: ColorPresetName

  /**
   * Displays phonetic annotations or pronunciation guides for a given text.
   * Commonly used for ruby text in East Asian languages, such as furigana in Japanese,
   * or pinyin in Chinese, but can also be applied for other languages or annotations.
   */
  ruby?: string

  fontSize?: Property.FontSize

  opacity?: Property.Opacity
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const InlineTextComponent = ({
  style,
  children,
  isDark = false,
  bold = false,
  italic = false,
  strikethrough = false,
  underline = false,
  color,
  presetColorName,
  cite = false,
  quote = false,
  code = false,
  ruby,
  fontSize = 'inherit',
  opacity = 0.9
}: InlineTextProps) => {
  const fgColor = useMemo(
    () =>
      color != null
        ? color
        : presetColorName != null
          ? COLOR_PRESET[presetColorName]
          : isDark
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(0, 0, 0, 0.8)',
    [color, isDark, presetColorName]
  )

  const { ref } = useCSSVariable({
    '--react-color-fg': rgba(fgColor, 0.7),
    '--react-selection-color-fg':
      getLuminance(fgColor) < 0.5
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(0, 0, 0, 0.7)',
    '--react-selection-color-bg': rgba(fgColor, 0.7),
    '--react-font-size': fontSize,
    '--react-opacity': opacity
  })

  const renderInnerContent = () => {
    if (code)
      return (
        <code className={styles['text__code']} style={style}>
          {children}
        </code>
      )

    if (cite)
      return (
        <cite className={styles['text__cite']} style={style}>
          {children}
        </cite>
      )

    if (quote)
      return (
        <q className={styles['text__q']} style={style}>
          {children}
        </q>
      )

    let result: ReactNode = <>{children}</>

    if (ruby != null) {
      result = (
        <ruby>
          {result}
          <rp>(</rp>
          <rt>{ruby}</rt>
          <rp>)</rp>
        </ruby>
      )
    }

    if (italic) result = <em>{result}</em>
    if (bold)
      result = <strong className={styles['text__strong']}>{result}</strong>
    if (underline) result = <ins>{result}</ins>
    if (strikethrough)
      result = <del className={styles['text__del']}>{result}</del>

    return result
  }

  return (
    <span ref={ref} className={styles.text} style={style}>
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
