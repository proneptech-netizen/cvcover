const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export function isEnquiryBackendConfigured() {
  return Boolean(supabaseUrl && supabasePublishableKey)
}

export async function submitEnquiry(values) {
  if (!isEnquiryBackendConfigured()) {
    throw new Error('The enquiry service is temporarily unavailable. Please contact us directly on WhatsApp.')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/submit_enquiry`, {
    method: 'POST',
    headers: {
      apikey: supabasePublishableKey,
      Authorization: `Bearer ${supabasePublishableKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      p_full_name: values.name.trim(),
      p_whatsapp_number: values.phone.trim(),
      p_email: values.email.trim() || null,
      p_preferred_completion_date: values.date || null,
      p_service: values.service,
      p_target_airline: values.targetAirline.trim() || null,
      p_message: values.message.trim(),
      p_consent: values.consent,
    }),
  })

  if (!response.ok) {
    throw new Error('We could not save your enquiry. Please try again or contact us directly on WhatsApp.')
  }

  return response.json()
}
