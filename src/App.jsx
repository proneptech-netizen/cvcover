import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ServicesOverview from './components/ServicesOverview.jsx'
import WhoWeServe from './components/WhoWeServe.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import PricingPackages from './components/PricingPackages.jsx'
import Testimonials from './components/Testimonials.jsx'
import GlobalDocumentSupport from './components/GlobalDocumentSupport.jsx'
import FAQSection from './components/FAQSection.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import Footer from './components/Footer.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import FreeTools from './pages/FreeTools.jsx'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsAndConditions from './pages/TermsAndConditions.jsx'
import ServiceDisclaimer from './pages/ServiceDisclaimer.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'
import useViewportReveal from './hooks/useViewportReveal.js'
import SEO from './components/SEO.jsx'

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isAboutPage = path === '/about'
  const isServicesPage = path === '/services'
  const isFreeToolsPage = path === '/free-tools'
  const isCareersPage = path === '/careers'
  const isContactPage = path === '/contact'
  const isPrivacyPage = path === '/privacy-policy'
  const isTermsPage = path === '/terms-and-conditions'
  const isDisclaimerPage = path === '/service-disclaimer'
  useViewportReveal(path)

  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        return
      }

      const target = document.getElementById(window.location.hash.slice(1))
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const frame = window.location.hash ? window.requestAnimationFrame(scrollToHash) : null
    if (!window.location.hash) scrollToHash()
    window.addEventListener('hashchange', scrollToHash)

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [isAboutPage, isServicesPage, isFreeToolsPage, isCareersPage, isContactPage, isPrivacyPage, isTermsPage, isDisclaimerPage])

  return <><SEO path={path} /><Header />{isAboutPage ? <About /> : isServicesPage ? <Services /> : isFreeToolsPage ? <FreeTools /> : isCareersPage ? <Careers /> : isContactPage ? <Contact /> : isPrivacyPage ? <PrivacyPolicy /> : isTermsPage ? <TermsAndConditions /> : isDisclaimerPage ? <ServiceDisclaimer /> : <main><Hero /><ServicesOverview /><WhoWeServe /><WhyChooseUs /><HowItWorks /><PricingPackages /><Testimonials /><GlobalDocumentSupport /><FAQSection /><FinalCTA /></main>}<Footer /><FloatingWhatsApp /></>
}
