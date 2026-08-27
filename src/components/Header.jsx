import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Free Tools', href: '/free-tools' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]
const whatsappUrl = 'https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.'

function WhatsAppIcon() {
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3.2A12.72 12.72 0 0 0 5.2 22.59L3.4 29.2l6.76-1.77a12.72 12.72 0 1 0 5.88-24.23Zm0 23.93a11.1 11.1 0 0 1-5.66-1.55l-.4-.24-4.01 1.05 1.07-3.9-.26-.4a11.12 11.12 0 1 1 9.26 5.04Zm6.1-8.31c-.34-.17-1.98-.98-2.29-1.09-.3-.11-.53-.17-.75.17-.22.33-.86 1.08-1.06 1.3-.19.22-.39.25-.72.08-.34-.17-1.42-.52-2.7-1.67a10.18 10.18 0 0 1-1.87-2.32c-.2-.34-.02-.52.15-.69.15-.15.34-.39.5-.58.17-.2.23-.34.34-.56.11-.22.05-.42-.03-.59-.08-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.22 0-.58.08-.89.42-.3.33-1.16 1.13-1.16 2.75s1.19 3.2 1.35 3.42c.17.22 2.33 3.56 5.65 4.99.79.34 1.4.54 1.89.69.79.25 1.51.21 2.08.13.64-.1 1.98-.81 2.26-1.59.28-.78.28-1.45.2-1.59-.09-.14-.31-.22-.64-.39Z" /></svg>
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

  const handleBrandClick = (event) => {
    setOpen(false)
    if (currentPath !== '/') return

    event.preventDefault()
    if (window.location.search || window.location.hash) window.history.replaceState({}, '', '/')
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const closeOutside = (event) => {
      if (open && !headerRef.current?.contains(event.target)) setOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    if (open && window.matchMedia('(max-width: 1023px)').matches) document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <a className="brand" href="/" aria-label="CV and Cover Letter Nepal home" onClick={handleBrandClick}>
          <img src="/assets/cv-cover-letter-nepal-logo-transparent-tight.png" alt="CV & Cover Letter Nepal logo" />
          <span className="brand-copy"><strong>CV &amp; Cover Letter</strong><span>Nepal <b aria-label="Nepal flag">🇳🇵</b></span></span>
        </a>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</button>
        <nav id="main-navigation" className={open ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map(({ label, href }) => <a key={label} className={(href === '/' && currentPath === '/') || (href !== '/' && href.startsWith('/') && currentPath === href) ? 'active' : ''} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="mobile-nav-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><WhatsAppIcon />Chat on WhatsApp</a>
        </nav>
        <a className="header-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with CV & Cover Letter Nepal on WhatsApp"><WhatsAppIcon />WhatsApp</a>
      </div>
    </header>
  )
}
