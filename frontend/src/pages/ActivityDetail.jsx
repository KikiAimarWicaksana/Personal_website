import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../config';

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/api/activities/${id}`)
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
        
        <div className="activity-detail-content pixel-border" style={{ background: 'rgba(15,15,46,.9)', padding: '1.5rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <div className="timeline-marker" style={{ width: '80px', height: '80px', fontSize: '2.5rem', margin: '0 auto 1rem', border: '3px solid var(--primary)', background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(0,255,136,.3), 4px 4px 0 #000' }}>
                <span>{activity.icon}</span>
              </div>
              <div className="timeline-date pixel-border-sm" style={{ fontSize: '.6rem', padding: '.3rem .7rem', display: 'inline-block', marginBottom: '1rem' }}>{activity.year}</div>
            </div>

            <div style={{ flex: '1 1 300px' }}>
              <h1 style={{ fontFamily: 'var(--font-pixel)', fontSize: '1rem', color: 'var(--text)', marginBottom: '1rem', lineHeight: '1.4' }}>{activity.title}</h1>
              
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {activity.image && (
                  <img 
                    src={activity.image.startsWith('http') ? activity.image : `${API_URL}/uploads/${activity.image}`} 
                    alt={activity.title} 
                    style={{ width: '100%', maxWidth: '350px', maxHeight: '250px', objectFit: 'cover', border: '3px solid var(--bg)', boxShadow: '0 0 0 2px var(--secondary)', marginBottom: '1rem' }} 
                  />
                )}
                <div style={{ flex: '1 1 300px' }}>
                  <p style={{ fontFamily: 'var(--font-vt)', fontSize: '1.4rem', color: 'var(--text-dim)', lineHeight: '1.5', whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>{activity.desc}</p>
                  
                  <div className="timeline-badge" style={{ display: 'flex', gap: '.8rem', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    <span className="badge-xp" style={{ fontSize: '.5rem', padding: '.4rem .8rem' }}>+{activity.xp} XP</span>
                    <span className="badge-achievement" style={{ fontSize: '.5rem', padding: '.4rem .8rem' }}>🏆 {activity.badge}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
