import { useEffect, useRef, useState } from 'react';

const skills = [
  { icon: '🐍', name: 'Python', level: 90 },
  { icon: '📊', name: 'SQL & BigQuery', level: 95 },
  { icon: '☁️', name: 'Google Cloud (GCP)', level: 85 },
  { icon: '☕', name: 'Java', level: 75 },
  { icon: '⚡', name: 'Data Pipelines', level: 80 },
  { icon: '🗄️', name: 'Data Warehousing', level: 85 },
  { icon: '⚙️', name: 'ETL / ELT', level: 80 },
  { icon: '🐘', name: 'Spark / Big Data', level: 70 },
];

const stats = [
  { label: 'Projects', value: '10+', icon: '🗡️' },
  { label: 'Certificates', value: '15+', icon: '📜' },
  { label: 'Experience', value: '2 Yrs', icon: '⏳' },
];

export default function About() {
  const skillsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section about-section" id="about">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title pixel-title">
            <span className="title-icon">👤</span> ABOUT ME
          </h2>
          <div className="title-underline" />
        </div>

        {/* Top Row: Photo + Bio Side by Side */}
        <div className="about-top">
          <div className="about-photo-card">
            <div className="about-photo-frame pixel-border">
              <img
                src="/profile.jpeg"
                alt="Kiki Aimar Wicaksana"
                className="about-photo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span style="font-size:4rem;display:flex;align-items:center;justify-content:center;width:100%;height:100%">🧙</span>';
                }}
              />
            </div>
            {/* Mini stats under the photo */}
            <div className="about-mini-stats">
              {stats.map(s => (
                <div className="mini-stat" key={s.label}>
                  <span className="mini-stat-icon">{s.icon}</span>
                  <span className="mini-stat-value">{s.value}</span>
                  <span className="mini-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-bio">
            <div className="about-bio-header">
              <h3 className="about-bio-name">KIKI AIMAR WICAKSANA</h3>
              <span className="about-bio-role pixel-border-sm">Data & Cloud Enthusiast</span>
            </div>
            <p className="about-bio-text">
              Halo! Saya seorang Data Engineer yang passionate dalam mengelola dan mentransformasi data menjadi 
              wawasan yang berharga. Dengan pengalaman di bidang Data Engineering, Cloud Computing (GCP), 
              dan Data Architecture, saya selalu mencari tantangan baru untuk membangun sistem data yang efisien dan skalabel.
            </p>
            <p className="about-bio-text">
              Saat ini saya fokus mendalami teknologi cloud dan data pipeline,
              sambil terus membangun portofolio project yang beragam dan bermanfaat.
            </p>
            <div className="about-bio-tags">
              <span className="bio-tag">☁️ Cloud</span>
              <span className="bio-tag">📊 Data</span>
              <span className="bio-tag">👨‍💼 Entreprepreneur</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Skills */}
        <div className="about-skills-section" ref={skillsRef}>
          <div className="about-skills-header">
            <span className="about-skills-title">⚔️ SKILLS & ABILITIES</span>
          </div>
          <div className="about-skills-grid">
            {skills.map(s => (
              <div className="about-skill-item" key={s.name}>
                <div className="about-skill-top">
                  <span className="about-skill-icon">{s.icon}</span>
                  <span className="about-skill-name">{s.name}</span>
                  <span className="about-skill-pct">{s.level}%</span>
                </div>
                <div className="about-skill-track">
                  <div
                    className="about-skill-fill"
                    style={{ width: visible ? `${s.level}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
