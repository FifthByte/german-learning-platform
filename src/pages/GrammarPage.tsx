import { useState } from 'react'
import { useApp } from '../context/AppContext'

const cases = [
  {
    name_en: 'Nominative', name_de: 'Nominativ',
    english: 'Nominative',
    role_en: 'The Subject',   role_de: 'Das Subjekt',
    desc_en: 'The person or thing performing the action.',
    desc_de: 'Die Person oder Sache, die die Handlung ausführt.',
    example: { de: 'Der Mann kauft ein Buch.', en: 'The man buys a book.', highlight: 'Der Mann' },
    color: 'var(--accent-gold)', icon: '👑',
    question_en: 'Who/What is doing the action?', question_de: 'Wer/Was führt die Handlung aus?',
    articles: { m: 'der', f: 'die', n: 'das', pl: 'die' },
  },
  {
    name_en: 'Accusative', name_de: 'Akkusativ',
    english: 'Accusative',
    role_en: 'The Direct Object',  role_de: 'Das Akkusativobjekt',
    desc_en: 'The thing being directly acted upon.',
    desc_de: 'Das Ding, auf das direkt eingewirkt wird.',
    example: { de: 'Der Mann kauft ein Buch.', en: 'The man buys a book.', highlight: 'ein Buch' },
    color: 'var(--accent-blue)', icon: '🎯',
    question_en: 'Who/What receives the action?', question_de: 'Wen/Was empfängt die Handlung?',
    articles: { m: 'den', f: 'die', n: 'das', pl: 'die' },
  },
  {
    name_en: 'Dative', name_de: 'Dativ',
    english: 'Dative',
    role_en: 'The Indirect Object', role_de: 'Das Dativobjekt',
    desc_en: 'The recipient or beneficiary of the action.',
    desc_de: 'Der Empfänger oder Begünstigte der Handlung.',
    example: { de: 'Ich gebe dem Mann das Buch.', en: 'I give the man the book.', highlight: 'dem Mann' },
    color: 'var(--accent-green)', icon: '🤝',
    question_en: 'To/For whom is the action done?', question_de: 'Wem/Für wen wird die Handlung ausgeführt?',
    articles: { m: 'dem', f: 'der', n: 'dem', pl: 'den' },
  },
  {
    name_en: 'Genitive', name_de: 'Genitiv',
    english: 'Genitive',
    role_en: 'Possession',  role_de: 'Besitz',
    desc_en: 'Shows ownership or relationship between nouns.',
    desc_de: 'Zeigt Besitz oder Beziehung zwischen Nomen.',
    example: { de: 'Das ist das Buch des Mannes.', en: "That is the man's book.", highlight: 'des Mannes' },
    color: 'var(--accent-purple)', icon: '🔑',
    question_en: "Whose? Of what?", question_de: "Wessen?",
    articles: { m: 'des', f: 'der', n: 'des', pl: 'der' },
  },
]

const verbs = [
  { infinitive: 'sein',   meaning_en: 'to be',       meaning_de: 'sein',      type: 'irregular', ich: 'bin',   du: 'bist', er: 'ist',   wir: 'sind',  ihr: 'seid', sie: 'sind'  },
  { infinitive: 'haben',  meaning_en: 'to have',      meaning_de: 'haben',     type: 'irregular', ich: 'habe',  du: 'hast', er: 'hat',   wir: 'haben', ihr: 'habt', sie: 'haben' },
  { infinitive: 'machen', meaning_en: 'to do/make',   meaning_de: 'machen',    type: 'regular',   ich: 'mache', du: 'machst', er: 'macht', wir: 'machen', ihr: 'macht', sie: 'machen' },
  { infinitive: 'gehen',  meaning_en: 'to go',        meaning_de: 'gehen',     type: 'irregular', ich: 'gehe',  du: 'gehst', er: 'geht',  wir: 'gehen', ihr: 'geht', sie: 'gehen'  },
]

const sentenceStructures = [
  { name_en: 'Main Clause',       name_de: 'Hauptsatz',      pattern: 'Subject → Verb → Object',         example: 'Ich lese ein Buch.',              translation: 'I read a book.',              note_en: 'Verb is always 2nd position.',             note_de: 'Verb steht immer an 2. Stelle.' },
  { name_en: 'Question',          name_de: 'Fragesatz',      pattern: 'Verb → Subject → Object?',        example: 'Liest du ein Buch?',              translation: 'Are you reading a book?',     note_en: 'Verb moves to first position.',            note_de: 'Verb rückt an erste Stelle.' },
  { name_en: 'Time-Manner-Place', name_de: 'Zeit-Art-Ort',   pattern: 'Wann → Wie → Wo',                 example: 'Ich fahre morgen schnell nach Berlin.', translation: 'I drive to Berlin tomorrow quickly.', note_en: 'TMP rule: Time before Manner before Place.', note_de: 'TMP-Regel: Zeit vor Art vor Ort.' },
  { name_en: 'Subordinate Clause',name_de: 'Nebensatz',      pattern: 'Konjunktion ... Verb am ENDE',     example: 'Ich weiß, dass er kommt.',        translation: 'I know that he is coming.',   note_en: 'In "dass" clauses, verb goes to the end!', note_de: 'In "dass"-Sätzen steht das Verb am Ende!' },
]

const genders = [
  { article: 'DER', gender_en: 'Masculine', gender_de: 'Maskulinum', color: 'var(--accent-blue)', examples: ['der Mann (man)', 'der Hund (dog)', 'der Tag (day)', 'der Stein (stone)'], patterns_en: ['-er endings', '-en endings', '-ling endings', 'Most seasons'], patterns_de: ['-er Endungen', '-en Endungen', '-ling Endungen', 'Die meisten Jahreszeiten'] },
  { article: 'DIE', gender_en: 'Feminine',  gender_de: 'Femininum',  color: 'var(--accent-red)',  examples: ['die Frau (woman)', 'die Katze (cat)', 'die Zeit (time)', 'die Stadt (city)'], patterns_en: ['-ung endings', '-heit endings', '-keit endings', '-tion endings'], patterns_de: ['-ung Endungen', '-heit Endungen', '-keit Endungen', '-tion Endungen'] },
  { article: 'DAS', gender_en: 'Neuter',    gender_de: 'Neutrum',    color: 'var(--accent-gold)', examples: ['das Kind (child)', 'das Haus (house)', 'das Buch (book)', 'das Auto (car)'], patterns_en: ['-chen diminutives', '-lein endings', 'Most verbs as nouns', '-ment endings'], patterns_de: ['-chen Verkleinerungen', '-lein Endungen', 'Meiste Verben als Nomen', '-ment Endungen'] },
]

export default function GrammarPage() {
  const { t, lang } = useApp()
  const [activeCase, setActiveCase] = useState(0)
  const [activeVerb, setActiveVerb] = useState(0)

  return (
    <div className="page-wrapper">

      {/* ─── HEADER ─── */}
      <section style={{ padding: '5rem 2rem 3rem', background: 'linear-gradient(135deg, var(--bg-void), var(--bg-deep))', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-blue" style={{ width: 450, height: 450, top: '-20%', right: '-10%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '1rem', color: 'var(--accent-blue)', borderColor: 'rgba(79,142,247,0.3)', background: 'rgba(79,142,247,0.08)' }}>{t('gram_badge')}</span>
          <h1>{t('gram_h1a')} <span className="gradient-text-blue">{t('gram_h1b')}</span></h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '1rem auto', fontSize: '1.1rem', lineHeight: 1.7 }}>{t('gram_sub')}</p>
        </div>
      </section>

      {/* ─── THE 4 CASES ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem' }}>{t('gram_cases_badge')}</span>
            <h2>{t('gram_cases_h2')} <span className="gradient-text">{t('gram_cases_h2b')}</span></h2>
            <p>{t('gram_cases_sub')}</p>
          </div>

          {/* Tab buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {cases.map((c, i) => (
              <button key={i} onClick={() => setActiveCase(i)} style={{
                padding: '0.65rem 1.4rem',
                border: `2px solid ${activeCase === i ? c.color : 'var(--border-subtle)'}`,
                background: activeCase === i ? `${c.color}15` : 'transparent',
                color: activeCase === i ? c.color : 'var(--text-secondary)',
                borderRadius: '12px', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem',
                transition: 'all 0.25s ease',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <span>{c.icon}</span> {lang === 'de' ? c.name_de : c.name_en}
              </button>
            ))}
          </div>

          {/* Active case detail */}
          {(() => {
            const c = cases[activeCase]
            return (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', animation: 'fade-in 0.4s ease' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>{c.icon}</span>
                    <div>
                      <h3 style={{ color: c.color, marginBottom: '0.2rem' }}>{lang === 'de' ? c.name_de : c.name_en}</h3>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{c.english} · {lang === 'de' ? c.role_de : c.role_en}</p>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', lineHeight: 1.7 }}>{lang === 'de' ? c.desc_de : c.desc_en}</p>
                  <div style={{ background: 'var(--bg-deep)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', borderLeft: `3px solid ${c.color}` }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.3rem', fontStyle: 'italic' }}>
                      {c.example.de.split(c.example.highlight).map((part, idx, arr) => (
                        idx < arr.length - 1
                          ? <span key={idx}>{part}<span style={{ color: c.color, fontWeight: 700 }}>{c.example.highlight}</span></span>
                          : <span key={idx}>{part}</span>
                      ))}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.example.en}</p>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: c.color, background: `${c.color}10`, padding: '0.6rem 0.9rem', borderRadius: '8px' }}>
                    ❓ {lang === 'de' ? c.question_de : c.question_en}
                  </div>
                </div>

                <div className="glass-card" style={{ padding: '2rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    {t('gram_art_title')} {lang === 'de' ? c.name_de : c.name_en}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                    {(['m', 'f', 'n', 'pl'] as const).map(gender => (
                      <div key={gender} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {gender === 'pl' ? (lang === 'de' ? 'Plural' : 'Plural') : gender === 'm' ? (lang === 'de' ? 'Mask.' : 'Masc.') : gender === 'f' ? (lang === 'de' ? 'Fem.' : 'Fem.') : (lang === 'de' ? 'Neut.' : 'Neut.')}
                        </div>
                        <div style={{ padding: '0.8rem', background: `${c.color}12`, border: `1px solid ${c.color}25`, borderRadius: '12px', fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: c.color }}>
                          {c.articles[gender]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-deep)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t('gram_art_note')}</p>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ─── VERB CONJUGATION ─── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-deep)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem', color: 'var(--accent-green)', borderColor: 'rgba(62,207,142,0.3)', background: 'rgba(62,207,142,0.08)' }}>{t('gram_verb_badge')}</span>
            <h2>{t('gram_verb_h2')} <span className="gradient-text">{t('gram_verb_h2b')}</span></h2>
            <p>{t('gram_verb_sub')}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {verbs.map((v, i) => (
              <button key={i} onClick={() => setActiveVerb(i)} style={{
                padding: '0.55rem 1.2rem',
                border: `1px solid ${activeVerb === i ? 'var(--accent-green)' : 'var(--border-subtle)'}`,
                background: activeVerb === i ? 'rgba(62,207,142,0.08)' : 'transparent',
                color: activeVerb === i ? 'var(--accent-green)' : 'var(--text-secondary)',
                borderRadius: '10px', cursor: 'pointer',
                fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem',
                transition: 'all 0.25s',
              }}>{v.infinitive}</button>
            ))}
          </div>
          {(() => {
            const v = verbs[activeVerb]
            const pronouns = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie']
            const forms = [v.ich, v.du, v.er, v.wir, v.ihr, v.sie]
            return (
              <div style={{ maxWidth: 600, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontStyle: 'italic', marginBottom: '0.3rem' }}>
                    <span className="gradient-text">{v.infinitive}</span>
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {lang === 'de' ? v.meaning_de : v.meaning_en} · <span style={{ color: v.type === 'irregular' ? 'var(--accent-red)' : 'var(--accent-green)' }}>{v.type}</span>
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {pronouns.map((p, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '12px', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(62,207,142,0.3)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{p}</span>
                      <span style={{ fontWeight: 700, color: 'var(--accent-green)', fontSize: '1rem' }}>{forms[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ─── SENTENCE STRUCTURE ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem' }}>{t('gram_sent_badge')}</span>
            <h2>{t('gram_sent_h2')} <span className="gradient-text-blue">{t('gram_sent_h2b')}</span></h2>
            <p>{t('gram_sent_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {sentenceStructures.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.75rem' }}>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>{lang === 'de' ? s.name_de : s.name_en}</h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem', padding: '0.4rem 0.7rem', background: 'var(--bg-deep)', borderRadius: '6px', display: 'inline-block' }}>{s.pattern}</div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', marginBottom: '0.2rem' }}>{s.example}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{s.translation}</p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  💡 {lang === 'de' ? s.note_de : s.note_en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NOUN GENDERS ─── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <h2>{t('gram_gen_h2')} <span className="gradient-text">{t('gram_gen_h2b')}</span></h2>
            <p>{t('gram_gen_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {genders.map((g, i) => (
              <div key={i} className="glass-card" style={{ padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: g.color }} />
                <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', fontWeight: 900, color: g.color, marginBottom: '0.3rem' }}>{g.article}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>{lang === 'de' ? g.gender_de : g.gender_en}</div>
                <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                  <h5 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>{lang === 'de' ? 'Beispiele' : 'Examples'}</h5>
                  {g.examples.map((ex, j) => (<div key={j} style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', padding: '0.3rem 0', borderBottom: '1px solid var(--border-subtle)' }}>{ex}</div>))}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h5 style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>{lang === 'de' ? 'Muster' : 'Patterns'}</h5>
                  {(lang === 'de' ? g.patterns_de : g.patterns_en).map((p, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '0.25rem 0' }}>
                      <span style={{ color: g.color }}>◆</span> {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
