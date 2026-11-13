import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { calcStats, findPrimes } from './primes'
import Header from './components/Header'
import DemoPanel from './components/DemoPanel'
import LimitPicker from './components/LimitPicker'
import PrimeStats from './components/PrimeStats'
import PrimeChecker from './components/PrimeChecker'
import CheckHistory from './components/CheckHistory'
import PrimeList from './components/PrimeList'

function App() {
  // the only state that changes the prime numbers
  const [limit, setLimit] = useState(20000000)

  // state that has nothing to do with the prime calculation
  const [numberToCheck, setNumberToCheck] = useState('')
  const [history, setHistory] = useState([])
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')

  // for the presentation: turn useMemo on/off
  const [memoEnabled, setMemoEnabled] = useState(true)

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // remember the counter before calculating, so we know if it ran on this render
  const runsBefore = calcStats.runs

  // WITH useMemo: findPrimes only runs again when `limit` (or the demo switch) changes.
  // Typing in the checker, saving to history or changing the theme reuses the saved result.
  // (Hooks can't go inside an if, so when the demo turns useMemo "off" we return null.)
  const memoizedResult = useMemo(() => {
    if (!memoEnabled) return null
    return findPrimes(limit)
  }, [memoEnabled, limit])

  // WITHOUT useMemo: findPrimes runs on every render.
  const result = memoEnabled ? memoizedResult : findPrimes(limit)

  const ranThisRender = calcStats.runs > runsBefore

  function saveCheck(number, isPrime) {
    setHistory([{ number, isPrime }, ...history])
  }

  return (
    <div className="app">
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode(!darkMode)} />

      <DemoPanel
        memoEnabled={memoEnabled}
        onMemoChange={setMemoEnabled}
        ranThisRender={ranThisRender}
        lastTime={calcStats.lastTime}
        totalRuns={calcStats.runs}
      />

      <LimitPicker limit={limit} onChange={setLimit} />
      <PrimeStats result={result} limit={limit} />

      <div className="two-columns">
        <PrimeChecker
          value={numberToCheck}
          onChange={setNumberToCheck}
          limit={limit}
          isComposite={result.isComposite}
          onSave={saveCheck}
        />
        <CheckHistory history={history} onClear={() => setHistory([])} />
      </div>

      <PrimeList primes={result.primes} />
    </div>
  )
}

export default App
