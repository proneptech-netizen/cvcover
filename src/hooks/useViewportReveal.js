import { useEffect } from 'react'

const revealGroups = [
  {
    selector: [
      '.hero-copy',
      '.services-intro', '.who-we-serve-intro', '.why-choose-content', '.how-it-works-intro',
      '.pricing-intro', '.testimonials-intro', '.global-support-intro', '.faq-intro',
      '.about-page-hero-content', '.about-page-story-copy', '.about-services-intro', '.working-principles-intro',
      '.services-page-hero-content', '.services-page-category-header', '.free-tools-hero-content',
      '.careers-hero-content', '.careers-benefits-intro', '.careers-openings-intro', '.careers-process-intro',
      '.careers-recruitment-intro', '.contact-page-hero-content', '.contact-page-touch-intro',
      '.contact-enquiry-info', '.terms-hero-content',
    ].join(','),
  },
  { selector: '.services-grid > *, .audience-grid > *, .process-grid > *, .pricing-grid > *', stagger: true },
  { selector: '.about-services-grid > *, .working-principles-grid > *, .services-page-grid > *', stagger: true },
  { selector: '.careers-benefits-grid > *, .careers-process-grid > *, .careers-recruitment-grid > *, .contact-page-methods > *', stagger: true },
  { selector: '.testimonials-viewport, .destination-tabs, .destination-panel' },
  { selector: '.faq-search, .faq-categories, .faq-grid, .faq-support-banner' },
  { selector: '.final-cta-container, .about-cta-container, .careers-join-team-card' },
]

export default function useViewportReveal(routeKey) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const root = document.documentElement
    const registered = new Set()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('viewport-reveal-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' })

    const register = (element, delay = 0) => {
      if (registered.has(element)) return
      registered.add(element)
      element.classList.add('viewport-reveal')
      element.style.setProperty('--reveal-delay', `${Math.min(delay, 240)}ms`)
      observer.observe(element)
    }

    const scan = (scope = document) => {
      revealGroups.forEach(({ selector, stagger }) => {
        const matches = []
        if (scope instanceof Element && scope.matches(selector)) matches.push(scope)
        matches.push(...scope.querySelectorAll(selector))
        matches.forEach((element, index) => register(element, stagger ? (index % 5) * 60 : 0))
      })
    }

    scan()
    root.classList.add('viewport-reveal-enabled')

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) scan(node)
      }))
    })
    mutationObserver.observe(document.getElementById('root'), { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
      root.classList.remove('viewport-reveal-enabled')
      registered.forEach((element) => {
        element.classList.remove('viewport-reveal', 'viewport-reveal-visible')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [routeKey])
}
