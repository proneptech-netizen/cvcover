export const STANDARD_CV_PRICING = Object.freeze({ standard: 499, priority: 599, express: 699 })
export const STANDARD_COVER_LETTER_PRICING = STANDARD_CV_PRICING
export const STANDARD_CV_REVIEW_PRICING = STANDARD_CV_PRICING
export const CV_AND_COVER_LETTER_PRICING = Object.freeze({ standard: 999, priority: 1099, express: 1199 })

export const CABIN_CREW_SERVICE_NAMES = Object.freeze({
  cv: 'Cabin Crew / Air Hostess CV',
  coverLetter: 'Cabin Crew Cover Letter',
  combination: 'Cabin Crew CV + Cover Letter',
  package: 'Cabin Crew CV + Cover Letter Package',
  review: 'Existing Cabin Crew CV Review',
  airlineCoverLetter: 'Airline-Specific Cover Letter',
})

export const CABIN_CREW_PRICING = Object.freeze({
  [CABIN_CREW_SERVICE_NAMES.cv]: STANDARD_CV_PRICING,
  [CABIN_CREW_SERVICE_NAMES.coverLetter]: STANDARD_COVER_LETTER_PRICING,
  [CABIN_CREW_SERVICE_NAMES.combination]: CV_AND_COVER_LETTER_PRICING,
  [CABIN_CREW_SERVICE_NAMES.package]: CV_AND_COVER_LETTER_PRICING,
  [CABIN_CREW_SERVICE_NAMES.review]: STANDARD_CV_REVIEW_PRICING,
  [CABIN_CREW_SERVICE_NAMES.airlineCoverLetter]: STANDARD_COVER_LETTER_PRICING,
})

export const isCabinCrewService = serviceName => Object.hasOwn(CABIN_CREW_PRICING, serviceName)

export const money = value => `NPR ${value.toLocaleString('en-US')}`

export function buildQuoteMessage({ category, service, delivery, price, targetAirline = '', custom = false }) {
  if (custom) {
    return `Hello, I would like to request a custom quotation.\n\nCategory: ${category}\nService: ${service}\nPricing: Custom Pricing\nProcessing Time: Varies by Service\n\nPlease review my requirements and provide the final price and estimated completion time.`
  }

  const targetLine = isCabinCrewService(service) && targetAirline.trim()
    ? `\nTarget Airline or Vacancy: ${targetAirline.trim()}`
    : ''

  return `Hello, I would like to continue with this service.\n\nCategory: ${category}\nService: ${service}\nDelivery: ${delivery.label}\nEstimated Time: ${delivery.time}\nEstimated Price: ${money(price)}${targetLine}\n\nPlease confirm the requirements, final price and availability before work begins.`
}
