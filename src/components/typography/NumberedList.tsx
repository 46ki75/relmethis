/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { css } from '@emotion/react'

// # --------------------------------------------------------------------------------
//
// styles
//
// # --------------------------------------------------------------------------------

const style = ({ isDark }: { isDark: boolean }) => css`
  color: ${isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  box-sizing: border-box;
  padding-left: 1.25rem;

  li {
    box-sizing: border-box;
    padding-left: 0.25rem;
    margin-block: 0.75rem;
    margin-left: 0.25rem;

    list-style-type: decimal;
    &::marker {
      color: #9771bd;
    }

    ol {
      li {
        list-style-type: lower-alpha;
        ol {
          li {
            list-style-type: lower-roman;
            ol {
              li {
                list-style-type: lower-greek;
              }
            }
          }
        }
      }
    }
  }

  *::selection {
    background-color: ${isDark
      ? 'rgba(255, 255, 255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)'};
    color: ${isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  }
`

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface NumberedListProps {
  children: ReactNode
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const NumberedListComponent: React.FC<NumberedListProps> = ({
  children,
  isDark = false
}) => {
  return (
    <ol css={style({ isDark })}>
      {React.Children.map(children, (child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ol>
  )
}
// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const NumberedList = React.memo(NumberedListComponent)
