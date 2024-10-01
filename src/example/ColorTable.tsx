import React from 'react'
import isEqual from 'react-fast-compare'

import { darken, parseToRgb } from 'polished'

import styles from './ColorTable.module.scss'
import { useCopyToClipboard } from 'react-use'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ColorTableProps {}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const colors = [
  { name: 'crimson', code: '#b36472' },
  { name: 'amber', code: '#bf7e71' },
  { name: 'gold', code: '#b8a36e' },
  { name: 'emerald', code: '#59b57c' },
  { name: 'blue', code: '#6987b8' },
  { name: 'purple', code: '#9771bd' },
  { name: 'pink', code: '#c9699e' },
  { name: 'slate', code: '#868e9c' }
]

const amountArray = [-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3]

const toRGB = (color: string) => {
  const { red, green, blue } = parseToRgb(color)
  return `rgb(${red}, ${green}, ${blue})`
}

const ColorTableComponent = () => {
  const [, copy] = useCopyToClipboard()

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>name</th>
          {amountArray.map((amount) => (
            <th>
              <code>
                {amount === 0 ? (
                  <>base</>
                ) : amount > 0 ? (
                  `darken(${amount}, #)`
                ) : (
                  `lighten(${-amount}, #)`
                )}
              </code>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {colors.map((color) => {
          return (
            <tr>
              <th key={color.name} style={{ color: color.code }}>
                {color.name}
              </th>
              {amountArray.map((amount) => (
                <td
                  key={`${color.name}-${amount}`}
                  onClick={() => {
                    copy(darken(amount, color.code))
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    style={{
                      background: darken(amount, color.code),
                      width: '100%',
                      height: 32
                    }}
                  ></div>
                  <div
                    style={{ color: darken(amount, color.code) }}
                    className={styles.container}
                  >
                    <div>{`[${amount}] ${color.name}`}</div>
                    <div>{darken(amount, color.code)}</div>
                    <div>{toRGB(darken(amount, color.code))}</div>
                  </div>
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const ColorTable = React.memo(ColorTableComponent, isEqual)
