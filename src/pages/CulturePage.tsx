import { useState } from 'react'
import { useApp } from '../context/AppContext'

const untranslatables = [
  { word: 'Sehnsucht',         phonetic: 'ZAYN-zukht',               definition_en: 'A profound longing or yearning for something indefinable — often for places or times that may not even exist.',           definition_de: 'Eine tiefe, unerklärliche Sehnsucht nach Orten oder Zeiten, die vielleicht nicht einmal existieren.',    category: 'Emotion', color: 'var(--accent-purple)' },
  { word: 'Verschlimmbessern', phonetic: 'fer-SHLIMM-bessern',        definition_en: 'The act of making something worse while attempting to improve it. Every well-meaning botched repair.',                    definition_de: 'Etwas schlechter machen beim Versuch, es zu verbessern.',                                                   category: 'Action',  color: 'var(--accent-red)'    },
  { word: 'Waldeinsamkeit',    phonetic: 'VALD-EYN-zam-kite',         definition_en: 'The feeling of solitude and connectedness to nature while alone in a forest. Peaceful, not lonely.',                     definition_de: 'Das friedliche Gefühl von Einsamkeit und Verbundenheit mit der Natur im Wald.',                           category: 'Nature',  color: 'var(--accent-green)'  },
  { word: 'Fingerspitzengefühl', phonetic: 'FING-er-SHPITTS-en-geh-fühl', definition_en: 'Fingertip feeling — an intuitive sensitivity or delicate touch when handling a situation.',                     definition_de: 'Fingerspitzengefühl — intuitive Feinfühligkeit im Umgang mit Situationen.',                               category: 'Skill',   color: 'var(--accent-blue)'   },
  { word: 'Weltschmerz',       phonetic: 'VELT-shmerts',              definition_en: 'World-pain: the sadness felt when the reality of the world falls far short of what it could or should be.',              definition_de: 'Weltschmerz: Trauer, wenn die Realität weit hinter dem zurückbleibt, was die Welt sein könnte.',          category: 'Emotion', color: 'var(--accent-gold)'   },
  { word: 'Torschlusspanik',   phonetic: 'TOR-shluss-PAH-nik',        definition_en: 'Gate-closing panic: the anxiety that time is running out, that life\'s doors are closing before you enter.',             definition_de: 'Tor-Schluss-Panik: Die Angst, dass die Zeit ausläuft und Türen sich schließen.',                         category: 'Emotion', color: 'var(--accent-orange)' },
]

const idioms = [
  { idiom: 'Ich verstehe nur Bahnhof',           literal_en: 'I only understand train station',            literal_de: 'Ich verstehe nur Bahnhof',       meaning_en: "I have no idea what you're talking about",  meaning_de: 'Ich habe keine Ahnung, wovon du redest',           usage_en: 'When something makes zero sense to you.',       usage_de: 'Wenn etwas absolut keinen Sinn ergibt.' },
  { idiom: 'Tomaten auf den Augen haben',        literal_en: 'To have tomatoes on your eyes',              literal_de: 'Tomaten auf den Augen haben',    meaning_en: "To be oblivious to something obvious",      meaning_de: 'Etwas Offensichtliches nicht sehen',               usage_en: 'When someone clearly misses the obvious.',     usage_de: 'Wenn jemand das Offensichtliche übersieht.' },
  { idiom: 'Nicht alle Tassen im Schrank haben', literal_en: 'Not to have all cups in the cupboard',       literal_de: 'Nicht alle Tassen im Schrank',   meaning_en: "To be a bit crazy",                          meaning_de: 'Ein bisschen verrückt sein',                        usage_en: 'A friendly way to call someone eccentric.',    usage_de: 'Eine freundliche Art, jemanden als exzentrisch zu bezeichnen.' },
  { idiom: 'Da steppt der Bär',                  literal_en: 'There the bear is doing the step dance',     literal_de: 'Da steppt der Bär',              meaning_en: "The party is going to be amazing",          meaning_de: 'Die Party wird legendär',                           usage_en: 'Hyping up an upcoming event.',                  usage_de: 'Um eine bevorstehende Veranstaltung zu begeistern.' },
  { idiom: 'Jetzt geht\'s um die Wurst',         literal_en: 'Now it\'s about the sausage',                literal_de: 'Jetzt geht\'s um die Wurst',     meaning_en: 'It\'s the moment of truth',                  meaning_de: 'Jetzt kommt es darauf an',                         usage_en: 'High-stakes situations.',                      usage_de: 'Wenn der Einsatz hoch ist.' },
  { idiom: 'Das ist mir Wurst',                  literal_en: 'That is sausage to me',                      literal_de: 'Das ist mir Wurst',              meaning_en: 'I don\'t care / It\'s all the same to me',   meaning_de: 'Das ist mir egal',                                  usage_en: 'Expressing total indifference.',                usage_de: 'Völlige Gleichgültigkeit ausdrücken.' },
  { idiom: 'Zwei Fliegen mit einer Klappe',       literal_en: 'Hit two flies with one swatter',             literal_de: 'Zwei Fliegen mit einer Klappe',  meaning_en: 'Kill two birds with one stone',              meaning_de: 'Zwei Dinge auf einmal erledigen',                   usage_en: 'Accomplishing two goals at once.',             usage_de: 'Zwei Ziele auf einmal erreichen.' },
  { idiom: 'Auf den Busch klopfen',              literal_en: 'To knock on the bush',                       literal_de: 'Auf den Busch klopfen',          meaning_en: 'To fish for information subtly',             meaning_de: 'Vorsichtig nach Informationen suchen',              usage_en: 'When carefully probing for a reaction.',      usage_de: 'Wenn man vorsichtig eine Reaktion erkundet.' },
]

const traditions = [
  { name: 'Oktoberfest',        icon: '🍺', period: 'Sept–Oct',  city_en: 'Munich',              city_de: 'München',        desc_en: 'The world\'s largest folk festival. 6 million visitors, 8 million liters of beer.',     desc_de: 'Das weltgrößte Volksfest. 6 Millionen Besucher, 8 Millionen Liter Bier.' },
  { name: 'Karneval',           icon: '🎭', period: 'Jan–Feb',   city_en: 'Cologne & Mainz',     city_de: 'Köln & Mainz',   desc_en: 'Germany\'s wildest festival with costumes, parades, and "Rosenmontag".',                desc_de: 'Deutschlands wildestes Fest mit Kostümen, Umzügen und dem Rosenmontagszug.' },
  { name: 'Weihnachtsmarkt',    icon: '🎄', period: 'December',  city_en: 'Nationwide',          city_de: 'Bundesweit',     desc_en: 'Christmas markets since the 1300s. Glühwein, gingerbread, and wooden ornaments.',       desc_de: 'Weihnachtsmärkte seit dem 14. Jh. Glühwein, Lebkuchen und Holzdekoration.' },
  { name: 'Tag der Dt. Einheit',icon: '🇩🇪',period: 'Oct 3',    city_en: 'Berlin',              city_de: 'Berlin',         desc_en: 'Reunification Day — commemorates Germany\'s reunification in 1990.',                   desc_de: 'Der Tag der Deutschen Einheit am 3. Oktober 1990.' },
]

const famousGermans = [
  { name: 'Johann Wolfgang von Goethe', field: 'Literature', contribution: 'Faust, The Sorrows of Young Werther', years: '1749–1832', icon: '✍️' },
  { name: 'Ludwig van Beethoven',       field: 'Music',      contribution: '9 Symphonies, Für Elise',            years: '1770–1827', icon: '🎵' },
  { name: 'Albert Einstein',            field: 'Physics',    contribution: 'Theory of Relativity, E=mc²',        years: '1879–1955', icon: '⚛️' },
  { name: 'Immanuel Kant',              field: 'Philosophy', contribution: 'Critique of Pure Reason',            years: '1724–1804', icon: '🧠' },
  { name: 'Martin Luther',             field: 'Theology',   contribution: 'The Reformation, Bible translation',  years: '1483–1546', icon: '📖' },
  { name: 'Johann Sebastian Bach',      field: 'Music',      contribution: 'Mass in B minor, The Well-Tempered Clavier', years: '1685–1750', icon: '🎼' },
]

export default function CulturePage() {
  const { t, lang } = useApp()
  const [activeIdiom, setActiveIdiom] = useState<number | null>(null)

  return (
    <div className="page-wrapper">

      {/* ─── HEADER ─── */}
      <section style={{ padding: '5rem 2rem 3rem', background: 'linear-gradient(135deg, var(--bg-void), var(--bg-deep))', position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-red"  style={{ width: 500, height: 500, top: '-20%', left: '-10%' }} />
        <div className="orb orb-gold" style={{ width: 300, height: 300, bottom: '-10%', right: '5%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '1rem', color: 'var(--accent-red)', borderColor: 'rgba(232,57,74,0.3)', background: 'rgba(232,57,74,0.08)' }}>{t('cult_badge')}</span>
          <h1>{t('cult_h1a')} <span style={{ background: 'linear-gradient(135deg, var(--accent-red), var(--accent-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('cult_h1b')}</span></h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 580, margin: '1rem auto', fontSize: '1.1rem', lineHeight: 1.7 }}>{t('cult_sub')}</p>
        </div>
      </section>

      {/* ─── UNTRANSLATABLE WORDS ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem' }}>{t('cult_untr_badge')}</span>
            <h2>{t('cult_untr_h2')} <span className="gradient-text">{t('cult_untr_h2b')}</span></h2>
            <p>{t('cult_untr_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {untranslatables.map((w, i) => (
              <div key={i} className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, borderRadius: '0 20px 0 120px', background: `${w.color}08`, pointerEvents: 'none' }} />
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: w.color, textTransform: 'uppercase', letterSpacing: '0.1em', background: `${w.color}10`, padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{w.category}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.6rem', color: w.color, marginBottom: '0.3rem', fontWeight: 700 }}>{w.word}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>/{w.phonetic}/</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{lang === 'de' ? w.definition_de : w.definition_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── IDIOMS ─── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem', color: 'var(--accent-orange)', borderColor: 'rgba(255,124,58,0.3)', background: 'rgba(255,124,58,0.08)' }}>{t('cult_idiom_badge')}</span>
            <h2>{t('cult_idiom_h2')} <span className="gradient-text">{t('cult_idiom_h2b')}</span></h2>
            <p>{t('cult_idiom_sub')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 800, margin: '0 auto' }}>
            {idioms.map((idiom, i) => (
              <div key={i}
                onClick={() => setActiveIdiom(activeIdiom === i ? null : i)}
                style={{ padding: '1.25rem 1.5rem', background: activeIdiom === i ? 'rgba(255,124,58,0.06)' : 'var(--bg-card)', border: `1px solid ${activeIdiom === i ? 'rgba(255,124,58,0.25)' : 'var(--border-subtle)'}`, borderRadius: '14px', cursor: 'pointer', transition: 'all 0.25s ease' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.05rem', color: activeIdiom === i ? 'var(--accent-orange)' : 'var(--text-primary)', marginBottom: '0.2rem' }}>"{idiom.idiom}"</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      {lang === 'de' ? `Wörtlich: ${idiom.literal_de}` : `Literally: ${idiom.literal_en}`}
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem', transition: 'transform 0.3s', transform: activeIdiom === i ? 'rotate(180deg)' : '' }}>▾</div>
                </div>
                {activeIdiom === i && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,124,58,0.15)', animation: 'slide-up 0.3s ease' }}>
                    <div style={{ fontWeight: 600, color: 'var(--accent-orange)', marginBottom: '0.3rem' }}>{t('cult_idiom_means')} {lang === 'de' ? idiom.meaning_de : idiom.meaning_en}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t('cult_idiom_when')} {lang === 'de' ? idiom.usage_de : idiom.usage_en}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRADITIONS ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem' }}>{t('cult_trad_badge')}</span>
            <h2>{t('cult_trad_h2')} <span className="gradient-text">{t('cult_trad_h2b')}</span></h2>
            <p>{t('cult_trad_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {traditions.map((tr, i) => (
              <div key={i} className="glass-card" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{tr.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.3rem' }}>{tr.name}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  <span className="tag">{tr.period}</span>
                  <span className="tag">{lang === 'de' ? tr.city_de : tr.city_en}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{lang === 'de' ? tr.desc_de : tr.desc_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAMOUS FIGURES ─── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem', color: 'var(--accent-purple)', borderColor: 'rgba(155,89,245,0.3)', background: 'rgba(155,89,245,0.08)' }}>{t('cult_famous_badge')}</span>
            <h2>{t('cult_famous_h2')} <span style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('cult_famous_h2b')}</span></h2>
            <p>{t('cult_famous_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {famousGermans.map((p, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.75rem', display: 'flex', gap: '1.2rem', alignItems: 'flex-start' }}>
                <div style={{ width: 56, height: 56, borderRadius: '16px', flexShrink: 0, background: 'linear-gradient(135deg, rgba(155,89,245,0.2), rgba(79,142,247,0.15))', border: '1px solid rgba(155,89,245,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>{p.icon}</div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.2rem' }}>{p.name}</h4>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-purple)', background: 'rgba(155,89,245,0.1)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>{p.field}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.years}</span>
                  </div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{p.contribution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HUMOR ─── */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <span className="badge" style={{ marginBottom: '1.5rem' }}>{t('cult_humor_badge')}</span>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('cult_humor_h2')} <span className="gradient-text">{t('cult_humor_h2b')}</span></h2>
            <div style={{ padding: '2.5rem', background: 'linear-gradient(135deg, rgba(245,200,66,0.06), rgba(155,89,245,0.06))', border: '1px solid rgba(245,200,66,0.12)', borderRadius: '24px' }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{t('cult_humor_p')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { joke_en: '"A pessimist is an informed optimist."',                                               joke_de: '"Ein Pessimist ist ein informierter Optimist."',                       context_en: 'Classic German worldview',        context_de: 'Klassische deutsche Weltanschauung' },
                  { joke_en: '"Why did the German cross the road? Because it was permitted by the signal."',         joke_de: '"Warum überquerte der Deutsche die Straße? Weil die Ampel grün war."', context_en: 'Rule-following stereotype',       context_de: 'Regelfolge-Stereotyp' },
                  { joke_en: '"Time flies — unless you\'re German, then it arrives exactly on schedule."',           joke_de: '"Die Zeit vergeht — außer bei Deutschen, da kommt sie pünktlich."',    context_en: 'Pünktlichkeit (punctuality)',     context_de: 'Pünktlichkeit' },
                ].map((j, i) => (
                  <div key={i} style={{ padding: '1rem 1.25rem', background: 'var(--bg-card)', borderRadius: '12px', textAlign: 'left', borderLeft: '3px solid var(--accent-gold)' }}>
                    <p style={{ fontStyle: 'italic', marginBottom: '0.3rem' }}>{lang === 'de' ? j.joke_de : j.joke_en}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>— {lang === 'de' ? j.context_de : j.context_en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
