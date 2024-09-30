'use client'

import React from 'react'
import isEqual from 'react-fast-compare'
import styles from './Audio.module.scss'
import { useAudio } from 'react-use'
import {
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  UserIcon
} from '@heroicons/react/20/solid'

import { Image } from './Image'
import { useCSSVariable } from '../../hooks/useCSSVariable'
import { InlineText } from '../inline/InlineText'
import clsx from 'clsx'

// # --------------------------------------------------------------------------------
//
// utils
//
// # --------------------------------------------------------------------------------

function formatTime(seconds: number): string {
  const totalSeconds = Math.floor(seconds)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const secs = totalSeconds % 60

  if (hours === 0) {
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface AudioProps {
  style?: React.CSSProperties

  /**
   * Whether or not to use the dark theme
   */
  isDark?: boolean

  src: string

  title?: string

  artist?: string

  cover?: string

  autoPlay?: boolean
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const AudioComponent = ({
  style,
  isDark = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false,
  src,
  title = src,
  artist = 'unknown',
  cover,
  autoPlay = false
}: AudioProps) => {
  const [audio, state, controls] = useAudio({ src, autoPlay })

  const color = '#59b57c'

  const { ref } = useCSSVariable({
    '--react-text-color': isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)',
    '--react-background-color': isDark
      ? 'rgba(255,255,255,0.1)'
      : 'rgba(0,0,0,0.03)',
    '--react-seek-color-fg': color,
    '--react-seek-progress': `scaleX(${state.time / state.duration})`
  })

  return (
    <div ref={ref} className={styles.audio} style={style}>
      {audio}

      <div className={styles['audio__cover']}>
        {cover ? (
          <Image src={cover} width={1} height={1} />
        ) : (
          <MusicalNoteIcon className={styles['audio__icon']} />
        )}
      </div>

      <div className={styles['audio__info']}>
        <div className={styles['audio__title']}>
          <MusicalNoteIcon className={styles['audio__icon']} />
          <InlineText isDark={isDark}>{title}</InlineText>
        </div>

        <div className={styles['audio__artist']}>
          <UserIcon className={styles['audio__icon']} />
          <InlineText isDark={isDark}>{artist}</InlineText>
        </div>

        <div className={styles['audio__control']}>
          {state.paused ? (
            <PlayIcon
              className={styles['audio__control-icon']}
              onClick={controls.play}
            />
          ) : (
            <PauseIcon
              className={styles['audio__control-icon']}
              onClick={controls.pause}
            />
          )}

          <div className={styles['audio__time']}>
            {formatTime(state.time)}&nbsp;/&nbsp;{formatTime(state.duration)}
          </div>

          {state.muted ? (
            <SpeakerXMarkIcon
              className={clsx(
                styles['audio__control-icon'],
                styles['audio__control-icon--muted']
              )}
              onClick={controls.unmute}
            />
          ) : (
            <SpeakerWaveIcon
              className={styles['audio__control-icon']}
              onClick={controls.mute}
            />
          )}

          {/* <input
            type='range'
            name='volume'
            min={0}
            max={1}
            step={0.01}
            onChange={(e) => {
              controls.volume(Number(e.target.value))
            }}
          /> */}
        </div>

        <input
          type='range'
          className={styles['audio__seek']}
          name='seek'
          min={0}
          max={state.duration}
          step={0.1}
          value={state.time}
          onChange={(e) => {
            controls.seek(Number(e.target.value))
          }}
        />
      </div>
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const Audio = React.memo(AudioComponent, isEqual)
