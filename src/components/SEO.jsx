import { useEffect } from 'react'

const siteUrl = 'https://cvandcoverletternepal.com'
const brand = 'CV & Cover Letter Nepal'
const imageUrl = `${siteUrl}/assets/cv-cover-letter-nepal-logo-transparent-tight.png`

const pages = {
  '/': {
    title: 'CV & Cover Letter Nepal | Professional Document Support',
    description: 'Professional support for ATS-friendly CVs, cover letters, Europass documents, study and visa documents, online applications and selected services worldwide.',
    name: 'Professional Document Support',
  },
  '/about': {
    title: 'About CV & Cover Letter Nepal | Our Story',
    description: 'Learn about CV & Cover Letter Nepal, our founder, working principles and personalised online document and application support for clients worldwide.',
    name: `About ${brand}`,
  },
  '/services': {
    title: 'Document & Application Services | CV & Cover Letter Nepal',
    description: 'Explore CV, cover letter, Europass, study, visa, government, EPS, travel and online application support tailored to your requirements.',
    name: 'Document and Application Services',
  },
  '/free-tools': {
    title: 'Free CV Tools & Analyzers | CV & Cover Letter Nepal',
    description: 'Use free browser-based CV tools to check ATS readiness, improve bullet points and review your application checklist before applying for roles.',
    name: 'Free CV Tools and Analyzers',
  },
  '/careers': {
    title: 'Careers | CV & Cover Letter Nepal',
    description: 'Explore career opportunities with CV & Cover Letter Nepal, learn about our fair recruitment process and submit your CV for future consideration.',
    name: `Careers at ${brand}`,
  },
  '/contact': {
    title: 'Contact CV & Cover Letter Nepal | Get Support',
    description: 'Contact CV & Cover Letter Nepal by WhatsApp or email for document support, service enquiries and a clear quotation tailored to your needs.',
    name: `Contact ${brand}`,
  },
  '/privacy-policy': {
    title: 'Privacy Policy | CV & Cover Letter Nepal',
    description: 'Read how CV & Cover Letter Nepal receives, uses, stores and protects personal information shared for website, document and career services.',
    name: 'Privacy Policy',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | CV & Cover Letter Nepal',
    description: 'Read the terms governing quotations, payments, document preparation, revisions, delivery, cancellations and use of our online services.',
    name: 'Terms and Conditions',
  },
  '/service-disclaimer': {
    title: 'Service Disclaimer | CV & Cover Letter Nepal',
    description: 'Understand the scope and limitations of our document and application support, client responsibilities and third-party decisions and services.',
    name: 'Service Disclaimer',
  },
}

const organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: brand,
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: imageUrl,
    width: 1101,
    height: 721,
  },
  email: 'cvandcoverletternepal@gmail.com',
  telephone: '+9779862989407',
  areaServed: 'Worldwide',
  sameAs: [
    'https://www.facebook.com/people/Cv-Cover-Letter-Nepal/61555818296589/',
    'https://www.instagram.com/cvandcoverletternepal/',
  ],
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}

export default function SEO({ path, faqs = [] }) {
  useEffect(() => {
    const page = pages[path] || pages['/']
    const canonical = `${siteUrl}${path === '/' ? '/' : path}`
    document.title = page.title

    upsertMeta('meta[name="description"]', { name: 'description', content: page.description })
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: page.title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: page.description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: `${brand} logo` })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: brand })
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl })

    let canonicalLink = document.head.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonical

    const graph = [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: brand,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en',
      },
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: page.name,
        description: page.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en',
      },
    ]

    if (path !== '/') graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.name, item: canonical },
      ],
    })
    if (path === '/services') graph.push({
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: 'Professional document and application support',
      description: page.description,
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: 'Worldwide',
      url: canonical,
    })
    if (path === '/' && faqs.length) graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: faqs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    })

    let script = document.getElementById('site-structured-data')
    if (!script) {
      script = document.createElement('script')
      script.id = 'site-structured-data'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  }, [path, faqs])

  return null
}

export { pages }
