'use client'

export type ResultMessageType = 'progress' | 'complete'

export interface ResultMessageBase<T extends ResultMessageType> {
  type: T
}

export interface ProgressResultMessage extends ResultMessageBase<'progress'> {
  type: 'progress'
  progress: number
}

export interface CompleteResultMessage extends ResultMessageBase<'complete'> {
  type: 'complete'
  progress: number
  primes: number[]
}

export interface InputMessage {
  count: number
}

export type ResultMessage = ProgressResultMessage | CompleteResultMessage

function isPrime(num: number): boolean {
  if (num < 2) return false
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false
  }
  return true
}

function findPrimes(limit: number): number[] {
  const primes: number[] = []
  let num = 2

  while (primes.length < limit) {
    if (isPrime(num)) {
      primes.push(num)

      const progress = (primes.length / limit) * 100
      self.postMessage({ type: 'progress', progress } as ProgressResultMessage)
    }
    num++
  }

  return primes
}

self.onmessage = (event) => {
  const limit = event.data
  const primes = findPrimes(limit)
  self.postMessage({ type: 'complete', primes } as CompleteResultMessage)
}
