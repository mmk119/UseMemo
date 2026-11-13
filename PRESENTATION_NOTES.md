# Presentation notes: useMemo

10 minutes. Everyone should understand all parts, not only their own.

## Part 1: What is useMemo?

useMemo saves the result of a calculation between renders.

```jsx
const value = useMemo(() => calculate(a, b), [a, b])
```

- First render: React runs the function and saves the result.
- Next renders: React checks `a` and `b`. If they're the same, it gives back the saved result without running the function. If one changed, it runs the function again.

**Why does it exist?** Every time state changes, React runs the whole component function again, including slow calculations that have nothing to do with the state that changed. useMemo lets us skip them.

**Simple example (show this first):**

```jsx
function Example() {
  const [count, setCount] = useState(0)
  const [n, setN] = useState(10000000)

  // without useMemo this would run again every time you click the button
  const primes = useMemo(() => findPrimes(n), [n])

  return <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
}
```

**When to use it**
- The calculation is slow (big loops, big lists). The React docs say it's worth it if the calculation takes about 1 ms or more.
- The component re-renders often for other reasons.

**When not to use it**
- For cheap calculations, like `PrimeStats` dividing two numbers. It adds code and memory for no gain.
- To make code correct. useMemo is only for speed; the app must work the same without it.

**Alternatives**
- Move the slow calculation outside the component if it doesn't use props or state.
- Move unrelated state into a smaller component, so the slow component doesn't re-render.
- `useCallback` saves a function instead of a value.
- `React.memo` skips re-rendering a whole component.
- The React Compiler can add memoization automatically.

**Effect on rendering:** useMemo does **not** stop re-renders. The component still re-renders; only the calculation is skipped.

## Part 2: Our project

A Prime Number Explorer: pick a limit, see stats about the primes, check whether a number is prime, save numbers, dark mode.

**Why this project?** Finding millions of primes is genuinely slow (~200 ms for 20 million), while the rest of the page (typing, saving, theme) changes all the time. That's exactly when useMemo helps.

**Demo:**
1. useMemo on, 20,000,000 selected. Type in "Is it prime?" → the line stays **green**, typing is smooth.
2. Turn useMemo off, type again → **red** on every key, typing lags.
3. Click "Dark mode" in both modes → same result.
4. Click a different limit → red in both modes, because the limit changed and the primes must be recalculated.
5. Pick 100,000, turn useMemo off → almost no lag. Only slow calculations need useMemo.

## Part 3: Code

1. `primes.js` → `findPrimes`: the Sieve of Eratosthenes. Mark every multiple of each prime as "not prime"; whatever is left is prime. Also counts twin primes and the biggest gap.
2. `App.jsx` → the `useMemo`:
   - Dependencies `[memoEnabled, limit]`. `numberToCheck`, `history` and `darkMode` are not in the list, so changing them doesn't recalculate.
   - `if (!memoEnabled) return null`: hooks can't be inside an `if`, so we always call useMemo and return nothing when the demo turns it off.
3. `PrimeChecker.jsx` uses `isComposite` from the saved result, so checking a number is instant. It doesn't calculate anything itself.

**What happens when you type in the checker?**
`setNumberToCheck` → App re-renders → useMemo sees `limit` didn't change → returns the saved primes → the checker looks up the number → done.

**If we removed useMemo:** the app shows the same results, but every key press would calculate more than a million primes again (~200 ms each), so the page freezes while typing.

## Questions they might ask

- **useMemo vs useCallback?** useMemo saves a value; useCallback saves a function.
- **Why not use it everywhere?** It costs memory and dependency checks and makes the code longer. Only for slow things.
- **What if you forget a dependency?** You get an old (stale) result. ESLint warns you.
- **Why does the line turn red when we tick the checkbox?** `memoEnabled` is a dependency, so changing it means useMemo calculates once. After that it stays green.
- **Why did you remove StrictMode?** In development it runs useMemo twice, which confused our demo.
- **Couldn't you just move the checker's state into PrimeChecker?** Yes, that would also stop the recalculation when typing. But dark mode and the saved list live in App, so useMemo is still needed for those.

## Who presents what

| Part | Person |
|---|---|
| 1. What is useMemo | |
| 2. Project + demo | |
| 3. Code | |
| 4. Questions | everyone |
