import { CircleCheckBig, MessageSquare, Shield, Tag, UserCheck, UsersRound } from 'lucide-react'

const principles = [
  {
    title: 'Personalised Support',
    description: 'Every service is tailored to the client’s goals, background and document requirements.',
    icon: UsersRound,
  },
  {
    title: 'Clear Communication',
    description: 'We explain the service scope, required information, timeline and next steps before work begins.',
    icon: MessageSquare,
  },
  {
    title: 'Confidential Handling',
    description: 'Personal information and supporting documents are handled carefully and used only for the agreed service.',
    icon: Shield,
  },
  {
    title: 'Transparent Pricing',
    description: 'You receive a clear quote outlining the service, deliverables and payment requirements before confirmation.',
    icon: Tag,
  },
  {
    title: 'Genuine Information',
    description: 'We work only with accurate information supplied or approved by the client.',
    icon: CircleCheckBig,
  },
  {
    title: 'Responsible Assistance',
    description: 'We provide independent support while encouraging clients to review requirements and verify all details before submission.',
    icon: UserCheck,
  },
]

export default function WorkingPrinciples() {
  return (
    <section className="working-principles-section" aria-labelledby="working-principles-title">
      <div className="working-principles-container">
        <header className="working-principles-intro">
          <span className="working-principles-label">Our Working Principles</span>
          <h2 id="working-principles-title">Trusted Support Built on Clarity and Care</h2>
          <p>The standards that guide every service, document and client interaction.</p>
        </header>

        <ul className="working-principles-grid">
          {principles.map(({ title, description, icon: Icon }) => (
            <li className="working-principles-card" key={title}>
              <span className="working-principles-icon" aria-hidden="true"><Icon /></span>
              <div className="working-principles-copy">
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
