import { useEffect, useState } from 'react';

const FILTERS = ['all', 'web', 'app', 'design'];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio')
      .then(r => r.json())
      .then(({ data }) => { setProjects(data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title pixel-title">
            <span className="title-icon">🗡️</span> PORTFOLIO
          </h2>
          <div className="title-underline" />
          <p className="section-subtitle">— QUEST LOG —</p>
        </div>
        <div className="portfolio-filter">
          {FILTERS.map(f => (
            <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-pixel)', fontSize: '.5rem', color: 'var(--text-dim)' }}>
            LOADING QUESTS...
          </p>
        ) : (
          <div className="portfolio-grid">
            {filtered.map(p => (
              <div className="project-card pixel-border" key={p.id}>
                <div className="project-image">
                  <div className="project-placeholder"
                    style={{ background: `linear-gradient(135deg, ${p.color})` }}>
                    <span className="placeholder-icon">{p.icon}</span>
                  </div>
                  <div className="project-overlay"><span className="overlay-text">VIEW QUEST</span></div>
                </div>
                <div className="project-info">
                  <div className="project-badge">{p.category.toUpperCase()}</div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tech">
                    {p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={p.demo} className="pixel-btn-sm">DEMO</a>
                    <a href={p.code} className="pixel-btn-sm">CODE</a>
                  </div>
                </div>
                <div className="project-xp">+{p.xp} XP</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
