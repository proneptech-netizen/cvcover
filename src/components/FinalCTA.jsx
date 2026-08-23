import { CheckCircle, FileText, MessageCircle } from 'lucide-react'

const whatsappUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.'
const quoteUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20quotation.'

const trustPoints = ['Clear pricing', 'Secure communication', 'Worldwide support']

export default function FinalCTA() {
  return (
    <section className="final-cta-section" aria-labelledby="final-cta-title">
      <div className="final-cta-container">
        <h2 id="final-cta-title">Ready to Get Started?</h2>
        <p>
          From career and study documents to applications and travel support,<br className="final-cta-line-break" />
          we provide professional online assistance to clients worldwide.
        </p>

        <div className="final-cta-actions">
          <a className="final-cta-button final-cta-button-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" />
            <span>Chat on WhatsApp</span>
          </a>
          <a className="final-cta-button final-cta-button-secondary" href={quoteUrl} target="_blank" rel="noopener noreferrer">
            <FileText aria-hidden="true" />
            <span>Get a Free Quote</span>
          </a>
        </div>

        <ul className="final-cta-trust" aria-label="Service assurances">
          {trustPoints.map((point) => (
            <li key={point}>
              <CheckCircle aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
