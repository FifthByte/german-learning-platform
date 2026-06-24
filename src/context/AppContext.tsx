import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

// ─── TYPES ──────────────────────────────────────────────────────────────────
export type Theme = 'dark' | 'light'
export type Lang  = 'de' | 'en'

interface AppContextValue {
  theme: Theme
  lang:  Lang
  toggleTheme: () => void
  setLang: (l: Lang) => void
  t: (key: string) => string
}

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const translations: Record<Lang, Record<string, string>> = {
  de: {
    // Nav
    nav_home:        'Start',
    nav_alphabet:    'Alphabet',
    nav_grammar:     'Grammatik Atlas',
    nav_vocabulary:  'Vokabular',
    nav_culture:     'Kultur',
    nav_contact:     'Kontakt',
    nav_cta:         'Jetzt Starten →',

    // Footer
    footer_tagline:  'Eine moderne Expedition in die deutsche Sprache — wo Kultur, Grammatik und Vokabular zusammenkommen.',
    footer_explore:  'Erkunden',
    footer_levels:   'Niveaus',
    footer_copy:     '© 2025 DeutschWelt. Mit ❤️ für Deutschlernende gestaltet.',
    footer_bye:      'Auf Wiedersehen! 👋',

    // Home
    home_badge:       '🇩🇪 Deutsches Sprachenportfolio',
    home_h1_line1:    'Die Welt der',
    home_h1_line2:    'deutschen Sprache',
    home_subtitle:    'Kein gewöhnlicher Sprachkurs. Eine fesselnde Reise durch das Deutsche — seine Klänge, seine Logik, seine Kultur, seine Seele.',
    home_cta_primary: 'Die Expedition beginnen →',
    home_cta_sec:     'Kultur entdecken',
    home_quote:       '"Eine Sprache, ein Mensch. Zwei Sprachen, zwei Menschen."',
    home_stats_title: 'Was steckt drin',
    home_4worlds:     'Vier Welten zum',
    home_explore:     'Entdecken',
    home_4worlds_sub: 'Jeder Abschnitt ist ein einzigartiges Universum — gestaltet, um Deutsch lebendig wirken zu lassen, nicht wie Hausaufgaben.',
    home_wotd_badge:  '✨ Deutsches Wort des Tages',
    home_path_badge:  'Deine Reise',
    home_path_title:  'Der Lernpfad',
    home_path_sub:    'Folge der vorgeschlagenen Reihenfolge oder springe zu dem, was dich am meisten anspricht.',
    home_step1:       'Das Alphabet lernen',
    home_step1_desc:  'Klänge und Sonderzeichen',
    home_step2:       'Grammatik-Grundlagen',
    home_step2_desc:  'Kasus, Artikel und Satzstruktur',
    home_step3:       'Vokabular aufbauen',
    home_step3_desc:  'Themenbezogene Wortsammlungen',
    home_step4:       'In die Kultur eintauchen',
    home_step4_desc:  'Redewendungen, Humor und Traditionen',
    home_cta_h2:      'Bereit?',
    home_cta_h2b:     'Los geht\'s!',
    home_cta_p:       'Starte heute deine Expedition ins Deutsche — kein Lehrbuch erforderlich.',
    home_cta_btn:     'Mit dem Alphabet starten →',

    // Alphabet
    alph_badge:       '🔤 Modul 01',
    alph_h1a:         'Alphabet &',
    alph_h1b:         'Klänge',
    alph_sub:         'Deutsch verwendet dieselben 26 Buchstaben wie Englisch — plus 4 Sonderzeichen. Klicke auf eine Karte, um sie umzudrehen.',
    alph_26_h2:       'Die 26',
    alph_26_h2b:      'Buchstaben',
    alph_26_sub:      'Hover zum Vorschauen, klicken um den vollen Tipp zu sehen.',
    alph_flip:        'zum Umdrehen klicken',
    alph_special_badge: 'Einzigartig im Deutschen',
    alph_special_h2:  'Sonder-',
    alph_special_h2b: 'zeichen',
    alph_special_sub: 'Diese 4 Zeichen machen Deutsch einzigartig schön — und manchmal knifflig.',
    alph_dig_badge:   'Buchstaben-Kombinationen',
    alph_dig_h2:      'Besondere',
    alph_dig_h2b:     'Digraphen',
    alph_dig_sub:     'Wenn zwei Buchstaben verschmelzen, um einen völlig neuen Laut zu erzeugen.',
    alph_tips_h2:     'Aussprache',
    alph_tips_h2b:    'Profi-Tipps',
    tip1_title:       'Deutsch ist phonetisch',
    tip1_desc:        'Jeder Buchstabe wird konsequent ausgesprochen. Keine stillen Buchstaben wie im Englischen oder Französischen.',
    tip2_title:       'Das gutturale R',
    tip2_desc:        'Das R wird von hinten der Kehle gerollt, nicht mit der Zungenspitze.',
    tip3_title:       'Erste Silbe betonen',
    tip3_desc:        'Bei den meisten deutschen Wörtern liegt die Betonung auf der ersten Silbe. SONne, nicht soNNE.',
    tip4_title:       'W = V-Laut',
    tip4_desc:        'Deutsches W klingt wie englisches V. Wasser = "VAHsser". Braucht Übung!',

    // Grammar
    gram_badge:       '🗺️ Modul 02',
    gram_h1a:         'Grammatik',
    gram_h1b:         'Atlas',
    gram_sub:         'Deutsche Grammatik ist eine Landschaft, kein Regelbuch. Navigiere durch die 4 Kasus, Verben und Satzstruktur mit visuellen Führern.',
    gram_cases_badge: 'Die Kernherausforderung',
    gram_cases_h2:    'Die 4',
    gram_cases_h2b:   'Kasus',
    gram_cases_sub:   'Deutsche Artikel ändern sich je nach der Rolle des Substantivs. Klicke auf jeden Kasus.',
    gram_art_title:   'Bestimmte Artikel im',
    gram_art_note:    '💡 Diese Artikel (der/die/das-Wörter) ändern ihre Form je nach dem grammatikalischen Kasus des Substantivs.',
    gram_verb_badge:  'Verben',
    gram_verb_h2:     'Verb-',
    gram_verb_h2b:    'konjugation',
    gram_verb_sub:    'Deutsche Verben ändern sich je nach Subjekt. Wähle ein Verb aus.',
    gram_sent_badge:  'Satzbau',
    gram_sent_h2:     'Satz-',
    gram_sent_h2b:    'struktur',
    gram_sent_sub:    'Die Regeln, die der deutschen Wortstellung ihre Einzigartigkeit verleihen.',
    gram_gen_h2:      'Die 3',
    gram_gen_h2b:     'Nomen-Geschlechter',
    gram_gen_sub:     'Jedes deutsche Substantiv hat ein Geschlecht. Es gibt Muster — aber auch viele Ausnahmen.',

    // Vocabulary
    vocab_badge:      '🧩 Modul 03',
    vocab_h1a:        'Vokabular-',
    vocab_h1b:        'Welten',
    vocab_sub:        'Wörter leben im Kontext. Erkunde thematische Sammlungen und klicke auf Karten, um Beispielsätze zu sehen.',
    vocab_tap:        'tippen für Beispiel',
    vocab_phrase_badge: 'Überlebens-Deutsch',
    vocab_phrase_h2:  'Wesentliche',
    vocab_phrase_h2b: 'Phrasen',
    vocab_phrase_sub: '12 Phrasen, die dich durch jede Situation in Deutschland bringen.',
    vocab_compound_h2: 'Das deutsche',
    vocab_compound_h2b: 'Kompositum',
    vocab_compound_sub: 'Deutsch baut neue Wörter durch Kombination vorhandener Wörter. Wie LEGO für Sprache.',

    // Culture
    cult_badge:       '🏰 Modul 04',
    cult_h1a:         'Deutsche',
    cult_h1b:         'Kultur',
    cult_sub:         'Sprache ist untrennbar von Kultur. Entdecke Redewendungen, Traditionen, unübersetzbare Wörter und große Geister.',
    cult_untr_badge:  'Typisch Deutsch',
    cult_untr_h2:     'Unübersetzbare',
    cult_untr_h2b:    'Wörter',
    cult_untr_sub:    'Wörter so spezifisch und schön, dass keine andere Sprache sie benennen musste.',
    cult_idiom_badge: 'Redewendungen',
    cult_idiom_h2:    'Deutsche',
    cult_idiom_h2b:   'Redewendungen',
    cult_idiom_sub:   'Wo Bären tanzen und Würste philosophisches Gewicht tragen. Klicke auf eine Redewendung.',
    cult_idiom_means: '💬 Bedeutet:',
    cult_idiom_when:  '📍 Verwendung:',
    cult_trad_badge:  'Feste & Feiertage',
    cult_trad_h2:     'Traditionen &',
    cult_trad_h2b:    'Feste',
    cult_trad_sub:    'Die Feiern, die die deutsche Kultur zum Leben erwecken.',
    cult_famous_badge:'Berühmte Deutsche',
    cult_famous_h2:   'Ikonen der deutschen',
    cult_famous_h2b:  'Geschichte',
    cult_famous_sub:  'Die Geister, die nicht nur Deutschland, sondern die ganze Welt prägten.',
    cult_humor_badge: 'Der berühmte Mythos',
    cult_humor_h2:    'Über deutschen',
    cult_humor_h2b:   'Humor',
    cult_humor_p:     'Das Klischee, dass Deutsche keinen Humor haben, ist völlig falsch — und die Deutschen werden die Ersten sein, die Ihnen das sagen, ohne zu lachen. Deutscher Humor ist typischerweise trocken, ironisch und äußerst präzise.',
  },

  en: {
    // Nav
    nav_home:        'Home',
    nav_alphabet:    'Alphabet',
    nav_grammar:     'Grammar Atlas',
    nav_vocabulary:  'Vocabulary',
    nav_culture:     'Culture',
    nav_contact:     'Contact',
    nav_cta:         'Get Started →',

    // Footer
    footer_tagline:  'A modern expedition into the German language — where culture, grammar, and vocabulary converge.',
    footer_explore:  'Explore',
    footer_levels:   'Levels',
    footer_copy:     '© 2025 DeutschWelt. Crafted with ❤️ for German learners.',
    footer_bye:      'Auf Wiedersehen! 👋',

    // Home
    home_badge:       '🇩🇪 German Language Portfolio',
    home_h1_line1:    'The World of',
    home_h1_line2:    'the German Language',
    home_subtitle:    'Not just another language course. An immersive expedition through German — its sounds, its logic, its culture, its soul.',
    home_cta_primary: 'Begin the Expedition →',
    home_cta_sec:     'Explore Kultur',
    home_quote:       '"One language, one person. Two languages, two people."',
    home_stats_title: "What's Inside",
    home_4worlds:     'Four Worlds to',
    home_explore:     'Explore',
    home_4worlds_sub: 'Each section is a unique universe — designed to make German feel alive, not like homework.',
    home_wotd_badge:  '✨ German Word of the Day',
    home_path_badge:  'Your Journey',
    home_path_title:  'The Learning Path',
    home_path_sub:    'Follow the suggested sequence or jump to what intrigues you most.',
    home_step1:       'Learn the Alphabet',
    home_step1_desc:  'Sounds and special characters',
    home_step2:       'Grammar Foundations',
    home_step2_desc:  'Cases, articles, and sentence structure',
    home_step3:       'Build Vocabulary',
    home_step3_desc:  'Themed word collections',
    home_step4:       'Immerse in Culture',
    home_step4_desc:  'Idioms, humor and traditions',
    home_cta_h2:      'Ready?',
    home_cta_h2b:     "Let's go!",
    home_cta_p:       'Start your expedition into German today — no textbook required.',
    home_cta_btn:     'Start with the Alphabet →',

    // Alphabet
    alph_badge:       '🔤 Module 01',
    alph_h1a:         'Alphabet &',
    alph_h1b:         'Sounds',
    alph_sub:         'German uses the same 26 letters as English — plus 4 extra characters. Click any card to flip it and reveal the pronunciation tip.',
    alph_26_h2:       'The 26',
    alph_26_h2b:      'Letters',
    alph_26_sub:      'Hover to preview, click to reveal the full pronunciation tip.',
    alph_flip:        'click to flip',
    alph_special_badge: 'Unique to German',
    alph_special_h2:  'Special',
    alph_special_h2b: 'Characters',
    alph_special_sub: 'These 4 characters are what make German uniquely beautiful — and sometimes tricky.',
    alph_dig_badge:   'Letter Combos',
    alph_dig_h2:      'Special',
    alph_dig_h2b:     'Digraphs',
    alph_dig_sub:     'When two letters merge to create a completely new sound.',
    alph_tips_h2:     'Pronunciation',
    alph_tips_h2b:    'Pro Tips',
    tip1_title:       'German is phonetic',
    tip1_desc:        'Every letter is pronounced consistently. No silent letters like in English or French.',
    tip2_title:       'The Guttural R',
    tip2_desc:        'Roll the R from the back of your throat, not the tip of your tongue.',
    tip3_title:       'Stress the first syllable',
    tip3_desc:        'In most German words, the stress falls on the first syllable. SUNne, not suNNE.',
    tip4_title:       'W = V sound',
    tip4_desc:        "German W sounds like English V. Wasser (water) = \"VAHsser\". Takes practice!",

    // Grammar
    gram_badge:       '🗺️ Module 02',
    gram_h1a:         'Grammar',
    gram_h1b:         'Atlas',
    gram_sub:         "German grammar is a landscape, not a rulebook. Navigate the 4 cases, verbs, and sentence structure with visual guides.",
    gram_cases_badge: 'The Core Challenge',
    gram_cases_h2:    'The 4',
    gram_cases_h2b:   'Cases',
    gram_cases_sub:   'German articles change based on the role of the noun. Click each case to explore.',
    gram_art_title:   'Definite Articles in',
    gram_art_note:    '💡 These articles (der/die/das words) change their form depending on the grammatical case the noun is in.',
    gram_verb_badge:  'Verben',
    gram_verb_h2:     'Verb',
    gram_verb_h2b:    'Conjugation',
    gram_verb_sub:    'German verbs change based on the subject. Select a verb to see the pattern.',
    gram_sent_badge:  'Satzbau',
    gram_sent_h2:     'Sentence',
    gram_sent_h2b:    'Structure',
    gram_sent_sub:    'The rules that give German its unique word order.',
    gram_gen_h2:      'The 3',
    gram_gen_h2b:     'Noun Genders',
    gram_gen_sub:     'Every German noun has a gender. There are patterns — but also many exceptions.',

    // Vocabulary
    vocab_badge:      '🧩 Module 03',
    vocab_h1a:        'Vocabulary',
    vocab_h1b:        'Worlds',
    vocab_sub:        'Words live in context. Explore themed collections and click cards to reveal examples in real sentences.',
    vocab_tap:        'tap for example',
    vocab_phrase_badge: 'Survival German',
    vocab_phrase_h2:  'Essential',
    vocab_phrase_h2b: 'Phrases',
    vocab_phrase_sub: '12 phrases that will get you through any situation in Germany.',
    vocab_compound_h2: 'The German',
    vocab_compound_h2b: 'Compound Word',
    vocab_compound_sub: 'German builds new words by combining existing ones. It\'s like LEGO for language.',

    // Culture
    cult_badge:       '🏰 Module 04',
    cult_h1a:         'German',
    cult_h1b:         'Kultur',
    cult_sub:         'Language is inseparable from culture. Discover the idioms, traditions, untranslatable words, and great minds that define Germany.',
    cult_untr_badge:  'Uniquely German',
    cult_untr_h2:     'Untranslatable',
    cult_untr_h2b:    'Wörter',
    cult_untr_sub:    'Words so specific and beautiful that no other language has found the need to name them.',
    cult_idiom_badge: 'Redewendungen',
    cult_idiom_h2:    'German',
    cult_idiom_h2b:   'Idioms',
    cult_idiom_sub:   "Where bears dance and sausages carry philosophical weight. Click an idiom to reveal the meaning.",
    cult_idiom_means: '💬 Means:',
    cult_idiom_when:  '📍 When to use:',
    cult_trad_badge:  'Feste & Feiertage',
    cult_trad_h2:     'Traditions &',
    cult_trad_h2b:    'Festivals',
    cult_trad_sub:    'The celebrations that bring German culture to life.',
    cult_famous_badge:'Berühmte Deutsche',
    cult_famous_h2:   'Icons of',
    cult_famous_h2b:  'German History',
    cult_famous_sub:  'The minds that shaped not just Germany, but the entire world.',
    cult_humor_badge: 'The Famous Myth',
    cult_humor_h2:    'On German',
    cult_humor_h2b:   'Humor',
    cult_humor_p:     "The stereotype that Germans have no humor is entirely wrong — and Germans will be the first to tell you so, without laughing. German humor tends to be dry, ironic, and extremely precise.",
  },
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────
const AppContext = createContext<AppContextValue>({
  theme: 'dark',
  lang: 'en',
  toggleTheme: () => {},
  setLang: () => {},
  t: (k) => k,
})

export function useApp() {
  return useContext(AppContext)
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem('dw-theme') as Theme) || 'dark'
  )
  const [lang, setLangState] = useState<Lang>(() =>
    (localStorage.getItem('dw-lang') as Lang) || 'en'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('dw-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('dw-lang', lang)
  }, [lang])

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  const setLang = (l: Lang) => setLangState(l)

  const t = (key: string): string =>
    translations[lang][key] ?? translations['en'][key] ?? key

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, setLang, t }}>
      {children}
    </AppContext.Provider>
  )
}
