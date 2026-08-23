import { sitePath } from '../utils/sitePath.js'
import { CheckCircle, Quote } from 'lucide-react'
import AboutServices from '../components/AboutServices.jsx'
import WorkingPrinciples from '../components/WorkingPrinciples.jsx'
import ImportantInformation from '../components/ImportantInformation.jsx'
import AboutCTA from '../components/AboutCTA.jsx'

const quoteUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20quotation.'
const trustPoints = ['Personalised Guidance', 'Honest & Reliable Support', 'Clients Worldwide']

export default function About() {
  return (
    <main className="about-page-main">
      <section className="about-page-hero" aria-labelledby="about-page-title">
        <div className="about-page-hero-decoration about-page-hero-decoration-left" aria-hidden="true" />
        <div className="about-page-hero-decoration about-page-hero-decoration-right" aria-hidden="true" />
        <div className="about-page-hero-content">
          <span className="about-page-label about-page-label-light">About Us</span>
          <h1 id="about-page-title">About CV &amp; Cover Letter Nepal</h1>
          <p>Professional online assistance for career documents, study and visa documents, applications and selected support services—available to clients worldwide.</p>
          <div className="about-page-hero-actions">
            <a className="about-page-hero-button about-page-hero-button-primary" href={sitePath('/services')}>Explore Services</a>
            <a className="about-page-hero-button about-page-hero-button-secondary" href={quoteUrl} target="_blank" rel="noopener noreferrer">Get a Free Quote</a>
          </div>
        </div>
      </section>

      <section className="about-page-story" aria-labelledby="about-page-story-title">
        <div className="about-page-story-inner">
          <div className="about-page-portrait-card">
            <div className="about-page-portrait-decoration" aria-hidden="true" />
            <img src={sitePath('/assets/Yubraj_Timsina_Transparent.png')} alt="Yubraj Timsina, Founder and Owner of CV & Cover Letter Nepal" width="1132" height="1389" decoding="async" />
            <div className="about-page-identity-card">
              <strong>Yubraj Timsina</strong>
              <span>Founder &amp; Owner</span>
            </div>
          </div>

          <div className="about-page-story-copy">
            <span className="about-page-label">Our Story</span>
            <h2 id="about-page-story-title">Built from Experience, Driven by Purpose</h2>
            <div className="about-page-story-paragraphs">
              <p>CV &amp; Cover Letter Nepal began with a simple desire to help people who felt confused or unsupported while preparing important career and application documents.</p>
              <p>I started by working with one client at a time—listening to their concerns, understanding their goals and learning from every application. The journey required patience, continuous learning and a commitment to improve as document requirements and online processes continued to change.</p>
              <p>The trust and positive feedback from clients encouraged me to develop a professional online service for job seekers, students, professionals and applicants worldwide.</p>
              <p>Today, the purpose remains the same: to make professional support accessible, reliable and personal—and help every client move forward with greater clarity and confidence.</p>
            </div>

            <blockquote className="about-page-quote-card">
              <Quote aria-hidden="true" />
              <div>
                <p>“The right guidance and a well-prepared document can give someone the confidence to take their next important step.”</p>
                <cite>Yubraj Timsina — Founder &amp; Owner</cite>
              </div>
            </blockquote>

            <ul className="about-page-trust-points" aria-label="Our service values">
              {trustPoints.map((point) => (
                <li key={point}><CheckCircle aria-hidden="true" /><span>{point}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <AboutServices />
      <WorkingPrinciples />
      <ImportantInformation />
      <AboutCTA />
    </main>
  )
}
