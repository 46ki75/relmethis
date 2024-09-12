import React from 'react'

// icons
import { HashtagIcon, LinkIcon } from '@heroicons/react/24/outline'
import { SimpleTooltip } from '../containment/SimpleTooltip'

import { useCopy } from '../../hooks/useCopy'

import isEqual from 'react-fast-compare'

import styles from './FragmentIdentifier.module.scss'
import classNames from 'classnames'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface FragmentIdentifierProps {
  identifier: string

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

const FragmentIdentifierComponent = ({
  identifier,
  isDark = false
}: FragmentIdentifierProps) => {
  const scrollToIdentifier = () => {
    const element = document.getElementById(identifier)
    if (element) {
      window.history.pushState(null, '', `#${identifier}`)
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { copy, isCopied } = useCopy()

  return (
    <div className={styles['fragment-identifier']}>
      <span
        className={classNames(styles['fragment-identifier__copiedtext'], {
          [styles['fragment-identifier__copiedtext--visible']]: isCopied
        })}
      >
        Link has been copied!
      </span>

      <SimpleTooltip
        content='Jump to a link with a fragment modifier'
        place='bottom'
        isDark={isDark}
      >
        <HashtagIcon
          className={styles['fragment-identifier__icon']}
          onClick={scrollToIdentifier}
        />
      </SimpleTooltip>

      <SimpleTooltip
        content='Copy a link with a fragment modifier'
        place='bottom'
        isDark={isDark}
      >
        <LinkIcon
          className={styles['fragment-identifier__icon']}
          onClick={() => {
            copy(`${window.location.href.split('#')[0]}#${identifier}`)
          }}
        />
      </SimpleTooltip>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const FragmentIdentifier = React.memo(
  FragmentIdentifierComponent,
  isEqual
)
