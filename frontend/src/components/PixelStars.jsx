import { useEffect, useRef } from 'react';

export default function PixelStars() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const stars = [];
    const particles = [];

    const COLORS = [
      [0, 255, 255],   // Cyan
      [255, 107, 157], // Pink
      [255, 215, 0],   // Gold
      [168, 85, 247],  // Purple
      [0, 255, 136],   // Green
    ];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // ── Arcade Space Stars (Moderate Scrolling) ──
    for (let i = 0; i < 250; i++) {
      const layer = Math.random();
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // Layer 0 is back (slow/small), Layer 1 is front (fast/large)
        size: layer < 0.6 ? 2 : layer < 0.9 ? 3 : 5,
        speed: layer < 0.6 ? 0.3 : layer < 0.9 ? 0.8 : 1.5, // Moderate arcade speed
        opacity: layer < 0.6 ? 0.3 : layer < 0.9 ? 0.6 : 1,
        color: layer < 0.7 ? [255, 255, 255] : color, 
      });
    }

    // ── Mouse Trail ───────────────────────────────────────
    const handleMouseMove = (e) => {
      for (let i = 0; i < 2; i++) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 4 + 2,
          life: 1,
          decay: Math.random() * 0.05 + 0.02,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2 + 1, 
          color,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      // Clear canvas for crisp pixel stars (no motion blur)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > canvas.height) { 
          s.y = 0; 
          s.x = Math.random() * canvas.width; 
        }

        const [r, g, b] = s.color;
        ctx.fillStyle = `rgba(${r},${g},${b},${s.opacity})`;
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.size, s.size);
      });

      // Draw mouse trail
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }

        const [r, g, b] = p.color;
        const size = Math.max(1, p.size * p.life);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.life})`;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), Math.round(size), Math.round(size));
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-stars" />;
}
