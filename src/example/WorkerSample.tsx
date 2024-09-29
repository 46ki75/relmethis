'use client'

import React, { useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'

import { LineProgress } from '../components/data/LineProgress'

// web worker
import PrimeWorker from './primeWorker.ts?worker'
import type { ResultMessage } from './primeWorker'

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const WorkerSampleComponent = ({ count = 100 }: { count: number }) => {
  const [primes, setPrimes] = useState<number[]>([])
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const worker = new PrimeWorker()

    worker.onmessage = (event: MessageEvent<ResultMessage>) => {
      if (event.data.type === 'progress') {
        setProgress(event.data.progress)
      }

      if (event.data.type === 'complete') {
        setPrimes(event.data.primes)
        setProgress(event.data.progress)
      }
    }

    worker.postMessage(count)

    return () => {
      worker.terminate()
    }
  }, [count])

  return (
    <div>
      <h1>First {count} Primes</h1>
      {progress < 100 ? (
        <LineProgress percent={progress} />
      ) : (
        <p>
          {primes.slice(primes.length - 100).map((prime, index) => (
            <span key={index}>{prime}, </span>
          ))}
        </p>
      )}
    </div>
  )
}

// # --------------------------------------------------------------------------------
//
// memoize
//
// # --------------------------------------------------------------------------------

export const WorkerSample = React.memo(WorkerSampleComponent, isEqual)
