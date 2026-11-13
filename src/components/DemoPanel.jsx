// Shows, after every render, whether the primes were calculated again or reused.
function DemoPanel({ memoEnabled, onMemoChange, ranThisRender, lastTime, totalRuns }) {
  return (
    <section className="demo-panel">
      <label className="memo-switch">
        <input
          type="checkbox"
          checked={memoEnabled}
          onChange={(e) => onMemoChange(e.target.checked)}
        />
        Use <code>useMemo</code>
      </label>

      {ranThisRender ? (
        <p className="status slow">
          Calculated all the primes again: <strong>{lastTime.toFixed(0)} ms</strong>
        </p>
      ) : (
        <p className="status fast">
          Used the saved result: <strong>0 ms</strong>
        </p>
      )}

      <p className="muted">
        Total calculations: {totalRuns}. Try typing in "Is it prime?" or switching the
        theme, with and without useMemo.
      </p>
    </section>
  )
}

export default DemoPanel
