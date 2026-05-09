import { useEffect, useRef, useState } from 'react';

const TEXTS = ['Full-Stack Developer', 'UI/UX Enthusiast', 'Pixel Art Lover', 'Quest Seeker 🗡️'];

export default function Hero() {
  return (
    <header className="hero-section" id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '4rem' }}>
      <div className="hero-content" style={{ maxWidth: '1100px', width: '100%', padding: '2rem' }}>

        {/* TEXT ON THE LEFT */}
        <div className="hero-text-box">
          <p className="hero-greeting" style={{ color: 'var(--primary)', fontFamily: 'var(--font-pixel)', letterSpacing: '1px' }}>
            HALO, SAYA
          </p>
          <h1 className="hero-title">
            Kiki Aimar<br />Wicaksana
          </h1>
          <h2 className="hero-role" style={{ fontFamily: 'var(--font-vt)', color: 'var(--text)', fontWeight: 'bold' }}>
            Seorang Data Engineer
          </h2>

          <div className="hero-socials">
            <a href="https://linkedin.com/in/kikiaimarwicaksana/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="https://www.instagram.com/kim.aimarr?igsh=bTgwMTBrdXR4aGVn" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
            <a href="https://github.com/kikiaimarwicaksana" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
          </div>

          <p className="hero-bio" style={{ fontFamily: 'var(--font-vt)', color: 'var(--text-dim)', lineHeight: '1.6' }}>
            Saya membantu mengubah ide dan data menjadi solusi digital yang inovatif, fungsional, dan berdampak nyata bagi bisnis maupun individu.
          </p>
          <div className="hero-actions">
            <a href="#portfolio" className="pixel-btn"
              onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Lihat Proyek ➔
            </a>
            <a href="#contact" className="pixel-btn secondary"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{ background: 'transparent', border: '2px solid var(--text-dim)', color: 'var(--text)' }}>
              Kontak Saya
            </a>
          </div>
        </div>

        {/* IMAGE ON THE RIGHT */}
        <div className="hero-pixel-art" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="pixel-character">
            <div className="character-sprite" style={{ width: '280px', height: '360px' }} />
            <div className="character-shadow" style={{ width: '200px', margin: '0 auto' }} />
          </div>
        </div>

      </div>

      <div className="scroll-indicator" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <span className="scroll-arrow" style={{ display: 'block', marginBottom: '0.5rem', animation: 'bounce 2s infinite' }}>▼</span>
        <span className="scroll-text" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.5rem', color: 'var(--text-dim)' }}>SCROLL DOWN</span>
      </div>
    </header>
  );
}
