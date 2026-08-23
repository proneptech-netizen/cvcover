import { sitePath } from '../utils/sitePath.js'

const sections = [
  {
    title: 'Introduction',
    paragraphs: [
      'Welcome to CV & Cover Letter Nepal (“we”, “our” or “us”). These Terms and Conditions govern the use of our website and the document-preparation, form-assistance, application-support, travel-assistance and other services we provide.',
      'Clients should read these Terms and Conditions before confirming or purchasing a service.',
    ],
  },
  {
    title: 'Acceptance of Terms',
    paragraphs: ['Browsing the website does not by itself create a paid service agreement.', 'By confirming a quotation, paying the 50% advance or instructing us to begin work, the client confirms that they have read, understood and accepted:'],
    list: ['These Terms and Conditions.', 'The confirmed quotation and service scope.', 'Any service-specific conditions communicated before work begins.', 'Our Privacy Policy.', 'Our Service Disclaimer.'],
    after: ['If a client does not agree with these terms, they should not confirm or purchase a service.'],
  },
  {
    title: 'Service Description',
    paragraphs: ['Our services may include:'],
    list: ['CV and career-document preparation.', 'Cover letters and professional correspondence.', 'Europass CV and cover-letter assistance.', 'Study- and visa-related document preparation.', 'Statements, letters and other customised documents.', 'Government and public online-form assistance.', 'Korea- and EPS-related form assistance.', 'Application and appointment assistance.', 'Flight, hotel, insurance and selected travel-related assistance.', 'Other customised administrative or document support agreed with the client.'],
    after: ['The exact deliverables, format, price, revisions and estimated completion time depend on the confirmed quotation and service scope.'],
  },
  {
    title: 'Independent Service Provider',
    paragraphs: [
      'CV & Cover Letter Nepal is an independent online assistance provider.',
      'We are not a government authority, embassy, consulate, immigration department, educational institution, examination body, employer, recruitment agency, airline, hotel, insurance company, VFS centre or other official decision-making body.',
      'Any reference or link to an external organisation is provided only to identify or access the relevant service. It does not represent partnership, affiliation, authorisation or endorsement unless expressly and verifiably stated.',
    ],
  },
  {
    title: 'No Professional or Official Advice',
    paragraphs: [
      'Unless expressly stated and legally authorised, our services do not constitute legal, immigration, financial, tax or other regulated professional advice.',
      'Clients remain responsible for reviewing official eligibility requirements, instructions, deadlines and policies and, where necessary, obtaining advice from an appropriately qualified or authorised professional.',
    ],
  },
  {
    title: 'Quotations and Service Scope',
    paragraphs: ['Pricing may depend on:'],
    list: ['The type and number of services requested.', 'Complexity and required preparation or formatting.', 'Document length and available information.', 'Delivery urgency.', 'Number and nature of revisions.', 'Third-party requirements.', 'Additional or customised assistance.'],
    blocks: [
      { paragraphs: ['A quotation and service scope must be confirmed before work begins.', 'The quotation may include:'], list: ['Agreed services and deliverables.', 'Total service fee.', '50% advance amount.', 'Remaining 50% payment amount.', 'Required information and supporting documents.', 'Estimated delivery time.', 'Included revision support.', 'Applicable third-party costs.', 'Any service-specific conditions.'] },
      { paragraphs: ['Unless specifically included, a quotation covers only the deliverables described in the confirmed communication.', 'Additional documents, new information, major changes, a different target role or institution, a new application, urgent processing or work outside the confirmed scope may require an updated quotation.'] },
    ],
  },
  {
    title: 'Client Responsibilities',
    paragraphs: ['The client is responsible for:'],
    list: ['Providing accurate, truthful, current and complete information.', 'Providing genuine and legally obtained documents.', 'Responding to reasonable clarification requests.', 'Checking names, dates, addresses and contact details.', 'Checking education, employment and qualification details.', 'Checking passport, citizenship and identification details.', 'Reviewing the final document, form, application or booking details.', 'Confirming that they are authorised to provide information relating to another person.', 'Meeting external deadlines and eligibility requirements.', 'Using completed work only for lawful purposes.', 'Protecting their accounts, devices and communication channels.', 'Making the required payments within the agreed timeframe.'],
    after: ['Clients must not provide passwords, bank PINs, complete payment-card details, mobile banking credentials, security answers or OTP codes through general forms or ordinary messages.', 'Where login or real-time verification is required, clients should enter passwords, OTP codes and other authentication information themselves whenever reasonably possible.'],
  },
  {
    title: 'Information Forms and Supporting Documents',
    paragraphs: [
      'Clients may be asked to complete a CV, cover letter or service information form and provide relevant supporting documents.',
      'The client is responsible for ensuring that all information supplied is accurate, relevant and complete.',
      'We may rely on information provided or approved by the client and are not required to independently verify every statement, qualification, employment record or supporting document.',
      'Personal information and documents will be handled according to our Privacy Policy.',
    ],
  },
  {
    title: 'Payment Structure',
    paragraphs: ['Unless a different arrangement is expressly agreed in writing, the standard service-fee structure is:'],
    list: ['50% advance payment before work begins.', 'Remaining 50% payment after review and before final delivery, submission, booking or completion of the service.'],
    after: ['Payment instructions will be provided privately after the quotation and service scope have been confirmed.', 'A payment is considered received only after it has been successfully credited or otherwise verified.', 'The client is responsible for payment-provider charges, transfer fees or currency-conversion costs unless the quotation states otherwise.', 'We do not request bank PINs, complete payment-card details, mobile banking passwords, security answers or OTP codes.'],
  },
  {
    title: 'Third-Party Payments',
    paragraphs: [
      'Government fees, examination charges, application fees, VFS fees, airline fares, hotel payments, insurance premiums, taxes and other third-party costs are separate from our service fee unless expressly included in the confirmed quotation.',
      'Third-party costs must be paid in full before the relevant application submission, booking, purchase or transaction.',
      'Where reasonably possible, clients should make third-party payments directly through the relevant official or authorised provider.',
      'Third-party payments are governed by the provider’s own terms, prices, cancellation rules and refund policies.',
    ],
  },
  {
    title: 'Service Commencement',
    paragraphs: ['Work begins only after we have received:'],
    list: ['Confirmation of the quotation and service scope.', 'The 50% advance payment.', 'Required information and supporting documents.', 'Necessary client instructions or authorisation.'],
    after: ['An enquiry, website quotation, incomplete information form or unpaid quotation does not automatically confirm a service or delivery deadline.', 'Delay in providing information, documents or advance payment may affect the estimated completion time.'],
  },
  {
    title: 'Client Review and Approval',
    paragraphs: [
      'Clients must carefully review completed documents and application details before using or approving them.',
      'Where reasonably possible, we will request the client’s approval before submitting an online form, application or booking.',
      'Approval through WhatsApp, email or another agreed communication channel will be treated as confirmation that the client has reviewed and accepted the displayed information.',
      'If the client instructs us to proceed without reviewing the information, the client accepts the risk of errors that a reasonable review could have identified.',
      'Client approval does not remove our responsibility to correct a clear error introduced by us that differs from the information supplied or approved by the client.',
    ],
  },
  {
    title: 'Review Copies and Previews',
    paragraphs: ['Depending on the service, we may provide:'],
    list: ['A review copy.', 'A preview.', 'A summary.', 'An application screenshot.', 'A booking summary.', 'A completion confirmation.'],
    after: ['A review copy or preview is provided only for checking content and factual accuracy. It may be watermarked, reduced in quality, non-editable or otherwise unsuitable for final use.', 'Review copies, previews and internal working files are not final deliverables unless expressly stated.', 'Final approved files, submissions, bookings or service confirmations are provided only after the remaining 50% payment and any required third-party costs have been verified.'],
  },
  {
    title: 'Remaining 50% Payment and Final Release',
    paragraphs: [
      'After the agreed work has been prepared and the applicable review copy, preview or completion summary has been shared, the remaining 50% service fee becomes payable.',
      'For document services, the remaining 50% must be paid before final approved files are released.',
      'For online forms and applications, the remaining 50% and all applicable third-party costs must be paid before final submission unless a different written arrangement has been confirmed.',
      'For travel, hotel, insurance, VFS and booking-related assistance, the remaining 50% service fee and required third-party costs must be paid before the booking, purchase or appointment action is completed.',
      'Failure to pay the remaining balance may result in final delivery, submission or booking being placed on hold.',
    ],
  },
  {
    title: 'Revisions',
    paragraphs: ['Unless a different revision policy is stated in the quotation, document-writing services include up to two reasonable revisions requested within seven calendar days of initial draft delivery.', 'A revision generally covers reasonable corrections or adjustments within the originally confirmed scope.', 'The following may require an additional fee or updated quotation:'],
    list: ['New or previously undisclosed information.', 'A substantially different document.', 'A complete rewrite after approval.', 'A new target job, course, institution, country or application.', 'Changes requested more than seven days after initial delivery.', 'Repeated changes to information previously approved by the client.', 'Work beyond the confirmed service scope.'],
    after: ['Factual errors introduced by us will be corrected without an additional service fee when reported within a reasonable period.'],
  },
  {
    title: 'Turnaround and Delivery',
    paragraphs: ['Delivery times are estimates unless a specific deadline is expressly confirmed in writing.', 'Turnaround may depend on:'],
    list: ['Service complexity.', 'Timely payment.', 'Availability and accuracy of client information.', 'Client response and approval time.', 'Third-party portal availability.', 'Government, institutional or provider processing.', 'Technical failures or events outside our reasonable control.'],
    after: ['Delay caused by incomplete information, late client responses, changed requirements, advance-payment delays, remaining-payment delays or third-party systems may extend the estimated completion time.', 'Final delivery may be made through WhatsApp, email, a download link or another agreed method.', 'Final files will be provided in the format included in the quotation. Editable or source files are included only where expressly stated.'],
  },
  {
    title: 'Cancellations and Refunds',
    paragraphs: ['The following general cancellation and refund rules apply unless different conditions are clearly stated and accepted before payment.'],
    subsections: [
      { title: 'Cancellation Before Work Begins', paragraphs: ['If the client cancels before work begins, the 50% advance may be refunded after deducting any authorised and non-recoverable third-party cost already incurred.'] },
      { title: 'Cancellation After Work Begins', paragraphs: ['If the client cancels after work has started, the advance payment may be applied toward the reasonable value of work already completed and any authorised non-recoverable costs.', 'Any applicable partial refund will depend on the amount of work completed, costs already incurred and the confirmed service scope.'] },
      { title: 'Substantially Completed Work', paragraphs: ['Once the agreed work has been substantially completed and a review copy, preview, summary or completion confirmation has been provided:'], list: ['The advance payment is generally non-refundable.', 'The remaining 50% becomes payable before final delivery, submission or booking.', 'Final files or completion actions may remain on hold until full payment is received.'], after: ['A client’s decision not to use, download or submit substantially completed personalised work does not automatically create a right to a refund.'] },
      { title: 'Completed and Delivered Services', paragraphs: ['Payments for completed and delivered personalised services are generally non-refundable.', 'This does not affect the client’s right to request correction where the delivered work contains a clear error introduced by us or does not materially match the confirmed service scope.'] },
      { title: 'Services We Cannot Complete', paragraphs: ['If we cannot provide a confirmed service for reasons within our control, the client may receive, depending on the circumstances:'], list: ['A correction or replacement service.', 'A reasonable partial refund for the uncompleted portion.', 'A full refund where no meaningful work or authorised third-party payment has been completed.'] },
      { title: 'Client-Provided Information', paragraphs: ['A refund is not normally available where a service fails, is rejected or must be repeated because the client:'], list: ['Provided false, incomplete, inaccurate or late information.', 'Failed to review information before approval.', 'Changed the requirements after work began.', 'Failed to meet an official deadline.', 'Did not satisfy an external eligibility requirement.'] },
      { title: 'Third-Party Payments', paragraphs: ['Government fees, application charges, examination fees, appointment fees, airline fares, hotel payments, insurance premiums and other third-party costs are refundable only according to the respective provider’s rules.', 'We cannot guarantee that a third party will approve or process a refund.'] },
      { title: 'Duplicate or Excess Payments', paragraphs: ['Verified duplicate or excess payments will be returned through an appropriate method after reasonable checks.', 'Nothing in this section excludes any right or remedy that cannot lawfully be excluded under applicable law.'] },
    ],
  },
  {
    title: 'Inactive or Delayed Services',
    paragraphs: ['If a client does not provide required information, approval or payment, the service may be placed on hold.', 'If the client remains inactive for 30 days:'],
    list: ['The service may be closed or archived.', 'The estimated delivery time will no longer apply.', 'Restarting the service may require an updated quotation.', 'The advance may be applied toward work already completed and non-recoverable costs.'],
    after: ['A longer period may be agreed where reasonable.'],
  },
  {
    title: 'Travel and Booking Assistance',
    paragraphs: ['For flight, hotel, insurance or other booking-related assistance:'],
    list: ['Availability and prices are controlled by the relevant provider.', 'A quotation does not reserve a seat, room, fare, appointment or policy.', 'The client must review names, dates, routes, baggage, room details, cancellation rules and other conditions before approval.', 'Name changes, date changes, cancellations and refunds are subject to provider rules and may involve additional charges.', 'Airline schedules, baggage rules, hotel conditions and insurance coverage are determined by the provider.', 'Insurance claims and coverage decisions are made by the insurer.', 'We are not responsible for a provider’s cancellation, schedule change, refusal, insolvency or failure to deliver.'],
    after: ['Any assistance we provide with a cancellation, correction, claim or refund does not guarantee approval by the provider.'],
  },
  {
    title: 'No Guarantee of Outcome',
    paragraphs: ['We do not guarantee:'],
    list: ['Employment or interviews.', 'Admission or scholarships.', 'Visa or immigration approval.', 'Government approval.', 'Examination results or EPS selection.', 'Appointment, token or slot availability.', 'Application acceptance.', 'Processing times.', 'Airline fares or seat availability.', 'Hotel availability.', 'Insurance acceptance or claims.', 'Third-party cancellations or refunds.', 'Any decision controlled by an employer, institution, government authority or external provider.'],
    after: ['Payment is made for the agreed assistance and work performed, not for a guaranteed external outcome.'],
  },
  {
    title: 'Accuracy and Correction of Errors',
    paragraphs: ['We take reasonable care when preparing documents and entering information.', 'If we introduce a clear error that differs from the information supplied or approved by the client, the client should notify us promptly. We will take reasonable steps to correct the affected work without an additional service fee.', 'We are not responsible for errors resulting from:'],
    list: ['Incorrect, incomplete or unclear client information.', 'Information approved by the client.', 'Changes made by the client or another person after delivery.', 'Incorrect instructions from an external authority or provider.', 'Third-party system changes or technical failures.'],
    after: ['If correcting an error requires a third-party payment, responsibility for that payment will depend on the cause of the error and applicable law.'],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      'The website’s original branding, text, graphics, design, layout, forms and service materials may not be copied, reproduced, resold or commercially reused without permission.',
      'After full payment, the client may use the final client-specific document for its intended personal or professional application purpose.',
      'Ownership of third-party fonts, templates, icons, software and other licensed materials remains with the respective owner and is subject to applicable licence terms.',
      'Unless expressly included in the quotation, editable design files, internal notes, working files, templates and production methods are not required to be delivered.',
      'Client information or completed documents will not be publicly used as samples, testimonials or advertising without separate permission.',
    ],
  },
  {
    title: 'Prohibited Use',
    paragraphs: ['Users and clients must not:'],
    list: ['Submit false, forged, stolen or misleading information.', 'Impersonate another person.', 'Request forged, fraudulent or unlawfully altered documents.', 'Violate any law, regulation or third-party right.', 'Misuse government, institutional or booking systems.', 'Attempt to bypass website or portal security.', 'Introduce malware or interfere with website operation.', 'Copy or resell our protected materials without permission.', 'Use our services for deception, fraud or other unlawful activity.'],
    after: ['We may refuse or stop any service that we reasonably believe involves prohibited or unlawful conduct.'],
  },
  {
    title: 'Suspension or Termination of Service',
    paragraphs: ['We may suspend, refuse or terminate a service where:'],
    list: ['The required advance or remaining payment has not been made.', 'The client provides false, suspicious or unlawful information.', 'The client requests prohibited activity.', 'Required information or approval is repeatedly withheld.', 'Communication becomes threatening, abusive or harassing.', 'Continuing the service may violate a law or third-party rule.', 'Continuing the service becomes technically or practically impossible.'],
    after: ['Where a service is terminated, payment and refund treatment will depend on completed work, non-recoverable costs, the reason for termination and applicable law.'],
  },
  {
    title: 'Third-Party Websites and Systems',
    paragraphs: ['Our website or communications may link to external portals and providers.', 'We do not control third-party:'],
    list: ['Eligibility criteria or decisions.', 'Website availability or technical performance.', 'Processing times.', 'Security or privacy practices.', 'Policies, prices or deadlines.', 'Appointment or booking availability.', 'Refund decisions.', 'Content or instructions.'],
    after: ['Clients are responsible for reviewing the terms and privacy policies of external services they choose to use.'],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: ['To the extent permitted by applicable law, CV & Cover Letter Nepal will not be responsible for indirect, incidental or consequential loss resulting from:'],
    list: ['Decisions made by third parties.', 'Missed opportunities not caused by our confirmed failure.', 'Third-party delays, outages or policy changes.', 'Loss of data caused by external platforms.', 'Client-provided errors or failure to review information.', 'Unauthorised access outside our reasonable control.', 'Use of completed work outside the confirmed scope.'],
    after: ['Where liability cannot legally be excluded, it will be limited only to the extent permitted by applicable law.', 'Nothing in these Terms excludes responsibility that cannot lawfully be excluded, including responsibility for fraud, deliberate misconduct or other liability protected by applicable consumer law.'],
  },
  {
    title: 'Events Outside Our Control',
    paragraphs: ['We are not responsible for delay or failure caused by events outside our reasonable control, including:'],
    list: ['Internet, electricity or communication failure.', 'Government or third-party portal outages.', 'Natural disasters or severe weather.', 'Strikes, civil disturbance or public emergency.', 'Government restrictions or changes in law.', 'Cyberattacks or widespread technical disruption.', 'Illness or other serious operational emergencies.'],
    after: ['We will take reasonable steps to communicate significant delays and resume the affected service when reasonably possible.'],
  },
  {
    title: 'Privacy',
    paragraphs: ['Personal information, completed information forms, supporting documents and payment confirmations are handled according to our Privacy Policy.', 'By providing information through WhatsApp, email, online forms, payment services or external platforms, the client acknowledges that those providers operate under their own privacy practices.', 'Clients should share only the information and documents necessary for the confirmed service.'],
  },
  {
    title: 'Electronic Communications',
    paragraphs: ['The client agrees that quotations, payment confirmations, approvals, revisions, notices and other service communications may be exchanged electronically through WhatsApp, email or another agreed channel.', 'Electronic confirmation may be relied upon as evidence of client instructions, approval, payment status and service scope, subject to applicable law.', 'Clients are responsible for ensuring that their contact details remain accurate and secure.'],
  },
  {
    title: 'Changes to Services or Terms',
    paragraphs: ['We may update our services or these Terms and Conditions when business practices, payment processes, website features, external requirements or applicable laws change.', 'The latest version will be published on this page with an updated revision date.', 'Changes will apply to future enquiries and services. A confirmed service will remain subject to the terms accepted when it was confirmed unless both parties agree otherwise or a change is legally required.'],
  },
  {
    title: 'Governing Law and Dispute Resolution',
    paragraphs: ['These Terms and Conditions are governed by the applicable laws of Nepal.', 'If a concern or dispute arises, the client should first contact us and provide reasonable details so that both parties can attempt to resolve the matter directly and fairly.', 'If the matter cannot be resolved through direct communication, either party may use the remedies available under applicable Nepalese law and approach a competent authority or court with jurisdiction.'],
  },
  {
    title: 'Severability and No Waiver',
    paragraphs: ['If any part of these Terms is found to be invalid or unenforceable, the remaining provisions will continue to apply to the extent permitted by law.', 'Failure to enforce a provision on one occasion does not permanently waive the right to enforce it later.'],
  },
  {
    title: 'Entire Agreement',
    paragraphs: ['These Terms and Conditions, the Privacy Policy, the Service Disclaimer, the confirmed quotation and any service-specific conditions communicated and accepted before work begins form the agreement between the client and CV & Cover Letter Nepal regarding the relevant service.', 'If a service-specific written condition conflicts with these general Terms, the service-specific condition will apply only to that service, subject to applicable law.'],
  },
  {
    title: 'Contact Us',
    paragraphs: ['For questions, complaints, payment concerns or service-related issues, contact:'],
    contact: true,
  },
]

const slugify = (title) => title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function LegalText({ children }) {
  const parts = children.split('Privacy Policy')
  if (parts.length === 1) return children

  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 && <a href={sitePath('/privacy-policy')}>Privacy Policy</a>}
    </span>
  ))
}

function Paragraphs({ items = [] }) {
  return items.map((item) => <p key={item}><LegalText>{item}</LegalText></p>)
}

function LegalList({ items = [] }) {
  if (!items.length) return null
  return <ul>{items.map((item) => <li key={item}><LegalText>{item}</LegalText></li>)}</ul>
}

function ContentBlock({ block }) {
  return <><Paragraphs items={block.paragraphs} /><LegalList items={block.list} /><Paragraphs items={block.after} /></>
}

export default function TermsAndConditions() {
  return (
    <main className="terms-page">
      <section className="terms-hero" aria-labelledby="terms-page-title">
        <div className="terms-hero-content">
          <span className="terms-badge">Terms of Use</span>
          <h1 id="terms-page-title">Terms &amp; Conditions</h1>
          <p>These terms explain the rules, responsibilities and service conditions that apply when you use our website or confirm a service.</p>
        </div>
      </section>

      <div className="terms-shell">
        <section className="terms-information" aria-label="Terms information">
          <div><span>Last Updated</span><strong>15 August 2026</strong></div>
          <div><span>Applies To</span><strong>Website &amp; Services</strong></div>
          <div><span>Contact</span><a href="mailto:cvandcoverletternepal@gmail.com">cvandcoverletternepal@gmail.com</a></div>
        </section>

        <div className="terms-layout">
          <aside className="terms-toc">
            <details>
              <summary>On This Page <span>{sections.length} sections</span></summary>
              <nav aria-label="Terms and Conditions sections">
                <ol>
                  {sections.map((section, index) => <li key={section.title}><a href={`#${slugify(section.title)}`}>{index + 1}. {section.title}</a></li>)}
                </ol>
              </nav>
            </details>
          </aside>

          <article className="terms-document" aria-label="Terms and Conditions">
            <p className="terms-document-date">Last Updated: 15 August 2026</p>
            {sections.map((section, index) => (
              <section className="terms-section" id={slugify(section.title)} key={section.title}>
                <h2><span>{index + 1}.</span> {section.title}</h2>
                <Paragraphs items={section.paragraphs} />
                <LegalList items={section.list} />
                <Paragraphs items={section.after} />
                {section.blocks?.map((block, blockIndex) => <ContentBlock block={block} key={`${section.title}-${blockIndex}`} />)}
                {section.subsections?.map((subsection) => (
                  <div className="terms-subsection" key={subsection.title}>
                    <h3>{subsection.title}</h3>
                    <ContentBlock block={subsection} />
                  </div>
                ))}
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
