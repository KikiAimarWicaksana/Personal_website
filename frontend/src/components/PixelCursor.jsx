import { useEffect, useRef } from 'react';

export default function PixelCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.setProperty('--x', `${mouseX - 20}px`);
      cursor.style.setProperty('--y', `${mouseY - 20}px`);
    };

    const handleMouseDown = () => cursor.classList.add('clicking');
    const handleMouseUp = () => cursor.classList.remove('clicking');

    const handleMouseEnterLink = () => { cursor.classList.add('hovering'); dot.classList.add('hovering-dot'); };
    const handleMouseLeaveLink = () => { cursor.classList.remove('hovering'); dot.classList.remove('hovering-dot'); };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      dot.style.setProperty('--x', `${dotX - 6}px`);
      dot.style.setProperty('--y', `${dotY - 6}px`);
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const interactables = document.querySelectorAll('a, button, .project-card, .timeline-item, .filter-btn, input, textarea, select');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnterLink);
      el.addEventListener('mouseleave', handleMouseLeaveLink);
    });

    // Watch for DOM changes to add listeners to new elements
    const observer = new MutationObserver(() => {
      const newInteractables = document.querySelectorAll('a, button, .project-card, .timeline-item, .filter-btn, input, textarea, select');
      newInteractables.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnterLink);
        el.removeEventListener('mouseleave', handleMouseLeaveLink);
        el.addEventListener('mouseenter', handleMouseEnterLink);
        el.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} id="pixel-cursor">
        <div id="pixel-cursor-center" />
      </div>
      <div ref={cursorDotRef} id="pixel-cursor-dot" />
    </>
  );
}
