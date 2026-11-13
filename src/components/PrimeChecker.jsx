import { smallestDivisor } from '../primes'

function PrimeChecker({ value, onChange, limit, isComposite, onSave }) {
  const number = Number(value)
  let answer = null
  let isPrime = false

  if (value !== '') {
    if (!Number.isInteger(number) || number < 2) {
      answer = <p className="answer">Enter a whole number bigger than 1.</p>
    } else if (number > limit) {
      answer = <p className="answer">That's bigger than {limit.toLocaleString()}. Pick a bigger limit above.</p>
    } else {
      // we already know the answer from the calculation, no need to calculate again
      isPrime = !isComposite[number]
      answer = isPrime ? (
        <p className="answer yes">{number.toLocaleString()} is prime</p>
      ) : (
        <p className="answer no">
          {number.toLocaleString()} is not prime (divisible by {smallestDivisor(number)})
        </p>
      )
    }
  }

  const canSave = value !== '' && Number.isInteger(number) && number >= 2 && number <= limit

  return (
    <section className="card">
      <h2>Is it prime?</h2>
      <div className="checker-row">
        <input
          type="number"
          placeholder="Type a number..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button disabled={!canSave} onClick={() => onSave(number, isPrime)}>
          Save
        </button>
      </div>
      {answer}
    </section>
  )
}

export default PrimeChecker
