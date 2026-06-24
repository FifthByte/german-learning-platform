import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Footer() {
  const { t } = useApp()

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '3rem 2rem 2rem',
      marginTop: '5rem',
      background: 'var(--bg-deep)',
      transition: 'background 0.3s ease',
    }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        {/* Brand */}
        <div style={{ maxWidth: 280 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Deutsch<span style={{ color: 'var(--accent-gold)' }}>Welt</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            {t('footer_tagline')}
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              {t('footer_explore')}
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { to: '/alphabet',   key: 'nav_alphabet'   },
                { to: '/grammar',    key: 'nav_grammar'    },
                { to: '/vocabulary', key: 'nav_vocabulary' },
                { to: '/culture',    key: 'nav_culture'    },
                { to: '/contact',    key: 'nav_contact'    },
              ].map(l => (
                <Link key={l.to} to={l.to} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  {t(l.key)}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              {t('footer_levels')}
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['A1 — Beginner', 'A2 — Elementary', 'B1 — Intermediate', 'B2 — Upper'].map(l => (
                <span key={l} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{l}</span>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ── Copyright row ── */}
      <div className="container" style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{t('footer_copy')}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>{t('footer_bye')}</p>
      </div>

      {/* ── Powered by row ── */}
      <div style={{
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '1.25rem',
        paddingTop: '1rem',
        paddingBottom: '0.25rem',
        textAlign: 'center',
      }}>
        <p style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.03em',
        }}>
          <span style={{ opacity: 0.5 }}>⚡</span>
          Powered by{' '}
          <a
            href="https://thefifthbyte.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent-gold)',
              textDecoration: 'none',
              fontWeight: 700,
              letterSpacing: '0.04em',
              transition: 'opacity 0.2s, text-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.8'
              e.currentTarget.style.textShadow = '0 0 10px rgba(245,200,66,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.textShadow = 'none'
            }}
          >
            The Fifth Byte
          </a>
          <span style={{ opacity: 0.35 }}>· thefifthbyte.in</span>
        </p>
      </div>
    </footer>
  )
}
