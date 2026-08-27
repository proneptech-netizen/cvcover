import { CreditCard, FileCheck2, ListChecks, BadgeCheck, ShieldCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Choose a Service',
    description: 'Select the service you need and request a quote through our online form or WhatsApp.',
    icon: ListChecks,
    color: '#087e8c',
    background: '#e8f4f4',
  },
  {
    number: '02',
    title: 'Review & Confirm',
    description: 'Review the scope, required information, total fee, 50% advance, delivery time and revision support.',
    icon: FileCheck2,
    color: '#7a52d6',
    background: '#f0ebfb',
  },
  {
    number: '03',
    title: 'Pay & Share Details',
    description: 'Accept the quotation, pay the 50% advance and securely provide the required information and documents.',
    icon: CreditCard,
    color: '#df821d',
    background: '#fff1e4',
  },
  {
    number: '04',
    title: 'Review & Receive',
    description: 'Review the completed work, request applicable revisions, pay the remaining 50% and receive final delivery.',
    icon: BadgeCheck,
    color: '#2589d8',
    background: '#e9f3fb',
  },
]

const quoteUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20request%20a%20quote.'

export default function HowItWorks() {
  return (
    <section className="how-it-works" aria-labelledby="how-it-works-title">
      <div className="how-it-works-container">
        <div className="how-it-works-intro">
          <span className="how-it-works-label">How It Works</span>
          <h2 id="how-it-works-title">A Simple Online Process</h2>
          <p>Choose your service, receive a clear quotation and complete the process online with direct support at every stage.</p>
        </div>

        <div className="process-grid">
          <div className="process-connector" aria-hidden="true"><span /><span /><span /></div>
          {steps.map(({ number, title, description, icon: Icon, color, background }) => (
            <article className="process-card" key={number}>
              <span className="process-number">{number}</span>
              <span className="process-icon" style={{ '--process-color': color, '--process-background': background }}><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <div className="process-notices">
          <div className="security-notice"><ShieldCheck aria-hidden="true" /><strong>Never share passwords, OTP codes, bank PINs or complete payment-card details. Third-party fees and outcomes are outside our control unless specifically included in the confirmed quotation.</strong></div>
        </div>

        <div className="process-actions">
          <a className="process-button process-button-primary" href={quoteUrl} target="_blank" rel="noopener noreferrer">Get a Quote</a>
          <a className="process-button process-button-secondary" href="/services">Explore Services</a>
        </div>
      </div>
    </section>
  )
}
