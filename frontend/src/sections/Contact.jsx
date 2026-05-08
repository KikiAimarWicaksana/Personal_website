import { useState } from 'react';
import API_URL from '../config';

const socials = [
  { icon: '📧', label: 'EMAIL',    value: 'hello@example.com', href: 'mailto:hello@example.com' },
  { icon: '🐙', label: 'GITHUB',   value: 'github.com/yourname', href: '#' },
  { icon: '💼', label: 'LINKEDIN', value: 'linkedin.com/in/yourname', href: '#' },
  { icon: '🐦', label: 'TWITTER',  value: '@yourhandle', href: '#' },
];

export default function Contact({ showToast }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) { setSuccess(true); setForm({ name:'',email:'',subject:'',message:'' }); showToast?.('Message Sent!'); }
      else setError(data.message || 'Something went wrong.');
    } catch {
      setError('Cannot reach server. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title pixel-title">
            <span className="title-icon">📬</span> CONTACT
          </h2>
          <div className="title-underline" />
          <p className="section-subtitle">— SEND A MESSAGE —</p>
        </div>
        <div className="contact-content">
          <div className="contact-info pixel-border">
            <div className="card-header">
              <span className="card-icon">📡</span>
              <span className="card-title">CONNECT WITH ME</span>
            </div>
            <div className="contact-methods">
              {socials.map(s => (
                <div className="contact-method" key={s.label}>
                  <span className="method-icon">{s.icon}</span>
                  <div className="method-info">
                    <span className="method-label">{s.label}</span>
                    <a href={s.href} className="method-value">{s.value}</a>
                  </div>
                </div>
              ))}
            </div>
            <div className="contact-quest-status">
              <p className="quest-text">⚡ QUEST STATUS: Looking for new adventures!</p>
              <p className="quest-subtext">Open for freelance & collaboration quests</p>
            </div>
          </div>
          <div className="contact-form-wrapper pixel-border">
            <div className="card-header">
              <span className="card-icon">✉️</span>
              <span className="card-title">SEND MESSAGE</span>
            </div>
            {success ? (
              <div className="form-success pixel-border">
                <span className="success-icon">✅</span>
                <span className="success-text">MESSAGE SENT SUCCESSFULLY!</span>
                <span className="success-xp">+100 XP earned!</span>
                <button className="pixel-btn-sm" style={{ marginTop: '1rem' }} onClick={() => setSuccess(false)}>
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {[['name','YOUR NAME','Enter your name...','text'],['email','YOUR EMAIL','Enter your email...','email'],
                  ['subject','SUBJECT','Quest title...','text']].map(([n,l,ph,t]) => (
                  <div className="form-group" key={n}>
                    <label htmlFor={n} className="form-label">{l}</label>
                    <input type={t} id={n} name={n} className="pixel-input" placeholder={ph}
                      value={form[n]} onChange={handleChange} required />
                  </div>
                ))}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">MESSAGE</label>
                  <textarea id="message" name="message" className="pixel-input pixel-textarea"
                    placeholder="Describe your quest..." rows={5} value={form.message}
                    onChange={handleChange} required />
                </div>
                {error && <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '.4rem', color: 'var(--secondary)', marginBottom: '.5rem' }}>{error}</p>}
                <button type="submit" className="pixel-btn submit-btn" disabled={loading}>
                  <span>{loading ? '⏳ SENDING...' : '📨 SEND MESSAGE'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
