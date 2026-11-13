function PrimeStats({ result, limit }) {
  const { primes, twinPairs, biggestGap, gapStart } = result
  const percent = (primes.length / limit) * 100

  return (
    <section className="stats">
      <div>
        <span>Primes found</span>
        <strong>{primes.length.toLocaleString()}</strong>
      </div>
      <div>
        <span>Largest prime</span>
        <strong>{primes[primes.length - 1].toLocaleString()}</strong>
      </div>
      <div>
        <span>Twin prime pairs</span>
        <strong>{twinPairs.toLocaleString()}</strong>
      </div>
      <div>
        <span>Biggest gap</span>
        <strong>{biggestGap}</strong>
        <small className="muted">after {gapStart.toLocaleString()}</small>
      </div>
      <div>
        <span>Numbers that are prime</span>
        <strong>{percent.toFixed(2)}%</strong>
      </div>
    </section>
  )
}

export default PrimeStats
