import { useEffect, useMemo, useState } from 'react'
import { ExternalLink, LoaderCircle, LockKeyhole, LogOut, RefreshCw, Trash2 } from 'lucide-react'
import '../styles/admin.css'
import {
  deleteEnquiry,
  fetchEnquiries,
  getAdminSession,
  signInAdmin,
  signOutAdmin,
  updateEnquiryStatus,
} from '../utils/adminApi.js'

const ADMIN_EMAIL = 'cvandcoverletternepal@gmail.com'
const statuses = ['new', 'contacted', 'information_pending', 'payment_pending', 'drafting', 'review', 'revision', 'completed', 'cancelled']

const statusLabel = status => status.replaceAll('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase())
const formatDate = value => value ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—'

export default function Admin() {
  const [session, setSession] = useState(getAdminSession)
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState('')
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(Boolean(session))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  const loadEnquiries = async activeSession => {
    setLoading(true)
    setError('')
    try {
      setEnquiries(await fetchEnquiries(activeSession.access_token))
    } catch (requestError) {
      if (/jwt|token|unauthorized/i.test(requestError.message)) {
        signOutAdmin()
        setSession(null)
      }
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = 'Admin Enquiries | CV & Cover Letter Nepal'
    if (session) loadEnquiries(session)
  }, [])

  const visibleEnquiries = useMemo(
    () => filter === 'all' ? enquiries : enquiries.filter(enquiry => enquiry.status === filter),
    [enquiries, filter],
  )

  const login = async event => {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const nextSession = await signInAdmin(email.trim(), password)
      setSession(nextSession)
      setPassword('')
      await loadEnquiries(nextSession)
    } catch (loginError) {
      setError('Login failed. Check the admin email and password.')
    } finally {
      setSubmitting(false)
    }
  }

  const logout = () => {
    signOutAdmin()
    setSession(null)
    setEnquiries([])
    setError('')
  }

  const changeStatus = async (id, status) => {
    setError('')
    try {
      await updateEnquiryStatus(session.access_token, id, status)
      setEnquiries(current => current.map(item => item.id === id ? { ...item, status } : item))
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const remove = async id => {
    if (!window.confirm('Permanently delete this enquiry?')) return
    setError('')
    try {
      await deleteEnquiry(session.access_token, id)
      setEnquiries(current => current.filter(item => item.id !== id))
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  if (!session) return <main className="admin-login-page">
    <form className="admin-login-card" onSubmit={login}>
      <div className="admin-login-icon"><LockKeyhole aria-hidden="true" /></div>
      <p className="admin-eyebrow">Private access</p>
      <h1>Admin Login</h1>
      <p>Sign in to view and manage website enquiries.</p>
      <label htmlFor="admin-email">Email address</label>
      <input id="admin-email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" required />
      <label htmlFor="admin-password">Password</label>
      <input id="admin-password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required />
      {error && <p className="admin-error" role="alert">{error}</p>}
      <button type="submit" disabled={submitting}>{submitting && <LoaderCircle className="admin-spinner" aria-hidden="true" />}{submitting ? 'Signing in…' : 'Sign in securely'}</button>
      <a href="/">Return to website</a>
    </form>
  </main>

  return <main className="admin-page">
    <header className="admin-header">
      <div><p className="admin-eyebrow">CV & Cover Letter Nepal</p><h1>Enquiry Dashboard</h1><p>{enquiries.length} total enquiries</p></div>
      <div className="admin-header-actions">
        <button type="button" onClick={() => loadEnquiries(session)} disabled={loading}><RefreshCw aria-hidden="true" />Refresh</button>
        <button type="button" onClick={logout}><LogOut aria-hidden="true" />Log out</button>
      </div>
    </header>

    <section className="admin-toolbar" aria-label="Enquiry filters">
      <label htmlFor="admin-status-filter">Show status</label>
      <select id="admin-status-filter" value={filter} onChange={event => setFilter(event.target.value)}>
        <option value="all">All enquiries</option>
        {statuses.map(status => <option key={status} value={status}>{statusLabel(status)}</option>)}
      </select>
    </section>

    {error && <p className="admin-error admin-page-error" role="alert">{error}</p>}
    {loading ? <div className="admin-loading"><LoaderCircle className="admin-spinner" aria-hidden="true" />Loading enquiries…</div> :
      visibleEnquiries.length === 0 ? <div className="admin-empty">No enquiries found.</div> :
        <section className="admin-enquiry-grid" aria-label="Enquiries">
          {visibleEnquiries.map(enquiry => <article className="admin-enquiry-card" key={enquiry.id}>
            <div className="admin-enquiry-top">
              <div><span>{formatDate(enquiry.created_at)}</span><h2>{enquiry.full_name}</h2><p>{enquiry.service}</p></div>
              <select aria-label={`Status for ${enquiry.full_name}`} value={enquiry.status} onChange={event => changeStatus(enquiry.id, event.target.value)}>
                {statuses.map(status => <option key={status} value={status}>{statusLabel(status)}</option>)}
              </select>
            </div>
            <dl>
              <div><dt>WhatsApp</dt><dd><a href={`https://wa.me/${enquiry.whatsapp_number.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">{enquiry.whatsapp_number}<ExternalLink aria-hidden="true" /></a></dd></div>
              <div><dt>Email</dt><dd>{enquiry.email ? <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a> : 'Not provided'}</dd></div>
              <div><dt>Preferred date</dt><dd>{enquiry.preferred_completion_date || 'Not specified'}</dd></div>
              {enquiry.target_airline && <div><dt>Target airline</dt><dd>{enquiry.target_airline}</dd></div>}
            </dl>
            <div className="admin-message"><strong>Requirement</strong><p>{enquiry.message}</p></div>
            <button className="admin-delete" type="button" onClick={() => remove(enquiry.id)}><Trash2 aria-hidden="true" />Delete enquiry</button>
          </article>)}
        </section>}
  </main>
}
