import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CircleCheck, MapPin, ShieldCheck } from 'lucide-react'

const destinations = [
  {
    id: 'australia',
    tab: '🇦🇺 Australia',
    title: 'Documents for Australia 🇦🇺',
    description: 'We prepare professional documents tailored to Australian study, visa and employment-related applications, based on your individual requirements.',
    services: ['Genuine Student Statement (GS)', 'Australian-Style Professional CV', 'Statement of Purpose, Where Required', 'Study or Visa Cover Letter'],
    cta: 'Explore Australia Services',
    location: 'Sydney, Australia',
    enquiry: 'Australia',
    disclaimer: 'Document requirements vary by institution, visa category and individual circumstances.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=85',
    alt: 'Sydney Opera House and Harbour Bridge across the harbour',
  },
  {
    id: 'canada',
    tab: '🇨🇦 Canada',
    title: 'Documents for Canada 🇨🇦',
    description: 'We prepare professional documents tailored to Canadian study, visa and employment-related applications, based on your individual requirements.',
    services: ['Study Plan for Canadian Applications', 'Canadian-Style Professional Resume', 'Statement of Purpose, Where Required', 'Motivation Letter', 'Scholarship Essay Support'],
    cta: 'Explore Canada Services',
    location: 'Toronto, Canada',
    enquiry: 'Canada',
    disclaimer: 'Document requirements vary by institution, programme, application type and individual circumstances.',
    image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1400&q=85',
    alt: 'Toronto skyline and waterfront in Canada',
  },
  {
    id: 'united-kingdom',
    tab: '🇬🇧 United Kingdom',
    title: 'Documents for the United Kingdom 🇬🇧',
    description: 'We prepare professional documents tailored to UK study, visa and employment-related applications, based on your individual requirements.',
    services: ['UK-Style Professional CV', 'Personal Statement', 'Statement of Purpose, Where Required', 'Study Plan or Motivation Letter', 'Study or Visa Cover Letter'],
    cta: 'Explore United Kingdom Services',
    location: 'London, United Kingdom',
    enquiry: 'the United Kingdom',
    disclaimer: 'Document requirements vary by institution, programme, application type and individual circumstances.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=85',
    alt: 'London skyline along the River Thames in the United Kingdom',
  },
  {
    id: 'united-states',
    tab: '🇺🇸 United States',
    title: 'Documents for the United States 🇺🇸',
    description: 'We prepare professional documents tailored to US study, visa and employment-related applications, based on your individual requirements.',
    services: ['US-Style Professional Resume', 'Personal Statement', 'Statement of Purpose, Where Required', 'Admission or Scholarship Essay Support', 'Study or Visa Cover Letter'],
    cta: 'Explore United States Services',
    location: 'New York, United States',
    enquiry: 'the United States',
    disclaimer: 'Document requirements vary by institution, programme, application type and individual circumstances.',
    image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1400&q=85',
    alt: 'New York City skyline in the United States',
  },
  {
    id: 'europe',
    tab: '🇪🇺 Europe',
    title: 'Documents for Europe 🇪🇺',
    description: 'We prepare professional documents tailored to European study, employment and selected application requirements, based on your destination and individual needs.',
    services: ['Europass CV', 'Europass Cover Letter', 'Europass Profile Creation', 'Motivation Letter or Personal Statement', 'Study or Supporting Document Review'],
    cta: 'Explore Europe Services',
    location: 'Brussels, Belgium',
    enquiry: 'Europe',
    disclaimer: 'Requirements vary by country, institution, employer, application type and individual circumstances.',
    image: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1400&q=85',
    alt: 'Historic European city centre in Brussels, Belgium',
  },
  {
    id: 'gulf-region',
    tab: '🌐 Gulf Region',
    title: 'Documents for the Gulf Region 🌐',
    description: 'We prepare professional documents tailored to employment, travel and selected application requirements across the Gulf region, based on your individual needs.',
    services: ['Gulf-Style Professional CV', 'Job-Specific Cover Letter', 'Employment Application Letter', 'Professional Profile or Bio', 'Travel or Supporting Document Review'],
    cta: 'Explore Gulf Region Services',
    location: 'Dubai, United Arab Emirates',
    enquiry: 'the Gulf Region',
    disclaimer: 'Requirements vary by country, employer, application type and individual circumstances.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85',
    alt: 'Modern Dubai skyline in the United Arab Emirates',
  },
]

export default function GlobalDocumentSupport() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef([])
  const activeDestination = destinations[activeIndex]
  const whatsappUrl = `https://wa.me/9779862989407?text=${encodeURIComponent(`Hello, I would like to enquire about document services for ${activeDestination.enquiry}.`)}`

  useEffect(() => {
    if (!window.matchMedia('(max-width: 767px)').matches) return
    tabRefs.current[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeIndex])

  const handleTabKeyDown = (event, index) => {
    let nextIndex = index
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % destinations.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + destinations.length) % destinations.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = destinations.length - 1
    else return

    event.preventDefault()
    setActiveIndex(nextIndex)
    requestAnimationFrame(() => document.getElementById(`destination-tab-${destinations[nextIndex].id}`)?.focus())
  }

  return (
    <section className="global-document-support" aria-labelledby="global-support-title">
      <div className="global-support-container">
        <div className="global-support-intro">
          <span className="global-support-label">Global Document Support</span>
          <h2 id="global-support-title">Destination-Specific Document Support</h2>
          <p>Document expectations vary by destination, institution, employer and application type. Select your target destination to explore the document support available for your goals.</p>
        </div>

        <div className="destination-tabs" role="tablist" aria-label="Select a destination">
          {destinations.map((destination, index) => (
            <button
              id={`destination-tab-${destination.id}`}
              ref={(node) => { tabRefs.current[index] = node }}
              key={destination.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="destination-panel"
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >{destination.tab}</button>
          ))}
        </div>

        <div id="destination-panel" className="destination-panel" role="tabpanel" aria-labelledby={`destination-tab-${activeDestination.id}`} key={activeDestination.id}>
          <div className="destination-copy">
            <h3>{activeDestination.title}</h3>
            <p>{activeDestination.description}</p>
            <ul>{activeDestination.services.map((service) => <li key={service}><CircleCheck aria-hidden="true" /><span>{service}</span></li>)}</ul>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{activeDestination.cta}<ArrowRight aria-hidden="true" /></a>
            <div className="destination-disclaimer"><ShieldCheck aria-hidden="true" /><small>{activeDestination.disclaimer}</small></div>
          </div>

          <div className="destination-image">
            <img src={activeDestination.image} alt={activeDestination.alt} loading={activeIndex === 0 ? 'eager' : 'lazy'} decoding="async" />
            <span><MapPin aria-hidden="true" />{activeDestination.location}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
