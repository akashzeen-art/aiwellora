import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import LifestylePage from './pages/LifestylePage'
import HealthPage from './pages/HealthPage'
import RelaxationPage from './pages/RelaxationPage'
import ChatPage from './pages/ChatPage'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import './App.css'

function PlaceholderPage({ titleKey }) {
  const { t } = useLanguage()
  return (
    <main className="page-content">
      <div className="page-inner">
        <h1 className="title">{t(titleKey)}</h1>
        <p className="basic_text" style={{ textAlign: 'center' }}>
          {t('pages.comingSoon')}
        </p>
      </div>
    </main>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lifestyle" element={<LifestylePage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/relaxation" element={<RelaxationPage />} />
          <Route path="/guide/:guideId" element={<ChatPage />} />
          <Route path="/about" element={<PlaceholderPage titleKey="pages.about" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  )
}
