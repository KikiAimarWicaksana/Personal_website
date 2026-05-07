import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:5000/api/activities/${id}`)
      .then(r => r.json())
      .then(({ success, data }) => {
        if (success) setActivity(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <section className="section activities-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '1rem', color: 'var(--text-dim)' }}>LOADING ACHIEVEMENT...</p>
      </section>
    );
  }

  if (!activity) {
    return (
      <section className="section activities-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.5rem', color: 'var(--secondary)' }}>ACHIEVEMENT NOT FOUND!</p>
        <button className="pixel-btn" onClick={() => navigate(-1)}>◀ BACK TO MAP</button>
      </section>
    );
  }

  return (
    <section className="section activities-section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
      <div className="section-container">
        <button className="pixel-btn-sm" style={{ marginBottom: '2rem' }} onClick={() => navigate(-1)}>◀ BACK</button>
        
        <div className="activity-detail-content pixel-border" style={{ background: 'rgba(15,15,46,.9)', padding: '3rem', textAlign: 'center' }}>
          <div className="timeline-marker" style={{ width: '120px', height: '120px', fontSize: '4rem', margin: '0 auto 2rem', border: '4px solid var(--primary)', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(0,255,136,.4), 6px 6px 0 #000' }}>
            <span>{activity.icon}</span>
          </div>
          
          <div className="timeline-date pixel-border-sm" style={{ fontSize: '.7rem', padding: '.4rem 1rem', display: 'inline-block', marginBottom: '1.5rem' }}>{activity.year}</div>
          
          <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '1.4rem', color: 'var(--text)', marginBottom: '1.5rem' }}>{activity.title}</h1>
          {activity.image && (
            <img src={`http://localhost:5000/uploads/${activity.image}`} alt={activity.title} style={{ width: '100%', maxWidth: '500px', height: 'auto', objectFit: 'cover', margin: '0 auto 2rem', display: 'block', border: '4px solid var(--bg)', boxShadow: '0 0 0 2px var(--secondary)' }} />
          )}
          <p style={{ fontFamily: 'var(--font-vt)', fontSize: '1.8rem', color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>{activity.desc}</p>
          
          <div className="timeline-badge" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="badge-xp" style={{ fontSize: '.7rem', padding: '.6rem 1.2rem' }}>+{activity.xp} XP</span>
            <span className="badge-achievement" style={{ fontSize: '.7rem', padding: '.6rem 1.2rem' }}>🏆 {activity.badge} UNLOCKED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
