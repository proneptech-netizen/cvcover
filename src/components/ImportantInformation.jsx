import { sitePath } from '../utils/sitePath.js'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export default function ImportantInformation() {
  return (
    <section className="important-information-section" aria-label="Important service information">
      <div className="important-information-compact">
        <ShieldCheck aria-hidden="true" />
        <p>CV &amp; Cover Letter Nepal is an independent online service provider. We provide document preparation and application assistance only and do not guarantee outcomes controlled by authorities, institutions, employers or other third parties.</p>
        <a href={sitePath('/service-disclaimer')}>Read Our Service Disclaimer <ArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
