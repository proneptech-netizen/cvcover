import assert from 'node:assert/strict'
import {
  buildQuoteMessage, CABIN_CREW_PRICING, CABIN_CREW_SERVICE_NAMES,
  CV_AND_COVER_LETTER_PRICING, isCabinCrewService,
  STANDARD_COVER_LETTER_PRICING, STANDARD_CV_PRICING, STANDARD_CV_REVIEW_PRICING,
} from '../src/utils/servicePricing.js'

const standard = { standard: 499, priority: 599, express: 699 }
const combined = { standard: 999, priority: 1099, express: 1199 }
assert.deepEqual(STANDARD_CV_PRICING, standard)
assert.deepEqual(STANDARD_COVER_LETTER_PRICING, standard)
assert.deepEqual(STANDARD_CV_REVIEW_PRICING, standard)
assert.deepEqual(CV_AND_COVER_LETTER_PRICING, combined)

for (const service of [CABIN_CREW_SERVICE_NAMES.cv, CABIN_CREW_SERVICE_NAMES.coverLetter, CABIN_CREW_SERVICE_NAMES.review, CABIN_CREW_SERVICE_NAMES.airlineCoverLetter]) {
  assert.deepEqual(CABIN_CREW_PRICING[service], standard, `${service} should use standalone pricing`)
}
for (const service of [CABIN_CREW_SERVICE_NAMES.combination, CABIN_CREW_SERVICE_NAMES.package]) {
  assert.strictEqual(CABIN_CREW_PRICING[service], CV_AND_COVER_LETTER_PRICING, `${service} should alias combined pricing`)
}
assert.equal(isCabinCrewService(CABIN_CREW_SERVICE_NAMES.cv), true)
assert.equal(isCabinCrewService('ATS-Friendly CV / Resume'), false)

const category = 'CV & Career Documents'
const deliveries = {
  standard: { label: 'Standard Delivery', time: '24–48 Hours' },
  priority: { label: 'Priority Delivery', time: '12–24 Hours' },
  express: { label: 'Express Delivery', time: '6–12 Hours' },
}
const withTarget = buildQuoteMessage({ category, service: CABIN_CREW_SERVICE_NAMES.cv, delivery: deliveries.standard, price: 499, targetAirline: 'Emirates Cabin Crew' })
assert.match(withTarget, /Estimated Price: NPR 499/)
assert.match(withTarget, /Target Airline or Vacancy: Emirates Cabin Crew/)

const noTarget = buildQuoteMessage({ category, service: CABIN_CREW_SERVICE_NAMES.coverLetter, delivery: deliveries.priority, price: 599 })
assert.match(noTarget, /Priority Delivery/)
assert.doesNotMatch(noTarget, /Target Airline or Vacancy:/)

const combinedMessage = buildQuoteMessage({ category, service: CABIN_CREW_SERVICE_NAMES.combination, delivery: deliveries.express, price: 1199, targetAirline: 'General Cabin Crew vacancy' })
assert.match(combinedMessage, /Estimated Price: NPR 1,199/)
assert.match(combinedMessage, /Target Airline or Vacancy: General Cabin Crew vacancy/)

const standardMessage = buildQuoteMessage({ category, service: 'ATS-Friendly CV / Resume', delivery: deliveries.standard, price: 499, targetAirline: 'Ignored value' })
assert.doesNotMatch(standardMessage, /Target Airline or Vacancy:/)

const customMessage = buildQuoteMessage({ category: 'Other / Custom Services', service: 'Custom Document Preparation & Formatting', custom: true })
assert.match(customMessage, /Pricing: Custom Pricing/)
assert.doesNotMatch(customMessage, /undefined|null/)

console.log('Service pricing and WhatsApp message tests passed.')
