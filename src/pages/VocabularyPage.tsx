import { useState } from 'react'
import { useApp } from '../context/AppContext'

const categories = [
  {
    id: 'food', name_de: 'Essen & Trinken', name_en: 'Food & Drink', icon: '🍺', color: 'var(--accent-gold)',
    words: [
      { de: 'das Brot', en: 'bread', example_de: 'Ich esse Brot zum Frühstück.', example_en: 'I eat bread for breakfast.' },
      { de: 'das Wasser', en: 'water', example_de: 'Ich trinke Wasser.', example_en: 'I drink water.' },
      { de: 'der Käse', en: 'cheese', example_de: 'Der Käse ist lecker.', example_en: 'The cheese is delicious.' },
      { de: 'das Fleisch', en: 'meat', example_de: 'Das Fleisch ist teuer.', example_en: 'The meat is expensive.' },
      { de: 'das Gemüse', en: 'vegetables', example_de: 'Gemüse ist gesund.', example_en: 'Vegetables are healthy.' },
      { de: 'der Kaffee', en: 'coffee', example_de: 'Morgens trinke ich Kaffee.', example_en: 'I drink coffee in the morning.' },
      { de: 'das Bier', en: 'beer', example_de: 'Deutsches Bier ist weltbekannt.', example_en: 'German beer is world-famous.' },
      { de: 'der Kuchen', en: 'cake', example_de: 'Der Kuchen schmeckt süß.', example_en: 'The cake tastes sweet.' },
      { de: 'das Frühstück', en: 'breakfast', example_de: 'Das Frühstück ist fertig.', example_en: 'Breakfast is ready.' },
      { de: 'das Abendessen', en: 'dinner', example_de: 'Was gibt es zum Abendessen?', example_en: 'What is for dinner?' },
      { de: 'der Wein', en: 'wine', example_de: 'Ein Glas Wein, bitte.', example_en: 'A glass of wine, please.' },
      { de: 'die Suppe', en: 'soup', example_de: 'Die Suppe ist heiß.', example_en: 'The soup is hot.' },
    ]
  },
  {
    id: 'travel', name_de: 'Reise & Verkehr', name_en: 'Travel & Transport', icon: '✈️', color: 'var(--accent-blue)',
    words: [
      { de: 'der Bahnhof', en: 'train station', example_de: 'Der Zug fährt vom Bahnhof ab.', example_en: 'The train departs from the station.' },
      { de: 'das Flugzeug', en: 'airplane', example_de: 'Das Flugzeug landet in Berlin.', example_en: 'The plane lands in Berlin.' },
      { de: 'die Stadt', en: 'city', example_de: 'Berlin ist eine große Stadt.', example_en: 'Berlin is a large city.' },
      { de: 'der Pass', en: 'passport', example_de: 'Ich brauche meinen Pass.', example_en: 'I need my passport.' },
      { de: 'das Hotel', en: 'hotel', example_de: 'Das Hotel ist sehr schön.', example_en: 'The hotel is very beautiful.' },
      { de: 'die Straße', en: 'street', example_de: 'Die Straße ist lang.', example_en: 'The street is long.' },
      { de: 'der Zug', en: 'train', example_de: 'Der Zug kommt pünktlich.', example_en: 'The train arrives on time.' },
      { de: 'die U-Bahn', en: 'subway', example_de: 'Wir fahren mit der U-Bahn.', example_en: 'We take the subway.' },
      { de: 'das Ticket', en: 'ticket', example_de: 'Ich kaufe ein Ticket.', example_en: 'I buy a ticket.' },
      { de: 'der Koffer', en: 'suitcase', example_de: 'Mein Koffer ist schwer.', example_en: 'My suitcase is heavy.' },
      { de: 'die Karte', en: 'map / card', example_de: 'Wo ist die Karte?', example_en: 'Where is the map?' },
      { de: 'der Flughafen', en: 'airport', example_de: 'Der Flughafen ist weit.', example_en: 'The airport is far away.' },
    ]
  },
  {
    id: 'emotions', name_de: 'Gefühle', name_en: 'Emotions & Feelings', icon: '💫', color: 'var(--accent-purple)',
    words: [
      { de: 'glücklich', en: 'happy', example_de: 'Ich bin glücklich.', example_en: 'I am happy.' },
      { de: 'traurig', en: 'sad', example_de: 'Warum bist du so traurig?', example_en: 'Why are you so sad?' },
      { de: 'müde', en: 'tired', example_de: 'Ich bin sehr müde.', example_en: 'I am very tired.' },
      { de: 'aufgeregt', en: 'excited', example_de: 'Die Kinder sind aufgeregt.', example_en: 'The children are excited.' },
      { de: 'verliebt', en: 'in love', example_de: 'Er ist verliebt.', example_en: 'He is in love.' },
      { de: 'wütend', en: 'angry', example_de: 'Sie ist sehr wütend.', example_en: 'She is very angry.' },
      { de: 'überrascht', en: 'surprised', example_de: 'Ich bin überrascht.', example_en: 'I am surprised.' },
      { de: 'stolz', en: 'proud', example_de: 'Ich bin stolz auf dich.', example_en: 'I am proud of you.' },
      { de: 'neugierig', en: 'curious', example_de: 'Das Kind ist neugierig.', example_en: 'The child is curious.' },
      { de: 'dankbar', en: 'grateful', example_de: 'Ich bin sehr dankbar.', example_en: 'I am very grateful.' },
      { de: 'ängstlich', en: 'anxious', example_de: 'Ich bin ängstlich.', example_en: 'I am anxious.' },
      { de: 'zufrieden', en: 'content', example_de: 'Ich bin zufrieden.', example_en: 'I am content.' },
    ]
  },
  {
    id: 'home', name_de: 'Zuhause', name_en: 'At Home', icon: '🏠', color: 'var(--accent-green)',
    words: [
      { de: 'das Zimmer', en: 'room', example_de: 'Das Zimmer ist groß.', example_en: 'The room is big.' },
      { de: 'die Küche', en: 'kitchen', example_de: 'Die Küche ist modern.', example_en: 'The kitchen is modern.' },
      { de: 'das Schlafzimmer', en: 'bedroom', example_de: 'Das Schlafzimmer ist oben.', example_en: 'The bedroom is upstairs.' },
      { de: 'das Bad', en: 'bathroom', example_de: 'Das Bad ist klein.', example_en: 'The bathroom is small.' },
      { de: 'der Tisch', en: 'table', example_de: 'Der Tisch ist aus Holz.', example_en: 'The table is made of wood.' },
      { de: 'das Fenster', en: 'window', example_de: 'Das Fenster ist offen.', example_en: 'The window is open.' },
      { de: 'die Tür', en: 'door', example_de: 'Schließ die Tür!', example_en: 'Close the door!' },
      { de: 'das Bett', en: 'bed', example_de: 'Das Bett ist bequem.', example_en: 'The bed is comfortable.' },
      { de: 'der Stuhl', en: 'chair', example_de: 'Der Stuhl ist kaputt.', example_en: 'The chair is broken.' },
      { de: 'das Regal', en: 'shelf', example_de: 'Das Regal ist voll.', example_en: 'The shelf is full.' },
      { de: 'die Lampe', en: 'lamp', example_de: 'Die Lampe ist schön.', example_en: 'The lamp is beautiful.' },
      { de: 'der Schrank', en: 'wardrobe', example_de: 'Im Schrank hängen Kleider.', example_en: 'Clothes hang in the wardrobe.' },
    ]
  },
  {
    id: 'numbers', name_de: 'Zahlen', name_en: 'Numbers', icon: '🔢', color: 'var(--accent-red)',
    words: [
      { de: 'null', en: 'zero', example_de: 'Null Uhr — Mitternacht.', example_en: 'Zero hours — Midnight.' },
      { de: 'eins', en: 'one', example_de: 'Ich habe einen Bruder.', example_en: 'I have one brother.' },
      { de: 'zwei', en: 'two', example_de: 'Zwei Bier, bitte!', example_en: 'Two beers, please!' },
      { de: 'drei', en: 'three', example_de: 'Drei Tage Urlaub.', example_en: 'Three days off.' },
      { de: 'vier', en: 'four', example_de: 'Vier Jahreszeiten.', example_en: 'Four seasons.' },
      { de: 'fünf', en: 'five', example_de: 'Fünf Minuten warten.', example_en: 'Wait five minutes.' },
      { de: 'zehn', en: 'ten', example_de: 'Zehn Euro kosten.', example_en: 'Ten euros cost.' },
      { de: 'zwanzig', en: 'twenty', example_de: 'Zwanzig Leute kamen.', example_en: 'Twenty people came.' },
      { de: 'hundert', en: 'hundred', example_de: 'Hundert Prozent sicher.', example_en: 'One hundred percent sure.' },
      { de: 'tausend', en: 'thousand', example_de: 'Tausend Dank!', example_en: 'A thousand thanks!' },
      { de: 'eine Million', en: 'one million', example_de: 'Eine Million Euro.', example_en: 'One million euros.' },
      { de: 'erste/r/s', en: 'first', example_de: 'Der erste Platz.', example_en: 'First place.' },
    ]
  },
]

const essentialPhrases = [
  { de: 'Guten Morgen!', en: 'Good morning!', usage_en: 'Until ~10am', usage_de: 'Bis ca. 10 Uhr' },
  { de: 'Guten Tag!', en: 'Good day!', usage_en: 'Formal afternoon greeting', usage_de: 'Formeller Nachmittagsgruß' },
  { de: 'Guten Abend!', en: 'Good evening!', usage_en: 'From ~6pm', usage_de: 'Ab ca. 18 Uhr' },
  { de: 'Wie geht es Ihnen?', en: 'How are you? (formal)', usage_en: 'Professional settings', usage_de: 'Im professionellen Umfeld' },
  { de: 'Wie geht\'s?', en: 'How\'s it going? (informal)', usage_en: 'With friends', usage_de: 'Mit Freunden' },
  { de: 'Entschuldigung', en: 'Excuse me / Sorry', usage_en: 'Getting attention or apologizing', usage_de: 'Aufmerksamkeit erregen oder entschuldigen' },
  { de: 'Bitte', en: 'Please / You\'re welcome', usage_en: 'Requesting or responding to thanks', usage_de: 'Bitten oder auf Dankbarkeit antworten' },
  { de: 'Danke schön!', en: 'Thank you very much!', usage_en: 'Expressing gratitude', usage_de: 'Dankbarkeit ausdrücken' },
  { de: 'Sprechen Sie Englisch?', en: 'Do you speak English?', usage_en: 'When you need help', usage_de: 'Wenn du Hilfe brauchst' },
  { de: 'Ich verstehe nicht.', en: 'I don\'t understand.', usage_en: 'When confused', usage_de: 'Wenn du verwirrt bist' },
  { de: 'Können Sie das wiederholen?', en: 'Can you repeat that?', usage_en: 'Asking for repetition', usage_de: 'Wiederholung bitten' },
  { de: 'Auf Wiedersehen!', en: 'Goodbye!', usage_en: 'Formal farewell', usage_de: 'Formeller Abschied' },
]

const compounds = [
  { word: 'Handschuh',    parts: ['Hand', 'Schuh'],   meanings_en: ['hand', 'shoe'],      result_en: 'Glove',        note_en: 'Literally: "hand-shoe"',           note_de: 'Wörtlich: "Handschuh"' },
  { word: 'Kühlschrank',  parts: ['Kühl', 'Schrank'],  meanings_en: ['cool', 'cabinet'],   result_en: 'Refrigerator', note_en: 'Literally: "cooling cabinet"',      note_de: 'Wörtlich: "Kühlschrank"' },
  { word: 'Fingerhut',    parts: ['Finger', 'Hut'],    meanings_en: ['finger', 'hat'],     result_en: 'Thimble',      note_en: 'Literally: "finger hat"',          note_de: 'Wörtlich: "Fingerhut"' },
  { word: 'Stinktier',    parts: ['Stink', 'Tier'],    meanings_en: ['stink', 'animal'],   result_en: 'Skunk',        note_en: 'Literally: "stink animal"',        note_de: 'Wörtlich: "Stinktier"' },
  { word: 'Meisterwerk',  parts: ['Meister', 'Werk'],  meanings_en: ['master', 'work'],    result_en: 'Masterpiece',  note_en: 'Also used in English!',            note_de: 'Auch im Englischen bekannt!' },
  { word: 'Zahnpasta',    parts: ['Zahn', 'Pasta'],    meanings_en: ['tooth', 'paste'],    result_en: 'Toothpaste',   note_en: 'Literally: "tooth paste"',         note_de: 'Wörtlich: "Zahnpasta"' },
]

export default function VocabularyPage() {
  const { t, lang } = useApp()
  const [activeCat, setActiveCat] = useState('food')
  const [revealed, setRevealed] = useState<Set<string>>(new Set())

  const cat = categories.find(c => c.id === activeCat)!

  const toggleReveal = (key: string) => {
    setRevealed(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key); else next.add(key)
      return next
    })
  }

  return (
    <div className="page-wrapper">

      {/* ─── HEADER ─── */}
      <section style={{ padding: '5rem 2rem 3rem', background: 'linear-gradient(135deg, var(--bg-void), var(--bg-deep))', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 350, height: 350, bottom: '-20%', right: '-5%', background: 'var(--accent-green)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.15, position: 'absolute' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge" style={{ marginBottom: '1rem', color: 'var(--accent-green)', borderColor: 'rgba(62,207,142,0.3)', background: 'rgba(62,207,142,0.08)' }}>{t('vocab_badge')}</span>
          <h1>{t('vocab_h1a')} <span style={{ background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('vocab_h1b')}</span></h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560, margin: '1rem auto', fontSize: '1.1rem', lineHeight: 1.7 }}>{t('vocab_sub')}</p>
        </div>
      </section>

      {/* ─── CATEGORY TABS ─── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            {categories.map(c => (
              <button key={c.id} onClick={() => { setActiveCat(c.id); setRevealed(new Set()) }} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.7rem 1.4rem',
                border: `2px solid ${activeCat === c.id ? c.color : 'var(--border-subtle)'}`,
                background: activeCat === c.id ? `${c.color}12` : 'transparent',
                color: activeCat === c.id ? c.color : 'var(--text-secondary)',
                borderRadius: '50px', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem',
                transition: 'all 0.25s',
              }}>
                <span>{c.icon}</span>
                <span>{lang === 'de' ? c.name_de : c.name_en}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {cat.words.map((w, i) => {
              const key = `${activeCat}-${i}`
              const isRevealed = revealed.has(key)
              return (
                <div key={i} onClick={() => toggleReveal(key)} style={{
                  padding: '1.5rem',
                  background: isRevealed ? `${cat.color}08` : 'var(--bg-card)',
                  border: `1px solid ${isRevealed ? cat.color + '30' : 'var(--border-subtle)'}`,
                  borderRadius: '16px', cursor: 'pointer',
                  transition: 'all 0.25s ease', position: 'relative', overflow: 'hidden',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  {isRevealed && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: cat.color }} />}
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: isRevealed ? cat.color : 'var(--text-primary)', marginBottom: '0.3rem' }}>{w.de}</div>
                  <div style={{ fontWeight: 500, color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: isRevealed ? '0.75rem' : 0 }}>{w.en}</div>
                  {isRevealed && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6, borderTop: `1px solid ${cat.color}20`, paddingTop: '0.6rem' }}>
                      <em>"{lang === 'de' ? w.example_de : w.example_en}"</em>
                    </div>
                  )}
                  {!isRevealed && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontFamily: 'var(--font-mono)' }}>{t('vocab_tap')}</div>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── ESSENTIAL PHRASES ─── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-deep)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="badge" style={{ marginBottom: '1rem' }}>{t('vocab_phrase_badge')}</span>
            <h2>{t('vocab_phrase_h2')} <span className="gradient-text">{t('vocab_phrase_h2b')}</span></h2>
            <p>{t('vocab_phrase_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {essentialPhrases.map((p, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(245,200,66,0.1)', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '0.2rem' }}>{p.de}</div>
                  <div style={{ fontWeight: 500, fontSize: '0.88rem', marginBottom: '0.2rem' }}>{p.en}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>⚡ {lang === 'de' ? p.usage_de : p.usage_en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPOUND WORDS ─── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>{t('vocab_compound_h2')} <span className="gradient-text-blue">{t('vocab_compound_h2b')}</span></h2>
            <p>{t('vocab_compound_sub')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {compounds.map((w, i) => (
              <div key={i} className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>{w.word}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
                  {w.parts.map((part, j) => (
                    <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ padding: '0.3rem 0.7rem', background: j === 0 ? 'rgba(245,200,66,0.12)' : 'rgba(79,142,247,0.12)', border: `1px solid ${j === 0 ? 'rgba(245,200,66,0.25)' : 'rgba(79,142,247,0.25)'}`, borderRadius: '8px', fontWeight: 600, fontSize: '0.88rem', color: j === 0 ? 'var(--accent-gold)' : 'var(--accent-blue)' }}>{part}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({w.meanings_en[j]})</span>
                      {j < w.parts.length - 1 && <span style={{ color: 'var(--text-muted)' }}>+</span>}
                    </span>
                  ))}
                  <span style={{ color: 'var(--text-muted)' }}>= <strong style={{ color: 'var(--accent-green)' }}>{w.result_en}</strong></span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>💡 {lang === 'de' ? w.note_de : w.note_en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
