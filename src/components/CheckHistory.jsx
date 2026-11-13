function CheckHistory({ history, onClear }) {
  return (
    <section className="card">
      <div className="card-title">
        <h2>Saved numbers</h2>
        {history.length > 0 && (
          <button className="link" onClick={onClear}>clear</button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="muted">Numbers you save will show up here.</p>
      ) : (
        <ul className="history">
          {history.map((item, index) => (
            <li key={index}>
              {item.number.toLocaleString()}
              <span className={item.isPrime ? 'yes' : 'no'}>
                {item.isPrime ? 'prime' : 'not prime'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CheckHistory
