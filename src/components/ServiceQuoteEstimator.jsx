import { useEffect, useRef, useState } from 'react'
import {
  BriefcaseBusiness, Check, ChevronDown, CircleEllipsis, Clock3, FileText,
  GraduationCap, Info, Landmark, LayoutGrid, MessageCircle, Plane, ReceiptText,
  Rocket, Star, Zap,
} from 'lucide-react'

const fixed = (standard, priority, express) => ({ standard, priority, express })
const custom = null

export const estimatorCategories = [
  {
    id: 'cv-career', label: 'CV & Career Documents', icon: LayoutGrid,
    services: [
      ['ATS-Friendly CV / Resume', fixed(499, 599, 699)],
      ['Fresher / Graduate CV', fixed(499, 599, 699)],
      ['Professional / Experienced CV', fixed(499, 599, 699)],
      ['International CV', fixed(499, 599, 699)],
      ['Academic & Research CV', fixed(699, 799, 899)],
      ['Career Change CV', fixed(699, 799, 899)],
      ['Job-Specific Cover Letter', fixed(499, 599, 699)],
      ['Master / General Cover Letter', fixed(499, 599, 699)],
      ['CV Review / Rewrite / Formatting', fixed(499, 599, 699)],
      ['Multilingual CV Writing', fixed(699, 799, 899)],
      ['Any CV + Cover Letter', fixed(899, 999, 1199)],
    ],
  },
  {
    id: 'europass', label: 'Europass Services', icon: FileText,
    services: [
      ['Europass CV', fixed(499, 599, 699)],
      ['Europass Cover Letter', fixed(499, 599, 699)],
      ['Europass CV + Cover Letter', fixed(899, 999, 1199)],
      ['Europass CV Update / Review / Formatting', fixed(499, 599, 699)],
    ],
  },
  {
    id: 'study-visa', label: 'Study & Visa Documents', icon: GraduationCap,
    services: [
      ['Statement of Purpose (SOP)', fixed(1999, 2299, 2499)],
      ['Genuine Statement (GS)', fixed(1999, 2299, 2499)],
      ['Appeal / Reconsideration Letter', fixed(2000, 2300, 2500)],
      ['Admission Essay', fixed(2000, 2300, 2500)],
      ['Scholarship Essay', fixed(2000, 2300, 2500)],
      ['Motivation Letter', fixed(1499, 1799, 1999)],
      ['Study Plan', fixed(1999, 2299, 2499)],
      ['Study & Visa Cover Letter', fixed(1499, 1799, 1999)],
      ['Academic & Study Document Review', fixed(2499, 2799, 2999)],
    ],
  },
  {
    id: 'government', label: 'Government, Public & Online Application Services', icon: Landmark,
    services: [
      ['Passport Online Application', fixed(199, 249, 299)],
      ['Personal PAN Registration', fixed(399, 449, 499)],
      ['National ID Online Application', fixed(199, 249, 299)],
      ['Police Report Online Application with Consular Stamp', fixed(999, 1299, 1499)],
      ['Labour Permit', custom],
    ],
  },
  {
    id: 'korea-eps', label: 'Korea & EPS Services', icon: Star,
    services: [
      ['TOPIK Exam Online Form', fixed(2999, 2999, 2999)],
      ['EPS-TOPIK Service Charge', fixed(499, 599, 699)],
      ['EPS Form Preparation & Review', fixed(499, 599, 699)],
      ['Korea Employment Support', custom],
    ],
  },
  {
    id: 'travel', label: 'Travel & Booking Services', icon: Plane,
    services: [
      ['International Flight Ticket Booking', custom],
      ['Domestic Flight Ticket Booking', custom],
      ['Hotel Booking', custom],
      ['Travel Insurance', custom],
      ['VFS Appointment Booking', custom],
      ['Travel Document Support', custom],
    ],
  },
  {
    id: 'lok-sewa', label: 'Lok Sewa & Government Job Applications', icon: BriefcaseBusiness,
    services: [
      ['Federal Lok Sewa Aayog Online Application', custom],
      ['Province Lok Sewa Aayog Online Application', custom],
      ['Nepal Police Online Application', custom],
      ['Armed Police Force (APF) Online Application', custom],
      ['Nepal Army Online Application', custom],
      ['Teacher Service Commission Online Application', custom],
      ['Government Bank Vacancy Application', custom],
      ['Public Corporation & Government Institution Vacancy Application', custom],
      ['Other Government Job Online Applications', custom],
    ],
  },
  {
    id: 'other', label: 'Other / Custom Services', icon: CircleEllipsis,
    services: [
      ['Custom Online Form Assistance', custom],
      ['Custom Document Preparation & Formatting', custom],
      ['Other Online Application Support', custom],
    ],
  },
]

const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', time: '24–48 Hours', icon: Clock3 },
  { id: 'priority', label: 'Priority Delivery', time: '12–24 Hours', icon: Zap },
  { id: 'express', label: 'Express Delivery', time: '6–12 Hours', icon: Rocket },
]

function EstimatorDropdown({ id, label, placeholder, value, options, onChange, disabled = false }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const selectedIndex = options.findIndex(option => option.id === value)
  const selected = options[selectedIndex]

  useEffect(() => {
    const close = event => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  const choose = option => {
    onChange(option.id)
    setOpen(false)
    window.requestAnimationFrame(() => rootRef.current?.querySelector('button')?.focus())
  }

  const onKeyDown = event => {
    if (disabled) return
    if (event.key === 'Escape') { setOpen(false); return }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open && selected) choose(selected)
      else setOpen(current => !current)
      return
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      const last = options.length - 1
      let next = selectedIndex < 0 ? 0 : selectedIndex
      if (event.key === 'ArrowDown') next = Math.min(next + 1, last)
      if (event.key === 'ArrowUp') next = Math.max(next - 1, 0)
      if (event.key === 'Home') next = 0
      if (event.key === 'End') next = last
      choose(options[next])
    }
  }

  return <div className="service-estimator-field" ref={rootRef}>
    <label id={`${id}-label`}>{label}</label>
    <button className="service-estimator-select" type="button" disabled={disabled} aria-expanded={open} aria-haspopup="listbox" aria-labelledby={`${id}-label ${id}-value`} aria-controls={`${id}-options`} onClick={() => setOpen(current => !current)} onKeyDown={onKeyDown}>
      <span id={`${id}-value`}><ReceiptText aria-hidden="true" />{selected?.label || placeholder}</span><ChevronDown aria-hidden="true" />
    </button>
    {open && <ul className="service-estimator-options" id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`}>
      {options.map(option => {
        const Icon = option.icon || ReceiptText
        return <li key={option.id} role="option" aria-selected={option.id === value}>
          <button type="button" onClick={() => choose(option)}><Icon aria-hidden="true" /><span>{option.label}{option.time && <small>{option.time}</small>}</span>{option.id === value && <Check aria-hidden="true" />}</button>
        </li>
      })}
    </ul>}
  </div>
}

const money = value => `NPR ${value.toLocaleString('en-US')}`

export default function ServiceQuoteEstimator() {
  const [categoryId, setCategoryId] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [deliveryId, setDeliveryId] = useState('')
  const category = estimatorCategories.find(item => item.id === categoryId)
  const serviceTuple = category?.services.find(([name]) => name === serviceName)
  const prices = serviceTuple?.[1]
  const isCustom = Boolean(serviceTuple) && prices === null
  const delivery = deliveryOptions.find(item => item.id === deliveryId)
  const price = prices && delivery ? prices[delivery.id] : null
  const complete = isCustom || price !== null

  const selectCategory = id => {
    setCategoryId(id)
    setServiceName('')
    setDeliveryId('')
  }
  const selectService = name => {
    const selectedPrices = category?.services.find(([service]) => service === name)?.[1]
    setServiceName(name)
    setDeliveryId(selectedPrices === null ? '' : 'standard')
  }

  const message = isCustom
    ? `Hello, I would like to request a custom quotation.\n\nCategory: ${category.label}\nService: ${serviceName}\nPricing: Custom Pricing\nProcessing Time: Varies by Service\n\nPlease review my requirements and provide the final price and estimated completion time.`
    : complete ? `Hello, I would like to continue with this service.\n\nCategory: ${category.label}\nService: ${serviceName}\nDelivery: ${delivery.label}\nEstimated Time: ${delivery.time}\nEstimated Price: ${money(price)}\n\nPlease confirm the requirements, final price and availability before work begins.` : ''
  const whatsappUrl = complete ? `https://wa.me/9779862989407?text=${encodeURIComponent(message)}` : ''

  const categoryOptions = estimatorCategories.map(({ id, label, icon }) => ({ id, label, icon }))
  const serviceOptions = (category?.services || []).map(([name]) => ({ id: name, label: name }))

  return <section className="service-estimator-section" aria-labelledby="service-estimator-title">
    <header className="service-estimator-header">
      <span>INSTANT PRICING</span>
      <h2 id="service-estimator-title">Instant Service Quote Estimator</h2>
      <p>Select a service and delivery option to receive an estimated service fee and delivery time.</p>
    </header>
    <div className="service-estimator-card">
      <div className="service-estimator-form-panel">
        <EstimatorDropdown id="service-estimator-category" label="1. Select a Service Category" placeholder="Choose a service category" value={categoryId} options={categoryOptions} onChange={selectCategory} />
        <EstimatorDropdown id="service-estimator-service" label="2. Select a Specific Service" placeholder={category ? `Choose a ${category.label} service` : 'Choose a specific service'} value={serviceName} options={serviceOptions} onChange={selectService} disabled={!category} />
        {!isCustom && <>
          <EstimatorDropdown id="service-estimator-delivery" label="3. Choose Delivery Speed" placeholder="Choose a delivery option" value={deliveryId} options={deliveryOptions} onChange={setDeliveryId} disabled={!serviceTuple} />
          <p className="service-estimator-delivery-note">Delivery time begins after payment and receipt of all required information. Timelines may vary depending on workload, document complexity and client response time. Express delivery is subject to availability.</p>
        </>}
      </div>
      <aside className="service-estimator-estimate" aria-live="polite">
        <span className="service-estimator-estimate-label">YOUR ESTIMATE</span>
        <div className="service-estimator-summary">
          <p><ReceiptText aria-hidden="true" /><span>{serviceName || 'Choose a specific service'}</span></p>
          <p><Clock3 aria-hidden="true" /><span>{isCustom ? 'Varies by Service' : delivery?.label || 'Choose a delivery option'}</span></p>
        </div>
        {isCustom ? <div className="service-estimator-price-rows service-estimator-custom-price">
          <p><span>Pricing</span><strong>Custom Pricing</strong></p>
          <p><span>Processing Time</span><strong>Varies by Service</strong></p>
        </div> : <div className="service-estimator-price-rows">
          <p><span>Service Fee</span><strong>{price === null ? '—' : money(price)}</strong></p>
          <p className="service-estimator-total"><span>Estimated Total</span><strong>{price === null ? '—' : money(price)}</strong></p>
          <p><span>Estimated Delivery</span><strong>{delivery?.time || '—'}</strong></p>
        </div>}
        {complete
          ? <a className="service-estimator-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />{isCustom ? 'Get Custom Quote on WhatsApp' : 'Continue on WhatsApp'}</a>
          : <button className="service-estimator-whatsapp" type="button" disabled>Select a Service to Continue</button>}
        <p className="service-estimator-disclaimer">This is an estimate only. The final service fee, requirements and delivery time will be confirmed before work begins.</p>
      </aside>
      <div className="service-estimator-notice"><Info aria-hidden="true" /><p>Official charges and other third-party costs are separate. Travel, booking, government and other variable services may require a custom quotation.</p></div>
    </div>
  </section>
}
