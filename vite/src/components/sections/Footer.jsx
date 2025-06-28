import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ navItems }) => {
  return (
    <motion.footer 
      style={{ padding: '60px 20px', backgroundColor: '#1e293b', color: '#94a3b8' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '20px' }}>Rével'Acteur</h3>
            <p style={{ maxWidth: '300px', lineHeight: '1.6' }}>
              Votre partenaire en développement professionnel et personnel.
            </p>
          </div>
          
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Navigation rapide</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navItems.map((item, i) => (
                <a 
                  key={i} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  style={{ 
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s ease',
                    ':hover': { color: '#ffffff' },
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="mailto:contact@revelacteur.com" style={{ 
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease',
                ':hover': { color: '#ffffff' },
              }}>
                contact@revelacteur.com
              </a>
              <a href="tel:+123456789" style={{ 
                color: '#94a3b8',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease',
                ':hover': { color: '#ffffff' },
              }}>
                +1 234 567 89
              </a>
              <a href="/appointment" style={{ 
                color: '#38bdf8',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s ease',
                ':hover': { color: '#ffffff' },
              }}>
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '40px', borderTop: '1px solid #334155', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} Rével'Acteur. Tous droits réservés.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;