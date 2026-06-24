import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const floatingWords = [
  { word: 'Fernweh',           meaning: 'wanderlust',                    x: 8,  y: 15, size: 1.1,  delay: 0   },
  { word: 'Zeitgeist',         meaning: 'spirit of the time',            x: 78, y: 10, size: 0.85, delay: 1.2 },
  { word: 'Weltanschauung',    meaning: 'worldview',                     x: 62, y: 70, size: 0.9,  delay: 0.5 },
  { word: 'Schadenfreude',     meaning: 'joy from others\' pain',        x: 5,  y: 65, size: 0.8,  delay: 2   },
  { word: 'Wanderlust',        meaning: 'desire to travel',              x: 85, y: 50, size: 1,    delay: 0.8 },
  { word: 'Gemütlichkeit',     meaning: 'coziness & warmth',             x: 40, y: 82, size: 0.85, delay: 1.5 },
  { word: 'Verschlimmbessern', meaning: 'make worse while improving',    x: 20, y: 85, size: 0.72, delay: 1.8 },
  { word: 'Weltschmerz',       meaning: 'world pain',                    x: 72, y: 28, size: 0.88, delay: 0.3 },
]

const stats = [
  { number: '95M+',  label_en: 'Native Speakers',        label_de: 'Muttersprachler',   icon: '🌍' },
  { number: '130M+', label_en: 'Total Speakers',         label_de: 'Gesamtsprecher',    icon: '💬' },
  { number: '26',    label_en: 'Grammar Letters',        label_de: 'Grammatikbuchst.',  icon: '🔤' },
  { number: '#1',    label_en: 'In European Union',      label_de: 'In der EU',         icon: '🏆' },
]

const features = [
  { icon: '🔤', title_en: 'Alphabet & Sounds',   title_de: 'Alphabet & Klänge',       desc_en: 'Master every letter, umlaut, and phoneme. Interactive cards that flip to reveal pronunciation secrets.',               desc_de: 'Meistere jeden Buchstaben, Umlaut und Phonem. Interaktive Karten, die sich umdrehen.',    to: '/alphabet',   color: 'var(--accent-gold)',   tag_en: 'A1 Start',     tag_de: 'A1 Start'    },
  { icon: '🗺️', title_en: 'Grammar Atlas',       title_de: 'Grammatik Atlas',         desc_en: 'Navigate the landscape of German grammar with visual maps. Declensions, cases, and verbs — made beautiful.',         desc_de: 'Navigiere durch die deutsche Grammatik mit visuellen Karten. Kasus, Artikel, Verben.', to: '/grammar',    color: 'var(--accent-blue)',   tag_en: 'A1 → B2',     tag_de: 'A1 → B2'    },
  { icon: '🧩', title_en: 'Vocabulary Worlds',   title_de: 'Vokabular-Welten',        desc_en: 'Thematic word collections across food, travel, emotions, and daily life. Context makes memory.',                   desc_de: 'Thematische Wortsammlungen: Essen, Reisen, Gefühle, Alltag.',                          to: '/vocabulary', color: 'var(--accent-green)',  tag_en: 'All Levels',   tag_de: 'Alle Niveaus' },
  { icon: '🏰', title_en: 'German Kultur',        title_de: 'Deutsche Kultur',         desc_en: 'Language lives in culture. Idioms, humor, traditions, and the untranslatable words that define a people.',           desc_de: 'Sprache lebt in der Kultur. Redewendungen, Humor, Traditionen.',                        to: '/culture',    color: 'var(--accent-red)',    tag_en: 'Enrichment',   tag_de: 'Bereicherung' },
]

export default function HomePage() {
  const { t, lang } = useApp()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const steps = [
    { step: '01', titleKey: 'home_step1', descKey: 'home_step1_desc', to: '/alphabet',   color: 'var(--accent-gold)'   },
    { step: '02', titleKey: 'home_step2', descKey: 'home_step2_desc', to: '/grammar',    color: 'var(--accent-blue)'   },
    { step: '03', titleKey: 'home_step3', descKey: 'home_step3_desc', to: '/vocabulary', color: 'var(--accent-green)'  },
    { step: '04', titleKey: 'home_step4', descKey: 'home_step4_desc', to: '/culture',    color: 'var(--accent-red)'    },
  ]

  return (
    <div className="page-wrapper">

      {/* ─── HERO ─── */}
      <section ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div className="orb orb-gold" style={{ width: 600, height: 600, top: '-10%', left: '-15%' }} />
        <div className="orb orb-red"  style={{ width: 400, height: 400, top: '40%',  right: '-10%' }} />
        <div className="orb orb-purple" style={{ width: 300, height: 300, bottom: '10%', left: '30%' }} />

        {/* Mouse parallax glow */}
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)',
          transform: `translate(${mousePos.x * 100 - 50}px, ${mousePos.y * 60 - 30}px)`,
          left: '30%', top: '20%', pointerEvents: 'none', transition: 'transform 0.3s ease',
        }} />

        {/* Floating words */}
        {floatingWords.map((w, i) => (
          <div key={i} className="tooltip-wrapper animate-float" style={{
            position: 'absolute', left: `${w.x}%`, top: `${w.y}%`,
            animationDelay: `${w.delay}s`, animationDuration: `${4 + w.delay * 0.5}s`, zIndex: 1,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: `${w.size}rem`,
              color: 'rgba(245,200,66,0.18)', fontWeight: 700, fontStyle: 'italic',
              whiteSpace: 'nowrap', cursor: 'default', transition: 'color 0.3s', display: 'block',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(245,200,66,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,200,66,0.18)')}
            >{w.word}</span>
            <div className="tooltip">{w.meaning}</div>
          </div>
        ))}

        {/* Hero content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ marginBottom: '1.5rem' }} className="animate-fade-in">
            <span className="badge">{t('home_badge')}</span>
          </div>
          <h1 style={{ marginBottom: '1.5rem' }} className="animate-slide-up">
            {t('home_h1_line1')}
            <br />
            <span className="gradient-text">{t('home_h1_line2')}</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto 2.5rem', lineHeight: 1.8 }} className="animate-fade-in">
            {t('home_subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} className="animate-fade-in">
            <Link to="/alphabet" className="btn-primary">{t('home_cta_primary')}</Link>
            <Link to="/culture"  className="btn-outline">{t('home_cta_sec')}</Link>
          </div>
          <div style={{ marginTop: '3rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            <span style={{ color: 'var(--accent-gold)', opacity: 0.7 }}>›</span>{' '}
            <em>{t('home_quote')}</em>{' '}
            <span style={{ opacity: 0.5 }}>— Goethe</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
          <span>SCROLL</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent-gold), transparent)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="section-sm" style={{ background: 'linear-gradient(135deg, var(--bg-deep), var(--bg-mid))', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-gold)', lineHeight: 1, marginBottom: '0.3rem' }}>{s.number}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{lang === 'de' ? s.label_de : s.label_en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1.5rem' }}>{t('home_stats_title')}</span>
            <h2>{t('home_4worlds')} <span className="gradient-text">{t('home_explore')}</span></h2>
            <p>{t('home_4worlds_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {features.map((f, i) => (
              <Link key={i} to={f.to} style={{ textDecoration: 'none' }}>
                <div className="glass-card" style={{ padding: '2rem', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${f.color}, transparent)`, borderRadius: '20px 20px 0 0' }} />
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{f.icon}</div>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span className="tag" style={{ fontSize: '0.72rem', color: f.color, background: `${f.color}15` }}>{lang === 'de' ? f.tag_de : f.tag_en}</span>
                  </div>
                  <h3 style={{ marginBottom: '0.75rem', fontSize: '1.3rem' }}>{lang === 'de' ? f.title_de : f.title_en}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{lang === 'de' ? f.desc_de : f.desc_en}</p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: f.color, fontWeight: 600, fontSize: '0.9rem' }}>
                    {lang === 'de' ? 'Entdecken' : 'Explore'} <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WORD OF THE DAY ─── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-deep)' }}>
        <div className="container">
          <div style={{ maxWidth: 700, margin: '0 auto', padding: '3rem', background: 'linear-gradient(135deg, rgba(245,200,66,0.06), rgba(232,57,74,0.06))', border: '1px solid rgba(245,200,66,0.15)', borderRadius: '28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)' }} />
            <div className="badge" style={{ marginBottom: '1.5rem' }}>{t('home_wotd_badge')}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>
              <span className="gradient-text">Torschlusspanik</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', letterSpacing: '0.05em' }}>tɔrʃlʊsˈpanik · noun · feminine</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 1.5rem' }}>
              {lang === 'de'
                ? <><em>"Tor-Schluss-Panik"</em> — Die Angst, dass die Zeit ausläuft und Lebensmöglichkeiten sich schließen, bevor man sie ergreifen kann.</>
                : <><em>"Gate-closing panic"</em> — The fear that time is running out and life's opportunities are closing before you can seize them.</>}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span className="tag">das Tor = the gate</span>
              <span className="tag">schließen = to close</span>
              <span className="tag">die Panik = the panic</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LEARNING PATH ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1.5rem' }}>{t('home_path_badge')}</span>
            <h2>{lang === 'de' ? 'Der' : 'The'} <span className="gradient-text-blue">{t('home_path_title')}</span></h2>
            <p>{t('home_path_sub')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 600, margin: '0 auto' }}>
            {steps.map((s, i) => (
              <Link key={i} to={s.to} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '44'; e.currentTarget.style.transform = 'translateX(6px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'translateX(0)' }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${s.color}18`, border: `1px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: s.color, flexShrink: 0 }}>{s.step}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{t(s.titleKey)}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t(s.descKey)}</div>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-gold animate-pulse-glow" style={{ width: 400, height: 400, top: '-20%', left: '20%', opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ marginBottom: '1rem' }}>{t('home_cta_h2')} <span className="gradient-text">{t('home_cta_h2b')}</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 2rem', fontSize: '1.1rem' }}>{t('home_cta_p')}</p>
          <Link to="/alphabet" className="btn-primary" style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>{t('home_cta_btn')}</Link>
        </div>
      </section>
    </div>
  )
}
