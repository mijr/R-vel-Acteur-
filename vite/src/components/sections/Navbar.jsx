// components/sections/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCalApi } from '@calcom/embed-react';

const Navbar = ({ navItems }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const CAL_NAMESPACE = 'cal-floating';                // Unique namespace
  const CAL_LINK = 'savana-fusion-lktyvz/30min';       // Your Cal.com link

  // Initialize the Cal.com floating button once
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      // Create a floating button that opens your Cal.com page
      cal('floatingButton', {
        calLink: CAL_LINK,
        config: { layout: 'month_view' }
      });
    })();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => navigate('/pages/login');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header style={{
      padding: '20px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'all 0.3s ease',
      backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.95)',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', maxWidth: '1200px',
        margin: '0 auto', width: '100%'
      }}>
        <motion.h2
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ color: '#38bdf8', fontSize: '1.5rem', margin: 0, fontWeight: '700' }}
        >
          Rével'Acteur
        </motion.h2>

        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {navItems.map((item, i) =>
            item.path ? (
              <motion.button
                key={i}
                onClick={() => navigate(item.path)}
                style={{
                  background: 'none', border: 'none', padding: 0, margin: 0,
                  fontSize: '0.875rem', fontWeight: '500',
                  color: '#1e293b', cursor: 'pointer'
                }}
                whileHover={{ color: '#38bdf8' }}
              >
                {item.label}
              </motion.button>
            ) : (
              <motion.a
                key={i}
                href={item.anchor}
                style={{
                  color: '#1e293b', textDecoration: 'none',
                  fontSize: '0.875rem', fontWeight: '500'
                }}
                whileHover={{ color: '#38bdf8' }}
              >
                {item.label}
              </motion.a>
            )
          )}

          {/* Floating Cal.com Button is initialized globally; here we just trigger it */}
          <motion.button
             onClick={handleLogin}
            style={{
              background: 'transparent',
              border: '1px solid #38bdf8',
              color: '#38bdf8',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.875rem'
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
              fontSize: '0.875rem'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connexion
          </motion.button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
