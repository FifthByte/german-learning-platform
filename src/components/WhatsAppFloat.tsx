import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const WHATSAPP_NUMBER = '491234567890' // same as ContactPage

const WhatsAppSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function WhatsAppFloat() {
  const { lang } = useApp()
  const [visible, setVisible]   = useState(false)
  const [hovered, setHovered]   = useState(false)
  const [tooltip, setTooltip]   = useState(false)
  const [dismissed, setDismissed] = useState(false)

  // Show button after scrolling 150px
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Show it after 3s on first load regardless of scroll
    const t = setTimeout(() => setVisible(true), 3000)
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(t) }
  }, [])

  // Auto-show tooltip once after 5s
  useEffect(() => {
    if (dismissed) return
    const t = setTimeout(() => {
      setTooltip(true)
      setTimeout(() => setTooltip(false), 4000)
    }, 5000)
    return () => clearTimeout(t)
  }, [dismissed])

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'de'
      ? 'Hallo! Ich habe eine Frage zu DeutschWelt.'
      : 'Hello! I have a question about DeutschWelt.'
  )}`

  return (
    <>
      {/* Floating button */}
      <a
        id="whatsapp-float"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => { setHovered(true); setTooltip(true) }}
        onMouseLeave={() => { setHovered(false); setTooltip(false) }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 998,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366, #128C7E)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          boxShadow: hovered
            ? '0 8px 32px rgba(37,211,102,0.6), 0 0 0 6px rgba(37,211,102,0.12)'
            : '0 6px 22px rgba(37,211,102,0.45)',
          transform: visible
            ? hovered ? 'scale(1.12) translateY(-3px)' : 'scale(1) translateY(0)'
            : 'scale(0) translateY(20px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <WhatsAppSVG />

        {/* Ripple ring */}
        <span style={{
          position: 'absolute',
          inset: -4,
          borderRadius: '50%',
          border: '2px solid rgba(37,211,102,0.5)',
          animation: 'whatsapp-ripple 2.2s ease-out infinite',
          pointerEvents: 'none',
        }} />
        <span style={{
          position: 'absolute',
          inset: -10,
          borderRadius: '50%',
          border: '2px solid rgba(37,211,102,0.25)',
          animation: 'whatsapp-ripple 2.2s ease-out 0.6s infinite',
          pointerEvents: 'none',
        }} />
      </a>

      {/* Tooltip bubble */}
      <div
        style={{
          position: 'fixed',
          bottom: '5.2rem',
          right: '5.8rem',
          zIndex: 997,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px 14px 4px 14px',
          padding: '0.65rem 1rem',
          maxWidth: 220,
          fontSize: '0.82rem',
          color: 'var(--text-primary)',
          lineHeight: 1.5,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          opacity: tooltip ? 1 : 0,
          transform: tooltip ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(8px)',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          pointerEvents: 'none',
          transformOrigin: 'bottom right',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
          <span style={{ color: '#25D366', fontWeight: 700, fontSize: '0.85rem' }}>💬 WhatsApp</span>
        </div>
        <span style={{ color: 'var(--text-secondary)' }}>
          {lang === 'de' ? 'Schreib uns direkt — wir antworten schnell!' : 'Chat with us — we reply fast!'}
        </span>

        {/* Close dot */}
        <button
          onClick={e => { e.preventDefault(); setDismissed(true); setTooltip(false) }}
          style={{
            position: 'absolute', top: '0.35rem', right: '0.4rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1,
            padding: '2px 4px', borderRadius: '4px',
            pointerEvents: 'all',
          }}
          aria-label="Dismiss"
        >✕</button>
      </div>

      {/* Keyframe injection */}
      <style>{`
        @keyframes whatsapp-ripple {
          0%   { transform: scale(1);   opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </>
  )
}
