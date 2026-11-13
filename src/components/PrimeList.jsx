import { useState } from 'react'

function PrimeList({ primes }) {
  const [showFirst, setShowFirst] = useState(false)

  // only show 100 numbers, rendering millions of them would freeze the page
  const shown = showFirst ? primes.slice(0, 100) : primes.slice(-100)

  return (
    <section className="card">
      <div className="card-title">
        <h2>{showFirst ? 'First' : 'Last'} 100 primes</h2>
        <button className="link" onClick={() => setShowFirst(!showFirst)}>
          show {showFirst ? 'last' : 'first'} 100
        </button>
      </div>
      <div className="prime-grid">
        {shown.map((prime) => (
          <span key={prime}>{prime.toLocaleString()}</span>
        ))}
      </div>
    </section>
  )
}

export default PrimeList
