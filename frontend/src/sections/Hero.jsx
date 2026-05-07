import { useEffect, useRef, useState } from 'react';

const TEXTS = ['Full-Stack Developer', 'UI/UX Enthusiast', 'Pixel Art Lover', 'Quest Seeker 🗡️'];

export default function Hero() {
  const [subtitle, setSubtitle] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Typewriter
  useEffect(() => {
    const current = TEXTS[textIdx];
    const delay = deleting ? 60 : 120;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) { setSubtitle(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
        else { setTimeout(() => setDeleting(true), 1800); }
      } else {
        if (charIdx > 0) { setSubtitle(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
        else { setDeleting(false); setTextIdx(i => (i + 1) % TEXTS.length); }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx]);

  // Stat bars animation on mount
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { label: 'CREATIVITY', value: 95 },
    { label: 'CODING', value: 90 },
    { label: 'DESIGN', value: 85 },
  ];

  return (
    <header className="hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-pixel-art">
          <div className="pixel-character">
            <div className="character-sprite" />
            <div className="character-shadow" />
          </div>
        </div>
        <div className="hero-text-box pixel-border">
          <div className="typing-indicator"><span>▶</span></div>
          <h1 className="hero-title glitch" data-text="HELLO WORLD!">HELLO WORLD!</h1>
          <p className="hero-subtitle">{subtitle}<span style={{ animation: 'blink .8s infinite', color: 'var(--primary)' }}>|</span></p>
          <div className="hero-stats" ref={statsRef}>
            {stats.map(s => (
              <div className="stat-bar" key={s.label}>
                <span className="stat-label">{s.label}</span>
                <div className="stat-track">
                  <div className="stat-fill" style={{ width: statsVisible ? `${s.value}%` : '0%' }} />
                </div>
              </div>
            ))}
          </div>
          <a href="#about" className="pixel-btn hero-cta"
            onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span>▶ START QUEST</span>
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-arrow">▼</span>
        <span className="scroll-text">SCROLL DOWN</span>
      </div>
    </header>
  );
}
