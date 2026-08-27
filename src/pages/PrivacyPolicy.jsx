import { useEffect } from 'react'
import { Info } from 'lucide-react'

const sections = [
  {
    title: 'Introduction',
    paragraphs: [
      'CV & Cover Letter Nepal (“we”, “our” or “us”) provides independent online assistance with CVs, cover letters, professional documents, online forms, applications and selected booking-related services.',
      'This Privacy Policy explains what information may be collected or received, how it may be used and shared, how long it may be retained, and the choices available to website users, clients and job applicants.',
      'By using this website or voluntarily providing information to us, you acknowledge the practices described in this Privacy Policy.',
    ],
  },
  {
    title: 'Information We May Receive',
    paragraphs: ['Depending on the enquiry, service or application, individuals may voluntarily provide:'],
    list: [
      'Full name, address, country and contact details.',
      'Phone number, WhatsApp number and email address.',
      'Professional experience, education, skills and qualifications.',
      'Service requirements and communication records.',
      'Information required to prepare documents or complete authorised forms.',
      'Supporting documents such as photographs, certificates, transcripts, identification documents or application records.',
      'Corrections, feedback, approval and delivery instructions.',
      'CVs and recruitment information submitted for career opportunities.',
      'Other information reasonably required for a confirmed service.',
    ],
    after: ['We request only information that is reasonably necessary to understand an enquiry, provide a confirmed service or consider a career application.'],
  },
  {
    title: 'Payment and Transaction Information',
    paragraphs: ['When a client makes the 50% advance payment, remaining 50% payment or an authorised third-party payment, we may receive or retain limited payment-related information, including:'],
    list: ['Payer name.', 'Payment amount and date.', 'Transaction or reference number.', 'Payment receipt or confirmation.', 'Payment status.', 'Relevant service or order reference.', 'Records of refunds, corrections or payment disputes.'],
    after: [
      'We do not request or intentionally collect bank PINs, complete payment-card details, mobile banking passwords, security answers or OTP codes.',
      'Payment records may be used to confirm the advance payment, begin the service, confirm the remaining payment, complete final delivery, maintain financial records, resolve disputes and prevent fraud.',
    ],
  },
  {
    title: 'Sensitive Information',
    paragraphs: [
      'Clients should share sensitive documents only after confirming the service and through the agreed private communication channel.',
      'Do not provide the following through general website forms, email or ordinary messages:',
    ],
    list: ['Passwords or account login credentials.', 'Bank PINs or complete payment-card details.', 'Mobile banking credentials.', 'OTP or verification codes.', 'Security answers.', 'Identification documents unrelated to the requested service.'],
    after: [
      'Where login or real-time verification is required by an external portal, clients should enter passwords, OTP codes and other authentication information themselves whenever reasonably possible.',
      'We do not request that clients permanently disclose account credentials.',
    ],
  },
  {
    title: 'How Information May Be Used',
    paragraphs: ['Information may be used to:'],
    list: [
      'Respond to enquiries.', 'Understand service requirements.', 'Prepare quotations and estimated delivery times.', 'Confirm and provide requested services.', 'Draft, edit, format and deliver documents.', 'Complete forms or applications authorised by the client.', 'Communicate regarding progress, corrections, approval and delivery.', 'Confirm the 50% advance and remaining 50% service payments.', 'Process or confirm authorised third-party payments.', 'Maintain necessary service, payment and transaction records.', 'Consider applicants for current or future career opportunities.', 'Respond to complaints and resolve disputes.', 'Detect fraud, misuse or technical problems.', 'Comply with applicable legal obligations.',
    ],
    after: ['Information will not be used for a materially different purpose without appropriate notice or permission.'],
  },
  {
    title: 'CV and Service Information Forms',
    paragraphs: [
      'Clients may be asked to complete a CV, cover letter or service information form containing personal, educational and professional details required to provide the requested service.',
      'Completed forms may be received through WhatsApp, email, an online form or another agreed private communication channel.',
      'Information submitted through these forms will be used only to:',
    ],
    list: ['Understand the client’s requirements.', 'Prepare, edit and deliver the confirmed service.', 'Contact the client regarding missing information or corrections.', 'Maintain necessary service records.', 'Resolve complaints or disputes relating to the service.'],
    after: ['Clients should provide only relevant and accurate information. Passwords, OTP codes, bank PINs, complete payment-card details and unrelated identification information must not be included in CV or service information forms.'],
  },
  {
    title: 'Website and Quotation Tools',
    paragraphs: [
      'The website may allow users to select a service and prepare a WhatsApp message for review. The message is not sent until the user chooses to continue through WhatsApp.',
      'Information entered into a website form is received by us only when the user submits or transmits it through the available communication method.',
      'Once information is sent through WhatsApp, email, an online form provider or another external service, it becomes subject to that provider’s systems and privacy practices.',
      'Completing a quotation tool, submitting an information form or sending an enquiry does not automatically confirm an order. A service is confirmed only after the quotation, service scope, payment requirements and other relevant conditions have been agreed.',
    ],
  },
  {
    title: 'Technical Information and Hosting',
    paragraphs: ['The website is hosted using a third-party hosting provider. The hosting provider may automatically process limited technical information required to operate and secure the website, including:'],
    list: ['Internet Protocol (IP) address.', 'Browser and device type.', 'Date and time of access.', 'Requested pages.', 'General diagnostic, security or server-log information.'],
    after: [
      'This information may be processed by the hosting provider according to its own privacy and security practices.',
      'We do not currently use information collected through this website for targeted advertising or automated decision-making.',
    ],
  },
  {
    title: 'WhatsApp, Email and Other Providers',
    paragraphs: [
      'Communication through WhatsApp, email, social media, online forms and other external services is also governed by the privacy practices of the respective provider.',
      'External providers may include:',
    ],
    list: ['WhatsApp and Meta.', 'Email service providers such as Gmail.', 'Website hosting providers.', 'Online form providers, where applicable.', 'Banks, digital wallets and payment providers.', 'Government websites and application portals.', 'VFS or similar application service providers.', 'Airlines, hotels, insurers and booking platforms.', 'Other services selected or authorised by the client.'],
    after: [
      'These providers may process or store information outside Nepal. We do not control their independent systems, security measures, data locations, retention periods or privacy practices.',
      'Individuals should review the privacy terms of any external service they choose to use.',
    ],
  },
  {
    title: 'Document Handling',
    paragraphs: ['Clients should provide only the information and documents required for the confirmed service.', 'Documents and completed information forms received from a client will be used only to:'],
    list: ['Provide the agreed service.', 'Make corrections requested by the client.', 'Submit information to an external service authorised by the client.', 'Maintain records where reasonably or legally required.', 'Address complaints, disputes, fraud or misuse.'],
    after: ['We will not use a client’s CV, photograph, passport, certificate, completed information form or other personal document as a public sample, testimonial, advertisement or portfolio item without separate permission.'],
  },
  {
    title: 'Career Applications',
    paragraphs: ['Individuals may submit a CV or expression of interest for a current or future career opportunity.', 'Career-application information may be used to:'],
    list: ['Review suitability for a current opportunity.', 'Consider the applicant for a relevant future opportunity.', 'Communicate about the recruitment process.', 'Conduct interviews or reasonable recruitment checks.', 'Maintain necessary recruitment records.', 'Comply with applicable legal obligations.'],
    after: [
      'Applicants should provide only information relevant to employment consideration. Passport copies, bank details, passwords, OTP codes and unrelated sensitive documents should not be included in an initial career application.',
      'Submitting an application does not guarantee a response, interview, placement or employment offer.',
      'Career-application information will not be publicly displayed, used as promotional content or shared for unrelated purposes without appropriate permission or legal authority.',
    ],
  },
  {
    title: 'Information Sharing',
    paragraphs: ['We do not sell or rent personal information.', 'Information may be shared only when reasonably necessary to:'],
    list: ['Deliver a service authorised by the client.', 'Submit information to a government, application or booking system selected by the client.', 'Work with a service provider required to complete the agreed service.', 'Process or confirm a payment or booking.', 'Conduct a recruitment process authorised by the applicant.', 'Comply with a valid legal or regulatory obligation.', 'Protect the rights, safety or security of clients, applicants, the business or others.', 'Investigate suspected fraud, misuse or unlawful activity.'],
    after: ['Only information reasonably required for the relevant purpose should be shared.'],
  },
  {
    title: 'Data Retention and Deletion',
    paragraphs: ['Personal information is retained only for as long as reasonably necessary to provide the service, communicate with the individual, complete corrections, maintain required records or resolve a complaint or dispute.', 'Unless a longer period is requested, agreed or legally required:'],
    list: [
      'Temporary working copies of sensitive client documents and completed service information forms should normally be deleted within 90 days after completion and delivery.',
      'Unconfirmed enquiries may be deleted when they are no longer reasonably required.',
      'Payment, transaction and essential service records may be retained for the period reasonably or legally required for accounting, fraud prevention, complaints or dispute resolution.',
      'Career-application information submitted for a current opening may be retained while the relevant recruitment process remains active and for a reasonable period afterward.',
      'Where an applicant gives permission to be considered for future opportunities, their CV and application information may be retained for up to six months.',
      'Career-application information may be retained for longer where the applicant agrees, an active recruitment process continues or retention is reasonably required by law or for dispute resolution.',
    ],
    after: ['Deleting information from our active records may not immediately remove copies retained in device backups, email systems, WhatsApp systems, online form platforms, payment systems or other third-party services. Those copies remain subject to the respective provider’s retention practices.'],
  },
  {
    title: 'Security',
    paragraphs: [
      'We take reasonable administrative and technical precautions when handling client and applicant information, including limiting access and using appropriate private communication channels.',
      'However, no website, online form, internet communication, messaging platform, payment system or electronic storage method can be guaranteed to be completely secure.',
      'Individuals are responsible for using secure devices, protecting their accounts and avoiding unnecessary disclosure of sensitive information.',
      'If a significant security incident affecting information held directly by us is identified, reasonable steps will be taken to limit the impact and notify affected individuals where appropriate or legally required.',
    ],
  },
  {
    title: 'User and Applicant Rights',
    paragraphs: ['Subject to applicable legal and record-keeping requirements, individuals may contact us to:'],
    list: ['Ask whether we hold their personal information.', 'Request access to information held directly by us.', 'Correct inaccurate or incomplete information.', 'Withdraw permission for an optional use of their information.', 'Request deletion of information that is no longer required.', 'Withdraw from future career consideration.', 'Raise a concern about how their information has been handled.'],
    after: ['A reasonable identity check may be required before providing, correcting or deleting personal information.', 'Some information may need to be retained where necessary for legal obligations, payment records, fraud prevention, security, complaints or dispute resolution.'],
  },
  {
    title: 'Children’s Information',
    paragraphs: ['Children and individuals who cannot legally provide valid consent should not submit personal or sensitive information without the involvement and consent of a parent or legal guardian.', 'Where a service concerns a child, the parent or legal guardian should provide or authorise the required information and remain involved throughout the service.'],
  },
  {
    title: 'External Links',
    paragraphs: ['This website may contain links to third-party websites, portals and services.', 'A link does not mean that we own, control or endorse the third party’s privacy or security practices.', 'We are not responsible for the independent content, availability, security, terms or privacy practices of external websites and services.'],
  },
  {
    title: 'Changes to This Privacy Policy',
    paragraphs: ['This Privacy Policy may be updated when our services, payment processes, recruitment practices, website features, information-handling practices or applicable requirements change.', 'The latest version will be published on this page with an updated revision date.', 'Continued use of the website after an update means that the latest published policy will apply to subsequent interactions.'],
  },
  {
    title: 'Contact Us',
    paragraphs: ['For privacy-related questions, corrections, access requests, deletion requests or withdrawal from future career consideration, contact:'],
    contact: true,
  },
]

const slugify = (title) => title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function PolicySection({ section, index }) {
  return <section className="terms-section" id={slugify(section.title)}>
    <h2><span>{index + 1}.</span> {section.title}</h2>
    {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    {section.list && <ul>{section.list.map(item => <li key={item}>{item}</li>)}</ul>}
    {section.after?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    {index === 0 && <div className="privacy-page-notice"><Info aria-hidden="true" /><p>Please avoid sending passwords, OTP codes, bank details or unnecessary sensitive documents.</p></div>}
    {section.contact && <address>
      <strong>CV &amp; Cover Letter Nepal</strong>
      <span>Location: Kathmandu, Nepal</span>
      <span>WhatsApp: <a href="https://wa.me/9779862989407" target="_blank" rel="noopener noreferrer">+977 9862989407</a></span>
      <span>Email: <a href="mailto:cvandcoverletternepal@gmail.com">cvandcoverletternepal@gmail.com</a></span>
    </address>}
  </section>
}

export default function PrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Privacy Policy | CV & Cover Letter Nepal'
    return () => { document.title = previousTitle }
  }, [])

  return <main className="terms-page privacy-legal-page">
    <section className="terms-hero" aria-labelledby="privacy-page-title">
      <div className="terms-hero-content">
        <span className="terms-badge">Privacy Notice</span>
        <h1 id="privacy-page-title">Privacy Policy</h1>
        <p>This policy explains how we collect, use, protect and manage personal information when you use our website or services.</p>
      </div>
    </section>

    <div className="terms-shell">
      <section className="terms-information" aria-label="Privacy Policy information">
        <div><span>Last Updated</span><strong>15 August 2026</strong></div>
        <div><span>Applies To</span><strong>Website &amp; Services</strong></div>
        <div><span>Contact</span><a href="mailto:cvandcoverletternepal@gmail.com">cvandcoverletternepal@gmail.com</a></div>
      </section>

      <div className="terms-layout">
        <aside className="terms-toc">
          <details>
            <summary>On This Page <span>{sections.length} sections</span></summary>
            <nav aria-label="Privacy Policy sections">
              <ol>
                {sections.map((section, index) => <li key={section.title}><a href={`#${slugify(section.title)}`}>{index + 1}. {section.title}</a></li>)}
              </ol>
            </nav>
          </details>
        </aside>

        <article className="terms-document" aria-label="Privacy Policy">
          {sections.map((section, index) => <PolicySection section={section} index={index} key={section.title} />)}
        </article>
      </div>
    </div>
  </main>
}
