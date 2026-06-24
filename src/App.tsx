import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import HomePage from './pages/HomePage'
import AlphabetPage from './pages/AlphabetPage'
import GrammarPage from './pages/GrammarPage'
import VocabularyPage from './pages/VocabularyPage'
import CulturePage from './pages/CulturePage'
import ContactPage from './pages/ContactPage'
import './index.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/alphabet"   element={<AlphabetPage />} />
            <Route path="/grammar"    element={<GrammarPage />} />
            <Route path="/vocabulary" element={<VocabularyPage />} />
            <Route path="/culture"    element={<CulturePage />} />
            <Route path="/contact"    element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}
