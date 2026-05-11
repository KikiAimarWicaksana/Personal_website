import { useEffect, useState } from 'react';
import { Heart, Coffee } from 'lucide-react';
import API_URL from '../config';

export default function Footer() {
  const [stats, setStats] = useState({ totalXp: 0, quests: 0, level: 0 });
  const [displayed, setDisplayed] = useState({ totalXp: 0, quests: 0, level: 0 });

  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then(r => r.json())
      .then(({ data }) => setStats(data))
      .catch(() => setStats({ totalXp: 4850, quests: 6, level: 12 }));
  }, []);

  useEffect(() => {
    const keys = ['totalXp', 'quests', 'level'];
    const duration = 1500;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setDisplayed({ totalXp: Math.round(stats.totalXp * progress), quests: Math.round(stats.quests * progress), level: Math.round(stats.level * progress) });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [stats]);

  return (
    <footer className="pixel-footer">
      <div className="footer-content">
        <div className="footer-stats pixel-border">
          {[['totalXp','TOTAL XP'],['quests','QUESTS'],['level','LEVEL']].map(([k,l]) => (
            <div className="footer-stat" key={k}>
              <span className="stat-number">{displayed[k]}</span>
              <span className="stat-desc">{l}</span>
            </div>
          ))}
        </div>
        <div className="footer-text">
          <p>© {new Date().getFullYear()} KIKI AIMAR WICAKSANA — ALL RIGHTS RESERVED</p>
          <p className="footer-subtext" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '5px' }}>
            Built with <Heart size={14} color="var(--secondary)" /> and <Coffee size={14} color="var(--accent)" /> in Jakarta
          </p>
        </div>
        <button className="pixel-btn-sm back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>▲ TOP</button>
      </div>
    </footer>
  );
}
