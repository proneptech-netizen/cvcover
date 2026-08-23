export default function FeatureItem({ icon: Icon, title, subtitle }) {
  return (
    <div className="feature-item">
      <span className="feature-icon"><Icon aria-hidden="true" /></span>
      <span className="feature-copy"><strong>{title}</strong><small>{subtitle}</small></span>
    </div>
  )
}
