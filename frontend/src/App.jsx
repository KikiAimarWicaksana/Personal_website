import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Portfolio from './sections/Portfolio';
import Activities from './sections/Activities';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import AchievementToast from './components/AchievementToast';
import PixelStars from './components/PixelStars';
import PortfolioDetail from './pages/PortfolioDetail';
import ActivityDetail from './pages/ActivityDetail';
import AllActivities from './pages/AllActivities';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import PixelCursor from './components/PixelCursor';

function Home({ showToast }) {
  return (
    <>
      <Hero />
      <About />
      <Portfolio />
      <Activities showToast={showToast} />
      <Contact showToast={showToast} />
    </>
  );
}

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
      <PixelCursor />
      <div className="scanlines" />
      <PixelStars />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home showToast={showToast} />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/activities" element={<AllActivities />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
      <AchievementToast show={toast.show} text={toast.text} />
    </>
  );
}
