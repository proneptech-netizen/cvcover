import { sitePath } from '../utils/sitePath.js'
import { useEffect, useRef, useState } from 'react'
import {
  Award, BadgeCheck, BookOpen, BookOpenCheck, BriefcaseBusiness, Building, Building2,
  CalendarCheck2, ClipboardList, Contact, ContactRound, FileCheck2, FilePenLine,
  FilePlus2, FileSearch, FileText, FileUser, FolderCheck, Globe2,
  GraduationCap, Hotel, IdCard, Info, Landmark, Languages, ListChecks, Mail,
  MapPin, MessageCircle, Monitor, PanelsTopLeft, Plane, PlaneTakeoff, RefreshCw,
  Shield, ShieldCheck, ShieldUser, SquarePen, Star, TicketsPlane, UserCog, UserRoundCheck,
  UserRoundCog, UsersRound,
} from 'lucide-react'

const quoteUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20request%20a%20quotation%20for%20a%20service.'

const categories = [
  {
    slug: 'cv-career', tab: 'CV & Career', number: '01', title: 'CV & Career Documents', count: '10 specialised services', icon: FileText,
    description: 'Professional CVs and cover letters tailored to your career stage, target role and destination.',
    services: [
      ['ATS-Friendly CV / Resume', 'Optimised for applicant tracking systems to improve shortlisting.', FileUser],
      ['Student / Fresh Graduate CV', 'Perfect for students and fresh graduates starting their careers.', GraduationCap],
      ['Professional / Experienced CV', 'Showcase your experience and achievements with impact.', BriefcaseBusiness],
      ['International CV', 'Destination-specific formatting to meet global recruitment standards.', Globe2],
      ['Academic & Research CV', 'Designed for researchers, academics and higher education roles.', GraduationCap],
      ['Career Change CV', 'Highlight transferable skills for a successful career transition.', RefreshCw],
      ['Job-Specific Cover Letter', 'Tailored to the role and company to boost your chances.', Mail],
      ['General Cover Letter', 'A strong, versatile cover letter for various opportunities.', FilePenLine],
      ['CV Review, Rewrite & Formatting', 'Improve clarity, structure and presentation for better results.', ListChecks],
      ['Multilingual CV Support', 'CVs in multiple languages to suit your target opportunities.', Languages],
    ],
  },
  {
    slug: 'europass', tab: 'Europass', number: '02', title: 'Europass Services', count: '4 specialised services', icon: ContactRound,
    description: 'Europass-format documents and profile support for education and employment opportunities across Europe.',
    services: [
      ['Europass CV', 'A professionally structured Europass CV tailored to your education, experience and target opportunity.', ContactRound],
      ['Europass Cover Letter', 'A focused Europass-format cover letter aligned with your selected role, course or institution.', Mail],
      ['Europass CV Update, Review & Formatting', 'Review, improve and professionally format your existing Europass CV for clarity and consistency.', ListChecks],
      ['Europass Profile Creation & Setup', 'Assistance creating and organising your Europass profile with accurate, client-approved information.', UserCog],
    ],
  },
  {
    slug: 'study-visa', tab: 'Study & Visa', number: '03', title: 'Study & Visa Documents', count: '10 specialised services', icon: GraduationCap,
    description: 'Professional document preparation and review support for international education and visa applications.',
    note: 'Prepared using genuine, client-approved information.',
    services: [
      ['Statement of Purpose (SOP)', 'A clear, personalised statement aligned with your academic background, chosen course and future goals.', FilePenLine],
      ['Genuine Student Statement (GS)', 'Structured GS support based solely on genuine, client-approved personal and academic information.', UserRoundCheck],
      ['Admission Essay', 'Clear and personalised admission essays presenting the applicant’s academic background, goals, motivation and suitability for the selected programme.', BookOpen],
      ['Scholarship Essay', 'Well-structured scholarship essays highlighting the applicant’s genuine achievements, goals, financial circumstances and reasons for seeking support.', Award],
      ['Motivation Letter', 'A persuasive, well-structured letter tailored to your chosen programme, institution or opportunity.', FilePenLine],
      ['Study Plan', 'A clear study plan outlining your academic objectives, programme choice and intended progression.', ClipboardList],
      ['Study / Visa Cover Letter', 'A professionally prepared cover letter explaining the purpose and supporting context of your application.', Mail],
      ['Visa Appeal & Reconsideration Letter', 'Professionally structured appeal and reconsideration letters based on the client’s genuine circumstances, supporting documents and the relevant decision notice.', FileCheck2],
      ['Academic Document Review & Editing', 'Review and improvement of selected academic documents for clarity, structure, grammar and consistency.', FileSearch],
      ['Letter of Recommendation (LOR) Support', 'Drafting, review and formatting support based on genuine referee-approved information.', UserRoundCog],
    ],
  },
  {
    slug: 'government', tab: 'Government', number: '04', title: 'Government & Public Services', count: '8 specialised services', icon: Landmark,
    description: 'Assistance with selected government documents, public-service forms and online application processes.',
    disclaimer: 'Official fees, processing times and final decisions are controlled by the relevant authorities.',
    services: [
      ['Passport Online Application — New & Renewal', 'Support completing selected passport application steps using accurate, client-provided information.', BookOpenCheck],
      ['PAN Registration — Personal & Business', 'Assistance with selected PAN registration forms and required application information.', FileUser],
      ['National ID Online Application', 'Support preparing and completing available National ID online application details.', Contact],
      ['Driving Licence Application — New & Renewal', 'Assistance with selected online licence forms, appointments and renewal information.', IdCard],
      ['Police Report Online Application', 'Support completing the available online police clearance application process.', BadgeCheck],
      ['Police Report Consular Verification Support', 'Assistance with selected online steps and document preparation for consular verification.', FileCheck2],
      ['Labour Permit / श्रम स्वीकृति', 'Support for available new, renewal and re-entry labour-permit application processes.', UsersRound],
      ['Other Government & Public Online Forms', 'Assistance with selected official forms, appointments and online applications based on current portal availability.', Landmark],
    ],
  },
  {
    slug: 'korea-eps', tab: 'Korea & EPS', number: '05', title: 'Korea & EPS Services', count: '5 specialised services', icon: Star,
    description: 'Online assistance with selected EPS-TOPIK applications, EPS forms and Korea-related employment documents.',
    disclaimer: 'Services are available only when the relevant official application period and portal are open. Selection and final decisions remain with the responsible authorities.',
    services: [
      ['EPS-TOPIK Exam Online Application', 'Application-form assistance during official registration periods.', Monitor],
      ['EPS Korea Employment Application Support', 'Guidance with selected employment application steps and information.', BriefcaseBusiness],
      ['EPS Form Preparation, Review & Correction', 'Careful review of details, formatting and required corrections.', FileSearch],
      ['Korea Employment Document Support', 'Preparation and review of selected employment-related documents.', FileText],
      ['EPS Registration & Information Update Support', 'Assistance with eligible registration details and permitted updates.', UserRoundCheck],
    ],
  },
  {
    slug: 'travel-booking', tab: 'Travel & Booking', number: '06', title: 'Travel & Booking Services', count: '8 specialised services', icon: Plane,
    description: 'Online assistance with selected travel bookings, insurance enquiries and travel-related documents.',
    disclaimer: 'Fares, availability, appointment slots, insurance approval and booking conditions are controlled by the relevant third-party providers.',
    services: [
      ['International Flight Ticket Booking', 'Assistance with international flight bookings to destinations worldwide.', PlaneTakeoff],
      ['Domestic Flight Ticket Booking', 'Assistance with domestic flight bookings across Nepal.', Plane],
      ['Domestic & International Hotel Booking', 'Assistance with hotel bookings in Nepal and abroad.', Hotel],
      ['Travel Insurance Assistance', 'Guidance with travel insurance enquiries and plan options.', ShieldCheck],
      ['VFS Appointment Assistance', 'Support with VFS appointment booking guidance.', CalendarCheck2],
      ['Travel Itinerary Preparation', 'Assistance with preparing clear and organised travel itineraries.', ListChecks],
      ['Flight Reservation / Itinerary Support', 'Support with flight reservations and itinerary-related information.', TicketsPlane],
      ['Booking Review & Modification Assistance', 'Assistance with reviewing and modifying existing bookings.', SquarePen],
    ],
  },
  {
    slug: 'lok-sewa', tab: 'Lok Sewa', number: '07', title: 'Lok Sewa & Government Job Applications', count: '10 specialised services', icon: FileCheck2,
    description: 'Online application assistance for selected Lok Sewa and government-sector vacancies across Nepal.',
    disclaimer: 'Applications are accepted only during official vacancy periods. Eligibility, examinations, selection and final decisions remain with the relevant authorities.',
    services: [
      ['Federal Public Service Commission Application', 'We assist with online form completion and document submission.', Landmark],
      ['Province Public Service Commission Application', 'We help complete and submit online applications for provincial vacancies.', Building2],
      ['Local Level Vacancy Application', 'We assist with online applications for local level municipality and rural municipality posts.', MapPin],
      ['Nepal Police Application', 'We help fill and submit online applications for Nepal Police vacancies.', ShieldUser],
      ['Armed Police Force Application', 'We assist with online form completion for APF recruitment vacancies.', ShieldCheck],
      ['Nepal Army Application', 'We support online applications for Nepal Army recruitment vacancies.', Shield],
      ['Teacher Service Commission Application', 'We assist with online applications for Teacher Service Commission vacancies.', BookOpen],
      ['Government Bank & Financial Institution Applications', 'We help complete online applications for government banks and financial institutions.', Landmark],
      ['Public Corporation & Government Institution Applications', 'We assist with online applications for public corporations and government institutions.', Building],
      ['Other Public-Sector Vacancy Applications', 'We assist with online applications for other public-sector vacancies.', FileCheck2],
    ],
  },
  {
    slug: 'other', tab: 'Other', number: '08', title: 'Other Services', count: 'Reviewed case by case', icon: FileCheck2,
    description: 'Flexible assistance for document, form and administrative requirements not listed in our main service categories.',
    disclaimer: 'Service availability will be confirmed after reviewing your requirements. We do not assist with unlawful, misleading or unsupported applications.',
    support: true,
    services: [
      ['Custom Document Preparation', 'Professionally structured documents tailored to your stated purpose.', FilePlus2],
      ['Document Review & Formatting', 'Clarity, consistency and presentation improvements for existing files.', FilePenLine],
      ['Custom Online Form Assistance', 'Guided assistance with eligible online forms and information entry.', PanelsTopLeft],
      ['Other Administrative Support', 'Selected administrative assistance considered after reviewing your needs.', FolderCheck],
    ],
  },
]

const validSlugs = new Set(categories.map(({ slug }) => slug))
const getUrlCategory = () => {
  const value = new URLSearchParams(window.location.search).get('category')
  return validSlugs.has(value) ? value : 'cv-career'
}

function ServicesCategoryTabs({ activeSlug, onChange }) {
  const tabRefs = useRef([])
  useEffect(() => {
    if (!window.matchMedia('(max-width: 1000px)').matches) return
    const index = categories.findIndex(({ slug }) => slug === activeSlug)
    tabRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeSlug])
  const selectByIndex = (index) => {
    const next = (index + categories.length) % categories.length
    onChange(categories[next].slug)
    tabRefs.current[next]?.focus()
  }
  const onKeyDown = (event, index) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); selectByIndex(index + 1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); selectByIndex(index - 1) }
    if (event.key === 'Home') { event.preventDefault(); selectByIndex(0) }
    if (event.key === 'End') { event.preventDefault(); selectByIndex(categories.length - 1) }
  }
  return (
    <div className="services-page-tabs-wrap">
      <div className="services-page-tabs" role="tablist" aria-label="Service categories">
        {categories.map((category, index) => (
          <button key={category.slug} ref={(node) => { tabRefs.current[index] = node }} type="button" role="tab"
            id={`services-tab-${category.slug}`} aria-selected={activeSlug === category.slug}
            aria-controls="services-category-panel" tabIndex={activeSlug === category.slug ? 0 : -1}
            onClick={() => onChange(category.slug)} onKeyDown={(event) => onKeyDown(event, index)}>
            {category.tab}
          </button>
        ))}
      </div>
    </div>
  )
}

function ServicesCategoryHeader({ category }) {
  const Icon = category.icon
  return (
    <header className="services-page-category-header">
      <span className="services-page-category-icon" aria-hidden="true"><Icon /></span>
      <div className="services-page-category-copy">
        <span className="services-page-category-label">Category {category.number}</span>
        <div className="services-page-category-title-row"><h2>{category.title}</h2><span>{category.count}</span></div>
        <p>{category.description}</p>
      </div>
    </header>
  )
}

function ServiceCard({ service }) {
  const [title, description, Icon] = service
  return <li className="services-page-card"><span className="services-page-card-icon" aria-hidden="true"><Icon /></span><div><h3>{title}</h3><p>{description}</p></div></li>
}

function ServicesActionArea({ category }) {
  const askUrl = `https://wa.me/9779862989407?text=${encodeURIComponent(`Hello, I would like to ask about your ${category.title}.`)}`
  if (category.support) {
    return <div className="services-page-support"><MessageCircle aria-hidden="true" /><div><h3>Have a requirement not listed above?</h3><p>Share the details and we’ll confirm the scope, price and delivery time.</p></div><div><a href={quoteUrl} target="_blank" rel="noopener noreferrer">Get This Service</a><small>Describe your requirement in the quote form.</small></div></div>
  }
  return <div className="services-page-actions"><a href={quoteUrl} target="_blank" rel="noopener noreferrer">Get This Service</a><span>Select the specific service in the quote form.</span><a href={askUrl} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />Ask on WhatsApp</a></div>
}

function ServicesDisclaimer({ text, note }) {
  if (!text && !note) return null
  return <div className="services-page-disclaimer"><Info aria-hidden="true" /><span>{text || note}</span></div>
}

export default function Services() {
  const [activeSlug, setActiveSlug] = useState(getUrlCategory)
  const activeCategory = categories.find(({ slug }) => slug === activeSlug) || categories[0]

  useEffect(() => {
    const onPopState = () => setActiveSlug(getUrlCategory())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const selectCategory = (slug) => {
    if (slug === activeSlug) return
    window.history.pushState({}, '', `${sitePath('/services')}?category=${slug}`)
    setActiveSlug(slug)
  }

  return (
    <main className="services-page-main">
      <section className="services-page-hero" aria-labelledby="services-page-title">
        <div className="services-page-hero-dots services-page-hero-dots-left" aria-hidden="true" />
        <div className="services-page-hero-dots services-page-hero-dots-right" aria-hidden="true" />
        <div className="services-page-hero-content"><span>Our Services</span><h1 id="services-page-title">Professional Document &amp; Application Services</h1><p>Explore professional document, application and online support services tailored to your career, education and personal requirements.</p></div>
      </section>
      <ServicesCategoryTabs activeSlug={activeSlug} onChange={selectCategory} />
      <section className="services-page-category" id="services-category-panel" role="tabpanel" aria-labelledby={`services-tab-${activeSlug}`} key={activeSlug}>
        <div className="services-page-container">
          <ServicesCategoryHeader category={activeCategory} />
          <ul className="services-page-grid">{activeCategory.services.map((service) => <ServiceCard service={service} key={service[0]} />)}</ul>
          <ServicesActionArea category={activeCategory} />
          <ServicesDisclaimer text={activeCategory.disclaimer} note={activeCategory.note} />
        </div>
      </section>
    </main>
  )
}
