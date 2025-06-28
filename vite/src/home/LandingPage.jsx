import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AboutSection from '../components/sections/AboutSection';
import FAQSection from '../components/sections/FAQSection';
import NewsSection from '../components/sections/NewsSection';
import BlogSection from '../components/sections/BlogSection';
import FooterSection from '../components/sections/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStart = () => navigate('/pages/login');
  const handleAppointment = () => navigate('/appointment');
  const handleLogin = () => navigate('/pages/login');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    'Accueil', 'Nos prestations', 'Témoignages', 
    'Qui sommes-nous', 'FAQ', 'Actualités', 'Blog'
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1e293b', fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <header style={{
        padding: '20px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ color: '#38bdf8', fontSize: '1.5rem', margin: 0, fontWeight: '700' }}
          >
            Rével'Acteur
          </motion.h2>

          <nav style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
            '@media (max-width: 768px)': { display: 'none' },
          }}>
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                style={{
                  color: '#1e293b',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'color 0.2s ease',
                }}
                whileHover={{ color: '#38bdf8' }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button 
                onClick={handleAppointment} 
                style={{
                  background: 'transparent',
                  border: '1px solid #38bdf8',
                  color: '#38bdf8',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Prendre rendez-vous
              </motion.button>
              <motion.button 
                onClick={handleLogin} 
                style={{ 
                  background: '#38bdf8',
                  border: '1px solid #38bdf8',
                  color: '#ffffff',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connexion
              </motion.button>
            </div>
          </nav>

          <button 
            onClick={toggleMenu}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              '@media (max-width: 768px)': { display: 'block' },
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '20px',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 40,
            }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                style={{
                  color: '#1e293b',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  padding: '8px 0',
                }}
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ color: '#38bdf8' }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button 
              onClick={() => {
                handleAppointment();
                setIsMenuOpen(false);
              }}
              style={{ 
                color: '#1e293b',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '12px 0',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              Prendre rendez-vous
            </motion.button>
            <motion.button 
              onClick={() => {
                handleLogin();
                setIsMenuOpen(false);
              }}
              style={{ 
                color: '#1e293b',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                padding: '8px 0',
              }}
            >
              Connexion
            </motion.button>
          </motion.div>
        )}
      </header>

      {/* Sections */}
      <HeroSection handleStart={handleStart} />
      <ServicesSection />
      <TestimonialsSection />
      <AboutSection />
      <FAQSection />
      <NewsSection />
      <BlogSection />
      <FooterSection navItems={navItems} />
    </div>
  );
};

export default LandingPage;