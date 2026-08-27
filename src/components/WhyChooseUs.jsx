import { Clock3, FileCheck2, MessagesSquare, ShieldCheck } from 'lucide-react'

const features = [
  {
    title: 'Professional Preparation',
    description: 'Every document is carefully prepared with accuracy, consistency and attention to detail.',
    icon: FileCheck2,
  },
  {
    title: 'Fast Turnaround',
    description: 'Most standard documents are delivered within 24–48 hours without compromising on quality.',
    icon: Clock3,
  },
  {
    title: 'Confidential & Secure',
    description: 'Your documents and personal information are handled with strict confidentiality.',
    icon: ShieldCheck,
  },
  {
    title: 'Personalised Support',
    description: 'Communicate directly with us via WhatsApp or email throughout the service process.',
    icon: MessagesSquare,
  },
]

const quoteUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20request%20a%20quote.'

export default function WhyChooseUs() {
  return (
    <section className="why-choose-us" aria-labelledby="why-choose-us-title">
      <div className="why-choose-container">
        <div className="why-choose-content">
          <span className="why-choose-label">Why Choose Us</span>
          <h2 id="why-choose-us-title">Your Trusted Partner for<br />Professional Documents</h2>
          <p className="why-choose-lead">We combine expertise, accuracy and personalised service to prepare professional documents tailored to your goals.</p>

          <div className="why-features">
            {features.map(({ title, description, icon: Icon }) => (
              <article className="why-feature" key={title}>
                <span className="why-feature-icon"><Icon aria-hidden="true" /></span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </div>

        <aside className="support-panel" aria-label="Direct professional support statistics">
          <div className="support-panel-decoration" aria-hidden="true" />
          <div className="support-panel-header">
            <img src="/assets/Yubraj_Timsina.png" alt="Yubraj Timsina, document specialist" width="1132" height="1389" loading="lazy" decoding="async" />
            <div><h3>Direct Professional Support</h3><p>Work directly with a document specialist.</p></div>
          </div>

          <div className="support-stats">
            <div><strong>98%</strong><span>Success Rate</span></div>
            <div><strong>24/7</strong><span>WhatsApp Support</span></div>
            <div><strong>5K+</strong><span>Happy Clients</span></div>
          </div>

          <a className="quote-button" href={quoteUrl} target="_blank" rel="noopener noreferrer">Request a Quote</a>
        </aside>
      </div>
    </section>
  )
}
