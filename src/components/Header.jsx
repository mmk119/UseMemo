function Header({ darkMode, onToggleTheme }) {
  return (
    <header className="header">
      <h1>Prime Number Explorer</h1>
      <button onClick={onToggleTheme}>{darkMode ? 'Light mode' : 'Dark mode'}</button>
    </header>
  )
}

export default Header
