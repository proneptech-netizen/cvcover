import { sitePath } from '../utils/sitePath.js'
import { ArrowRight, BadgeDollarSign, CalendarDays, Check, CheckCircle2, FileLock2, FileText, Laptop, ListChecks, Lock, Mail, MessageCircle, Scale, ShieldCheck, Users } from 'lucide-react'

const careersEmailUrl = 'mailto:cvandcoverletternepal@gmail.com?subject=Career%20Application%20-%20CV%20Submission'
const careersWhatsAppUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20career%20opportunities%20at%20CV%20%26%20Cover%20Letter%20Nepal.'
const careersOpeningsWhatsAppUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20have%20a%20question%20about%20future%20career%20opportunities.'
const careersJoinEmailUrl = 'mailto:cvandcoverletternepal@gmail.com?subject=CV%20Submission%20for%20Future%20Opportunities&body=Hello%2C%0A%0AI%20would%20like%20to%20submit%20my%20CV%20for%20future%20opportunities.%0A%0APreferred%20role%3A%20%0APhone%20number%3A%20%0A%0AThank%20you.'
const careersJoinWhatsAppUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20submit%20my%20CV%20for%20future%20opportunities.'

const careersBenefits = [
  ['Flexible Work Arrangements', 'Most roles are remote, with working arrangements clearly stated in each vacancy.', Laptop],
  ['Practical Learning', 'Build useful experience in document support, client communication and online services.', FileText],
  ['Supportive Environment', 'Work with respectful communication, clear guidance and shared accountability.', Users],
  ['Meaningful Client Service', 'Help clients present genuine information clearly and complete selected online processes.', ShieldCheck],
  ['Clear Responsibilities', 'Role duties, working conditions and expectations are explained during recruitment.', ListChecks],
]

const careersProcessSteps = [
  ['Review Opportunities', 'Check current vacancies or submit an expression of interest for a suitable future role.'],
  ['Prepare Your CV', 'Use an updated CV that clearly presents your relevant education, experience and skills.'],
  ['Submit Your Application', 'Email your CV and mention the position or type of role you want to be considered for.'],
  ['Initial Review', 'Applications are reviewed against the role requirements and current business needs.'],
  ['Interview', 'Shortlisted applicants may be invited to an online or in-person interview.'],
  ['Selection', 'Successful applicants receive written details of the role, responsibilities and working terms.'],
]

const careersRecruitmentCards = [
  {
    title: 'Fair Consideration',
    description: 'Applications are reviewed according to relevant qualifications, skills, experience, role suitability and genuine business requirements.',
    checks: ['Relevant information is considered', 'False or misleading information may lead to rejection'],
    icon: Scale,
  },
  {
    title: 'No Recruitment Fee',
    description: 'We do not charge applicants a fee to apply for employment opportunities.',
    checks: ['Never send money or payment details', 'Verify suspicious messages through our official contacts'],
    icon: BadgeDollarSign,
  },
  {
    title: 'Applicant Information & Privacy',
    description: 'CVs and application details are used only for recruitment-related purposes and handled with appropriate care.',
    checks: ['Provide only information relevant to employment', 'Request correction or deletion by contacting us'],
    icon: FileLock2,
    privacyLink: true,
  },
]

export default function Careers() {
  return <main>
    <section className="careers-hero" aria-labelledby="careers-hero-title">
      <div className="careers-hero-decoration careers-hero-decoration-left" aria-hidden="true" />
      <div className="careers-hero-decoration careers-hero-decoration-right" aria-hidden="true" />
      <div className="careers-hero-content">
        <span className="careers-hero-badge">Careers</span>
        <h1 id="careers-hero-title">Build Your Career With Us</h1>
        <p>Join CV &amp; Cover Letter Nepal and help clients in Nepal and worldwide access clear, professional document-preparation and online application-assistance services. Our current operations are fully online. Available roles are generally remote unless a vacancy announcement states otherwise.</p>
        <div className="careers-hero-actions">
          <a className="careers-hero-button careers-hero-button-primary" href={careersEmailUrl}>Email Your CV</a>
          <a className="careers-hero-button careers-hero-button-secondary" href={careersWhatsAppUrl} target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>
        </div>
      </div>
    </section>
    <section className="careers-benefits" aria-labelledby="careers-benefits-title">
      <div className="careers-benefits-container">
        <div className="careers-benefits-intro">
          <span className="careers-benefits-badge">Why Work With Us</span>
          <h2 id="careers-benefits-title">Meaningful Work in a Growing Online Service</h2>
          <p>Contribute your skills, support real client requirements and grow within a responsible online service team.</p>
        </div>
        <div className="careers-benefits-grid">
          {careersBenefits.map(([title, description, Icon]) => <article className="careers-benefits-card" key={title}>
            <div className="careers-benefits-icon"><Icon aria-hidden="true" /></div>
            <div className="careers-benefits-copy"><h3>{title}</h3><p>{description}</p></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="careers-openings-section" aria-labelledby="careers-openings-title">
      <div className="careers-openings-container">
        <header className="careers-openings-intro">
          <span className="careers-openings-badge">Current Openings</span>
          <h2 id="careers-openings-title">No Open Positions at the Moment</h2>
          <p>We are not currently hiring. You may still submit your CV for consideration when a suitable opportunity becomes available.</p>
        </header>
        <div className="careers-openings-card">
          <div className="careers-openings-column careers-openings-status">
            <span className="careers-openings-label careers-openings-status-label">Hiring Status</span>
            <h3>Applications are currently closed</h3>
            <p>New vacancies will be published on this page with the role, requirements and application deadline.</p>
            <div className="careers-openings-updated"><CalendarDays aria-hidden="true" /><span>Last updated: 14 August 2026</span></div>
          </div>
          <div className="careers-openings-column careers-openings-future">
            <span className="careers-openings-label">Future Opportunities</span>
            <h3>Want us to keep your CV on file?</h3>
            <p>Email your CV and a short introduction. We may contact you if your background matches a future opening.</p>
            <div className="careers-openings-actions">
              <a className="careers-openings-email" href={careersEmailUrl} aria-label="Email your CV for future career opportunities"><Mail aria-hidden="true" />Email Your CV</a>
              <a className="careers-openings-whatsapp" href={careersOpeningsWhatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Ask a question about future career opportunities on WhatsApp"><MessageCircle aria-hidden="true" />Ask a Question on WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="careers-process-section" aria-labelledby="careers-process-title">
      <div className="careers-process-container">
        <header className="careers-process-intro">
          <span className="careers-process-badge">Application Process</span>
          <h2 id="careers-process-title">A Simple and Professional Way to Apply</h2>
          <p>Follow these steps when applying for an advertised vacancy or submitting your CV for future consideration.</p>
        </header>
        <ol className="careers-process-grid">
          {careersProcessSteps.map(([title, description], index) => <li className="careers-process-card" key={title}>
            <span className="careers-process-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <div className="careers-process-copy"><h3>{title}</h3><p>{description}</p></div>
          </li>)}
        </ol>
      </div>
    </section>
    <section className="careers-recruitment-section" aria-labelledby="careers-recruitment-title">
      <div className="careers-recruitment-container">
        <header className="careers-recruitment-intro">
          <span className="careers-recruitment-badge">Recruitment Information</span>
          <h2 id="careers-recruitment-title">Fair, Safe and Transparent Recruitment</h2>
          <p>Important information about how applications are considered, applicant safety and the use of recruitment information.</p>
        </header>
        <div className="careers-recruitment-grid">
          {careersRecruitmentCards.map(({ title, description, checks, icon: Icon, privacyLink }) => <article className="careers-recruitment-card" key={title}>
            <div className="careers-recruitment-card-header">
              <span className="careers-recruitment-icon"><Icon aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </div>
            <ul className="careers-recruitment-checks">
              {checks.map(item => <li key={item}><Check aria-hidden="true" /><span>{item}</span></li>)}
            </ul>
            {privacyLink && <a className="careers-recruitment-privacy-link" href={sitePath('/privacy-policy')}>Read Our Privacy Policy <ArrowRight aria-hidden="true" /></a>}
          </article>)}
        </div>
      </div>
    </section>
    <section className="careers-join-team-section" aria-labelledby="careers-join-team-title">
      <div className="careers-join-team-card">
        <div className="careers-join-team-decoration careers-join-team-decoration-left" aria-hidden="true" />
        <div className="careers-join-team-decoration careers-join-team-decoration-right" aria-hidden="true" />
        <div className="careers-join-team-content">
          <span className="careers-join-team-badge">Join Our Team</span>
          <h2 id="careers-join-team-title">Interested in Future Opportunities?</h2>
          <p>Send us your CV and a short introduction. We may contact you when a suitable opportunity becomes available.</p>
          <div className="careers-join-team-actions">
            <a className="careers-join-team-button careers-join-team-email-button" href={careersJoinEmailUrl} aria-label="Email your CV for future opportunities"><Mail aria-hidden="true" />Email Your CV</a>
            <a className="careers-join-team-button careers-join-team-whatsapp-button" href={careersJoinWhatsAppUrl} target="_blank" rel="noopener noreferrer" aria-label="Contact CV and Cover Letter Nepal on WhatsApp about future opportunities"><MessageCircle aria-hidden="true" />Contact on WhatsApp</a>
          </div>
          <div className="careers-join-team-contact">
            <a href="mailto:cvandcoverletternepal@gmail.com" aria-label="Email cvandcoverletternepal@gmail.com">cvandcoverletternepal@gmail.com</a>
            <span aria-hidden="true">•</span>
            <a href="tel:+9779862989407" aria-label="Call plus 977 9862989407">+977 9862989407</a>
          </div>
        </div>
        <aside className="careers-join-team-info" aria-label="Information to include with your CV">
          <span className="careers-join-team-info-label">Before You Send</span>
          <h3>Include the essentials</h3>
          <ul>
            <li><CheckCircle2 aria-hidden="true" /><span>Your updated CV in PDF format</span></li>
            <li><CheckCircle2 aria-hidden="true" /><span>A short introduction and preferred role</span></li>
            <li><CheckCircle2 aria-hidden="true" /><span>Your current phone number and email</span></li>
          </ul>
        </aside>
      </div>
      <div className="careers-applicant-notice"><Lock aria-hidden="true" /><div><strong>Applicant Safety &amp; Privacy</strong><ul><li>No recruitment fee.</li><li>Do not send citizenship, passport, bank details, passwords or OTP codes.</li><li>Submitting a CV does not guarantee a response, interview or employment offer.</li></ul><a href={sitePath('/privacy-policy')}>Read Our Privacy Policy <ArrowRight aria-hidden="true" /></a></div></div>
      <p className="careers-join-team-note">Current working arrangements are online. Vacancy announcements will state any role-specific location or schedule.</p>
    </section>
  </main>
}
