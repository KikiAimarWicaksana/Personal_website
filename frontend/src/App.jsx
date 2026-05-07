import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Portfolio from './sections/Portfolio';
import Activities from './sections/Activities';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import AchievementToast from './components/AchievementToast';
import PixelStars from './components/PixelStars';

export default function App() {
  const [toast, setToast] = useState({ show: false, text: '' });

  const showToast = (text) => {
    setToast({ show: true, text });
    setTimeout(() => setToast({ show: false, text: '' }), 3500);
  };

  useEffect(() => {
    setTimeout(() => showToast('Welcome Explorer'), 1200);
  }, []);

  return (
    <>
      <div className="scanlines" />
      <PixelStars />
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Activities showToast={showToast} />
      <Contact showToast={showToast} />
      <Footer />
      <AchievementToast show={toast.show} text={toast.text} />
    </>
  );
}
