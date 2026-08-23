import { sitePath } from '../utils/sitePath.js'
import {
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  Globe2,
  GraduationCap,
  Landmark,
  Plane,
  Star,
} from 'lucide-react'

const services = [
  {
    title: 'CV & Career Documents',
    description: 'ATS-friendly CVs, professional resumes, cover letters and international CV support.',
    icon: FileText,
    color: '#087e8c',
    background: '#e7f3f3',
    slug: 'cv-career',
  },
  {
    title: 'Europass Services',
    description: 'Europass CVs, cover letters, profile creation, formatting and professional review.',
    icon: Globe2,
    color: '#279de0',
    background: '#e8f4fb',
    slug: 'europass',
  },
  {
    title: 'Study & Visa Documents',
    description: 'SOPs, admission and scholarship essays, study plans, LORs, visa cover letters and appeals.',
    icon: GraduationCap,
    color: '#f28a16',
    background: '#fff1e5',
    slug: 'study-visa',
  },
  {
    title: 'Government & Online Services',
    description: 'Passport, PAN, National ID, driving licence, police report and online form assistance.',
    icon: Landmark,
    color: '#8155e8',
    background: '#f0eafd',
    slug: 'government',
  },
  {
    title: 'Korea & EPS Services',
    description: 'EPS-TOPIK applications, EPS form support, document preparation and verification.',
    icon: Star,
    color: '#ec4c8d',
    background: '#fcebf2',
    slug: 'korea-eps',
  },
  {
    title: 'Travel & Booking Services',
    description: 'Flight tickets, hotel bookings, travel insurance and VFS appointment support.',
    icon: Plane,
    color: '#19a95b',
    background: '#e9f8ef',
    slug: 'travel-booking',
  },
  {
    title: 'Lok Sewa & Government Jobs',
    description: 'Lok Sewa, Nepal Police, APF, Army, TSC and government bank applications.',
    icon: BriefcaseBusiness,
    color: '#f08a13',
    background: '#fff1e4',
    slug: 'lok-sewa',
  },
  {
    title: 'Other Services',
    description: 'Custom online form assistance and document preparation tailored to your needs.',
    icon: ClipboardList,
    color: '#8b4de8',
    background: '#f1eafd',
    slug: 'other',
  },
]

export default function ServicesOverview() {
  return (
    <section id="services" className="services-overview" aria-labelledby="services-overview-title">
      <div className="services-container">
        <div className="services-intro">
          <span className="services-label">Our Services</span>
          <h2 id="services-overview-title">Professional Document &amp; Online Support Services</h2>
          <p>From career documents and study applications to government forms and travel support—we provide reliable online assistance to clients in Nepal and worldwide. 🌎</p>
        </div>

        <div className="services-grid">
          {services.map(({ title, description, icon: Icon, color, background, slug }) => (
            <article className="service-card" key={title}>
              <span className="service-card-icon" style={{ '--icon-color': color, '--icon-background': background }}>
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
              <a href={`${sitePath('/services')}?category=${slug}`} aria-label={`View services for ${title}`}>View Services <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
