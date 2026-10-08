import { useState } from 'react'
import { studio } from '../../config/studio'
import './projectEnquiry.css'

function makeBrief(data) {
  return ['ARCHITECTURE / PROJECT ENQUIRY', '',
    'Name: ' + data.name, 'Email: ' + data.email, 'Interest: ' + data.interest,
    'Location: ' + (data.location || 'To discuss'), 'Approximate area: ' + (data.area || 'To discuss'),
    'Budget: ' + (data.budget || 'To discuss'), 'Timing: ' + (data.timing || 'To discuss'),
    '', 'PROJECT VISION', data.vision, '', 'Prepared locally. No information has been sent to a server.'].join('\n')
}
export default function ProjectEnquiry() {
  const [brief, setBrief] = useState('')
  const [status, setStatus] = useState('')
  function prepare(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    setBrief(makeBrief(data))
    setStatus('Your brief is ready below. Review it, then copy or save it. Nothing has been sent.')
  }
  async function copy() {
    try { await navigator.clipboard.writeText(brief); setStatus('Brief copied. You can paste it into your own message.') }
    catch { setStatus('Copy is unavailable in this browser. Select the brief below, or save it as a text file.') }
  }
  function save() {
    const url = URL.createObjectURL(new Blob([brief], { type:'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href=url; link.download='architecture-project-enquiry.txt'; link.click()
    window.setTimeout(() => URL.revokeObjectURL(url),1000)
    setStatus('Your brief was prepared for download. No information was sent.')
  }
  const contact = studio.contact
  return <section id="project-enquiry" className="project-enquiry editorial-section" aria-labelledby="enquiry-title">
    <div className="enquiry-introduction"><p className="editorial-eyebrow">START WITH WHAT YOU KNOW</p><h2 id="enquiry-title">Your next space, in a few words.</h2>
      <p>A clear brief helps make the first conversation useful. Describe your priorities, your site and the way you want the space to feel.</p>
      <dl className="enquiry-contact">
        <div><dt>Studio</dt><dd>{studio.name}</dd></div>
        <div><dt>Email</dt><dd>{contact.email.placeholder ? 'Studio email awaiting confirmation' : <a href={`mailto:${contact.email.value}`}>{contact.email.value}</a>}</dd></div>
        <div><dt>Telephone</dt><dd>{contact.phone.placeholder ? 'Telephone awaiting confirmation' : <a href={contact.phone.href}>{contact.phone.value}</a>}</dd></div>
        <div><dt>Location</dt><dd>{contact.location.placeholder ? 'Studio address awaiting confirmation' : `${contact.location.city}, ${contact.location.country}`}</dd></div>
      </dl>
      <p className="enquiry-note">This form prepares a brief on your device. It does not send an enquiry or store your information on a server.</p>
    </div>
    <div><form onSubmit={prepare} className="enquiry-form">
      <div className="enquiry-field-row">
        <label>Your name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={100} placeholder="How should we address you?" /></label>
        <label>Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
      </div>
      <label>I am interested in<select name="interest" defaultValue="A new home"><option>A new home</option><option>Interiors or renovation</option><option>Spatial planning and 3D studies</option><option>Career introduction</option><option>Press or a collaboration</option></select></label>
      <div className="enquiry-field-row"><label>Project location<input name="location" autoComplete="address-level2" maxLength={160} placeholder="City or site area" /></label><label>Approximate area<input name="area" maxLength={80} placeholder="If known, include units" /></label></div>
      <div className="enquiry-field-row"><label>Budget range<input name="budget" maxLength={80} placeholder="Optional, include currency" /></label><label>Preferred timing<input name="timing" maxLength={80} placeholder="Your ideal next step" /></label></div>
      <label>Your vision <span aria-hidden="true">*</span><textarea name="vision" required minLength={20} maxLength={4000} rows={5} placeholder="Tell us what matters: daily routines, spaces you need, light, materials or questions you want to explore." /></label>
      <p className="enquiry-note">Required fields are marked *. Please leave sensitive documents out of this initial brief.</p>
      <button type="submit" className="enquiry-submit">Prepare my enquiry brief <span aria-hidden="true">↗</span></button>
    </form>
    <p role="status" aria-live="polite" className="enquiry-status">{status}</p>
    {brief && <div className="enquiry-result"><label htmlFor="enquiry-preview">Review your brief</label><textarea id="enquiry-preview" value={brief} onChange={(event) => setBrief(event.target.value)} rows={12} />
      <div className="enquiry-result-actions"><button onClick={copy}>Copy brief</button><button onClick={save}>Save text file</button>
      {!contact.email.placeholder && <a href={`mailto:${contact.email.value}?subject=Architecture%20project%20enquiry&body=${encodeURIComponent(brief)}`}>Open email draft ↗</a>}</div></div>}
    </div>
  </section>
}
