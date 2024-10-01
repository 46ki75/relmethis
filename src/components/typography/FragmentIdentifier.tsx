import React from 'react'

// icons
import { HashtagIcon, LinkIcon } from '@heroicons/react/24/outline'
import { SimpleTooltip } from '../containment/SimpleTooltip'

import { useCopy } from '../../hooks/useCopy'

import isEqual from 'react-fast-compare'

import styles from './FragmentIdentifier.module.scss'
import clsx from 'clsx'

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
  locale?: 'en-US' | 'ja-JP'
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const FragmentIdentifierComponent = ({
  identifier,
  isDark = false,
  locale = 'en-US'
}: FragmentIdentifierProps) => {
  const scrollToIdentifier = () => {
    const element = document.getElementById(identifier)
    if (element) {
      window.history.pushState(null, '', `#${identifier}`)
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const { copy, isCopied } = useCopy(2000)

  return (
    <div className={styles['fragment-identifier']}>
      <span
        className={clsx(styles['fragment-identifier__copiedtext'], {
          [styles['fragment-identifier__copiedtext--visible']]: isCopied
        })}
      >
        {locale === 'en-US'
          ? 'Link has been copied!'
          : 'リンクがコピーされました！'}
      </span>

      <SimpleTooltip
        content={
          locale === 'en-US'
            ? 'Jump to a link with a fragment modifier'
            : 'フラグメント識別子のセクションまで移動します'
        }
        place='bottom'
        isDark={isDark}
      >
        <HashtagIcon
          className={styles['fragment-identifier__icon']}
          onClick={scrollToIdentifier}
        />
      </SimpleTooltip>

      <SimpleTooltip
        content={
          locale === 'en-US'
            ? 'Copy a link with a fragment modifier'
            : 'フラグメント識別子を含むリンクをコピーします'
        }
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
