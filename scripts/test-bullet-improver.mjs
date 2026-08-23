import assert from 'node:assert/strict'
import { improveBullet } from '../src/utils/freeTools.js'

const cases = [
  {
    name: 'order taking and menu knowledge',
    input: 'Order Taking & Menu Knowledge: Explaining menu items, describing ingredients, suggesting popular dishes, and writing down orders accurately.',
    expected: 'Explained menu items and ingredients, recommended popular dishes, and recorded guest orders accurately.',
  },
  {
    name: 'food and beverage delivery',
    input: 'Food & Beverage Delivery: Serving food and drinks promptly and safely from the kitchen to the correct tables.',
    expected: 'Delivered food and beverages promptly and safely from the kitchen to the correct tables.',
  },
  {
    name: 'POS and billing',
    input: 'Point of Sale (POS) & Billing: Processing payments, handling cash, operating card machines, and splitting bills correctly.',
    expected: 'Processed payments accurately using POS systems, handled cash and card transactions, and split bills correctly.',
  },
  {
    name: 'table setting and bussing',
    input: 'Table Setting & Bussing: Clearing dirty dishes, cleaning tables, and setting up tableware for the next guests.',
    expected: 'Cleared and cleaned tables efficiently and reset tableware for incoming guests.',
  },
  {
    name: 'customer service and dining',
    input: 'Customer Service: Welcoming guests warmly, taking care of their needs, and ensuring an excellent dining experience.',
    expected: 'Delivered warm and attentive customer service by welcoming guests, responding to their needs and helping create a positive dining experience.',
  },
  {
    name: 'administration',
    input: 'Administration: Filing documents, answering phone calls and scheduling appointments.',
    expected: 'Filed documents, answered calls and scheduled appointments.',
  },
  {
    name: 'sales',
    input: 'Sales: Assisting customers, explaining product features and completing sales transactions.',
    expected: 'Assisted customers, explained product features and completed sales transactions.',
  },
  {
    name: 'teaching',
    input: 'Teaching: Teaching students, preparing lessons and checking homework.',
    expected: 'Taught students, prepared lessons and reviewed homework.',
  },
  {
    name: 'driving',
    input: 'Driving: Driving the company vehicle, delivering goods and maintaining delivery records.',
    expected: 'Drove the company vehicle, delivered goods and maintained delivery records.',
  },
  {
    name: 'warehouse',
    input: 'Warehouse: Receiving stock, arranging items and preparing customer orders.',
    expected: 'Received stock, arranged items and prepared customer orders.',
  },
  {
    name: 'office work',
    input: 'Office Work: Entering data, responding to emails and maintaining office files.',
    expected: 'Entered data, responded to emails and maintained office files.',
  },
  {
    name: 'hospitality housekeeping',
    input: 'Hospitality: Cleaning guest rooms, replenishing supplies and reporting maintenance needs.',
    expected: 'Cleaned guest rooms, replenished supplies and reported maintenance needs.',
  },
  {
    name: 'customer enquiries',
    input: 'Handling customer enquiries, resolving complaints and updating customer records.',
    expected: 'Handled customer enquiries, resolved complaints and updated customer records.',
  },
  {
    name: 'preserve strong finite action',
    input: 'Managed inventory records and prepared weekly stock reports.',
    expected: 'Maintained inventory records and prepared weekly stock reports.',
  },
  {
    name: 'concise tone',
    input: 'Customer Service: Welcoming guests warmly, taking care of their needs, and ensuring an excellent dining experience.',
    tone: 'concise',
    expected: 'Delivered customer service by welcoming guests, responding to their needs and helping create a positive dining experience.',
  },
  {
    name: 'target role cannot add facts',
    input: 'Greeting visitors, answering calls and maintaining reception records.',
    target: 'Hotel receptionist using Opera PMS and handling payments',
    expected: 'Greeted visitors, answered calls and maintained reception records.',
    forbidden: ['Opera', 'payment'],
  },
]

for (const test of cases) {
  const first = improveBullet(test.input, test.tone || 'professional', test.target || '')
  const second = improveBullet(test.input, test.tone || 'professional', test.target || '')
  assert.equal(first.improved, test.expected, test.name)
  assert.deepEqual(first, second, `${test.name} must be deterministic`)
  for (const forbidden of test.forbidden || []) assert.doesNotMatch(first.improved, new RegExp(forbidden, 'i'), `${test.name} invented ${forbidden}`)
  assert.doesNotMatch(first.improved, /warehouse operations|transport and delivery duties/i, `${test.name} received an unrelated template`)
}

for (const unclear of ['', 'Customer service', 'Helping people']) {
  assert.throws(() => improveBullet(unclear), /Please add more detail/, `unclear input should be rejected: ${unclear || '(empty)'}`)
}

console.log(`Passed ${cases.length} deterministic bullet transformation cases and 3 unclear-input validation cases.`)
