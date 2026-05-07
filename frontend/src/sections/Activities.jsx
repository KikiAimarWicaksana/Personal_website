import { useEffect, useRef, useState } from 'react';

export default function Activities({ showToast }) {
  const [items, setItems] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/activities')
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
          const badge = e.target.querySelector('.badge-achievement');
          if (badge && showToast) showToast(badge.textContent.replace('🏆 ',''));
        }
      });
    }, { threshold: 0.3 });
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [items, showToast]);

  return (
    <section className="section activities-section" id="activities">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title pixel-title">
            <span className="title-icon">🏆</span> ACTIVITIES
          </h2>
          <div className="title-underline" />
          <p className="section-subtitle">— ACHIEVEMENT LOG —</p>
        </div>
        <div className="activities-timeline">
          {items.map((act, i) => (
            <div className="timeline-item" key={act.id} ref={el => refs.current[i] = el}>
              <div className="timeline-marker">
                <span>{act.icon}</span>
              </div>
              <div className="timeline-content pixel-border">
                <div className="timeline-date pixel-border-sm">{act.year}</div>
                <h3 className="timeline-title">{act.title}</h3>
                <p className="timeline-desc">{act.desc}</p>
                <div className="timeline-badge">
                  <span className="badge-xp">+{act.xp} XP</span>
                  <span className="badge-achievement">🏆 {act.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
