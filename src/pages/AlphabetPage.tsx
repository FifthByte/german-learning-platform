import { useState } from 'react'
import { useApp } from '../context/AppContext'

const alphabet = [
  { letter: 'A', phonetic: 'ah',       example: 'Apfel',    translation: 'apple',    tip_en: 'Like "a" in "father"',                               tip_de: 'Wie "a" in "Vater"' },
  { letter: 'B', phonetic: 'beh',      example: 'Buch',     translation: 'book',     tip_en: 'Same as English B',                                  tip_de: 'Wie im Englischen B' },
  { letter: 'C', phonetic: 'tseh',     example: 'Computer', translation: 'computer', tip_en: '"ts" before e/i, "k" before a/o/u',                  tip_de: '"ts" vor e/i, "k" vor a/o/u' },
  { letter: 'D', phonetic: 'deh',      example: 'Danke',    translation: 'thank you',tip_en: 'Same as English D',                                  tip_de: 'Wie im Englischen D' },
  { letter: 'E', phonetic: 'eh',       example: 'Essen',    translation: 'food',     tip_en: 'Like "e" in "bed"',                                  tip_de: 'Wie "e" in "Bett"' },
  { letter: 'F', phonetic: 'eff',      example: 'Freund',   translation: 'friend',   tip_en: 'Same as English F',                                  tip_de: 'Wie im Englischen F' },
  { letter: 'G', phonetic: 'geh',      example: 'Garten',   translation: 'garden',   tip_en: 'Hard G, like in "go"',                               tip_de: 'Hartes G wie in "gut"' },
  { letter: 'H', phonetic: 'hah',      example: 'Haus',     translation: 'house',    tip_en: 'Always pronounced, unlike French',                   tip_de: 'Immer ausgesprochen, anders als im Französischen' },
  { letter: 'I', phonetic: 'ee',       example: 'Insel',    translation: 'island',   tip_en: 'Like "ee" in "see"',                                 tip_de: 'Wie "i" in "Igel"' },
  { letter: 'J', phonetic: 'yot',      example: 'Jahr',     translation: 'year',     tip_en: 'Sounds like English "Y"',                            tip_de: 'Klingt wie "J" in "Jaguar"' },
  { letter: 'K', phonetic: 'kah',      example: 'Kind',     translation: 'child',    tip_en: 'Same as English K',                                  tip_de: 'Wie im Englischen K' },
  { letter: 'L', phonetic: 'ell',      example: 'Land',     translation: 'country',  tip_en: 'Light L, like in "love"',                            tip_de: 'Helles L wie in "Liebe"' },
  { letter: 'M', phonetic: 'emm',      example: 'Meer',     translation: 'sea',      tip_en: 'Same as English M',                                  tip_de: 'Wie im Englischen M' },
  { letter: 'N', phonetic: 'enn',      example: 'Nacht',    translation: 'night',    tip_en: 'Same as English N',                                  tip_de: 'Wie im Englischen N' },
  { letter: 'O', phonetic: 'oh',       example: 'Ort',      translation: 'place',    tip_en: 'Rounded lips, like "o" in "ore"',                    tip_de: 'Gerundete Lippen, wie "o" in "ober"' },
  { letter: 'P', phonetic: 'peh',      example: 'Post',     translation: 'mail',     tip_en: 'Same as English P',                                  tip_de: 'Wie im Englischen P' },
  { letter: 'Q', phonetic: 'koo',      example: 'Quelle',   translation: 'source',   tip_en: 'Always followed by U, sounds like "kv"',             tip_de: 'Immer gefolgt von U, klingt wie "kw"' },
  { letter: 'R', phonetic: 'err',      example: 'Rot',      translation: 'red',      tip_en: 'Guttural, from the throat',                          tip_de: 'Guttural aus der Kehle' },
  { letter: 'S', phonetic: 'ess',      example: 'Sonne',    translation: 'sun',      tip_en: '"Z" sound before vowels, "sh" before t/p',           tip_de: '"S" vor Vokalen, "sch" vor t/p' },
  { letter: 'T', phonetic: 'teh',      example: 'Tür',      translation: 'door',     tip_en: 'Same as English T',                                  tip_de: 'Wie im Englischen T' },
  { letter: 'U', phonetic: 'oo',       example: 'Uhr',      translation: 'clock',    tip_en: 'Like "oo" in "food"',                                tip_de: 'Wie "u" in "Gut"' },
  { letter: 'V', phonetic: 'fow',      example: 'Vogel',    translation: 'bird',     tip_en: 'Sounds like English F',                              tip_de: 'Klingt wie englisches F' },
  { letter: 'W', phonetic: 'veh',      example: 'Wasser',   translation: 'water',    tip_en: 'Sounds like English V',                              tip_de: 'Klingt wie englisches V' },
  { letter: 'X', phonetic: 'iks',      example: 'Xylophon', translation: 'xylophone',tip_en: 'Like "ks" in "books"',                               tip_de: 'Wie "ks" in "Fuchs"' },
  { letter: 'Y', phonetic: 'üpsilon',  example: 'Yacht',    translation: 'yacht',    tip_en: 'Rare in German, mostly loanwords',                   tip_de: 'Selten, meist in Fremdwörtern' },
  { letter: 'Z', phonetic: 'tset',     example: 'Zeit',     translation: 'time',     tip_en: 'Like "ts" in "cats"',                                tip_de: 'Wie "ts" in "Katze"' },
]

const specials = [
  { letter: 'Ä', phonetic: 'eh (sharp)',    example: 'Käse',   translation: 'cheese', tip_en: 'Like "e" in "bed", more open than E',                    tip_de: 'Wie "e" in "Bett", offener als E',      color: 'var(--accent-gold)' },
  { letter: 'Ö', phonetic: 'uh (rounded)',  example: 'Öl',     translation: 'oil',    tip_en: 'No English equivalent — round lips and say "e"',         tip_de: 'Lippen runden, "e" sagen',               color: 'var(--accent-red)' },
  { letter: 'Ü', phonetic: 'ew (rounded)',  example: 'Über',   translation: 'over',   tip_en: 'Round lips for "oo" but say "ee"',                       tip_de: 'Lippen für "u" runden, "i" sagen',       color: 'var(--accent-blue)' },
  { letter: 'ß', phonetic: 'ss (sharp)',    example: 'Straße', translation: 'street', tip_en: 'Sharp "ss" — the Eszett. Never at start of word.',       tip_de: 'Scharfes "ss" — das Eszett.',            color: 'var(--accent-green)' },
]

const digraphs = [
  { combo: 'CH',  sound: 'ch / k',  example: 'Buch / Chaos', note_en: 'After a,o,u = guttural. After i,e = soft "h"',    note_de: 'Nach a,o,u = guttural; nach i,e = weiches "h"' },
  { combo: 'SCH', sound: 'sh',      example: 'Schule',       note_en: 'Always "sh" like in "shoe"',                       note_de: 'Immer "sch" wie in "Schuh"' },
  { combo: 'ST',  sound: 'sht',     example: 'Stein',        note_en: 'At start = "sht", middle = normal "st"',           note_de: 'Am Anfang = "scht"' },
  { combo: 'EI',  sound: 'eye',     example: 'Wein',         note_en: 'Like English "I" or "eye"',                        note_de: 'Wie englisches "eye"' },
  { combo: 'IE',  sound: 'ee',      example: 'Tier',         note_en: 'Long "ee" sound',                                  note_de: 'Langes "i"-Laut' },
  { combo: 'EU',  sound: 'oy',      example: 'Feuer',        note_en: 'Like "oy" in "boy"',                               note_de: 'Wie "eu" in "Feuer"' },
  { combo: 'AU',  sound: 'ow',      example: 'Haus',         note_en: 'Like "ow" in "how"',                               note_de: 'Wie "au" in "Haus"' },
  { combo: 'ÄU',  sound: 'oy',      example: 'Häuser',       note_en: 'Same as EU — "oy" sound',                          note_de: 'Gleich wie EU' },
]

export default function AlphabetPage() {
  const { t, lang } = useApp()
  const [flipped, setFlipped] = useState<Set<number>>(new Set())

  const toggleFlip = (i: number) => {
    setFlipped(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i); else next.add(i)
      return next
    })
  }

  const proTips = [
    { icon: '🎯', titleKey: 'tip1_title', descKey: 'tip1_desc' },
    { icon: '🗣️', titleKey: 'tip2_title', descKey: 'tip2_desc' },
    { icon: '💪', titleKey: 'tip3_title', descKey: 'tip3_desc' },
    { icon: '🔑', titleKey: 'tip4_title', descKey: 'tip4_desc' },
  ]

  return (
    <div className="page-wrapper">

      {/* ─── HEADER ─── */}
      <section style={{ padding: '5rem 2rem 3rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, var(--bg-void), var(--bg-deep))' }}>
        <div className="orb orb-gold" style={{ width: 400, height: 400, top: '-20%', left: '-10%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '1rem' }}>{t('alph_badge')}</span>
          <h1 style={{ marginBottom: '1rem' }}>{t('alph_h1a')} <span className="gradient-text">{t('alph_h1b')}</span></h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto', fontSize: '1.1rem', lineHeight: 1.7 }}>{t('alph_sub')}</p>
        </div>
      </section>

      {/* ─── ALPHABET GRID ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('alph_26_h2')} <span className="gradient-text">{t('alph_26_h2b')}</span></h2>
            <p>{t('alph_26_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1rem' }}>
            {alphabet.map((item, i) => (
              <div key={i} className="flip-card" style={{ height: 160 }} onClick={() => toggleFlip(i)}>
                <div className="flip-card-inner" style={{ transform: flipped.has(i) ? 'rotateY(180deg)' : '' }}>
                  <div className="flip-card-front glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--accent-gold)', lineHeight: 1 }}>{item.letter}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>/{item.phonetic}/</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{item.example}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.translation}</div>
                    <div style={{ marginTop: '0.3rem', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{t('alph_flip')}</div>
                  </div>
                  <div className="flip-card-back" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(245,200,66,0.12), rgba(232,57,74,0.08))', border: '1px solid rgba(245,200,66,0.2)', borderRadius: '20px', textAlign: 'center', gap: '0.5rem' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{item.letter}</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{lang === 'de' ? item.tip_de : item.tip_en}</p>
                    <div style={{ marginTop: '0.25rem', fontWeight: 600, fontSize: '0.82rem' }}>{item.example}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPECIAL CHARACTERS ─── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-deep)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem', color: 'var(--accent-red)', borderColor: 'rgba(232,57,74,0.3)', background: 'rgba(232,57,74,0.08)' }}>{t('alph_special_badge')}</span>
            <h2>{t('alph_special_h2')} <span className="gradient-text">{t('alph_special_h2b')}</span></h2>
            <p>{t('alph_special_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {specials.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '20px', background: `${s.color}15`, border: `2px solid ${s.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: s.color }}>{s.letter}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>/{s.phonetic}/</div>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}><span style={{ color: s.color }}>{s.example}</span> — {s.translation}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>{lang === 'de' ? s.tip_de : s.tip_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIGRAPHS ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem' }}>{t('alph_dig_badge')}</span>
            <h2>{t('alph_dig_h2')} <span className="gradient-text-blue">{t('alph_dig_h2b')}</span></h2>
            <p>{t('alph_dig_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {digraphs.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '14px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--accent-gold)', background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.15)', borderRadius: '10px', padding: '0.5rem 0.8rem', flexShrink: 0, minWidth: 60, textAlign: 'center' }}>{d.combo}</div>
                <div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', marginBottom: '0.3rem' }}>→ /{d.sound}/</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{d.example}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{lang === 'de' ? d.note_de : d.note_en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRO TIPS ─── */}
      <section style={{ padding: '4rem 2rem', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('alph_tips_h2')} <span className="gradient-text">{t('alph_tips_h2b')}</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {proTips.map((tip, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{tip.icon}</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--accent-gold)' }}>{t(tip.titleKey)}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t(tip.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
