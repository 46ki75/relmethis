import React from 'react'

import { LinkIcon } from '@heroicons/react/24/outline'

import isEqual from 'react-fast-compare'
import { Image } from '../media/Image'

import styles from './Bookmark.module.scss'

import { InlineText } from '../inline/InlineText'
import { RainbowFrame } from '../animation/RainbowFrame'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface BookmarkProps {
  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean
  title: string
  description: string
  url: string
  image: string
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const BookmarkComponent = ({
  isDark = false,
  description,
  title,
  url,
  image
}: BookmarkProps) => {
  return (
    <>
      <a
        href={url}
        target='_blank'
        rel='nopager noopener'
        className={styles['bookmark']}
      >
        <div className={styles['bookmark__image']}>
          <Image src={image} alt={description} disableModal={true} />
        </div>

        <div
          className={clsx(styles['bookmark__typography'], {
            [styles['bookmark__typography--light']]: !isDark,
            [styles['bookmark__typography--dark']]: isDark
          })}
        >
          <div>
            <InlineText isDark={isDark} fontSize={'1rem'} bold>
              {title}
            </InlineText>
          </div>

          <div>
            <InlineText isDark={isDark} fontSize={'0.8rem'} opacity={0.8}>
              {description}
            </InlineText>
          </div>

          <div className={styles['bookmark__link']}>
            <LinkIcon style={{ width: 16, height: 16 }} />
            <span>{url}</span>
          </div>
        </div>

        <RainbowFrame opacity={0.25} strokeWidth={2} displayOnHover />
      </a>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Bookmark = React.memo(BookmarkComponent, isEqual)
