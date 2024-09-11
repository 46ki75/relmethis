import React, { ReactNode, useDeferredValue } from 'react'

import { darken, lighten } from 'polished'
import isEqual from 'react-fast-compare'
import { useCSSVariable } from '../../hooks/useCSSVariable'

import styles from './Table.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface TableProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  rows: ReactNode[][]
  align?: Array<'left' | 'center' | 'right'>
}

interface TableRow {
  row: ReactNode[]
  isHeader: boolean
  align?: Array<'left' | 'center' | 'right'>
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const MemoizedTableRow = React.memo(
  ({ row, isHeader = false, align = [] }: TableRow) => {
    return (
      <tr>
        {row.map((cell, index) =>
          isHeader ? (
            <th key={index} style={{ textAlign: align[index] }}>
              {cell}
            </th>
          ) : (
            <td key={index} style={{ textAlign: align[index] }}>
              {cell}
            </td>
          )
        )}
      </tr>
    )
  },
  (p, n) =>
    p.align === n.align && p.isHeader === n.isHeader && isEqual(p.row, n.row)
)

const TableComponent = ({ isDark = false, rows, align = [] }: TableProps) => {
  const [headerRow, ...bodyRows] = useDeferredValue(rows)

  const { ref } = useCSSVariable<HTMLTableElement>({
    '--react-color-fg': isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)',
    '--react-color-bg': isDark
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
    '--react-hover-color': isDark
      ? darken(0.35, '#6987b8')
      : lighten(0.35, '#6987b8'),
    '--react-odd-color-bg': isDark ? 'rgb(40,40,40)' : 'rgb(240,240,240)',
    '--react-even-color-bg': isDark ? 'rgb(60,60,60)' : 'rgb(250,250,250)'
  })

  return (
    <table ref={ref} className={styles.table}>
      <thead>
        <MemoizedTableRow row={headerRow ?? []} isHeader={true} align={align} />
      </thead>

      <tbody>
        {bodyRows.map((row, index) => (
          <MemoizedTableRow
            key={index}
            row={row}
            isHeader={false}
            align={align}
          />
        ))}
      </tbody>
    </table>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Table = React.memo(TableComponent, isEqual)
