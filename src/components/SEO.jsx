import { useEffect } from 'react'

const SITE_URL = 'https://www.cvandcoverletternepal.com'
const BRAND = 'CV & Cover Letter Nepal'
const SOCIAL_IMAGE = `${SITE_URL}/assets/cv-cover-letter-nepal-logo-transparent-tight.png`

const pages = {
  '/': {
    title: 'CV & Cover Letter Nepal | Professional Document Support',
    description: 'Professional support for ATS-friendly CVs, cover letters, Europass documents, study and visa documents, online applications and selected services worldwide.',
  },
  '/about': {
    title: 'About Us | CV & Cover Letter Nepal',
    description: 'Learn about CV & Cover Letter Nepal and our practical, confidential approach to professional document and online application support worldwide.',
  },
  '/services': {
    title: 'Professional CV & Cover Letter Services in Nepal | Cabin Crew CV',
    description: 'Get professional ATS-friendly CVs and cover letters for cabin crew, air hostess, hospitality and international job applications in Nepal, starting from NPR 499.',
  },
  '/free-tools': {
    title: 'Free CV Tools & Analyzers | CV Nepal',
    description: 'Use free browser-based tools to review ATS readiness, improve CV bullet points, compare a CV with a job and check formatting quality.',
  },
  '/careers': {
    title: 'Careers | CV & Cover Letter Nepal',
    description: 'View current and future career opportunities with CV & Cover Letter Nepal and learn how to submit your CV safely and professionally.',
  },
  '/contact': {
    title: 'Contact CV & Cover Letter Nepal',
    description: 'Contact CV & Cover Letter Nepal by WhatsApp or email for a clear quotation on professional document and online application support.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | CV & Cover Letter Nepal',
    description: 'Read how CV & Cover Letter Nepal collects, uses, protects and retains personal information provided for enquiries and document services.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | CV & Cover Letter Nepal',
    description: 'Read the terms governing quotations, payments, client responsibilities, revisions, delivery and use of CV & Cover Letter Nepal services.',
  },
  '/service-disclaimer': {
    title: 'Service Disclaimer | CV & Cover Letter Nepal',
    description: 'Understand the scope and limitations of professional document support provided by CV & Cover Letter Nepal before using our services.',
  },
}

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

export default function SEO({ path }) {
  useEffect(() => {
    const page = pages[path] || pages['/']
    const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path}`
    document.title = page.title

    setMeta('meta[name="description"]', { name: 'description', content: page.description })
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large' })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: page.title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: page.description })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: SOCIAL_IMAGE })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: BRAND })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: SOCIAL_IMAGE })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    const graph = [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BRAND,
        url: `${SITE_URL}/`,
        logo: SOCIAL_IMAGE,
        email: 'cvandcoverletternepal@gmail.com',
        telephone: '+9779862989407',
        areaServed: 'Worldwide',
        sameAs: [
          'https://www.facebook.com/people/Cv-Cover-Letter-Nepal/61555818296589/',
          'https://www.instagram.com/cvandcoverletternepal/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: BRAND,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
    ]

    if (path !== '/') {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: page.title.split(' | ')[0], item: canonicalUrl },
        ],
      })
    }

    if (path === '/services') {
      graph.push({
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: 'Professional Document and Application Support',
        description: page.description,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'Worldwide',
        serviceType: 'ATS-friendly CV, Cabin Crew CV, cover letter, study, visa and online application document support',
        url: canonicalUrl,
      })
    }

    let script = document.head.querySelector('#website-structured-data')
    if (!script) {
      script = document.createElement('script')
      script.id = 'website-structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  }, [path])

  return null
}
