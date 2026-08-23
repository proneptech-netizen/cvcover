import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BriefcaseBusiness, FileCheck2, GraduationCap, Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rohan Thapa',
    initials: 'RT',
    description: 'Student Visa Applicant, Australia',
    service: 'Study & Visa Documents',
    icon: GraduationCap,
    review: '“I received professional support with my SOP and CV for my Australian student visa application. Communication was clear, the documents were well prepared, and the overall process was smooth. Highly recommended.”',
  },
  {
    name: 'Bishnu Gurung',
    initials: 'BG',
    description: 'EPS-TOPIK Applicant, Nepal',
    service: 'Korea & EPS Services',
    icon: FileCheck2,
    review: '“I needed help completing my EPS-TOPIK form while living outside the city. Everything was handled online, and the guidance was fast, clear and reliable.”',
  },
  {
    name: 'Sarita Karki',
    initials: 'SK',
    description: 'Professional, UAE',
    service: 'CV & Career Documents',
    icon: BriefcaseBusiness,
    review: '“My ATS-friendly CV was professionally structured and tailored to the roles I was targeting in the Gulf. I was very satisfied with the final result and overall service.”',
  },
  {
    name: 'Manisha Basnet',
    initials: 'MB',
    description: 'Student Visa Applicant, Australia',
    service: 'Study & Visa Documents',
    icon: GraduationCap,
    review: '“The GS and SOP prepared for my Australian student visa application were clear, personalised and professionally structured. The support and communication throughout the process were excellent, and I am very happy that my visa was granted. Thank you for the reliable guidance and document support.”',
  },
  {
    name: 'Suraj Magar',
    initials: 'SM',
    description: 'Visa Reconsideration Client, Malta',
    service: 'Visa Reconsideration Support',
    icon: FileCheck2,
    review: '“My Malta visa had previously been refused, and almost everyone told me there was very little chance of a positive result. You encouraged me that there was still a possibility and prepared my reconsideration letter professionally. Today, I received the positive result. I genuinely had lost hope—thank you so much for your support, confidence and effort.”',
  },
  {
    name: 'Jina Rai',
    initials: 'JR',
    description: 'Career CV Client, South Korea',
    service: 'CV & Career Documents',
    icon: BriefcaseBusiness,
    review: '“My career CV was professionally prepared and tailored for opportunities in South Korea’s job market. The structure, wording and presentation clearly highlighted my skills and experience, giving me a much stronger professional profile. I am very satisfied with the final result.”',
  },
]

function getCardsPerPage() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth <= 767) return 1
  if (window.innerWidth <= 1100) return 2
  return 3
}

export default function Testimonials() {
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage)
  const [activePage, setActivePage] = useState(0)
  const totalPages = Math.ceil(testimonials.length / cardsPerPage)
  const pages = Array.from({ length: totalPages }, (_, pageIndex) => testimonials.slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage))

  useEffect(() => {
    const handleResize = () => setCardsPerPage(getCardsPerPage())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setActivePage((currentPage) => Math.min(currentPage, totalPages - 1))
  }, [totalPages])

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-container">
        <div className="testimonials-intro">
          <span className="testimonials-label">Client Testimonials</span>
          <h2 id="testimonials-title">What Our Clients Say</h2>
          <p>Real feedback from clients who trusted us with their professional documents and applications.</p>
        </div>

        <div className="testimonials-carousel-viewport">
          <div className="testimonials-track" style={{ transform: `translateX(-${activePage * 100}%)` }}>
            {pages.map((page, pageIndex) => (
              <div className="testimonials-slide" key={pageIndex} aria-hidden={pageIndex !== activePage}>
                {page.map(({ name, initials, description, service, icon: Icon, review }) => (
                  <article className="testimonial-card" key={name}>
                    <div className="testimonial-card-top">
                      <div className="testimonial-stars" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" />)}
                      </div>
                      <Quote className="testimonial-quote" aria-hidden="true" />
                    </div>

                    <blockquote>{review}</blockquote>

                    <footer className="testimonial-client">
                      <span className="testimonial-avatar" aria-hidden="true">{initials}</span>
                      <div className="testimonial-client-details">
                        <strong>{name}</strong>
                        <span>{description}</span>
                        <span className="testimonial-service"><Icon aria-hidden="true" />{service}</span>
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="testimonial-navigation" aria-label="Testimonial carousel controls">
          <button type="button" onClick={() => setActivePage((page) => Math.max(0, page - 1))} disabled={activePage === 0} aria-label="Show previous testimonials"><ArrowLeft aria-hidden="true" /></button>
          <div className="testimonial-pagination" aria-label="Choose testimonial page">
            {pages.map((_, pageIndex) => <button type="button" key={pageIndex} className={pageIndex === activePage ? 'active' : ''} onClick={() => setActivePage(pageIndex)} aria-label={`Show testimonial page ${pageIndex + 1}`} aria-current={pageIndex === activePage ? 'true' : undefined} />)}
          </div>
          <button type="button" onClick={() => setActivePage((page) => Math.min(totalPages - 1, page + 1))} disabled={activePage === totalPages - 1} aria-label="Show next testimonials"><ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  )
}
