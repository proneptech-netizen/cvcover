import { sitePath } from '../utils/sitePath.js'
import { ArrowRight, ChevronRight, Globe2, Mail, Phone } from 'lucide-react'

const whatsappUrl = 'https://wa.me/9779862989407'
const services = [
  ['CV & Career Documents', 'cv-career'],
  ['Study & Visa Documents', 'study-visa'],
  ['Government & Public Services', 'government'],
  ['Korea & EPS Services', 'korea-eps'],
  ['Travel & Booking Services', 'travel-booking'],
]

const exploreLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Packages', href: '/#pricing-packages-title' },
  { label: 'How It Works', href: '/#how-it-works-title' },
  { label: 'Free Tools', href: '/free-tools' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Service Disclaimer', href: '/service-disclaimer' },
]

function WhatsAppIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3.2A12.72 12.72 0 0 0 5.2 22.59L3.4 29.2l6.76-1.77a12.72 12.72 0 1 0 5.88-24.23Zm0 23.93a11.1 11.1 0 0 1-5.66-1.55l-.4-.24-4.01 1.05 1.07-3.9-.26-.4a11.12 11.12 0 1 1 9.26 5.04Zm6.1-8.31c-.34-.17-1.98-.98-2.29-1.09-.3-.11-.53-.17-.75.17-.22.33-.86 1.08-1.06 1.3-.19.22-.39.25-.72.08-.34-.17-1.42-.52-2.7-1.67a10.18 10.18 0 0 1-1.87-2.32c-.2-.34-.02-.52.15-.69.15-.15.34-.39.5-.58.17-.2.23-.34.34-.56.11-.22.05-.42-.03-.59-.08-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.58.08-.89.42-.3.33-1.16 1.13-1.16 2.75s1.19 3.2 1.35 3.42c.17.22 2.33 3.56 5.65 4.99.79.34 1.4.54 1.89.69.79.25 1.51.21 2.08.13.64-.1 1.98-.81 2.26-1.59.28-.78.28-1.45.2-1.59-.09-.14-.31-.22-.64-.39Z" /></svg>
}

function FacebookIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.1 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.25-1.5 1.55-1.5h1.65V3.63c-.29-.04-1.27-.13-2.42-.13-2.4 0-4.04 1.46-4.04 4.15V9.9H8.12V13h2.72v8h3.26Z" /></svg>
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>
}

export default function Footer() {
  return (
    <footer id="site-footer" className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-grid">
          <div className="site-footer-brand-column">
            <a className="site-footer-brand" href={sitePath('/')} aria-label="CV and Cover Letter Nepal home">
              <span className="site-footer-logo"><img src={sitePath('/assets/cv-cover-letter-nepal-logo-transparent-tight.png')} alt="" width="1101" height="721" loading="lazy" decoding="async" /></span>
              <span><strong>CV &amp; Cover Letter</strong><b>Nepal <span aria-label="Nepal flag">🇳🇵</span></b></span>
            </a>
            <p>Professional online document and application assistance for clients worldwide.</p>
            <div className="site-footer-socials" aria-label="Social media links">
              <a className="site-footer-social site-footer-social-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp"><WhatsAppIcon /></a>
              <a className="site-footer-social site-footer-social-facebook" href="https://www.facebook.com/people/Cv-Cover-Letter-Nepal/61555818296589/" target="_blank" rel="noopener noreferrer" aria-label="Visit CV & Cover Letter Nepal on Facebook"><FacebookIcon /></a>
              <a className="site-footer-social site-footer-social-instagram" href="https://www.instagram.com/cvandcoverletternepal/" target="_blank" rel="noopener noreferrer" aria-label="Visit CV & Cover Letter Nepal on Instagram"><InstagramIcon /></a>
            </div>
          </div>

          <nav className="site-footer-column site-footer-services" aria-labelledby="footer-services-title">
            <h2 id="footer-services-title">Popular Services</h2>
            <ul className="site-footer-link-list">
              {services.map(([service, slug]) => <li key={service}><a href={`${sitePath('/services')}?category=${slug}`}><ChevronRight aria-hidden="true" />{service}</a></li>)}
            </ul>
            <a className="site-footer-view-all" href={sitePath('/services')}>View All Services <ArrowRight aria-hidden="true" /></a>
          </nav>

          <nav className="site-footer-column site-footer-explore" aria-labelledby="footer-explore-title">
            <h2 id="footer-explore-title">Explore</h2>
            <ul className="site-footer-link-list">
              {exploreLinks.map(({ label, href }) => <li key={label}><a href={sitePath(href)}><ChevronRight aria-hidden="true" />{label}</a></li>)}
            </ul>
          </nav>

          <div className="site-footer-column site-footer-support">
            <h2>Support &amp; Contact</h2>
            <nav aria-label="Legal">
              <ul className="site-footer-link-list">
                {legalLinks.map(({ label, href }) => <li key={label}><a href={sitePath(href)}><ChevronRight aria-hidden="true" />{label}</a></li>)}
              </ul>
            </nav>
            <div className="site-footer-support-divider" />
            <ul className="site-footer-contact">
              <li><a href="https://wa.me/9779862989407" target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp at plus 977 9862989407"><Phone aria-hidden="true" /><span>+977 9862989407</span></a></li>
              <li><a href="mailto:cvandcoverletternepal@gmail.com" aria-label="Email cvandcoverletternepal@gmail.com"><Mail aria-hidden="true" /><span>cvandcoverletternepal@gmail.com</span></a></li>
              <li><span><Globe2 aria-hidden="true" /><span>Online service • Worldwide support</span></span></li>
            </ul>
          </div>
        </div>

        <div className="site-footer-bottom">
          <p>© 2026 CV &amp; Cover Letter Nepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
