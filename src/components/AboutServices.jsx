import {
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  FileText,
  Globe2,
  GraduationCap,
  Landmark,
  Plane,
  UserRound,
} from 'lucide-react'

const services = [
  {
    title: 'CV & Career Documents',
    description: 'ATS-friendly CVs, professional resumes, cover letters and career documents tailored to your goals.',
    icon: FileText,
    accent: 'teal',
    slug: 'cv-career',
  },
  {
    title: 'Europass Services',
    description: 'Europass CVs, cover letters and profile support for education and career opportunities across Europe.',
    icon: Globe2,
    accent: 'blue',
    slug: 'europass',
  },
  {
    title: 'Study & Visa Documents',
    description: 'SOPs, admission and scholarship essays, study plans, motivation letters, visa cover letters and appeals.',
    icon: GraduationCap,
    accent: 'orange',
    slug: 'study-visa',
  },
  {
    title: 'Government & Public Services',
    description: 'Assistance with passport, PAN, National ID, driving licence, police report and selected public-service forms.',
    icon: Landmark,
    accent: 'purple',
    slug: 'government',
  },
  {
    title: 'Korea & EPS Services',
    description: 'Support with EPS-TOPIK applications and selected Korea-related forms when official applications are open.',
    icon: BadgeDollarSign,
    accent: 'pink',
    slug: 'korea-eps',
  },
  {
    title: 'Travel & Booking Services',
    description: 'Assistance with flight tickets, hotel bookings, travel insurance, itineraries and selected appointments.',
    icon: Plane,
    accent: 'teal',
    slug: 'travel-booking',
  },
  {
    title: 'Lok Sewa & Government Job Applications',
    description: 'Support for Lok Sewa, Nepal Police, APF, Army, TSC, government bank and public-institution applications.',
    icon: BriefcaseBusiness,
    accent: 'blue',
    slug: 'lok-sewa',
  },
  {
    title: 'Other Customised Services',
    description: 'Need something different? Contact us for tailored document, form or online application assistance.',
    icon: UserRound,
    accent: 'green',
    slug: 'other',
  },
]

export default function AboutServices() {
  return (
    <section className="about-services-section" aria-labelledby="about-services-title">
      <div className="about-services-container">
        <header className="about-services-intro">
          <span className="about-services-label">What We Offer</span>
          <h2 id="about-services-title">Professional Support for Every Application</h2>
          <p>Explore our document, application and online support services—available to clients in Nepal and worldwide.</p>
        </header>

        <ul className="about-services-grid">
          {services.map(({ title, description, icon: Icon, accent, slug }) => (
            <li className="about-services-card" key={title}>
              <span className={`about-services-icon about-services-icon-${accent}`} aria-hidden="true"><Icon /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <a href={`/services?category=${slug}`} aria-label={`Explore ${title}`}>
                <span>Explore Services</span>
                <ArrowRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
