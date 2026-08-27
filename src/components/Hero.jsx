import { BriefcaseBusiness, FileText, Globe2, LockKeyhole, MessageCircle, ShieldCheck, Star } from 'lucide-react'
import FeatureItem from './FeatureItem.jsx'

const whatsappUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20CV%20and%20document%20services.'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="trust-badge"><ShieldCheck aria-hidden="true" />Trusted Document Support Worldwide</div>
          <h1>Professional Documents.<span>Better Opportunities.</span></h1>
          <p className="hero-description">ATS-friendly CVs, cover letters, study and visa documents, and online application support—professionally prepared for your goals.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/services"><BriefcaseBusiness aria-hidden="true" />Explore Services</a>
            <a className="button button-outline" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />Chat on WhatsApp</a>
          </div>
          <div className="features" aria-label="Service highlights">
            <FeatureItem icon={FileText} title="5,000+" subtitle="Documents" />
            <FeatureItem icon={LockKeyhole} title="Confidential" subtitle="Service" />
            <FeatureItem icon={Globe2} title="Worldwide" subtitle="Support" />
          </div>
        </div>
        <div className="hero-visual">
          <div className="founder-card">
            <div className="founder-photo-section">
              <div className="founder-photo-canvas">
                <div className="portrait-background-decorations" aria-hidden="true">
                  <span className="decor-circle circle-one" /><span className="decor-circle circle-two" /><span className="decor-ring ring-one" /><span className="decor-ring ring-two" />
                  <span className="dot-grid" />
                </div>
                <img className="founder-photo" src="/assets/Yubraj_Timsina_Transparent.png" alt="Yubraj Timsina, founder of CV and Cover Letter Nepal" width="1132" height="1389" decoding="async" fetchPriority="high" />
              </div>
            </div>
            <div className="specialist-info">
              <h3>Expert Document Specialist</h3>
              <div className="specialist-badges"><span>Certified</span><span>Experienced</span><span>Trusted</span></div>
            </div>
          </div>
          <div className="client-rating-card"><span><Star aria-hidden="true" /></span><div><strong>4.9/5</strong><small>Client Rating</small></div></div>
        </div>
      </div>
    </section>
  )
}
