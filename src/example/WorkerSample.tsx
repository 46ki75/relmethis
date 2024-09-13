import React, { useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import PrimeWorker from './primeWorker.ts?worker'

// # --------------------------------------------------------------------------------
//
// component
//
// # --------------------------------------------------------------------------------

const WorkerSampleComponent = ({ count = 100 }: { count: number }) => {
  const [primes, setPrimes] = useState<number[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const worker = new PrimeWorker()

    worker.onmessage = (event) => {
      setPrimes(event.data)
      setLoading(false)
    }

    setLoading(true)
    worker.postMessage(count)

    return () => {
      worker.terminate()
    }
  }, [count])

  return (
    <div>
      <h1>First {count} Primes</h1>
      {loading ? (
        <p>Loading...</p>
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
