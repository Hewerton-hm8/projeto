import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'BESS', href: '#bess' },
  { label: 'IA & Monitoramento', href: '#ia' },
  { label: 'Mobilidade', href: '#mobilidade' },
  { label: 'Setores', href: '#setores' },
  { label: 'Sobre', href: '#sobre' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#" className="navbar__logo">
        <div className="navbar__logo-mark">
          <img src="/logo-gonova.png" alt="GoNova" width="40" height="40" />
        </div>
        <span className="navbar__logo-text">
          Go<span>Nova</span>
        </span>
      </a>

      <ul className="navbar__links">
        {NAV_LINKS.map(l => (
          <li key={l.label}>
            <a href={l.href} className="navbar__link">{l.label}</a>
          </li>
        ))}
      </ul>

      <a href="#contato" className="navbar__cta">
        Diagnóstico Energético
      </a>

      <button className="navbar__burger" onClick={() => setOpen(v => !v)} aria-label="Menu">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="navbar__mobile">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="navbar__mobile-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contato" className="navbar__cta navbar__cta--mobile" onClick={() => setOpen(false)}>
            Diagnóstico Energético
          </a>
        </div>
      )}
    </nav>
  )
}
