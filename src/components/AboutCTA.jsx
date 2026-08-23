import { CircleCheck, FileText, MessageCircle } from 'lucide-react'

const quoteUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20quotation.'
const whatsappUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.'
const trustPoints = ['Clear pricing', 'Secure communication', 'Worldwide support']

export default function AboutCTA() {
  return (
    <section className="about-cta-section" aria-labelledby="about-cta-title">
      <div className="about-cta-container">
        <div className="about-cta-content">
          <h2 id="about-cta-title">Need Professional Assistance?</h2>
          <p>Tell us what you need, and we’ll review your requirements and provide a clear quote before work begins.</p>

          <div className="about-cta-actions">
            <a className="about-cta-button about-cta-button-primary" href={quoteUrl} target="_blank" rel="noopener noreferrer" aria-label="Request a free quotation on WhatsApp">
              <FileText aria-hidden="true" />
              <span>Get a Free Quote</span>
            </a>
            <a className="about-cta-button about-cta-button-secondary" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp about our services">
              <MessageCircle aria-hidden="true" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <ul className="about-cta-trust" aria-label="Service assurances">
            {trustPoints.map((point) => (
              <li key={point}><CircleCheck aria-hidden="true" /><span>{point}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
