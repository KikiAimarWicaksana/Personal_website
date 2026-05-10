import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../config';

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/api/portfolio/${id}`)
      .then(r => r.json())
      .then(({ success, data }) => {
        if (success) setProject(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="section portfolio-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '1rem', color: 'var(--text-dim)' }}>LOADING QUEST DETAILS...</p>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="section portfolio-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.5rem', color: 'var(--secondary)' }}>QUEST NOT FOUND!</p>
        <button className="pixel-btn" onClick={() => navigate(-1)}>◀ BACK TO MAP</button>
      </section>
    );
  }

  return (
    <section className="section portfolio-section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="section-container">
        <button className="pixel-btn-sm" style={{ marginBottom: '2rem' }} onClick={() => navigate(-1)}>◀ BACK</button>
        
        <div className="project-detail-content pixel-border" style={{ background: 'rgba(15,15,46,.9)', padding: '2rem' }}>
          <div className="detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', borderBottom: '2px solid rgba(0,255,136,.2)', paddingBottom: '1rem' }}>
            <div>
              <div className="project-badge" style={{ fontSize: '.7rem', padding: '.4rem .8rem', marginBottom: '1rem' }}>{project.category.toUpperCase()} {project.year && `• ${project.year}`}</div>
              <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '1rem' }}>{project.title}</h1>
              <p style={{ fontFamily: 'var(--font-vt)', fontSize: '1.6rem', color: 'var(--text-dim)', whiteSpace: 'pre-wrap', textAlign: 'justify' }}>{project.desc}</p>
            </div>
            <div className="project-xp" style={{ position: 'relative', fontSize: '.6rem', padding: '.4rem .8rem', top: 0, right: 0 }}>+{project.xp} XP</div>
          </div>
          
          <div className="project-image pixel-border-sm" style={{ height: '400px', marginBottom: '2rem' }}>
            <div className="project-placeholder" style={project.image ? { backgroundImage: `url(${project.image.startsWith('http') ? project.image : `${API_URL}/uploads/${project.image}`})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' } : { background: `linear-gradient(135deg, ${project.color})`, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {!project.image && <span style={{ fontSize: '6rem' }}>{project.icon}</span>}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: '.7rem', color: 'var(--accent)', marginBottom: '1rem' }}>TECHNOLOGIES USED:</h3>
            <div className="project-tech" style={{ gap: '.8rem' }}>
              {project.tech.map(t => <span className="tech-tag" style={{ fontSize: '.6rem', padding: '.4rem .8rem' }} key={t}>{t}</span>)}
            </div>
          </div>

          <div className="project-links" style={{ gap: '1rem' }}>
            <a href={project.demo && project.demo.startsWith('http') ? project.demo : project.demo} target="_blank" rel="noopener noreferrer" className="pixel-btn">▶ PLAY DEMO</a>
            <a href={project.code && project.code.startsWith('http') ? project.code : project.code} target="_blank" rel="noopener noreferrer" className="pixel-btn" style={{ borderColor: 'var(--purple)', color: 'var(--purple)' }}>{`{ } VIEW SOURCE`}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
