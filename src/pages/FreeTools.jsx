import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertCircle, ArrowRight, BarChart3, Check, CheckCircle2, ClipboardCheck, Copy,
  FileCheck2, FileSearch, ListChecks, LoaderCircle, PencilLine, RefreshCcw, Search,
  ShieldCheck, Sparkles, Target, Upload, XCircle,
} from 'lucide-react'
import ServiceQuoteEstimator from '../components/ServiceQuoteEstimator.jsx'
import { analyseCV, compareCV, extractTextFromFile, improveBullet } from '../utils/freeTools.js'

const tools = [
  { id: 'ats', label: 'ATS Readiness', short: 'ATS', icon: FileSearch },
  { id: 'bullets', label: 'Bullet Improver', short: 'Bullets', icon: PencilLine },
  { id: 'match', label: 'CV & Job Match', short: 'Job Match', icon: Target },
  { id: 'format', label: 'CV Checklist', short: 'Checklist', icon: ClipboardCheck },
]
// Bullet Improver is temporarily disabled until a reliable AI/backend implementation is connected.
const enabledTools = tools.filter(tool => tool.id !== 'bullets')

function scrollToResult(ref) {
  window.requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function ToolTabs({ active, onChange }) {
  const tabRefs = useRef({})
  useEffect(() => {
    if (!window.matchMedia('(max-width: 480px)').matches) return
    tabRefs.current[active]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])
  return <div className="free-tools-tabs" role="tablist" aria-label="Free CV tools">
    {enabledTools.map(({ id, label, short, icon: Icon }) => <button key={id} ref={(node) => { tabRefs.current[id] = node }} id={`free-tool-tab-${id}`} type="button" role="tab" aria-selected={active === id} aria-controls="free-tools-workspace" onClick={() => onChange(id)}>
      <Icon aria-hidden="true" /><span className="free-tools-tab-long">{label}</span><span className="free-tools-tab-short">{short}</span>
    </button>)}
  </div>
}

function FileInput({ id, onText, disabled }) {
  const [status, setStatus] = useState(null)
  const inputRef = useRef(null)
  const change = async event => {
    const file = event.target.files?.[0]
    if (!file) return
    setStatus({ loading: true, message: `Reading ${file.name}…` })
    try {
      const text = await extractTextFromFile(file)
      onText(text)
      setStatus({ success: true, message: `${file.name} loaded successfully. Review the extracted text before analysing.` })
    } catch (error) {
      setStatus({ error: true, message: error.message })
    } finally {
      event.target.value = ''
    }
  }
  return <div className="free-tool-file-input">
    <input ref={inputRef} id={id} type="file" accept=".txt,.pdf,.docx,text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={change} disabled={disabled || status?.loading} />
    <button type="button" onClick={() => inputRef.current?.click()} disabled={disabled || status?.loading}><Upload aria-hidden="true" />{status?.loading ? 'Reading file…' : 'Upload TXT, PDF or DOCX'}</button>
    <small>Maximum 5 MB. Supported files are read locally in your browser.</small>
    {status && <p className={status.error ? 'error' : status.success ? 'success' : ''} role="status">{status.loading && <LoaderCircle aria-hidden="true" />}{status.message}</p>}
  </div>
}

function SubmitButton({ loading, children }) {
  return <button className="free-tool-submit" type="submit" disabled={loading}>{loading ? <LoaderCircle className="free-tool-spinner" aria-hidden="true" /> : null}{loading ? 'Processing…' : children}</button>
}

function ResultCheck({ item }) {
  const pass = item.score === item.weight
  const Icon = pass ? CheckCircle2 : XCircle
  return <li className={pass ? 'pass' : 'review'}><Icon aria-hidden="true" /><div><strong>{item.label} <small>{item.score}/{item.weight}</small></strong><p>{item.detail}</p></div></li>
}

function ATSAnalyzer() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const resultRef = useRef(null)
  const submit = async event => {
    event.preventDefault()
    if (loading) return
    setLoading(true); setResult(null)
    await new Promise(resolve => setTimeout(resolve, 80))
    try { setResult(analyseCV(text)) } catch (error) { setResult({ error: error.message }) }
    finally { setLoading(false); scrollToResult(resultRef) }
  }
  return <section className="free-tool-panel" aria-labelledby="ats-tool-title">
    <div className="free-tool-intro"><span>FREE TOOL 01</span><FileSearch aria-hidden="true" /><h2 id="ats-tool-title">ATS Readiness Analyzer</h2><p>Review structure, evidence and readability using a deterministic 100-point framework—not an invented pass prediction.</p></div>
    <form className="free-tool-form" onSubmit={submit}>
      <label htmlFor="ats-cv">Paste your CV text or upload a supported file</label>
      <textarea id="ats-cv" value={text} onChange={event => setText(event.target.value)} placeholder="Paste the complete text from your CV here…" rows="12" maxLength="50000" disabled={loading} />
      <FileInput id="ats-cv-file" onText={setText} disabled={loading} />
      <div className="free-tool-input-meta"><span>{text.length.toLocaleString()} / 50,000 characters</span><button type="button" onClick={() => { setText(''); setResult(null) }} disabled={loading}><RefreshCcw aria-hidden="true" />Clear</button></div>
      <SubmitButton loading={loading}><BarChart3 aria-hidden="true" />Analyze My CV</SubmitButton>
    </form>
    {result && <div ref={resultRef} className="free-tool-result" aria-live="polite">{result.error ? <p className="free-tool-error"><AlertCircle aria-hidden="true" />{result.error}</p> : <>
      <div className="free-tool-score"><div style={{ '--score': `${result.score * 3.6}deg` }}><strong>{result.score}</strong><span>/100</span></div><p><strong>{result.status}</strong><span>{result.wordCount} readable words analysed. General ATS preparation guidance only.</span></p></div>
      <div className="free-tool-category-scores">{result.categoryScores.map(item => <div key={item.label}><span>{item.label}</span><strong>{item.score}%</strong><i><b style={{ width: `${item.score}%` }} /></i></div>)}</div>
      <ul className="free-tool-check-results">{result.checks.map(item => <ResultCheck key={item.label} item={item} />)}</ul>
      <div className="free-tool-priorities"><h3>Prioritised improvements</h3><ol>{result.improvements.map(item => <li key={item}>{item}</li>)}</ol><p><strong>How this score was calculated:</strong> {result.explanation}</p></div>
    </>}</div>}
  </section>
}

function BulletImprover() {
  const [text, setText] = useState('')
  const [target, setTarget] = useState('')
  const [tone, setTone] = useState('professional')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const resultRef = useRef(null)
  const submit = async event => {
    event.preventDefault()
    if (loading) return
    setLoading(true); setResult(null); setCopied(false)
    await new Promise(resolve => setTimeout(resolve, 80))
    try { setResult(improveBullet(text, tone, target)) } catch (error) { setResult({ error: error.message }) }
    finally { setLoading(false); scrollToResult(resultRef) }
  }
  const copy = async () => { try { await navigator.clipboard.writeText(result.improved); setCopied(true) } catch { setCopied(false) } }
  return <section className="free-tool-panel" aria-labelledby="bullet-tool-title">
    <div className="free-tool-intro"><span>FREE TOOL 02</span><PencilLine aria-hidden="true" /><h2 id="bullet-tool-title">CV Bullet Point Improver</h2><p>Improve clarity, grammar and action language using transparent rules while preserving the facts you provide.</p></div>
    <form className="free-tool-form" onSubmit={submit}>
      <label htmlFor="bullet-text">Original CV bullet</label>
      <textarea id="bullet-text" value={text} onChange={event => setText(event.target.value)} placeholder="Example: Responsible for handling customer enquiries and updating records." rows="5" maxLength="700" disabled={loading} />
      <div className="free-tool-bullet-options"><div><label htmlFor="bullet-tone">Tone</label><select id="bullet-tone" value={tone} onChange={event => setTone(event.target.value)} disabled={loading}><option value="concise">Concise</option><option value="achievement">Achievement-focused</option><option value="professional">Professional</option></select></div><div><label htmlFor="bullet-target">Target role or job description (optional)</label><input id="bullet-target" value={target} onChange={event => setTarget(event.target.value)} maxLength="3000" disabled={loading} placeholder="Paste relevant role details…" /></div></div>
      <div className="free-tool-input-meta"><span>{text.length} / 700 characters</span><button type="button" onClick={() => { setText(''); setTarget(''); setResult(null) }} disabled={loading}><RefreshCcw aria-hidden="true" />Clear</button></div>
      <SubmitButton loading={loading}><Sparkles aria-hidden="true" />Improve This Bullet</SubmitButton>
    </form>
    {result && <div ref={resultRef} className="free-tool-result" aria-live="polite">{result.error ? <p className="free-tool-error"><AlertCircle aria-hidden="true" />{result.error}</p> : <>
      <div className="free-tool-rewrite"><span>Improved bullet</span><p>{result.improved}</p><button type="button" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? 'Copied' : 'Copy'}</button></div>
      {result.alternatives.length > 0 && <div className="free-tool-alternatives"><h3>Alternative versions</h3><ul>{result.alternatives.map(item => <li key={item}>{item}</li>)}</ul></div>}
      <div className="free-tool-explanation"><strong>What changed</strong><p>{result.explanation}</p>{result.evidenceWarning && <p className="warning"><AlertCircle aria-hidden="true" />{result.evidenceWarning}</p>}</div>
      <p className="free-tool-honesty"><ShieldCheck aria-hidden="true" />This rule-based tool does not invent employers, tools, responsibilities, achievements or metrics.</p>
    </>}</div>}
  </section>
}

function JobMatch() {
  const [cv, setCV] = useState('')
  const [job, setJob] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const resultRef = useRef(null)
  const submit = async event => {
    event.preventDefault()
    if (loading) return
    setLoading(true); setResult(null)
    await new Promise(resolve => setTimeout(resolve, 80))
    try { setResult(compareCV(cv, job)) } catch (error) { setResult({ error: error.message }) }
    finally { setLoading(false); scrollToResult(resultRef) }
  }
  return <section className="free-tool-panel free-tool-panel-wide" aria-labelledby="match-tool-title">
    <div className="free-tool-intro"><span>FREE TOOL 03</span><Target aria-hidden="true" /><h2 id="match-tool-title">CV &amp; Job Match Checker</h2><p>Compare your evidence with a complete job description using normalized skills, responsibilities, qualifications and experience indicators.</p></div>
    <form className="free-tool-form free-tool-compare-form" onSubmit={submit}>
      <div><label htmlFor="match-cv">Your CV text or file</label><textarea id="match-cv" value={cv} onChange={event => setCV(event.target.value)} placeholder="Paste your CV text…" rows="11" maxLength="50000" disabled={loading} /><FileInput id="match-cv-file" onText={setCV} disabled={loading} /></div>
      <div><label htmlFor="match-job">Complete job description</label><textarea id="match-job" value={job} onChange={event => setJob(event.target.value)} placeholder="Paste the complete job description…" rows="11" maxLength="50000" disabled={loading} /></div>
      <button className="free-tool-compare-reset" type="button" onClick={() => { setCV(''); setJob(''); setResult(null) }} disabled={loading || (!cv && !job && !result)}><RefreshCcw aria-hidden="true" />Reset comparison</button>
      <SubmitButton loading={loading}><Search aria-hidden="true" />Compare CV With Job</SubmitButton>
    </form>
    {result && <div ref={resultRef} className="free-tool-result" aria-live="polite">{result.error ? <p className="free-tool-error"><AlertCircle aria-hidden="true" />{result.error}</p> : <>
      <div className="free-tool-match-summary"><strong>{result.score}%</strong><div><b>Estimated CV–Job Alignment</b><span>Weighted from skills (50%), responsibilities (25%), qualifications (15%) and experience indicators (10%).</span></div></div>
      <div className="free-tool-match-breakdown">{Object.entries(result.breakdown).map(([label, score]) => <div key={label}><span>{label}</span><strong>{score}%</strong></div>)}</div>
      <div className="free-tool-keyword-columns"><div><h3><CheckCircle2 aria-hidden="true" />Matched keywords</h3><div>{result.matched.length ? result.matched.map(item => <span key={item}>{item}</span>) : <p>No clear role-specific matches were detected.</p>}</div></div><div><h3><AlertCircle aria-hidden="true" />Missing or unclear</h3><div>{result.missing.length ? result.missing.map(item => <span key={item}>{item}</span>) : <p>No important missing terms were detected.</p>}</div></div></div>
      <div className="free-tool-match-guidance"><div><h3>Strengths</h3><ul>{result.strengths.map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>Gaps</h3><ul>{result.gaps.length ? result.gaps.map(item => <li key={item}>{item}</li>) : <li>No major textual gaps were detected.</li>}</ul></div><div><h3>Priority tailoring suggestions</h3><ol>{result.suggestions.map(item => <li key={item}>{item}</li>)}</ol></div></div>
    </>}</div>}
  </section>
}

const checklistGroups = [
  ['Contact Information', ['Contact details are current and professional', 'Email address and phone number are easy to find']],
  ['Professional Summary', ['Summary is concise and tailored to the target role']],
  ['Work Experience', ['Experience uses reverse chronological order', 'Dates and formatting are consistent', 'Bullets begin with clear action language']],
  ['Skills', ['Skills are relevant to the target job']],
  ['Education', ['Education and qualifications are clearly labelled']],
  ['Achievements', ['Achievements include truthful evidence where available']],
  ['Formatting & Readability', ['Layout is readable with clear section headings', 'Complex tables, text boxes and decorative graphics are avoided']],
  ['Final Review', ['Spelling, grammar and punctuation have been reviewed', 'File name is professional and the final copy is a PDF', 'Every detail can be supported or verified if requested']],
]
const checklistItems = checklistGroups.flatMap(([category, items]) => items.map((label, itemIndex) => ({ id: `${category.toLowerCase().replace(/[^a-z]+/g, '-')}-${itemIndex}`, category, label })))
const checklistStorageKey = 'cv-free-tools-checklist-v1'
function readChecklist() { try { const value = JSON.parse(sessionStorage.getItem(checklistStorageKey) || '[]'); return Array.isArray(value) ? value.filter(id => checklistItems.some(item => item.id === id)) : [] } catch { return [] } }

function FormattingChecklist() {
  const [checked, setChecked] = useState(readChecklist)
  useEffect(() => { sessionStorage.setItem(checklistStorageKey, JSON.stringify(checked)) }, [checked])
  const progress = Math.round(checked.length / checklistItems.length * 100)
  const remaining = checklistItems.length - checked.length
  const toggle = id => setChecked(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const reset = () => { if (window.confirm('Clear your CV Checklist progress?')) setChecked([]) }
  return <section className="free-tool-panel free-tool-panel-checklist" aria-labelledby="checklist-tool-title">
    <div className="free-tool-intro"><span>FREE TOOL 04</span><ListChecks aria-hidden="true" /><h2 id="checklist-tool-title">CV Formatting &amp; Quality Checklist</h2><p>Complete this practical final review. Progress is kept only for this browser tab and survives switching between tools.</p></div>
    <div className="free-tool-checklist-progress"><div><span>{checked.length} completed · {remaining} remaining</span><strong>{progress}%</strong></div><div role="progressbar" aria-label="Checklist completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div></div>
    <div className="free-tool-checklist-groups">{checklistGroups.map(([category]) => <fieldset key={category}><legend>{category}</legend>{checklistItems.filter(item => item.category === category).map(item => <label key={item.id} htmlFor={`checklist-${item.id}`}><input id={`checklist-${item.id}`} type="checkbox" checked={checked.includes(item.id)} onChange={() => toggle(item.id)} /><span><Check aria-hidden="true" /></span>{item.label}</label>)}</fieldset>)}</div>
    <div className={progress === 100 ? 'free-tool-complete done' : 'free-tool-complete'}><FileCheck2 aria-hidden="true" /><div><strong>{progress === 100 ? 'Checklist complete' : 'Continue your final review'}</strong><p>{progress === 100 ? 'All checklist items are complete. Review the CV once more for role-specific accuracy.' : `${remaining} item${remaining === 1 ? '' : 's'} still need your attention.`}</p></div><button type="button" onClick={reset} disabled={checked.length === 0}><RefreshCcw aria-hidden="true" />Reset checklist</button></div>
  </section>
}

export default function FreeTools() {
  const initial = useMemo(() => new URLSearchParams(window.location.search).get('tool'), [])
  const [active, setActive] = useState(enabledTools.some(tool => tool.id === initial) ? initial : 'ats')
  useEffect(() => {
    if (initial === 'bullets') window.history.replaceState({}, '', '/free-tools?tool=ats')
    const onPopState = () => {
      const tool = new URLSearchParams(window.location.search).get('tool')
      if (tool === 'bullets') { window.history.replaceState({}, '', '/free-tools?tool=ats'); setActive('ats') }
      else if (enabledTools.some(item => item.id === tool)) setActive(tool)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  const selectTool = id => { setActive(id); window.history.replaceState({}, '', `/free-tools?tool=${id}`); window.requestAnimationFrame(() => document.getElementById('free-tools-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }
  return <main className="free-tools-page-main">
    <section className="free-tools-hero" aria-labelledby="free-tools-title"><div className="free-tools-hero-content"><span>FREE RESOURCES</span><h1 id="free-tools-title">Free CV Tools &amp; Analyzers</h1><p>Practical browser-based tools to help you review, improve and strengthen your CV before applying.</p></div></section>
    <ServiceQuoteEstimator />
    <div className="free-tools-page-content">
      <div className="free-tools-privacy"><ShieldCheck aria-hidden="true" /><div><strong>Private, instant and free</strong><span>— your text and files are processed only inside your browser and are not uploaded or stored.</span></div></div>
      <ToolTabs active={active} onChange={selectTool} />
      <div id="free-tools-workspace" className="free-tools-workspace" role="tabpanel" aria-labelledby={`free-tool-tab-${active}`}>{active === 'ats' && <ATSAnalyzer />}{active === 'bullets' && <BulletImprover />}{active === 'match' && <JobMatch />}{active === 'format' && <FormattingChecklist />}</div>
      <section className="free-tools-notice"><AlertCircle aria-hidden="true" /><div><strong>Important</strong><p>These tools provide general preparation guidance and cannot guarantee interviews, shortlisting or employment.</p></div></section>
      <a className="free-tools-help" href="https://wa.me/9779862989407?text=Hello%2C%20I%20would%20like%20professional%20help%20with%20my%20CV." target="_blank" rel="noopener noreferrer"><div><span>Need a professional review?</span><strong>Get personalised CV support</strong></div><ArrowRight aria-hidden="true" /></a>
    </div>
  </main>
}
