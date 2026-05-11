import { useState, useEffect } from 'react';
import { User, Briefcase, Trophy, Mail, Sword } from 'lucide-react';

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['hero','about','portfolio','activities','contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'about', icon: <User size={14} />, label: 'ABOUT' },
    { id: 'portfolio', icon: <Briefcase size={14} />, label: 'PORTFOLIO' },
    { id: 'activities', icon: <Trophy size={14} />, label: 'ACTIVITIES' },
    { id: 'contact', icon: <Mail size={14} />, label: 'CONTACT' },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="pixel-nav" style={{ boxShadow: scrolled ? '0 2px 0 #000, 0 4px 30px rgba(0,255,136,0.3)' : undefined }}>
      <div className="nav-container">
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>
          <span className="logo-icon"><Sword size={24} /></span>
          <span className="logo-text">PIXEL QUEST</span>
        </a>
        <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`nav-link ${active === l.id ? 'active' : ''}`}
              onClick={e => { e.preventDefault(); scrollTo(l.id); }}>
              <span className="nav-icon" style={{ display: 'flex', alignItems: 'center' }}>{l.icon}</span> {l.label}
            </a>
          ))}
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span className="toggle-bar" />
          <span className="toggle-bar" />
          <span className="toggle-bar" />
        </button>
      </div>
    </nav>
  );
}
