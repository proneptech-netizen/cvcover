const MAX_FILE_BYTES = 5 * 1024 * 1024
const MAX_TEXT_LENGTH = 50000

const stopWords = new Set('a an and are as at be been being but by can could did do does for from had has have if in into is it its may more most must of on or our should than that the their them then there these they this those to under up was we were what when where which who will with within would you your'.split(' '))
const knownSkills = [
  'account management', 'administration', 'adobe', 'analysis', 'bookkeeping', 'budgeting',
  'communication', 'content creation', 'crm', 'customer service', 'data analysis', 'documentation',
  'excel', 'google workspace', 'inventory management', 'leadership', 'logistics', 'marketing',
  'microsoft office', 'negotiation', 'operations', 'power bi', 'presentation', 'problem solving',
  'procurement', 'project management', 'reporting', 'sales', 'sap', 'social media', 'teamwork',
  'time management', 'training', 'word', 'python', 'javascript', 'react', 'sql', 'accounting',
]
const actionVerbs = ['achieved','analysed','analyzed','built','coordinated','created','delivered','developed','implemented','improved','increased','led','managed','optimised','optimized','organised','organized','prepared','reduced','resolved','supported','trained','updated','maintained','produced','designed','supervised','negotiated','generated','launched','streamlined']

function cleanText(value) {
  return value.replace(/\0/g, '').replace(/\r/g, '').replace(/[ \t]+\n/g, '\n').replace(/\n{4,}/g, '\n\n\n').trim().slice(0, MAX_TEXT_LENGTH)
}

function decodePdfString(value) {
  return value.replace(/\\([nrtbf()\\])/g, (_, char) => ({ n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', '(': '(', ')': ')', '\\': '\\' }[char]))
    .replace(/\\([0-7]{1,3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)))
}

function extractPdfOperators(content) {
  const sections = content.match(/BT[\s\S]*?ET/g) || []
  const output = []
  for (const section of sections) {
    for (const match of section.matchAll(/\((?:\\.|[^\\)])*\)\s*(?:Tj|'|")|\[(.*?)\]\s*TJ/gs)) {
      const source = match[0].startsWith('[') ? match[1] : match[0]
      for (const text of source.matchAll(/\(((?:\\.|[^\\)])*)\)/g)) output.push(decodePdfString(text[1]))
      for (const hex of source.matchAll(/<([0-9a-fA-F]+)>/g)) {
        const bytes = hex[1].match(/.{1,2}/g)?.map(value => parseInt(value, 16)) || []
        output.push(new TextDecoder().decode(new Uint8Array(bytes)))
      }
    }
  }
  return output.join(' ')
}

async function extractPdf(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer)
  const binary = new TextDecoder('latin1').decode(bytes)
  const parts = [extractPdfOperators(binary)]
  for (const match of binary.matchAll(/<<(.*?)>>\s*stream\r?\n/gs)) {
    if (!/FlateDecode/.test(match[1])) continue
    const start = match.index + match[0].length
    const end = binary.indexOf('endstream', start)
    if (end < 0) continue
    try {
      const stream = bytes.slice(start, end - (binary[end - 1] === '\n' ? 1 : 0))
      const decoded = await new Response(new Blob([stream]).stream().pipeThrough(new DecompressionStream('deflate'))).arrayBuffer()
      parts.push(extractPdfOperators(new TextDecoder('latin1').decode(decoded)))
    } catch { /* Other PDF filters are reported as unreadable below. */ }
  }
  return cleanText(parts.join('\n'))
}

function findEndOfCentralDirectory(view) {
  for (let offset = view.byteLength - 22; offset >= Math.max(0, view.byteLength - 65557); offset--) {
    if (view.getUint32(offset, true) === 0x06054b50) return offset
  }
  return -1
}

async function extractDocx(arrayBuffer) {
  const view = new DataView(arrayBuffer)
  const eocd = findEndOfCentralDirectory(view)
  if (eocd < 0) throw new Error('This DOCX file appears to be damaged or unsupported.')
  let offset = view.getUint32(eocd + 16, true)
  const entries = view.getUint16(eocd + 10, true)
  const decoder = new TextDecoder()
  for (let index = 0; index < entries; index++) {
    if (view.getUint32(offset, true) !== 0x02014b50) break
    const method = view.getUint16(offset + 10, true)
    const compressedSize = view.getUint32(offset + 20, true)
    const nameLength = view.getUint16(offset + 28, true)
    const extraLength = view.getUint16(offset + 30, true)
    const commentLength = view.getUint16(offset + 32, true)
    const localOffset = view.getUint32(offset + 42, true)
    const name = decoder.decode(new Uint8Array(arrayBuffer, offset + 46, nameLength))
    if (name === 'word/document.xml') {
      const localNameLength = view.getUint16(localOffset + 26, true)
      const localExtraLength = view.getUint16(localOffset + 28, true)
      const start = localOffset + 30 + localNameLength + localExtraLength
      const compressed = new Uint8Array(arrayBuffer, start, compressedSize)
      let xmlBytes
      if (method === 0) xmlBytes = compressed
      else if (method === 8) xmlBytes = new Uint8Array(await new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer())
      else throw new Error('This DOCX compression format is not supported by your browser.')
      const xml = decoder.decode(xmlBytes)
      return cleanText(xml.replace(/<w:tab\/?\s*>/g, '\t').replace(/<w:br\/?\s*>/g, '\n').replace(/<\/w:p>/g, '\n').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'"))
    }
    offset += 46 + nameLength + extraLength + commentLength
  }
  throw new Error('We could not find readable document text in this DOCX file.')
}

export async function extractTextFromFile(file) {
  if (!file) throw new Error('Choose a file first.')
  if (file.size > MAX_FILE_BYTES) throw new Error('The selected file is larger than 5 MB.')
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!['txt', 'pdf', 'docx'].includes(extension)) throw new Error('Unsupported file type. Upload a .txt, text-based .pdf or .docx file.')
  const buffer = await file.arrayBuffer()
  let text = ''
  if (extension === 'txt') text = cleanText(new TextDecoder().decode(buffer))
  if (extension === 'pdf') text = await extractPdf(buffer)
  if (extension === 'docx') text = await extractDocx(buffer)
  if (text.split(/\s+/).filter(Boolean).length < 20) {
    if (extension === 'pdf') throw new Error('We could not detect readable text in this PDF. Please paste the CV text or upload a text-based PDF/DOCX file.')
    throw new Error('We could not detect enough readable text in this file. Please paste the CV text instead.')
  }
  return text
}

function tokens(text) {
  return (text.toLowerCase().match(/[a-z][a-z0-9+#.-]{1,}/g) || []).map(token => token.replace(/^[.-]+|[.-]+$/g, ''))
}

function stem(token) {
  if (token.length > 5 && token.endsWith('ies')) return `${token.slice(0, -3)}y`
  if (token.length > 5 && token.endsWith('ing')) return token.slice(0, -3)
  if (token.length > 4 && token.endsWith('ed')) return token.slice(0, -2)
  if (token.length > 4 && token.endsWith('es')) return token.slice(0, -2)
  if (token.length > 3 && token.endsWith('s')) return token.slice(0, -1)
  return token
}

function hasHeading(text, pattern) {
  return text.split('\n').some(line => line.trim().length < 55 && pattern.test(line.trim()))
}

export function analyseCV(text) {
  const clean = cleanText(text)
  const wordList = tokens(clean)
  if (wordList.length < 80) throw new Error('Please provide at least 80 readable words from your CV for a meaningful analysis.')
  const lines = clean.split('\n').map(line => line.trim()).filter(Boolean)
  const email = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(clean)
  const phone = /(?:\+?\d[\d\s()-]{7,}\d)/.test(clean)
  const headings = {
    summary: hasHeading(clean, /^(professional )?(summary|profile|objective|career profile)$/i),
    experience: hasHeading(clean, /^(work |professional )?(experience|employment|work history)$/i),
    education: hasHeading(clean, /^(education|academic background|qualifications?)$/i),
    skills: hasHeading(clean, /^(key |core |technical )?(skills|competencies|expertise)$/i),
  }
  const metrics = (clean.match(/(?:\b\d+(?:[.,]\d+)?%|\b\d+\+|[$£€]\s?\d|\b\d{2,}\b)/g) || []).length
  const verbs = actionVerbs.filter(verb => new RegExp(`\\b${verb}\\b`, 'i').test(clean))
  const dateMatches = clean.match(/\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[ .-]+\d{4}|\b(?:19|20)\d{2}\b|\b\d{1,2}[/-]\d{4}\b/gi) || []
  const dateStyles = new Set(dateMatches.map(value => /[/-]/.test(value) ? 'numeric' : /^[A-Za-z]/.test(value) ? 'named' : 'year'))
  const decorative = (clean.match(/[★◆■●►➤✓✔☎☏]{1,}/g) || []).length
  const tableSignals = lines.filter(line => /\t|\|/.test(line) || /\S {4,}\S/.test(line)).length
  const longLines = lines.filter(line => line.length > 180).length
  const keywordVariety = new Set(wordList.filter(word => word.length > 5 && !stopWords.has(word))).size
  const checks = [
    { category: 'Contact Information', label: 'Email and phone details', weight: 10, score: email && phone ? 10 : email || phone ? 5 : 0, detail: email && phone ? 'A recognisable email address and phone number were detected.' : 'Include both a professional email address and reachable phone number.' },
    { category: 'Structure', label: 'Professional summary', weight: 8, score: headings.summary ? 8 : 0, detail: headings.summary ? 'A clearly labelled summary or profile section was detected.' : 'Add a clearly labelled Professional Summary or Profile section.' },
    { category: 'Structure', label: 'Employment history', weight: 12, score: headings.experience ? 12 : 0, detail: headings.experience ? 'A recognisable experience heading was detected.' : 'Use a clear Work Experience or Employment History heading.' },
    { category: 'Structure', label: 'Education section', weight: 8, score: headings.education ? 8 : 0, detail: headings.education ? 'A recognisable education heading was detected.' : 'Add a clearly labelled Education section.' },
    { category: 'Structure', label: 'Skills section', weight: 8, score: headings.skills ? 8 : 0, detail: headings.skills ? 'A recognisable skills heading was detected.' : 'Add a clearly labelled Skills section with truthful, role-relevant skills.' },
    { category: 'Evidence', label: 'Measurable achievements', weight: 10, score: metrics >= 3 ? 10 : metrics ? 5 : 0, detail: `${metrics} potential measurable result${metrics === 1 ? '' : 's'} detected. Add only figures you can verify.` },
    { category: 'Writing', label: 'Action-focused language', weight: 10, score: verbs.length >= 5 ? 10 : verbs.length >= 2 ? 6 : verbs.length ? 3 : 0, detail: `${verbs.length} recognised action verb${verbs.length === 1 ? '' : 's'} detected${verbs.length ? `: ${verbs.slice(0, 6).join(', ')}` : ''}.` },
    { category: 'Consistency', label: 'Date consistency', weight: 8, score: dateMatches.length >= 2 && dateStyles.size <= 2 ? 8 : dateMatches.length ? 4 : 0, detail: dateMatches.length ? `${dateMatches.length} date references using ${dateStyles.size} broad format style(s) were detected.` : 'No clear employment or education dates were detected.' },
    { category: 'Formatting', label: 'Readable section headings', weight: 8, score: Object.values(headings).filter(Boolean).length >= 3 ? 8 : 4, detail: `${Object.values(headings).filter(Boolean).length}/4 essential headings were clearly recognised.` },
    { category: 'Formatting', label: 'Limited decorative symbols', weight: 6, score: decorative <= 2 ? 6 : decorative <= 6 ? 3 : 0, detail: decorative ? `${decorative} decorative symbol groups detected; simpler formatting is generally safer.` : 'No excessive decorative symbols were detected.' },
    { category: 'Formatting', label: 'Table and text-box risk', weight: 6, score: tableSignals === 0 ? 6 : tableSignals <= 3 ? 3 : 0, detail: tableSignals ? `${tableSignals} line(s) may use columns, tables or text-box-like spacing.` : 'No obvious table or column signals were found in the extracted text.' },
    { category: 'Readability', label: 'Keyword clarity and readability', weight: 6, score: keywordVariety >= 35 && longLines <= 2 ? 6 : 3, detail: `${keywordVariety} distinct descriptive terms and ${longLines} unusually long line(s) detected.` },
  ]
  const score = Math.round(checks.reduce((sum, check) => sum + check.score, 0))
  const status = score >= 85 ? 'Strong' : score >= 70 ? 'Good' : score >= 50 ? 'Fair' : 'Needs Work'
  const categoryScores = Object.values(checks.reduce((map, check) => {
    map[check.category] ||= { label: check.category, earned: 0, possible: 0 }
    map[check.category].earned += check.score
    map[check.category].possible += check.weight
    return map
  }, {})).map(item => ({ ...item, score: Math.round(item.earned / item.possible * 100) }))
  const passed = checks.filter(check => check.score === check.weight)
  const warnings = checks.filter(check => check.score < check.weight)
  const improvements = [...warnings].sort((a, b) => (b.weight - b.score) - (a.weight - a.score)).slice(0, 5).map(check => check.detail)
  return { score, status, checks, categoryScores, passed, warnings, improvements, wordCount: wordList.length, explanation: 'The score is the sum of 12 disclosed checks weighted to 100 points. Full, partial or zero points are awarded from visible text patterns only; the same input always produces the same score.' }
}

function tidyBullet(value) {
  const clean = value.trim().replace(/^\s*(?:[-•*]|\d+[.)])\s*/, '').replace(/\s+/g, ' ').replace(/\s+([,.;:])/g, '$1').replace(/([,;:])(?=\S)/g, '$1 ').replace(/[.;\s]+$/, '')
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : ''
}

const bulletLabels = /^(?:customer service|order taking\s*&\s*menu knowledge|food\s*&\s*beverage delivery|point of sale\s*\(pos\)\s*&\s*billing|table setting\s*&\s*bussing|hospitality|administration|administrative duties|sales|teaching|teacher duties|driving|driver duties|warehouse|warehouse duties|office work|office duties|responsibilities|key duties)\s*:\s*/i
const openingVerbRules = [
  [/^welcoming\b/i, 'Welcomed'], [/^greeting\b/i, 'Greeted'], [/^handling\b/i, 'Handled'],
  [/^managing\b/i, 'Managed'], [/^preparing\b/i, 'Prepared'], [/^supporting\b/i, 'Supported'],
  [/^updating\b/i, 'Updated'], [/^assisting\b/i, 'Assisted'], [/^answering\b/i, 'Answered'],
  [/^filing\b/i, 'Filed'], [/^scheduling\b/i, 'Scheduled'], [/^selling\b/i, 'Sold'],
  [/^teaching\b/i, 'Taught'], [/^driving\b/i, 'Drove'], [/^delivering\b/i, 'Delivered'],
  [/^receiving\b/i, 'Received'], [/^arranging\b/i, 'Arranged'], [/^loading\b/i, 'Loaded'],
  [/^cleaning\b/i, 'Cleaned'], [/^serving\b/i, 'Served'], [/^entering\b/i, 'Entered'],
  [/^checking\b/i, 'Checked'], [/^maintaining\b/i, 'Maintained'], [/^organising\b/i, 'Organised'],
  [/^organizing\b/i, 'Organised'], [/^monitoring\b/i, 'Monitored'], [/^operating\b/i, 'Operated'],
]

function sentenceCase(value) {
  const clean = value.trim().replace(/\s+/g, ' ')
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : ''
}

function makeOpeningFinite(value) {
  for (const [pattern, replacement] of openingVerbRules) {
    if (pattern.test(value)) return value.replace(pattern, replacement)
  }
  return value
}

const parallelPastVerbs = new Map([
  ['welcoming', 'welcomed'], ['greeting', 'greeted'], ['handling', 'handled'], ['managing', 'managed'],
  ['preparing', 'prepared'], ['supporting', 'supported'], ['updating', 'updated'], ['assisting', 'assisted'],
  ['answering', 'answered'], ['filing', 'filed'], ['scheduling', 'scheduled'], ['selling', 'sold'],
  ['teaching', 'taught'], ['driving', 'drove'], ['delivering', 'delivered'], ['receiving', 'received'],
  ['arranging', 'arranged'], ['loading', 'loaded'], ['unloading', 'unloaded'], ['cleaning', 'cleaned'],
  ['serving', 'served'], ['entering', 'entered'], ['checking', 'checked'], ['maintaining', 'maintained'],
  ['organising', 'organised'], ['organizing', 'organised'], ['monitoring', 'monitored'], ['operating', 'operated'],
  ['explaining', 'explained'], ['describing', 'described'], ['suggesting', 'suggested'], ['writing', 'recorded'],
  ['processing', 'processed'], ['splitting', 'split'], ['clearing', 'cleared'], ['setting', 'set'],
  ['responding', 'responded'], ['resolving', 'resolved'], ['completing', 'completed'], ['reporting', 'reported'],
  ['replenishing', 'replenished'], ['reviewing', 'reviewed'], ['packing', 'packed'], ['organizing', 'organised'],
])

function makeParallelPast(value) {
  const pattern = new RegExp(`(^|,\\s*(?:and\\s+)?|\\s+and\\s+)(${[...parallelPastVerbs.keys()].join('|')})\\b`, 'gi')
  return value.replace(pattern, (_, separator, verb) => `${separator}${parallelPastVerbs.get(verb.toLowerCase())}`)
}

function normalizeBulletClauses(value) {
  return value
    .replace(/\band taking care of (?:the |their )?needs\b/gi, 'and responding to their needs')
    .replace(/\btaking care of (?:the |their )?needs\b/gi, 'responding to their needs')
    .replace(/\bensuring an excellent dining experience\b/gi, 'helping create a positive dining experience')
    .replace(/\banswering phone calls\b/gi, 'answering calls')
    .replace(/\bchecking homework\b/gi, 'reviewing homework')
    .replace(/\butili[sz]ed\b/gi, 'used')
    .replace(/\bin order to\b/gi, 'to')
    .replace(/\bcustomer Service\b/g, 'customer service')
    .replace(/\s*,\s*and\s+/gi, ', and ')
}

function contextualBullet(value) {
  const lower = value.toLowerCase()
  if (/welcom(?:e|ing) guests?/.test(lower) && /needs?/.test(lower) && /dining experience/.test(lower)) {
    return 'Delivered warm and attentive customer service by welcoming guests, responding to their needs and helping create a positive dining experience'
  }
  if (/explaining menu items/.test(lower) && /ingredients/.test(lower) && /popular dishes/.test(lower) && /orders accurately/.test(lower)) {
    return 'Explained menu items and ingredients, recommended popular dishes, and recorded guest orders accurately'
  }
  if (/serving food and drinks/.test(lower) && /kitchen/.test(lower) && /correct tables/.test(lower)) {
    return 'Delivered food and beverages promptly and safely from the kitchen to the correct tables'
  }
  if (/processing payments/.test(lower) && /handling cash/.test(lower) && /card machines/.test(lower) && /splitting bills/.test(lower)) {
    return 'Processed payments accurately using POS systems, handled cash and card transactions, and split bills correctly'
  }
  if (/clearing dirty dishes/.test(lower) && /cleaning tables/.test(lower) && /setting up tableware/.test(lower)) {
    return 'Cleared and cleaned tables efficiently and reset tableware for incoming guests'
  }
  const normalized = normalizeBulletClauses(value)
    .replace(/^Managed inventory records\b/i, 'Maintained inventory records')
  return makeOpeningFinite(makeParallelPast(normalized))
}

export function improveBullet(input, tone = 'professional', target = '') {
  const original = tidyBullet(input.replace(bulletLabels, ''))
  const inputTokens = tokens(original)
  if (inputTokens.length < 5 || new Set(inputTokens).size < 4 || !/[a-z]{3}/i.test(original)) throw new Error('Please add more detail about what you did, who or what you supported, and the task involved.')
  let factualInput = original
    .replace(/^(responsible for|duties included|tasked with)\s+/i, '')
    .replace(/^helped (?:to |with )?/i, '')
    .replace(/^worked on\s+/i, '')
  let improved = contextualBullet(factualInput)
  improved = sentenceCase(improved).replace(/\s{2,}/g, ' ')
  if (tone === 'concise') improved = improved.replace(/\b(warm and |attentive |responsive |daily |organised )\b/gi, '').replace(/\s{2,}/g, ' ')
  if (tone === 'achievement' && /(?:\d|%|increased|reduced|improved|achieved|generated|saved)/i.test(original)) {
    improved = improved.replace(/^(.+?)(?:,|;),?\s*((?:increased|reduced|improved|achieved|generated|saved).+)$/i, (_, action, result) => `${sentenceCase(result)} by ${action.charAt(0).toLowerCase()}${action.slice(1)}`)
  }
  const hasEvidence = /\d|%|increased|reduced|improved|achieved|generated|saved/i.test(original)
  const targetTerms = target ? getJobKeywords(target).slice(0, 3).filter(term => original.toLowerCase().includes(term.toLowerCase())) : []
  return {
    improved: `${improved.replace(/[.;\s]+$/, '')}.`, alternatives: [],
    explanation: `Removed weak labels, converted the supplied duties into a concise past-tense action structure, and kept the stated facts intact${targetTerms.length ? `; retained relevant wording already present: ${targetTerms.join(', ')}` : ''}.`,
    evidenceWarning: hasEvidence ? '' : 'The original statement contains no clear measurable evidence. Add a result only if you can verify it.',
  }
}

function getJobKeywords(text) {
  const lower = text.toLowerCase()
  const skills = knownSkills.filter(skill => lower.includes(skill))
  const counts = tokens(text).map(stem).reduce((map, token) => {
    if (token.length >= 4 && !stopWords.has(token) && !/^\d+$/.test(token)) map[token] = (map[token] || 0) + 1
    return map
  }, {})
  const repeated = Object.entries(counts).filter(([, count]) => count >= 2).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 24).map(([token]) => token)
  return [...new Set([...skills, ...repeated])]
}

export function compareCV(cvText, jobText) {
  const cv = cleanText(cvText)
  const job = cleanText(jobText)
  if (tokens(cv).length < 60) throw new Error('Please provide at least 60 readable words from your CV.')
  if (tokens(job).length < 60) throw new Error('Please provide a complete job description of at least 60 readable words.')
  const cvStems = new Set(tokens(cv).map(stem))
  const keywords = getJobKeywords(job)
  if (keywords.length < 5) throw new Error('The job description does not contain enough specific role information to compare reliably.')
  const matchesKeyword = keyword => keyword.split(' ').every(part => cvStems.has(stem(part)))
  const matched = keywords.filter(matchesKeyword)
  const missing = keywords.filter(keyword => !matchesKeyword(keyword))
  const skillTerms = keywords.filter(keyword => knownSkills.includes(keyword))
  const matchedSkills = skillTerms.filter(matchesKeyword)
  const responsibilityTerms = keywords.filter(keyword => !skillTerms.includes(keyword)).slice(0, 12)
  const matchedResponsibilities = responsibilityTerms.filter(matchesKeyword)
  const qualificationTerms = keywords.filter(keyword => /degree|diploma|bachelor|master|certif|licen|qualification/i.test(keyword))
  const experienceRequired = /\b(?:minimum |at least )?(\d+)\+?\s*years?\b/i.exec(job)?.[1]
  const cvYears = [...cv.matchAll(/\b(\d+)\+?\s*years?\b/gi)].map(match => Number(match[1]))
  const experienceScore = !experienceRequired ? 70 : cvYears.some(year => year >= Number(experienceRequired)) ? 100 : 30
  const skillsScore = skillTerms.length ? matchedSkills.length / skillTerms.length * 100 : matched.length / keywords.length * 100
  const responsibilityScore = responsibilityTerms.length ? matchedResponsibilities.length / responsibilityTerms.length * 100 : 50
  const qualificationScore = qualificationTerms.length ? qualificationTerms.filter(matchesKeyword).length / qualificationTerms.length * 100 : 70
  const score = Math.round(skillsScore * .5 + responsibilityScore * .25 + qualificationScore * .15 + experienceScore * .1)
  const strengths = []
  if (matchedSkills.length) strengths.push(`Relevant skills already evidenced: ${matchedSkills.slice(0, 6).join(', ')}.`)
  if (matchedResponsibilities.length) strengths.push(`Responsibility language aligns in areas including ${matchedResponsibilities.slice(0, 5).join(', ')}.`)
  if (experienceScore === 100) strengths.push('The CV contains a stated experience duration that meets the visible requirement.')
  if (!strengths.length) strengths.push('Some general language overlaps, but stronger role-specific evidence is needed.')
  const gaps = []
  if (missing.length) gaps.push(`Important terms are missing or unclear: ${missing.slice(0, 8).join(', ')}.`)
  if (experienceRequired && experienceScore < 100) gaps.push(`The job mentions ${experienceRequired} years of experience, but that duration is not clearly supported in the CV text.`)
  if (qualificationTerms.length && qualificationScore < 100) gaps.push('A qualification requirement appears in the job description but is not clearly matched in the CV text.')
  const suggestions = [
    missing.length ? `Review the Skills and Experience sections for truthful evidence related to: ${missing.slice(0, 5).join(', ')}.` : 'Keep the strongest matched terms visible in your summary and recent experience.',
    'Mirror the employer’s terminology only where it accurately describes your own experience.',
    'Use specific examples and verified outcomes in the most relevant experience bullets.',
  ]
  return { score, matched, missing, strengths, gaps, suggestions, breakdown: { skills: Math.round(skillsScore), responsibilities: Math.round(responsibilityScore), qualifications: Math.round(qualificationScore), experience: Math.round(experienceScore) } }
}
