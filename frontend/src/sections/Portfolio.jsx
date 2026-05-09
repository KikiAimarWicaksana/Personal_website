import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API_URL from '../config';

const FILTERS = ['all', 'website', 'data', 'cloud'];

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/portfolio`)
      .then(r => r.json())
      .then(({ data }) => { setProjects(data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  const handleFilter = (f) => {
    setFilter(f);
    setShowAll(false);
  };

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 6);
  const hasMore = filtered.length > 6;

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
              onClick={() => handleFilter(f)}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        {loading ? (
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-pixel)', fontSize: '.5rem', color: 'var(--text-dim)' }}>
            LOADING QUESTS...
          </p>
        ) : (
          <>
            <div className="portfolio-grid">
              {displayed.map(p => (
                <div className="project-card pixel-border" key={p.id} onClick={() => navigate(`/portfolio/${p.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="project-image">
                    <div className="project-placeholder"
                      style={p.image ? { backgroundImage: `url(${p.image.startsWith('http') ? p.image : `${API_URL}/uploads/${p.image}`})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: `linear-gradient(135deg, ${p.color})` }}>
                      {!p.image && <span className="placeholder-icon">{p.icon}</span>}
                    </div>
                    <div className="project-overlay"><span className="overlay-text">VIEW QUEST</span></div>
                  </div>
                  <div className="project-info">
                    <div className="project-badge">{p.category.toUpperCase()} {p.year && `• ${p.year}`}</div>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-tech">
                      {p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                    </div>
                    <div className="project-links">
                      <a href={p.demo} className="pixel-btn-sm" onClick={e => e.stopPropagation()}>DEMO</a>
                      <a href={p.code} className="pixel-btn-sm" onClick={e => e.stopPropagation()}>CODE</a>
                    </div>
                  </div>
                  <div className="project-xp">+{p.xp} XP</div>
                </div>
              ))}
            </div>
            {!showAll && hasMore && (
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button className="pixel-btn" onClick={() => setShowAll(true)}>SHOW ALL ➔</button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
