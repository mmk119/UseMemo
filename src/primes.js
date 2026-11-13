// Counts how many times findPrimes ran, so we can show it in the demo panel.
// It's a normal object (not state), so changing it doesn't re-render anything.
export const calcStats = { runs: 0, lastTime: 0 }

// Finds every prime number from 2 up to `limit` using the Sieve of Eratosthenes.
// This is the slow part of the app: for 20,000,000 it takes around 200 ms.
export function findPrimes(limit) {
  const start = performance.now()

  // isComposite[n] will be 1 if n is NOT prime.
  // Uint8Array is just an array of small numbers that uses much less memory.
  const isComposite = new Uint8Array(limit + 1)

  for (let i = 2; i * i <= limit; i++) {
    if (isComposite[i]) continue
    // every multiple of a prime is not prime
    for (let j = i * i; j <= limit; j += i) {
      isComposite[j] = 1
    }
  }

  const primes = []
  for (let n = 2; n <= limit; n++) {
    if (!isComposite[n]) primes.push(n)
  }

  // some extra stats about the primes we found
  let twinPairs = 0 // primes that are 2 apart, like 11 and 13
  let biggestGap = 0
  let gapStart = 0
  for (let k = 1; k < primes.length; k++) {
    const gap = primes[k] - primes[k - 1]
    if (gap === 2) twinPairs++
    if (gap > biggestGap) {
      biggestGap = gap
      gapStart = primes[k - 1]
    }
  }

  calcStats.runs++
  calcStats.lastTime = performance.now() - start

  return { isComposite, primes, twinPairs, biggestGap, gapStart }
}

// Smallest number that divides n (used to explain why a number is not prime).
export function smallestDivisor(n) {
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return i
  }
  return n
}
