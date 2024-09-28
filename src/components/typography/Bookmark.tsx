import React from 'react'

import { LinkIcon } from '@heroicons/react/24/outline'

import isEqual from 'react-fast-compare'
import { Image } from '../media/Image'

import styles from './Bookmark.module.scss'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { useInView } from 'react-intersection-observer'
import { useMergeRefs } from '../../hooks/useMergeRefs'

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
  const { ref: a, inView } = useInView()

  const { ref: b } = useCSSVariable({
    '--react-border-color': isDark
      ? 'rgba(255,255,255, 0.15)'
      : 'rgba(0, 0, 0, 0.2)',
    '--react-title-color': isDark
      ? 'rgba(255,255,255, 0.8)'
      : 'rgba(0, 0, 0, 0.8)',
    '--react-description-color': isDark
      ? 'rgba(255,255,255, 0.6)'
      : 'rgba(0, 0, 0, 0.6)',
    '--react-opacity': inView ? 1 : 0
  })

  const ref = useMergeRefs(a, b)

  return (
    <div ref={ref} className={styles.wrapper}>
      <a href={url} target='_blank' rel='nopager noopener'>
        <div className={styles.image}>
          <Image src={image} alt={description} disableModal={true} />
        </div>

        <div className={styles.typography}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.link}>
            <LinkIcon style={{ width: 16, height: 16 }} />
            <span>{url}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Bookmark = React.memo(BookmarkComponent, isEqual)
