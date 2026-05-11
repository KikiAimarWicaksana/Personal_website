import { useEffect, useRef, useState } from 'react';
import { 
  User, 
  Sword, 
  Database, 
  Cloud, 
  Coffee, 
  Zap, 
  Server, 
  RefreshCw, 
  Cpu, 
  Award, 
  Clock, 
  Shield, 
  Terminal 
} from 'lucide-react';
import API_URL from '../config';

const skills = [
  { icon: <Terminal size={18} />, name: 'Python', level: 90 },
  { icon: <Database size={18} />, name: 'SQL & BigQuery', level: 95 },
  { icon: <Cloud size={18} />, name: 'Google Cloud (GCP)', level: 85 },
  { icon: <Coffee size={18} />, name: 'Java', level: 75 },
  { icon: <Zap size={18} />, name: 'Data Pipelines', level: 80 },
  { icon: <Server size={18} />, name: 'Data Warehousing', level: 85 },
  { icon: <RefreshCw size={18} />, name: 'ETL / ELT', level: 80 },
  { icon: <Cpu size={18} />, name: 'Spark / Big Data', level: 70 },
];

export default function About() {
  const skillsRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [projectCount, setProjectCount] = useState('10+'); // Default fallback

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.quests !== undefined) {
          setProjectCount(`${data.data.quests}+`);
        }
      })
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  const stats = [
    { label: 'Projects', value: projectCount, icon: <Sword size={20} /> },
    { label: 'Certificates', value: '15+', icon: <Award size={20} /> },
    { label: 'Experience', value: '2 Yrs', icon: <Clock size={20} /> },
  ];

  return (
    <section className="section about-section" id="about">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title pixel-title">
            <span className="title-icon"><User size={24} /></span> ABOUT ME
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
                  e.target.parentElement.innerHTML = '<div style="font-size:4rem;display:flex;align-items:center;justify-content:center;width:100%;height:100%"><User size={64} /></div>';
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
              <span className="bio-tag"><Cloud size={14} style={{ marginRight: '5px' }} /> Cloud</span>
              <span className="bio-tag"><Database size={14} style={{ marginRight: '5px' }} /> Data</span>
              <span className="bio-tag"><Shield size={14} style={{ marginRight: '5px' }} /> Entrepreneur</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Skills */}
        <div className="about-skills-section" ref={skillsRef}>
          <div className="about-skills-header">
            <span className="about-skills-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={18} /> SKILLS & ABILITIES
            </span>
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
