const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const SESSION_KEY = 'cvcover-admin-session'

function configured() {
  return Boolean(supabaseUrl && supabasePublishableKey)
}

async function request(path, options = {}) {
  if (!configured()) throw new Error('Admin service is not configured.')
  const response = await fetch(`${supabaseUrl}${path}`, options)
  if (!response.ok) {
    let message = 'The request could not be completed.'
    try {
      const body = await response.json()
      message = body.msg || body.message || body.error_description || message
    } catch {
      // Keep the safe fallback message when the response is not JSON.
    }
    throw new Error(message)
  }
  if (response.status === 204) return null
  return response.json()
}

function authHeaders(token, extra = {}) {
  return {
    apikey: supabasePublishableKey,
    Authorization: `Bearer ${token}`,
    ...extra,
  }
}

export function getAdminSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY))
    return session?.access_token ? session : null
  } catch {
    return null
  }
}

export async function signInAdmin(email, password) {
  const session = await request('/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: {
      apikey: supabasePublishableKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function signOutAdmin() {
  sessionStorage.removeItem(SESSION_KEY)
}

export async function fetchEnquiries(token) {
  return request('/rest/v1/enquiries?select=*&order=created_at.desc', {
    headers: authHeaders(token),
  })
}

export async function updateEnquiryStatus(token, id, status) {
  return request(`/rest/v1/enquiries?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: authHeaders(token, {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    }),
    body: JSON.stringify({ status, updated_at: new Date().toISOString() }),
  })
}

export async function deleteEnquiry(token, id) {
  return request(`/rest/v1/enquiries?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  })
}
