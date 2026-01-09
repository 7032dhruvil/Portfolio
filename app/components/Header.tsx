import { Link } from '@tanstack/react-router'
import Magnet from './ui/Magnet'

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
        <Magnet><Link to="/">ANTIGRAVITY</Link></Magnet>
      </div>
      
      <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        <Magnet><Link to="/" className="muted">Index</Link></Magnet>
        <Magnet><a href="#about" className="muted">About</a></Magnet>
        <Magnet><a href="#projects" className="muted">Work</a></Magnet>
        <Magnet><a href="#contact" className="muted">Contact</a></Magnet>
      </nav>
    </header>
  )
}
