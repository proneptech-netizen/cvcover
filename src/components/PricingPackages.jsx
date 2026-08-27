import { CircleCheck, Info } from 'lucide-react'

const packages = [
  {
    name: 'Starter Package',
    audience: 'Ideal for Students & Fresh Graduates',
    price: '999',
    features: ['1 ATS-Friendly Student CV', '1 General Cover Letter', 'Professional Formatting & Layout', '2 Revisions Within 7 Days', 'Delivery Within 48 Hours'],
    button: 'Choose Starter',
    url: 'https://wa.me/9779862989407?text=Hello%2C%20I%20am%20interested%20in%20the%20Starter%20Package%20for%20NPR%20999.',
  },
  {
    name: 'Professional Package',
    audience: 'For Experienced Professionals & Job Seekers',
    price: '2,499',
    features: ['1 Professional ATS-Friendly CV', '1 Job-Specific Cover Letter', 'LinkedIn Profile Optimisation', 'ATS Keyword Optimisation', '2 Revisions Within 7 Days', 'Delivery Within 2–3 Working Days'],
    button: 'Choose Professional',
    url: 'https://wa.me/9779862989407?text=Hello%2C%20I%20am%20interested%20in%20the%20Professional%20Package%20for%20NPR%202%2C499.',
    featured: true,
  },
  {
    name: 'Study Abroad Package',
    audience: 'For Study and Visa Applications',
    price: '4,999',
    features: ['1 ATS-Friendly International CV', '1 Statement of Purpose', '1 Study or Visa Cover Letter', '1 Scholarship Essay, If Required', 'Document Review & Proofreading', '2 Revisions Within 7 Days', 'Delivery Within 3–5 Working Days'],
    button: 'Choose Study Abroad',
    url: 'https://wa.me/9779862989407?text=Hello%2C%20I%20am%20interested%20in%20the%20Study%20Abroad%20Package%20for%20NPR%204%2C999.',
  },
]

const customQuoteUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20request%20a%20custom%20quotation.'

export default function PricingPackages() {
  return (
    <section className="pricing-packages" aria-labelledby="pricing-packages-title">
      <div className="pricing-container">
        <div className="pricing-intro">
          <span className="pricing-label">Pricing &amp; Packages</span>
          <h2 id="pricing-packages-title">Clear Packages, Transparent Pricing</h2>
          <p>Choose a ready-made package or request a custom quotation based on your requirements.</p>
        </div>

        <div className="pricing-grid">
          {packages.map((item) => (
            <article className={`pricing-card${item.featured ? ' featured' : ''}`} key={item.name}>
              {item.featured && <span className="popular-badge">Most Popular</span>}
              <header><h3>{item.name}</h3><p>{item.audience}</p></header>
              <div className="price-row"><span className="currency">NPR</span><strong>{item.price}</strong><small>one-time payment</small></div>
              <ul>{item.features.map((feature) => <li key={feature}><CircleCheck aria-hidden="true" /><span>{feature}</span></li>)}</ul>
              <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.button} via WhatsApp`}>{item.button}</a>
            </article>
          ))}
        </div>

        <div className="custom-service-notice">
          <Info aria-hidden="true" />
          <p>Delivery times may vary with document complexity and the completeness of the information provided. Official charges and other third-party costs are separate and will be confirmed before payment.</p>
          <a href={customQuoteUrl} target="_blank" rel="noopener noreferrer">Request a Custom Quote</a>
        </div>
      </div>
    </section>
  )
}
