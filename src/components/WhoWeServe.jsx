import { BookOpen, BriefcaseBusiness, GraduationCap, Landmark } from 'lucide-react'

const audiences = [
  {
    title: 'Students & Fresh Graduates',
    description: 'Build a strong start with professional CVs, cover letters, internship applications and study documents.',
    icon: GraduationCap,
    color: '#0b9298',
    background: '#e9f5f5',
  },
  {
    title: 'Experienced Professionals',
    description: 'Strengthen your profile with ATS-friendly CVs, LinkedIn support and tailored cover letters.',
    icon: BriefcaseBusiness,
    color: '#258be0',
    background: '#eaf3fc',
  },
  {
    title: 'Government Job Applicants',
    description: 'Get reliable application support for Lok Sewa, Nepal Police, APF, Army, TSC and government bank vacancies.',
    icon: Landmark,
    color: '#f18824',
    background: '#fff2e7',
  },
  {
    title: 'Study Abroad & Visa Applicants',
    description: 'Prepare SOPs, study plans, motivation letters, visa cover letters and other supporting documents for international applications.',
    icon: BookOpen,
    color: '#7b43d7',
    background: '#f1ecfb',
  },
]

export default function WhoWeServe() {
  return (
    <section className="who-we-serve" aria-labelledby="who-we-serve-title">
      <div className="who-we-serve-container">
        <div className="who-we-serve-intro">
          <span className="who-we-serve-label">Who We Serve</span>
          <h2 id="who-we-serve-title">Professional Support for Every Goal</h2>
          <p>Whether you are building your career, applying for a government position or preparing international documents, we provide reliable online support wherever you are.</p>
        </div>

        <div className="audience-grid">
          {audiences.map(({ title, description, icon: Icon, color, background }) => (
            <article className="audience-card" key={title}>
              <span className="audience-icon" style={{ '--audience-color': color, '--audience-background': background }}>
                <Icon aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
