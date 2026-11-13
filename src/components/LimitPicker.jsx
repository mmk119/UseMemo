const options = [100000, 1000000, 10000000, 20000000, 50000000]

function LimitPicker({ limit, onChange }) {
  return (
    <section className="card">
      <h2>Find all primes up to</h2>
      <div className="limit-buttons">
        {options.map((option) => (
          <button
            key={option}
            className={option === limit ? 'selected' : ''}
            onClick={() => onChange(option)}
          >
            {option.toLocaleString()}
          </button>
        ))}
      </div>
    </section>
  )
}

export default LimitPicker
