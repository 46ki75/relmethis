/** @jsxImportSource @emotion/react */

import React, { ReactNode, useDeferredValue } from 'react'
import { css, keyframes } from '@emotion/react'
import { darken, lighten } from 'polished'
import isEqual from 'react-fast-compare'

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
        color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
        border-right: 1px dashed rgba(128, 128, 128, 0.4);

        * {
          color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};

          &::selection,
          *::selection {
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
        color: ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'};
        border-right: 1px dashed rgba(128, 128, 128, 0.4);

        &:last-child {
          border-right: none;
        }

        &::selection,
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

const fade = keyframes`
  from {opacity:0;}
  to {opacity:1;}
`

const trStyle = css`
  animation-name: ${fade};
  animation-duration: 400ms;
  animation-fill-mode: both;
`

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
      <tr css={trStyle}>
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

  return (
    <table key={`${isDark}`} css={tableStyle({ isDark })}>
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

export const Table = React.memo(
  TableComponent,
  (p, n) =>
    p.isDark === n.isDark && p.align === n.align && isEqual(p.rows, n.rows)
)
