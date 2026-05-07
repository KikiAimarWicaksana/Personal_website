const skills = [
  { icon: '🌐', name: 'HTML/CSS',   stars: '★★★★★' },
  { icon: '⚡', name: 'JavaScript', stars: '★★★★★' },
  { icon: '⚛️', name: 'React',      stars: '★★★★☆' },
  { icon: '🟢', name: 'Node.js',    stars: '★★★★☆' },
  { icon: '🐍', name: 'Python',     stars: '★★★★☆' },
  { icon: '🎨', name: 'UI/UX',      stars: '★★★☆☆' },
  { icon: '🗄️', name: 'Database',   stars: '★★★★☆' },
  { icon: '☁️', name: 'DevOps',     stars: '★★★☆☆' },
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title pixel-title">
            <span className="title-icon">👤</span> ABOUT ME
          </h2>
          <div className="title-underline" />
        </div>
        <div className="about-content">
          <div className="about-card pixel-border">
            <div className="card-header">
              <span className="card-icon">📋</span>
              <span className="card-title">CHARACTER STATUS</span>
            </div>
            <div className="about-avatar-wrapper">
              <div className="about-avatar pixel-border-sm">🧙</div>
              <div className="about-name-plate pixel-border-sm">
                <h3 className="player-name">YOUR NAME</h3>
                <p className="player-class">Full-Stack Developer</p>
              </div>
            </div>
            <div className="about-description">
              <div className="dialog-box pixel-border-sm">
                <p className="dialog-text">
                  Welcome, adventurer! I'm a passionate developer who loves crafting digital experiences.
                  With a keen eye for design and a love for clean code, I embark on quests to build
                  amazing web applications and solve complex problems.
                </p>
              </div>
            </div>
          </div>
          <div className="about-skills">
            <div className="skill-card pixel-border">
              <div className="card-header">
                <span className="card-icon">⚔️</span>
                <span className="card-title">SKILLS & ABILITIES</span>
              </div>
              <div className="skills-grid">
                {skills.map(s => (
                  <div className="skill-item" key={s.name}>
                    <span className="skill-icon">{s.icon}</span>
                    <span className="skill-name">{s.name}</span>
                    <div className="skill-stars">{s.stars}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
