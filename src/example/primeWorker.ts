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
    }
    num++
  }
  return primes
}

self.onmessage = (event) => {
  const limit = event.data
  const primes = findPrimes(limit)
  self.postMessage(primes)
}
