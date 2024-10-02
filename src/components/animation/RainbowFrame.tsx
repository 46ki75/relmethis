import React, { useEffect, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import styles from './RainbowFrame.module.scss'

// # --------------------------------------------------------------------------------
//
// props
//
// # --------------------------------------------------------------------------------

export interface RainbowFrameProps {
  opacity?: number
  strokeWidth?: number
}

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const RainbowFrameComponent = ({
  opacity: opacityRatio = 0.5,
  strokeWidth = 1
}: RainbowFrameProps) => {
  const ref = useRef(0)
  const animationIdRef = useRef<number | null>(null)
  const [rotate, setRotate] = useState(0)
  const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const animate = () => {
      ref.current += 0.02
      const currentOpacity =
        Math.floor(ref.current) % 2 === 0
          ? ref.current - Math.trunc(ref.current)
          : 1 - (ref.current - Math.trunc(ref.current))
      setOpacity(currentOpacity * opacityRatio)
      setRotate(ref.current * 90)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [opacityRatio])

  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' className={styles.svg}>
        <defs>
          <linearGradient
            id='rainbowGradient'
            gradientTransform={`rotate(${rotate})`}
            spreadMethod='repeat'
          >
            <stop offset='0%' stopColor='red' />
            <stop offset='16.67%' stopColor='orange' />
            <stop offset='33.33%' stopColor='yellow' />
            <stop offset='50%' stopColor='green' />
            <stop offset='66.67%' stopColor='blue' />
            <stop offset='83.33%' stopColor='indigo' />
            <stop offset='100%' stopColor='violet' />
          </linearGradient>
        </defs>

        <rect
          stroke='url(#rainbowGradient)'
          strokeWidth={strokeWidth}
          fill='transparent'
          opacity={opacity}
          width={'100%'}
          height={'100%'}
        />
      </svg>
    </>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const RainbowFrame = React.memo(RainbowFrameComponent, isEqual)
