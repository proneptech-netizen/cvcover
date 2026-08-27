import { useEffect, useMemo, useState } from 'react'
import { MessageCircle, Minus, Plus, Search } from 'lucide-react'

const categories = ['All Questions', 'General Services', 'Quotes & Payments', 'Documents & Security', 'CV & Career', 'Study & Visa', 'Government & EPS', 'Travel', 'Delivery & Revisions', 'Privacy']

const faqs = [
  {
    id: 'services-provided',
    category: 'General Services',
    question: 'What services do you provide?',
    answer: 'We provide professional CVs and cover letters, Europass services, study and visa documents, government and online form assistance, EPS and Korea support, travel-related assistance, and other document preparation services tailored to individual requirements.',
  },
  {
    id: 'online-service',
    category: 'General Services',
    question: 'Is your service completely online?',
    answer: 'Yes. You can enquire, receive a quotation, share the required information and documents, review the completed work, request applicable revisions and receive final delivery online.',
  },
  {
    id: 'fixed-prices',
    category: 'Quotes & Payments',
    question: 'Why are fixed prices not displayed for every service?',
    answer: 'Each request can vary by document type, complexity, urgency and required support. We confirm the scope, delivery time and total fee in a clear quotation before work begins.',
  },
  {
    id: 'request-quotation',
    category: 'Quotes & Payments',
    question: 'How can I request a quotation?',
    answer: 'Contact us through WhatsApp and explain the service you need. After reviewing your requirements, we will confirm the scope, information required, delivery time, revision support and total fee.',
  },
  {
    id: 'advance-payment',
    category: 'Quotes & Payments',
    question: 'Is full payment required before work begins?',
    answer: 'For standard document services, a 50% advance is required after you accept the quotation. The remaining 50% is paid after you review the completed work and before final delivery.',
  },
  {
    id: 'send-documents',
    category: 'Documents & Security',
    question: 'How do I send my documents?',
    answer: 'After the quotation is confirmed, we will tell you which information and documents are required and provide instructions for sending them securely through the agreed online channel.',
  },
  {
    id: 'never-send',
    category: 'Documents & Security',
    question: 'What information should I never send?',
    answer: 'Never share passwords, OTP codes, bank PINs or complete payment-card details. Only provide information that is genuinely required for the confirmed service.',
  },
  {
    id: 'ats-friendly',
    category: 'CV & Career',
    question: 'Are your CVs ATS-friendly?',
    answer: 'Yes. Our ATS-friendly CVs use clear structure, relevant headings, professional formatting and role-appropriate wording to support compatibility with applicant tracking systems.',
  },
  {
    id: 'country-cvs',
    category: 'CV & Career',
    question: 'Do you prepare CVs for different countries?',
    answer: 'Yes. We prepare destination-specific CVs and resumes for countries and regions including Australia, Canada, the United Kingdom, the United States, Europe and the Gulf region, based on the client’s goals and requirements.',
  },
  {
    id: 'cabin-crew-no-experience',
    category: 'CV & Career',
    question: 'Do you create Cabin Crew CVs for candidates with no previous cabin crew experience?',
    answer: 'Yes. We can professionally present relevant customer service, hospitality, communication, grooming, swimming and cabin crew training experience without adding false or misleading information.',
  },
  {
    id: 'cabin-crew-airline-tailoring',
    category: 'CV & Career',
    question: 'Can you tailor my CV for a specific airline?',
    answer: 'Yes. If you provide the airline name or vacancy details, we can tailor your CV and cover letter to the role’s stated requirements.',
  },
  {
    id: 'cabin-crew-pricing',
    category: 'CV & Career',
    question: 'Is there a separate charge for a Cabin Crew CV?',
    answer: 'No. Cabin Crew CVs and cover letters follow our standard CV and cover letter pricing. A Cabin Crew CV costs NPR 499 for Standard delivery, NPR 599 for Priority delivery and NPR 699 for Express delivery.',
  },
  {
    id: 'cabin-crew-no-guarantee',
    category: 'CV & Career',
    question: 'Do you guarantee an interview or Cabin Crew job?',
    answer: 'No. We professionally prepare your application documents, but all shortlisting, interview, selection and employment decisions are made entirely by the airline or employer.',
  },
  {
    id: 'study-visa-documents',
    category: 'Study & Visa',
    question: 'Do you prepare SOPs and student visa documents?',
    answer: 'Yes. We prepare SOPs, personal statements, admission and scholarship essays, study plans, motivation letters, Genuine Student statements, visa cover letters, appeal and reconsideration letters, and other supporting documents according to the confirmed application requirements.',
  },
  {
    id: 'no-guarantee',
    category: 'Study & Visa',
    question: 'Do you guarantee admission, scholarships or visa approval?',
    answer: 'No. We provide professional document support, but we do not guarantee admission, scholarships, visas, appointments or decisions made by institutions, government authorities or other third parties.',
  },
  {
    id: 'online-forms',
    category: 'Government & EPS',
    question: 'Do you provide online form assistance?',
    answer: 'Yes. We assist with eligible online forms and applications, including passport, PAN, National ID, driving licence, police report and selected government-service forms. Official charges and third-party fees are separate unless included in the confirmed quotation.',
  },
  {
    id: 'eps-korea',
    category: 'Government & EPS',
    question: 'Do you provide EPS and Korea form support?',
    answer: 'Yes. We provide EPS-TOPIK application assistance, EPS form support, document preparation and verification guidance based on the available application process and the information supplied by the client.',
  },
  {
    id: 'travel-assistance',
    category: 'Travel',
    question: 'What travel-related assistance is available?',
    answer: 'Travel-related assistance may include flight tickets, hotel bookings, travel insurance and VFS appointment support. Availability, official charges and third-party costs are confirmed before payment.',
  },
  {
    id: 'revisions',
    category: 'Delivery & Revisions',
    question: 'Are revisions available?',
    answer: 'Yes. Applicable revision support is confirmed in your quotation. Revisions cover agreed changes within the confirmed scope and must be requested within the stated revision period.',
  },
  {
    id: 'delivery-time',
    category: 'Delivery & Revisions',
    question: 'How long does preparation take?',
    answer: 'Delivery time depends on the document type, complexity, urgency and completeness of the information provided. The expected delivery schedule is confirmed in your quotation before work begins.',
  },
  {
    id: 'confidentiality',
    category: 'Privacy',
    question: 'Is client information kept confidential?',
    answer: 'Yes. Client documents and personal information are handled confidentially and used only for the confirmed service, except where disclosure is required by law or authorised by the client.',
  },
]

const whatsappUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20have%20a%20question%20about%20your%20services.'

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('All Questions')
  const [searchQuery, setSearchQuery] = useState('')
  const [openId, setOpenId] = useState(faqs[0].id)
  const normalizedSearch = searchQuery.trim().toLowerCase()

  const filteredFaqs = useMemo(() => faqs.filter((faq) => {
    const categoryMatches = activeCategory === 'All Questions' || faq.category === activeCategory
    const searchMatches = !normalizedSearch || `${faq.question} ${faq.answer}`.toLowerCase().includes(normalizedSearch)
    return categoryMatches && searchMatches
  }), [activeCategory, normalizedSearch])

  useEffect(() => {
    setOpenId(filteredFaqs[0]?.id ?? null)
  }, [activeCategory, normalizedSearch])

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-container">
        <div className="faq-intro">
          <span className="faq-label">Help Centre</span>
          <h2 id="faq-title">Frequently Asked Questions</h2>
          <p>Clear answers about our services, quotations, payments, documents, delivery, revisions and privacy.</p>
        </div>

        <label className="faq-search">
          <Search aria-hidden="true" />
          <span className="sr-only">Search frequently asked questions</span>
          <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search for questions, keywords, or topics..." />
        </label>

        <div className="faq-categories" aria-label="Filter frequently asked questions by category">
          {categories.map((category) => <button type="button" key={category} className={category === activeCategory ? 'active' : ''} onClick={() => setActiveCategory(category)} aria-pressed={category === activeCategory}>{category}</button>)}
        </div>

        <div className="faq-results-header" aria-live="polite">{filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}</div>

        {filteredFaqs.length ? (
          <div className="faq-grid">
            {filteredFaqs.map((faq) => {
              const isOpen = faq.id === openId
              const answerId = `faq-answer-${faq.id}`
              return (
                <article className={`faq-item${isOpen ? ' open' : ''}`} key={faq.id}>
                  <button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenId(isOpen ? null : faq.id)}>
                    <span>{faq.question}</span>
                    <span className="faq-toggle" aria-hidden="true">{isOpen ? <Minus /> : <Plus />}</span>
                  </button>
                  <div id={answerId} className="faq-answer-wrap" role="region" aria-hidden={!isOpen}>
                    <div className="faq-answer"><p>{faq.answer}</p></div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : <div className="faq-no-results">No matching questions found. Try a different search or contact us directly.</div>}

        <div className="faq-support-banner">
          <span className="faq-support-icon"><MessageCircle aria-hidden="true" /></span>
          <div><h3>Still have questions?</h3><p>Chat directly with our document specialist.</p></div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  )
}
