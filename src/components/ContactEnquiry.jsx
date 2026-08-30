import { CheckCircle2, FileLock2, LoaderCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { CABIN_CREW_SERVICE_NAMES, isCabinCrewService } from '../utils/servicePricing.js'
import { submitEnquiry } from '../utils/enquiryApi.js'

const services = [
  'CV & Career Documents',
  CABIN_CREW_SERVICE_NAMES.cv,
  CABIN_CREW_SERVICE_NAMES.coverLetter,
  CABIN_CREW_SERVICE_NAMES.combination,
  CABIN_CREW_SERVICE_NAMES.review,
  CABIN_CREW_SERVICE_NAMES.airlineCoverLetter,
  'Europass Services',
  'Study & Visa Documents',
  'Visa Appeal & Reconsideration Letter',
  'Admission Essay',
  'Scholarship Essay',
  'Government & Public Services',
  'Korea & EPS Services',
  'Travel & Booking Services',
  'Lok Sewa & Government Job Applications',
  'Other Services',
]

const initialValues = { name: '', phone: '', email: '', date: '', service: '', targetAirline: '', message: '', consent: false }

export default function ContactEnquiry() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = event => {
    const { name, value, checked, type } = event.target
    setValues(current => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'service' && !isCabinCrewService(value) ? { targetAirline: '' } : {}),
    }))
    if (errors[name]) setErrors(current => ({ ...current, [name]: '' }))
    if (submitError) setSubmitError('')
  }

  const submit = async event => {
    event.preventDefault()
    if (submitting) return
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Enter your full name.'
    if (!values.phone.trim()) nextErrors.phone = 'Enter your WhatsApp number.'
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (!values.service) nextErrors.service = 'Select the service you need.'
    if (!values.message.trim()) nextErrors.message = 'Describe your requirements.'
    if (!values.consent) nextErrors.consent = 'You must agree before continuing.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const message = `Hello CV & Cover Letter Nepal,

I would like to submit an enquiry.

Full Name: ${values.name.trim()}
WhatsApp Number: ${values.phone.trim()}
Email Address: ${values.email.trim() || 'Not provided'}
Preferred Completion Date: ${values.date || 'Not specified'}
Service Needed: ${values.service}
${isCabinCrewService(values.service) && values.targetAirline.trim() ? `Target Airline or Vacancy: ${values.targetAirline.trim()}\n` : ''}

Requirement:
${values.message.trim()}

I have reviewed and agreed to the Privacy Policy and Terms & Conditions.`
    const whatsappUrl = `https://wa.me/9779862989407?text=${encodeURIComponent(message)}`
    const whatsappWindow = window.open('about:blank', '_blank')

    setSubmitting(true)
    setSubmitError('')
    try {
      await submitEnquiry(values)
      setValues(initialValues)
      if (whatsappWindow) {
        whatsappWindow.opener = null
        whatsappWindow.location.replace(whatsappUrl)
      } else {
        window.location.assign(whatsappUrl)
      }
    } catch (error) {
      whatsappWindow?.close()
      setSubmitError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const errorProps = name => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `contact-enquiry-${name}-error` : undefined,
  })

  return <>
    <section className="contact-enquiry-section" aria-labelledby="contact-enquiry-title">
      <div className="contact-enquiry-container">
        <div className="contact-enquiry-info">
          <span className="contact-enquiry-badge">Send a Message</span>
          <h2 id="contact-enquiry-title">Tell Us What You Need</h2>
          <p className="contact-enquiry-description">Share a few details about your requirement so we can understand the service and support you need.</p>
          <h3>Before you submit</h3>
          <ul className="contact-enquiry-tips">
            <li><CheckCircle2 aria-hidden="true" /><span>Choose the most relevant service category</span></li>
            <li><CheckCircle2 aria-hidden="true" /><span>Mention your preferred completion date</span></li>
            <li><CheckCircle2 aria-hidden="true" /><span>Describe any specific requirement clearly</span></li>
          </ul>
          <div className="contact-enquiry-security"><FileLock2 aria-hidden="true" /><p>Do not include passwords, OTP codes, bank details or unnecessary sensitive documents.</p></div>
          <p className="contact-enquiry-quick">Need a quick answer? Use the WhatsApp option above.</p>
        </div>

        <form className="contact-enquiry-form" onSubmit={submit} noValidate>
          <header><h3>Send Your Enquiry</h3><p>Fields marked * are required.</p></header>
          <div className="contact-enquiry-fields">
            <div className="contact-enquiry-field">
              <label htmlFor="contact-enquiry-name">Full Name *</label>
              <input id="contact-enquiry-name" name="name" type="text" value={values.name} onChange={update} placeholder="Your full name" autoComplete="name" required {...errorProps('name')} />
              {errors.name && <span className="contact-enquiry-error" id="contact-enquiry-name-error" role="alert">{errors.name}</span>}
            </div>
            <div className="contact-enquiry-field">
              <label htmlFor="contact-enquiry-phone">WhatsApp Number *</label>
              <input id="contact-enquiry-phone" name="phone" type="tel" value={values.phone} onChange={update} placeholder="Your WhatsApp number" autoComplete="tel" required {...errorProps('phone')} />
              {errors.phone && <span className="contact-enquiry-error" id="contact-enquiry-phone-error" role="alert">{errors.phone}</span>}
            </div>
            <div className="contact-enquiry-field">
              <label htmlFor="contact-enquiry-email">Email Address</label>
              <input id="contact-enquiry-email" name="email" type="email" value={values.email} onChange={update} placeholder="Your email (optional)" autoComplete="email" {...errorProps('email')} />
              {errors.email && <span className="contact-enquiry-error" id="contact-enquiry-email-error" role="alert">{errors.email}</span>}
            </div>
            <div className="contact-enquiry-field">
              <label htmlFor="contact-enquiry-date">Preferred Completion Date</label>
              <input id="contact-enquiry-date" name="date" type="date" value={values.date} onChange={update} placeholder="Select a date" />
            </div>
            <div className="contact-enquiry-field contact-enquiry-field-wide">
              <label htmlFor="contact-enquiry-service">Service Needed *</label>
              <select id="contact-enquiry-service" name="service" value={values.service} onChange={update} required {...errorProps('service')}>
                <option value="">Select a service category</option>
                {services.map(service => <option value={service} key={service}>{service}</option>)}
              </select>
              {errors.service && <span className="contact-enquiry-error" id="contact-enquiry-service-error" role="alert">{errors.service}</span>}
            </div>
            {isCabinCrewService(values.service) && <div className="contact-enquiry-field contact-enquiry-field-wide">
              <label htmlFor="contact-enquiry-target-airline">Target Airline or Vacancy</label>
              <input id="contact-enquiry-target-airline" name="targetAirline" type="text" value={values.targetAirline} onChange={update} placeholder="Example: Emirates Cabin Crew, Qatar Airways or General Cabin Crew Application" />
            </div>}
            <div className="contact-enquiry-field contact-enquiry-field-wide">
              <label htmlFor="contact-enquiry-message">Your Message *</label>
              <textarea id="contact-enquiry-message" name="message" value={values.message} onChange={update} placeholder="Briefly describe your requirements..." rows="4" required {...errorProps('message')} />
              {errors.message && <span className="contact-enquiry-error" id="contact-enquiry-message-error" role="alert">{errors.message}</span>}
            </div>
          </div>
          <div className="contact-enquiry-consent">
            <input id="contact-enquiry-consent" name="consent" type="checkbox" checked={values.consent} onChange={update} required {...errorProps('consent')} />
            <label htmlFor="contact-enquiry-consent">I have read and agree to the <a href="/privacy-policy/">Privacy Policy</a> and <a href="/terms-and-conditions">Terms &amp; Conditions</a>.</label>
          </div>
          {errors.consent && <span className="contact-enquiry-error contact-enquiry-consent-error" id="contact-enquiry-consent-error" role="alert">{errors.consent}</span>}
          {submitError && <p className="contact-enquiry-submit-error" role="alert">{submitError}</p>}
          <button className="contact-enquiry-submit" type="submit" disabled={submitting}>{submitting ? <LoaderCircle className="contact-enquiry-spinner" aria-hidden="true" /> : <Send aria-hidden="true" />}{submitting ? 'Saving your enquiry…' : 'Continue on WhatsApp'}</button>
          <p className="contact-enquiry-submit-note">Your enquiry is saved securely before WhatsApp opens with the details ready to review and send.</p>
        </form>
      </div>
    </section>
    <section className="contact-enquiry-privacy-preview" aria-labelledby="contact-enquiry-privacy-title">
      <span>Your Privacy</span>
      <h2 id="contact-enquiry-privacy-title">Your Information Is Used Only to Respond to Your Enquiry</h2>
    </section>
  </>
}
