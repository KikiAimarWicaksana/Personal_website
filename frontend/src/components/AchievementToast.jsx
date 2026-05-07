export default function AchievementToast({ show, text }) {
  return (
    <div className={`achievement-toast ${show ? 'visible' : ''}`}>
      <div className="toast-content pixel-border-accent">
        <span className="toast-icon">🏆</span>
        <div className="toast-info">
          <span className="toast-title">ACHIEVEMENT UNLOCKED!</span>
          <span className="toast-desc">{text}</span>
        </div>
      </div>
    </div>
  );
}
