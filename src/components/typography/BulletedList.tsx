/** @jsxImportSource @emotion/react */

import React, { ReactNode } from 'react'
import { css } from '@emotion/react'

import bulletedListIcon1 from '../../assets/bulleted-list-icon-1.svg'
import bulletedListIcon2 from '../../assets/bulleted-list-icon-2.svg'
import bulletedListIcon3 from '../../assets/bulleted-list-icon-3.svg'

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
    padding-left: 0.5rem;
    margin: 0.75rem auto;

    &::marker {
      content: url(${bulletedListIcon1});
    }

    ul {
      li {
        &::marker {
          content: url(${bulletedListIcon2});
        }
        ul {
          li {
            &::marker {
              content: url(${bulletedListIcon3});
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

export interface BulletedListProps {
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

const BulletedListComponent: React.FC<BulletedListProps> = ({
  children,
  isDark = false
}) => {
  return (
    <ul css={style({ isDark })}>
      {React.Children.map(children, (child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  )
}
// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const BulletedList = React.memo(BulletedListComponent)
