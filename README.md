# Prime Number Explorer: useMemo project

A React + Vite app made for our React Hooks assignment. Our assigned hook is **useMemo**.

The app finds every prime number up to a limit you choose (up to 50 million). It shows stats about them and lets you check whether any number is prime.

## Features

- Choose a limit: 100,000 / 1,000,000 / 10,000,000 / 20,000,000 / 50,000,000
- Stats: how many primes, the largest one, twin prime pairs, the biggest gap, % of numbers that are prime
- "Is it prime?" checker that also tells you a divisor when the number isn't prime
- Save checked numbers to a list
- See the first or last 100 primes
- Dark mode (saved in localStorage)
- Demo panel to turn useMemo on and off

## How we use useMemo

Finding all the primes up to 20 million (`findPrimes` in `src/primes.js`, using the Sieve of Eratosthenes) takes about **200 ms**. That's real work, not a fake delay.

In `App.jsx`:

```jsx
const memoizedResult = useMemo(() => {
  if (!memoEnabled) return null
  return findPrimes(limit)
}, [memoEnabled, limit])
```

React saves the result and only runs `findPrimes` again when `limit` changes. Typing in the checker, saving a number or switching the theme re-renders `App`, but `limit` stays the same, so React gives back the saved primes instantly.

## See the difference

Look at the coloured line in the demo panel at the top. It updates after every render:
- **green**: "Used the saved result: 0 ms"
- **red**: "Calculated all the primes again: ~200 ms"

1. With **Use useMemo** checked, type a number in "Is it prime?". The line stays green and typing is smooth.
2. Uncheck it and type again. The line turns red on every key press, and typing becomes slow because each letter recalculates more than a million primes.
3. Click the limit buttons. The line is red in both modes, because the limit really changed and the primes have to be calculated again.
4. Pick 100,000 and turn useMemo off. Typing is still smooth because the calculation only takes about 1 ms. useMemo only matters when the calculation is slow.

## Other hooks

- `useState`: limit, checker input, saved numbers, dark mode, demo switch, first/last 100 toggle
- `useEffect`: saves dark mode to localStorage and adds the `dark` class to `<body>`

## Files

```
src/
  App.jsx                 state + useMemo
  primes.js               findPrimes (the slow part) + calculation counter
  components/
    Header.jsx
    DemoPanel.jsx         useMemo checkbox + green/red status
    LimitPicker.jsx
    PrimeStats.jsx
    PrimeChecker.jsx
    CheckHistory.jsx
    PrimeList.jsx
```

## Run it

```
npm install
npm run dev
```

Then open http://localhost:5173

Note: we removed `<StrictMode>` from `main.jsx`. In development it runs useMemo twice, which made the demo confusing.

## Team

- Mohammad Kassem
- Ali Al Abdallah
