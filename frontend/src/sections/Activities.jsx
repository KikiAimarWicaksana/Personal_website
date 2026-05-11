import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import API_URL from '../config';

export default function Activities({ showToast }) {
  const [items, setItems] = useState([]);
  const refs = useRef([]);
  const gridRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/activities`)
      .then(r => r.json())
      .then(({ data }) => setItems(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  const scrollLeft = () => {
    if (gridRef.current) gridRef.current.scrollBy({ left: -340, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (gridRef.current) gridRef.current.scrollBy({ left: 340, behavior: 'smooth' });
  };

  return (
    <section className="section activities-section" id="activities">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title pixel-title">
            <span className="title-icon"><Trophy size={24} /></span> ACTIVITIES
          </h2>
          <div className="title-underline" />
          <p className="section-subtitle">— ACHIEVEMENT LOG —</p>
        </div>
        
        <div className="carousel-wrapper">
          <button className="carousel-btn left" onClick={scrollLeft}><ChevronLeft size={24} /></button>
          
          <div className="activities-grid" ref={gridRef}>
            {items.slice(0, 6).map((act, i) => (
              <div className="activity-card pixel-border" key={act.id} ref={el => refs.current[i] = el} onClick={() => navigate(`/activities/${act.id}`)}>
                <div className="activity-header">
                  <div className="activity-icon">
                    {act.icon && (act.icon.length > 2 ? <span style={{fontSize: '1rem'}}>{act.icon}</span> : <span>{act.icon}</span>)}
                  </div>
                  <div className="activity-date pixel-border-sm">{act.year}</div>
                </div>
                <h3 className="activity-title">{act.title}</h3>
                {act.image && (
                  <img src={act.image.startsWith('http') ? act.image : `${API_URL}/uploads/${act.image}`} alt={act.title} style={{ width: '100%', height: '120px', objectFit: 'cover', marginBottom: '.8rem', border: '2px solid var(--text-dim)' }} />
                )}
                <p className="activity-desc" style={{ whiteSpace: 'pre-wrap' }}>
                  {act.desc && act.desc.length > 150 ? act.desc.substring(0, 150) + '...' : act.desc}
                </p>
                {act.desc && act.desc.length > 150 && (
                  <span className="read-more" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1rem', color: 'var(--primary)', fontSize: '0.65rem', fontFamily: 'var(--font-pixel)' }}>
                    LEARN MORE <ArrowRight size={12} />
                  </span>
                )}
                <div className="activity-badges">
                  <span className="badge-xp">+{act.xp} XP</span>
                  <span className="badge-achievement" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Trophy size={12} /> {act.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carousel-btn right" onClick={scrollRight}><ChevronRight size={24} /></button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="pixel-btn" onClick={() => navigate('/activities')} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            SHOW ALL <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
