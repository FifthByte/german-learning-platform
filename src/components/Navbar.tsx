import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { theme, toggleTheme, lang, setLang, t } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { to: '/',           label: t('nav_home'),       exact: true  },
    { to: '/alphabet',   label: t('nav_alphabet'),   exact: false },
    { to: '/grammar',    label: t('nav_grammar'),    exact: false },
    { to: '/vocabulary', label: t('nav_vocabulary'), exact: false },
    { to: '/culture',    label: t('nav_culture'),    exact: false },
    { to: '/contact',    label: t('nav_contact'),    exact: false },
  ]

  const isDark = theme === 'dark'

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 'var(--nav-height)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        gap: '0.5rem',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s',
        background: scrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid var(--nav-scrolled-border)'
          : '1px solid transparent',
      }}
    >
      {/* ── Logo ── */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
        <div style={{
          width: 36, height: 36,
          background: 'linear-gradient(135deg, #f5c842, #e8394a)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 900, fontSize: '1.1rem',
          color: '#070714',
          boxShadow: '0 4px 15px rgba(245,200,66,0.3)',
          flexShrink: 0,
        }}>D</div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: '1.2rem',
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}>
          Deutsch<span style={{ color: 'var(--accent-gold)' }}>Welt</span>
        </span>
      </Link>

      {/* ── Desktop Nav Links ── */}
      <div style={{ display: 'flex', gap: '0.1rem', marginLeft: 'auto', alignItems: 'center' }} className="desktop-nav">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.exact}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '0.88rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              background: isActive ? 'rgba(245,200,66,0.08)' : 'transparent',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* ── Controls group ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.75rem', flexShrink: 0 }} className="desktop-controls">

        {/* Language Switcher */}
        <div style={{
          display: 'flex',
          border: '1px solid var(--border-subtle)',
          borderRadius: '10px',
          overflow: 'hidden',
          background: 'var(--bg-card)',
        }}>
          {(['en', 'de'] as const).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              title={l === 'en' ? 'Switch to English' : 'Auf Deutsch wechseln'}
              style={{
                padding: '0.38rem 0.75rem',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: lang === l
                  ? 'var(--accent-gold)'
                  : 'transparent',
                color: lang === l
                  ? (isDark ? '#070714' : '#070714')
                  : 'var(--text-muted)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>{l === 'en' ? '🇬🇧' : '🇩🇪'}</span>
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            width: 38, height: 38,
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-card)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.25s ease',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent-gold)'
            e.currentTarget.style.color = 'var(--accent-gold)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)'
            e.currentTarget.style.color = 'var(--text-secondary)'
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* CTA */}
        <Link to="/alphabet" className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
          {t('nav_cta')}
        </Link>
      </div>

      {/* ── Mobile Controls + Hamburger ── */}
      <div style={{ display: 'none', alignItems: 'center', gap: '0.4rem', marginLeft: 'auto' }} className="mobile-controls">
        {/* Mobile lang switcher */}
        <div style={{ display: 'flex', border: '1px solid var(--border-subtle)', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-card)' }}>
          {(['en', 'de'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: '0.3rem 0.55rem',
              border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.65rem',
              background: lang === l ? 'var(--accent-gold)' : 'transparent',
              color: lang === l ? '#070714' : 'var(--text-muted)',
              transition: 'all 0.2s',
            }}>
              {l === 'en' ? '🇬🇧' : '🇩🇪'}
            </button>
          ))}
        </div>

        {/* Mobile theme toggle */}
        <button onClick={toggleTheme} style={{
          width: 34, height: 34, borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          background: 'var(--bg-card)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
        }}>{isDark ? '☀️' : '🌙'}</button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)', cursor: 'pointer',
            width: 38, height: 38, borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 5,
          }}
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: 18, height: 2, background: 'currentColor', transition: '0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : '' }} />
          <span style={{ display: 'block', width: 18, height: 2, background: 'currentColor', transition: '0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 18, height: 2, background: 'currentColor', transition: '0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
        </button>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: 'var(--nav-height)',
          left: 0, right: 0,
          background: 'var(--mobile-menu-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '1.5rem 2rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
        }}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                textDecoration: 'none', fontWeight: 500, fontSize: '1rem',
                padding: '0.75rem 1rem', borderRadius: '10px',
                background: isActive ? 'rgba(245,200,66,0.08)' : 'transparent',
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/alphabet" className="btn-primary" style={{ marginTop: '0.5rem', textAlign: 'center' }} onClick={() => setMenuOpen(false)}>
            {t('nav_cta')}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-controls { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
