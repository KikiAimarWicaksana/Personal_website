import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllActivities() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('http://localhost:5000/api/activities')
      .then(r => r.json())
      .then(({ data }) => setItems(data))
      .catch(() => {});
  }, []);

  return (
    <section className="section" style={{ paddingTop: '8rem', minHeight: '100vh', background: 'var(--bg)' }}>
      <div className="section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 className="pixel-title" style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>
            <span className="title-icon">🏆</span> ALL ACTIVITIES
          </h1>
          <button className="pixel-btn-sm" onClick={() => navigate('/')}>BACK TO HOME</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '700px', margin: '0 auto' }}>
          {items.map(act => (
            <div className="activity-card pixel-border" key={act.id} onClick={() => navigate(`/activities/${act.id}`)} style={{ opacity: 1, transform: 'none', cursor: 'pointer', flex: 'none' }}>
              <div className="activity-header">
                <div className="activity-icon">
                  <span>{act.icon}</span>
                </div>
                <div className="activity-date pixel-border-sm">{act.year}</div>
              </div>
              <h3 className="activity-title">{act.title}</h3>
              {act.image && (
                <img src={`http://localhost:5000/uploads/${act.image}`} alt={act.title} style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain', marginBottom: '1rem', border: '2px solid var(--text-dim)', background: '#000' }} />
              )}
              <p className="activity-desc" style={{ whiteSpace: 'pre-wrap' }}>{act.desc}</p>
              <div className="activity-badges">
                <span className="badge-xp">+{act.xp} XP</span>
                <span className="badge-achievement">🏆 {act.badge}</span>
              </div>
            </div>
          ))}
          {items.length === 0 && (
             <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontFamily: 'var(--font-pixel)', fontSize: '0.6rem' }}>LOADING...</p>
          )}
        </div>
      </div>
    </section>
  );
}
