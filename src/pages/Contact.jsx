import { Mail, MessageCircle } from 'lucide-react'
import ContactEnquiry from '../components/ContactEnquiry.jsx'

const contactWhatsAppUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.'
const contactEmailUrl = 'mailto:cvandcoverletternepal@gmail.com?subject=Service%20Enquiry%20%E2%80%94%20CV%20%26%20Cover%20Letter%20Nepal'

export default function Contact() {
  return <main className="contact-page-main">
    <section className="contact-page-hero" aria-labelledby="contact-page-title">
      <div className="contact-page-hero-content">
        <span>Contact Us</span>
        <h1 id="contact-page-title">Let’s Talk About Your Requirements</h1>
        <p>Tell us what you need, and we’ll guide you towards<br className="contact-page-hero-break" /> the most suitable service or next step.</p>
      </div>
    </section>
    <section className="contact-page-touch" aria-labelledby="contact-page-touch-title">
      <div className="contact-page-touch-container">
        <header className="contact-page-touch-intro">
          <span>Get in Touch</span>
          <h2 id="contact-page-touch-title">Choose the Contact Method That Works for You</h2>
          <p>WhatsApp is best for quick questions. Email is suitable for detailed enquiries and document-related communication.</p>
        </header>
        <div className="contact-page-methods">
          <article className="contact-page-method">
            <div className="contact-page-method-heading"><span className="contact-page-method-icon"><MessageCircle aria-hidden="true" /></span><div><h3>WhatsApp</h3><p>For service enquiries, quotations and quick questions.</p></div></div>
            <a className="contact-page-address" href="tel:+9779862989407" aria-label="Call plus 977 9862989407">+977 9862989407</a>
            <a className="contact-page-action contact-page-whatsapp-action" href={contactWhatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Start a WhatsApp chat about our services">Start a WhatsApp Chat</a>
            <small>Messages are reviewed during available service hours.</small>
          </article>
          <article className="contact-page-method">
            <div className="contact-page-method-heading"><span className="contact-page-method-icon"><Mail aria-hidden="true" /></span><div><h3>Email</h3><p>For detailed enquiries, document submissions and formal communication.</p></div></div>
            <a className="contact-page-address" href={contactEmailUrl}>cvandcoverletternepal@gmail.com</a>
            <a className="contact-page-action contact-page-email-action" href={contactEmailUrl} aria-label="Send a service enquiry by email">Send Us an Email</a>
            <small>Include your name, required service and preferred completion date.</small>
          </article>
        </div>
      </div>
    </section>
    <ContactEnquiry />
  </main>
}
