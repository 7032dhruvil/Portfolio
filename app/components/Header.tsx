import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '2rem var(--container-padding)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mixBlendMode: 'difference',
      zIndex: 1000,
    }}>
      <div className="logo" style={{ fontSize: '1.2rem', fontWeight: 500, letterSpacing: '-0.02em' }}>
        <Link to="/">ANTIGRAVITY</Link>
      </div>
      
      <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        <Link to="/" className="muted">Index</Link>
        <a href="#about" className="muted">About</a>
        <a href="#projects" className="muted">Work</a>
        <a href="#contact" className="muted">Contact</a>
      </nav>
    </header>
  )
}
