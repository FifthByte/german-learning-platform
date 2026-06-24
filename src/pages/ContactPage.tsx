import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

// ─── CONFIG — change these to real values ───────────────────────────────────
const WHATSAPP_NUMBER  = '491234567890'   // e.g. 491234567890  (country code + number, no +)
const CONTACT_EMAIL    = 'hello@deutschwelt.com'
const CONTACT_LOCATION = 'Berlin, Germany'
const INSTAGRAM_URL    = 'https://instagram.com/deutschwelt'
const TWITTER_URL      = 'https://twitter.com/deutschwelt'

// ─── SVG ICONS ───────────────────────────────────────────────────────────────
const WhatsAppIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const EmailIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const LocationIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
)

const SendIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/>
    <path d="M22 2 11 13"/>
  </svg>
)

const ClockIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q_en: 'Is DeutschWelt free to use?',
    q_de: 'Ist DeutschWelt kostenlos?',
    a_en: 'Yes! All content on DeutschWelt is completely free. We believe language learning should be accessible to everyone.',
    a_de: 'Ja! Alle Inhalte auf DeutschWelt sind völlig kostenlos. Wir glauben, dass Sprachenlernen für jeden zugänglich sein sollte.',
  },
  {
    q_en: 'What language levels does DeutschWelt cover?',
    q_de: 'Welche Sprachniveaus deckt DeutschWelt ab?',
    a_en: 'We cover A1 through B2, from absolute beginners learning the alphabet to intermediate learners exploring idioms and culture.',
    a_de: 'Wir decken A1 bis B2 ab, von Anfängern, die das Alphabet lernen, bis zu Fortgeschrittenen, die Redewendungen und Kultur erkunden.',
  },
  {
    q_en: 'Can I suggest new content or corrections?',
    q_de: 'Kann ich neue Inhalte oder Korrekturen vorschlagen?',
    a_en: 'Absolutely! Use the contact form above and we\'ll review your suggestions. Community input makes DeutschWelt better for everyone.',
    a_de: 'Auf jeden Fall! Nutze das Kontaktformular oben und wir werden deine Vorschläge prüfen.',
  },
  {
    q_en: 'How quickly do you respond to messages?',
    q_de: 'Wie schnell antworten Sie auf Nachrichten?',
    a_en: 'We typically respond within 24–48 hours on weekdays. WhatsApp messages get the fastest response.',
    a_de: 'Wir antworten in der Regel innerhalb von 24–48 Stunden an Wochentagen. WhatsApp-Nachrichten werden am schnellsten beantwortet.',
  },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function ContactPage() {
  const { lang } = useApp()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // Simulate send — in production, hook to a backend / EmailJS / Formspree
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'de'
      ? 'Hallo! Ich habe eine Frage zu DeutschWelt.'
      : 'Hello! I have a question about DeutschWelt.'
  )}`

  const contactCards = [
    {
      icon: <WhatsAppIcon size={26} />,
      title_en: 'WhatsApp',
      title_de: 'WhatsApp',
      value: `+${WHATSAPP_NUMBER.replace(/(\d{2})(\d+)/, '$1 $2')}`,
      sub_en: 'Fastest response · Usually within 1h',
      sub_de: 'Schnellste Antwort · In der Regel innerhalb 1h',
      href: whatsappHref,
      color: '#25D366',
      bg: 'rgba(37,211,102,0.08)',
      border: 'rgba(37,211,102,0.2)',
    },
    {
      icon: <EmailIcon size={26} />,
      title_en: 'Email',
      title_de: 'E-Mail',
      value: CONTACT_EMAIL,
      sub_en: 'Detailed questions · 24–48h reply',
      sub_de: 'Detaillierte Fragen · 24–48h Antwort',
      href: `mailto:${CONTACT_EMAIL}`,
      color: 'var(--accent-blue)',
      bg: 'rgba(79,142,247,0.08)',
      border: 'rgba(79,142,247,0.2)',
    },
    {
      icon: <LocationIcon size={26} />,
      title_en: 'Location',
      title_de: 'Standort',
      value: CONTACT_LOCATION,
      sub_en: 'Central European Time (CET)',
      sub_de: 'Mitteleuropäische Zeit (MEZ)',
      href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT_LOCATION)}`,
      color: 'var(--accent-gold)',
      bg: 'rgba(245,200,66,0.08)',
      border: 'rgba(245,200,66,0.2)',
    },
  ]

  const subjects_en = ['General Question', 'Content Feedback', 'Bug / Error Report', 'Collaboration', 'Other']
  const subjects_de = ['Allgemeine Frage', 'Inhalts-Feedback', 'Fehler-Bericht', 'Zusammenarbeit', 'Sonstiges']
  const subjects = lang === 'de' ? subjects_de : subjects_en

  return (
    <div className="page-wrapper">

      {/* ─── HERO ─── */}
      <section style={{
        padding: '5rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, var(--bg-void) 0%, var(--bg-deep) 100%)',
        textAlign: 'center',
      }}>
        {/* Orbs */}
        <div className="orb" style={{ width: 500, height: 500, top: '-20%', left: '-15%', background: '#25D366', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.07, position: 'absolute', pointerEvents: 'none' }} />
        <div className="orb orb-blue" style={{ width: 350, height: 350, bottom: '-10%', right: '-8%' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge" style={{ marginBottom: '1.25rem', color: '#25D366', borderColor: 'rgba(37,211,102,0.3)', background: 'rgba(37,211,102,0.08)' }}>
            {lang === 'de' ? '💬 Kontakt' : '💬 Get in Touch'}
          </span>

          <h1 style={{ marginBottom: '1rem' }}>
            {lang === 'de' ? (
              <>Schreib <span className="gradient-text">uns an</span></>
            ) : (
              <>Let's <span className="gradient-text">Connect</span></>
            )}
          </h1>

          <p style={{ color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
            {lang === 'de'
              ? 'Fragen, Feedback oder einfach Hallo sagen — wir freuen uns von dir zu hören. Antworte in der Regel innerhalb von 24 Stunden.'
              : 'Questions, feedback, or just saying hi — we love hearing from you. Usually reply within 24 hours.'}
          </p>

          {/* Quick WhatsApp CTA */}
          <div style={{ marginTop: '2rem' }}>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.85rem 2rem',
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: '#fff',
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
                borderRadius: '50px', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(37,211,102,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(37,211,102,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,211,102,0.3)' }}
            >
              <WhatsAppIcon size={20} />
              {lang === 'de' ? 'Auf WhatsApp schreiben' : 'Chat on WhatsApp'}
            </a>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CARDS ─── */}
      <section style={{ padding: '4rem 2rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {contactCards.map((card, i) => (
              <a
                key={i}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="glass-card"
                  style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = card.border; e.currentTarget.style.transform = 'translateY(-5px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = '' }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 52, height: 52, borderRadius: '14px',
                    background: card.bg, border: `1px solid ${card.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: card.color,
                  }}>{card.icon}</div>

                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                      {lang === 'de' ? card.title_de : card.title_en}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', wordBreak: 'break-all' }}>{card.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{lang === 'de' ? card.sub_de : card.sub_en}</div>
                  </div>

                  <div style={{ marginTop: 'auto', color: card.color, fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {lang === 'de' ? 'Kontaktieren →' : 'Reach out →'}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM + SOCIAL ─── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>

            {/* ── FORM ── */}
            <div>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>
                  {lang === 'de' ? 'Nachricht' : 'Send a'}{' '}
                  <span className="gradient-text">{lang === 'de' ? 'senden' : 'Message'}</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  {lang === 'de'
                    ? 'Fülle das Formular aus und wir melden uns bald.'
                    : 'Fill out the form and we\'ll get back to you soon.'}
                </p>
              </div>

              {submitted ? (
                <div style={{
                  padding: '3rem 2rem',
                  background: 'rgba(37,211,102,0.06)',
                  border: '1px solid rgba(37,211,102,0.2)',
                  borderRadius: '20px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#25D366', marginBottom: '0.5rem' }}>
                    {lang === 'de' ? 'Nachricht gesendet!' : 'Message sent!'}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {lang === 'de'
                      ? 'Danke! Wir melden uns so schnell wie möglich bei dir.'
                      : 'Thanks! We\'ll get back to you as soon as possible.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline"
                    style={{ marginTop: '1.5rem' }}
                  >
                    {lang === 'de' ? 'Neue Nachricht' : 'Send another'}
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {/* Name + Email row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                      { name: 'name',  label_en: 'Your Name',  label_de: 'Dein Name',  type: 'text',  placeholder_en: 'Max Müller',       placeholder_de: 'Max Müller' },
                      { name: 'email', label_en: 'Email',       label_de: 'E-Mail',     type: 'email', placeholder_en: 'max@example.com',  placeholder_de: 'max@beispiel.de' },
                    ].map(field => (
                      <div key={field.name}>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.45rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                          {lang === 'de' ? field.label_de : field.label_en}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          required
                          value={(formData as any)[field.name]}
                          onChange={handleChange}
                          placeholder={lang === 'de' ? field.placeholder_de : field.placeholder_en}
                          style={inputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,200,66,0.12)' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={labelStyle}>{lang === 'de' ? 'Betreff' : 'Subject'}</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,200,66,0.12)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <option value="">{lang === 'de' ? '— Thema wählen —' : '— Select a topic —'}</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>{lang === 'de' ? 'Nachricht' : 'Message'}</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={lang === 'de'
                        ? 'Schreib deine Nachricht hier…'
                        : 'Write your message here…'}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,200,66,0.12)' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={sending}
                    style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.9rem', opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}
                  >
                    {sending ? (
                      <>
                        <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                        {lang === 'de' ? 'Senden…' : 'Sending…'}
                      </>
                    ) : (
                      <>
                        <SendIcon /> {lang === 'de' ? 'Nachricht abschicken' : 'Send Message'}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── SIDEBAR — Office Hours + Social ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Office Hours */}
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: 38, height: 38, borderRadius: '10px', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)' }}>
                    <ClockIcon size={18} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700 }}>
                    {lang === 'de' ? 'Erreichbarkeit' : 'Availability'}
                  </h3>
                </div>
                {[
                  { day_en: 'Monday – Friday', day_de: 'Montag – Freitag', hours: '9:00 – 20:00 CET' },
                  { day_en: 'Saturday',        day_de: 'Samstag',          hours: '10:00 – 15:00 CET' },
                  { day_en: 'Sunday',          day_de: 'Sonntag',          hours: lang === 'de' ? 'Geschlossen' : 'Closed' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{lang === 'de' ? row.day_de : row.day_en}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: i === 2 ? 'var(--accent-red)' : 'var(--accent-green)', fontWeight: 600 }}>{row.hours}</span>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.15)', borderRadius: '10px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ color: '#25D366', fontSize: '1rem' }}>💬</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {lang === 'de' ? 'WhatsApp: schnellste Antwort, jederzeit' : 'WhatsApp: fastest reply, anytime'}
                  </span>
                </div>
              </div>

              {/* Follow Us */}
              <div className="glass-card" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem' }}>
                  {lang === 'de' ? 'Folg uns' : 'Follow Us'}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { icon: <WhatsAppIcon size={18} />, label: 'WhatsApp', sub_en: 'Direct chat', sub_de: 'Direktchat', href: whatsappHref, color: '#25D366' },
                    { icon: <InstagramIcon size={18} />, label: 'Instagram', sub_en: '@deutschwelt', sub_de: '@deutschwelt', href: INSTAGRAM_URL, color: '#E1306C' },
                    { icon: <TwitterIcon size={18} />, label: 'X (Twitter)', sub_en: '@deutschwelt', sub_de: '@deutschwelt', href: TWITTER_URL, color: 'var(--text-primary)' },
                    { icon: <EmailIcon size={18} />, label: 'Email', sub_en: 'hello@deutschwelt.com', sub_de: 'hello@deutschwelt.com', href: `mailto:${CONTACT_EMAIL}`, color: 'var(--accent-blue)' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.65rem 0.75rem', borderRadius: '10px', transition: 'background 0.2s', color: 'inherit' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-deep)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ width: 34, height: 34, borderRadius: '9px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, flexShrink: 0 }}>{s.icon}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{s.label}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{lang === 'de' ? s.sub_de : s.sub_en}</div>
                      </div>
                      <div style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.9rem' }}>↗</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* German Tip */}
              <div style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(245,200,66,0.07), rgba(232,57,74,0.05))', border: '1px solid rgba(245,200,66,0.12)', borderRadius: '16px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                  🇩🇪 {lang === 'de' ? 'Wort des Tages' : 'Phrase of the Day'}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                  "Auf Wiederhören!"
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                  {lang === 'de' ? 'Auf Wiedersehen am Telefon — Tschüss!' : 'Goodbye on the phone — literally "until hearing again"'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem' }}>FAQ</span>
            <h2>
              {lang === 'de' ? 'Häufig gestellte' : 'Frequently Asked'}{' '}
              <span className="gradient-text">{lang === 'de' ? 'Fragen' : 'Questions'}</span>
            </h2>
            <p>{lang === 'de' ? 'Alles, was du wissen musst.' : 'Everything you need to know.'}</p>
          </div>
          <div style={{ maxWidth: 740, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                style={{
                  padding: '1.25rem 1.5rem',
                  background: activeFaq === i ? 'rgba(245,200,66,0.05)' : 'var(--bg-card)',
                  border: `1px solid ${activeFaq === i ? 'rgba(245,200,66,0.2)' : 'var(--border-subtle)'}`,
                  borderRadius: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem', color: activeFaq === i ? 'var(--accent-gold)' : 'var(--text-primary)' }}>
                    {lang === 'de' ? faq.q_de : faq.q_en}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', transition: 'transform 0.3s', transform: activeFaq === i ? 'rotate(180deg)' : '', flexShrink: 0 }}>▾</span>
                </div>
                {activeFaq === i && (
                  <div style={{ marginTop: '0.9rem', paddingTop: '0.9rem', borderTop: '1px solid rgba(245,200,66,0.1)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, animation: 'slide-up 0.3s ease' }}>
                    {lang === 'de' ? faq.a_de : faq.a_en}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 400, height: 400, top: '-30%', left: '20%', background: '#25D366', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.06, position: 'absolute', animation: 'pulse-glow 4s ease-in-out infinite' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🇩🇪</div>
          <h2 style={{ marginBottom: '0.75rem' }}>
            {lang === 'de' ? 'Noch Fragen?' : 'Still have questions?'}{' '}
            <span className="gradient-text">{lang === 'de' ? 'Schreib uns!' : 'We\'re here!'}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 440, margin: '0 auto 2rem', fontSize: '1rem', lineHeight: 1.7 }}>
            {lang === 'de'
              ? 'Wir helfen dir gerne dabei, Deutsch zu lernen und deine Fragen zu beantworten.'
              : 'We\'re passionate about helping you learn German. No question is too small.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 2rem', background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', borderRadius: '50px', textDecoration: 'none', boxShadow: '0 6px 20px rgba(37,211,102,0.25)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(37,211,102,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.25)' }}
            >
              <WhatsAppIcon size={18} /> WhatsApp
            </a>
            <Link to="/" className="btn-outline">
              {lang === 'de' ? '← Zur Startseite' : '← Back to Home'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── SHARED INPUT STYLES ──────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem 1rem',
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: '12px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.93rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  appearance: 'none',
  WebkitAppearance: 'none',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  marginBottom: '0.45rem',
  fontFamily: 'var(--font-mono)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}
