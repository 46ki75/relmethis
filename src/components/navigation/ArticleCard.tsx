import React from 'react'
import isEqual from 'react-fast-compare'

// styles
import styles from './ArticleCard.module.scss'

// components

import { InlineText } from '../inline/InlineText'
import { Image } from '../media/Image'

// icons
import { ArrowPathIcon, CalendarDaysIcon } from '@heroicons/react/16/solid'
import { Property } from 'csstype'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface ArticleCardProps {
  style?: React.CSSProperties

  maxWidth?: Property.MaxWidth<string | number>

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  /**
   * URL of the image, such as an OGP image.
   */
  image: string

  /**
   * Title.
   */
  title: string

  /**
   * Description of the article.
   */
  description: string

  /**
   * Creation date of the article e.g.) 2000-01-01
   */
  createdAt: string

  /**
   * Update date of the article.
   */
  updatedAt: string

  /**
   * Function to call when clicked.
   * Implement your preferred behavior according to the framework you are using.
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const ArticleCardComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  maxWidth = '520px',
  image,
  title,
  description,
  createdAt,
  updatedAt,
  onClick
}: ArticleCardProps) => {
  return (
    <div
      style={{ maxWidth, ...style }}
      className={styles.card}
      onClick={onClick}
    >
      <Image isDark={isDark} src={image} alt={title} disableModal />
      <div
        className={styles['card__typography']}
        style={{
          backgroundColor: isDark
            ? 'rgba(0, 0, 0, 0.45)'
            : 'rgba(255, 255, 255, 0.45)'
        }}
      >
        <div>
          <InlineText isDark={isDark} fontSize={'1.1rem'}>
            {title}
          </InlineText>
        </div>
        <div>
          <InlineText isDark={isDark} fontSize={'0.8rem'} opacity={0.6}>
            {description}
          </InlineText>
        </div>
        <div className={styles['card__date']}>
          <CalendarDaysIcon
            className={styles['card__icon']}
            style={{ color: isDark ? 'white' : 'black' }}
          />
          <InlineText isDark={isDark} fontSize={'0.8rem'} opacity={0.6}>
            {createdAt}
          </InlineText>
          <ArrowPathIcon
            className={styles['card__icon']}
            style={{ color: isDark ? 'white' : 'black' }}
          />
          <InlineText isDark={isDark} fontSize={'0.8rem'} opacity={0.7}>
            {updatedAt}
          </InlineText>
        </div>
      </div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const ArticleCard = React.memo(ArticleCardComponent, isEqual)
