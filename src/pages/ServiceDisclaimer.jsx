import { sitePath } from '../utils/sitePath.js'

const sections = [
  {
    title: 'General Information',
    paragraphs: [
      'The information provided on the CV & Cover Letter Nepal website is intended for general service information and assistance purposes.',
      'Although reasonable efforts are made to keep website information accurate and current, information relating to applications, government services, examinations, visas, employment, travel, insurance and third-party providers may change without notice.',
      'Users should verify important requirements, deadlines, fees and eligibility conditions through the relevant official source before making a decision or submitting an application.',
    ],
  },
  {
    title: 'Independent Service Provider',
    paragraphs: [
      'CV & Cover Letter Nepal is an independent online document-preparation and application assistance provider.',
      'We are not a government authority, embassy, consulate, immigration department, educational institution, examination body, employer, recruitment agency, airline, hotel, insurance company, VFS centre or public agency.',
      'A reference or link to an external organisation does not represent affiliation, partnership, authorisation or endorsement unless expressly and verifiably stated.',
    ],
  },
  {
    title: 'No Legal, Immigration or Regulated Advice',
    paragraphs: [
      'Our document-preparation and application-assistance services do not constitute legal, immigration, financial, tax or other regulated professional advice.',
      'We do not make official decisions regarding eligibility, immigration status, admission, employment, examinations, government applications, insurance or travel.',
      'Users who require regulated or case-specific professional advice should consult an appropriately qualified and authorised professional or the relevant official authority.',
    ],
  },
  {
    title: 'Client-Provided Information',
    paragraphs: ['Documents, forms and applications are prepared using information and supporting materials provided or approved by the client.', 'Clients are responsible for ensuring that their information is:'],
    list: ['Accurate and complete.', 'Genuine and current.', 'Legally obtained.', 'Relevant to the requested service.', 'Authorised for use and submission.'],
    after: ['We may rely on client-provided information and are not required to independently verify every qualification, employment record, identity document, personal statement or supporting document.'],
  },
  {
    title: 'Client Review and Approval',
    paragraphs: ['Clients must carefully check all factual information before using or approving completed work, including:'],
    list: ['Names and dates of birth.', 'Addresses and contact details.', 'Education and employment information.', 'Passport, citizenship and identification details.', 'Institution, employer and application information.', 'Travel dates, destinations and booking details.'],
    after: ['Where reasonably possible, client approval will be requested before an application, form or booking is submitted.', 'Client approval confirms that the client has reviewed and accepted the displayed information.', 'Approval does not remove our responsibility to correct a clear error introduced by us that differs from the information supplied or approved by the client.'],
  },
  {
    title: 'CV and Career Documents',
    paragraphs: ['CVs, cover letters, Europass documents and other career materials are prepared to present the client’s genuine information clearly and professionally.', 'Document preparation does not guarantee:'],
    list: ['Employment.', 'Interview selection.', 'Employer acceptance.', 'Promotion.', 'Salary level.', 'Applicant-tracking-system performance.', 'Any particular recruitment outcome.'],
    after: ['Recruitment decisions remain entirely under the control of employers and recruitment organisations.'],
  },
  {
    title: 'Study and Visa-Related Documents',
    paragraphs: ['Study and visa-related documents must be based on the client’s genuine background, circumstances, intentions and supporting evidence.', 'We do not guarantee:'],
    list: ['Admission or enrolment.', 'Scholarships or financial assistance.', 'Visa approval.', 'Credibility interview results.', 'Immigration outcomes.', 'Processing time.', 'Acceptance of any document by an institution or authority.'],
    after: ['Final decisions are made independently by educational institutions, embassies, immigration authorities and other authorised organisations.'],
  },
  {
    title: 'Government and Public Forms',
    paragraphs: ['Assistance with government or public forms is limited to helping clients enter, organise or submit information they provide or approve.', 'We do not guarantee:'],
    list: ['Application acceptance.', 'Appointment, token or slot availability.', 'Processing or approval time.', 'Government approval.', 'Certificate or licence issuance.', 'Portal availability.', 'Eligibility under official rules.'],
    after: ['Official requirements, deadlines, fees and decisions are controlled by the relevant authority and may change without notice.'],
  },
  {
    title: 'Korea and EPS Services',
    paragraphs: ['Korea- and EPS-related assistance may include general information, form preparation or application support.', 'We are not affiliated with EPS Korea, HRD Korea or any Nepalese or Korean government authority unless expressly stated.', 'Assistance does not guarantee:'],
    list: ['Examination registration.', 'Examination results.', 'Selection or roster placement.', 'Employment or employer matching.', 'Visa issuance.', 'Departure or placement in Korea.', 'Any official EPS outcome.'],
    after: ['Clients must verify current EPS notices, eligibility requirements, fees and deadlines through the appropriate official source.'],
  },
  {
    title: 'Travel, Booking and Insurance Services',
    paragraphs: [
      'Flight, hotel, insurance and travel-related assistance depends on independent third-party providers.',
      'Prices, schedules, routes, baggage rules, room availability, cancellation conditions, insurance coverage, claims, rescheduling charges and refund eligibility are controlled by the relevant provider.',
      'A quotation does not reserve a fare, seat, room, appointment or insurance policy unless the booking is confirmed by the provider.',
      'We do not guarantee:',
    ],
    list: ['Continued availability.', 'Unchanged prices.', 'Schedule stability.', 'Cancellation approval.', 'Insurance coverage or claim approval.', 'Third-party refunds.', 'Performance by an airline, hotel, insurer or booking provider.'],
    after: ['Clients must review all names, dates, routes, baggage allowances, room details, policy coverage and cancellation conditions before approving a booking.'],
  },
  {
    title: 'Third-Party Fees and Refunds',
    paragraphs: [
      'Government fees, examination charges, VFS fees, application fees, airline fares, hotel payments, insurance premiums and other third-party costs are subject to the respective provider’s terms.',
      'We cannot guarantee that a third party will approve, process or complete a cancellation, correction or refund.',
      'Any assistance provided with a third-party refund, claim or correction does not guarantee a successful outcome.',
    ],
  },
  {
    title: 'External Websites and Systems',
    paragraphs: ['The website may contain links to government portals, educational institutions, booking services and other external websites.', 'External websites and systems are operated independently. We do not control their:'],
    list: ['Content or instructions.', 'Security or privacy practices.', 'Technical availability.', 'Processing time.', 'Prices or policies.', 'Deadlines or eligibility requirements.', 'Appointment availability.', 'Decisions or outcomes.'],
    after: ['Users access and use external websites subject to the respective provider’s terms and privacy practices.'],
  },
  {
    title: 'Website Information and Availability',
    paragraphs: [
      'Website information may be changed, corrected or updated when services or external requirements change.',
      'We do not guarantee that the website will always be uninterrupted, error-free or available.',
      'Temporary interruption may occur because of maintenance, hosting issues, network failures, security concerns or events outside our reasonable control.',
      'Website content should not replace current instructions published by the relevant official authority or service provider.',
    ],
  },
  {
    title: 'Prohibited and Fraudulent Requests',
    paragraphs: ['We do not knowingly assist with:'],
    list: ['Forged or fraudulent documents.', 'False qualifications or employment records.', 'Identity theft or impersonation.', 'Misleading applications.', 'Unauthorised access to another person’s account.', 'Attempts to bypass official rules or security.', 'Any unlawful or deceptive activity.'],
    after: ['A service may be refused, suspended or terminated where the supplied information or requested activity appears false, fraudulent, unauthorised or unlawful.'],
  },
  {
    title: 'Passwords and Security Information',
    paragraphs: [
      'Clients should not send passwords, bank PINs, complete card details, mobile banking credentials, security answers or OTP codes through general forms, email or ordinary messages.',
      'Where login or verification is required, clients should enter authentication information themselves whenever reasonably possible.',
      'Clients remain responsible for protecting their accounts, devices and communication channels.',
    ],
  },
  {
    title: 'Correction of Errors',
    paragraphs: ['Reasonable care is taken when preparing documents and entering information.', 'If we introduce a clear error that differs from the information provided or approved by the client, the client should notify us promptly. We will take reasonable steps to correct the affected work without an additional service fee.', 'We are not responsible for errors resulting from:'],
    list: ['Incorrect, incomplete or unclear client information.', 'Information reviewed and approved by the client.', 'Changes made after delivery by the client or another person.', 'Incorrect or outdated third-party instructions.', 'External portal errors or technical failures.', 'Changes in official requirements after the service is completed.'],
  },
  {
    title: 'No Guarantee of Results',
    paragraphs: ['Payment is made for the time, preparation, assistance and deliverables included in the confirmed service—not for a guaranteed decision or result controlled by another organisation.', 'Testimonials, examples, sample documents or previous client outcomes do not guarantee that another client will receive the same result.'],
  },
  {
    title: 'Limitation of Responsibility',
    paragraphs: ['To the extent permitted by applicable law, CV & Cover Letter Nepal is not responsible for indirect, incidental or consequential loss resulting from:'],
    list: ['Decisions made by employers, institutions, governments or third-party providers.', 'External system failures, delays or policy changes.', 'Client-provided errors or failure to review information.', 'Missed deadlines not caused by our confirmed failure.', 'Use of completed work outside its confirmed purpose.', 'Third-party cancellations, refusals or non-performance.', 'Unauthorised access outside our reasonable control.'],
    after: ['Nothing in this Disclaimer excludes responsibility that cannot lawfully be excluded, including rights or remedies protected by applicable consumer law.'],
  },
  {
    title: 'Privacy',
    paragraphs: ['Personal information and supporting documents are handled according to our Privacy Policy.', 'Information shared through WhatsApp, email, online forms or external platforms is also subject to the privacy and security practices of the respective provider.', 'Clients should provide only the information reasonably required for the confirmed service.'],
  },
  {
    title: 'Relationship with Other Terms',
    paragraphs: ['This Service Disclaimer should be read together with our:'],
    list: ['Terms and Conditions.', 'Privacy Policy.', 'Confirmed quotation.', 'Service-specific conditions communicated before work begins.'],
    after: ['If a service-specific written condition applies, it will apply only to that particular service and remains subject to applicable law.'],
  },
  {
    title: 'Updates to This Disclaimer',
    paragraphs: ['This Service Disclaimer may be updated when our services, website features, third-party requirements or applicable laws change.', 'The latest version will be published on this page with an updated revision date.'],
  },
  {
    title: 'Contact Us',
    paragraphs: ['For questions or concerns regarding this Service Disclaimer, contact:'],
    contact: true,
  },
]

const slugify = (title) => title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function LegalText({ children }) {
  const pattern = /(Terms and Conditions|Privacy Policy)/g
  return children.split(pattern).map((part, index) => {
    if (part === 'Terms and Conditions') return <a href={sitePath('/terms-and-conditions')} key={`${part}-${index}`}>{part}</a>
    if (part === 'Privacy Policy') return <a href={sitePath('/privacy-policy')} key={`${part}-${index}`}>{part}</a>
    return <span key={`${part}-${index}`}>{part}</span>
  })
}

function Paragraphs({ items = [] }) {
  return items.map((item) => <p key={item}><LegalText>{item}</LegalText></p>)
}

function LegalList({ items = [] }) {
  if (!items.length) return null
  return <ul>{items.map((item) => <li key={item}><LegalText>{item}</LegalText></li>)}</ul>
}

export default function ServiceDisclaimer() {
  return (
    <main className="terms-page service-disclaimer-page">
      <section className="terms-hero" aria-labelledby="service-disclaimer-title">
        <div className="terms-hero-content">
          <span className="terms-badge">Service Information</span>
          <h1 id="service-disclaimer-title">Service Disclaimer</h1>
          <p>Understand the scope and limitations of our services, your responsibilities, and the role of official authorities and third-party providers.</p>
        </div>
      </section>

      <div className="terms-shell">
        <section className="terms-information" aria-label="Service Disclaimer information">
          <div><span>Last Updated</span><strong>15 August 2026</strong></div>
          <div><span>Applies To</span><strong>All Services &amp; Website Users</strong></div>
          <div><span>Contact</span><a href="mailto:cvandcoverletternepal@gmail.com">cvandcoverletternepal@gmail.com</a></div>
        </section>

        <div className="terms-layout">
          <aside className="terms-toc">
            <details>
              <summary>On This Page <span>{sections.length} sections</span></summary>
              <nav aria-label="Service Disclaimer sections">
                <ol>
                  {sections.map((section, index) => <li key={section.title}><a href={`#${slugify(section.title)}`}>{index + 1}. {section.title}</a></li>)}
                </ol>
              </nav>
            </details>
          </aside>

          <article className="terms-document" aria-label="Service Disclaimer">
            <p className="terms-document-date">Last Updated: 15 August 2026</p>
            {sections.map((section, index) => (
              <section className="terms-section" id={slugify(section.title)} key={section.title}>
                <h2><span>{index + 1}.</span> {section.title}</h2>
                <Paragraphs items={section.paragraphs} />
                <LegalList items={section.list} />
                <Paragraphs items={section.after} />
                {section.contact && (
                  <address>
                    <strong>CV &amp; Cover Letter Nepal</strong>
                    <span>Location: Kathmandu, Nepal</span>
                    <span>WhatsApp: <a href="https://wa.me/9779862989407" target="_blank" rel="noopener noreferrer">+977 9862989407</a></span>
                    <span>Email: <a href="mailto:cvandcoverletternepal@gmail.com">cvandcoverletternepal@gmail.com</a></span>
                  </address>
                )}
              </section>
            ))}
          </article>
        </div>
      </div>
    </main>
  )
}
