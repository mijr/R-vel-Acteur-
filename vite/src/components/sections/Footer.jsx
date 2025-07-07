import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Accueil',path: '/' },
    { label: 'Nos prestations', anchor: '#nos-prestations' },
    { label: 'Témoignages', anchor: '#témoignages' },
    { label: 'Qui sommes-nous', anchor: '#qui-sommes-nous' },
    { label: 'FAQ', anchor: '#faq' },
    { label: 'Actualités', path: '/news' },
    { label: 'Blog', path: '/blog' },
  ];

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
              {navItems.map((item, i) =>
                item.anchor ? (
                  <a
                    key={i}
                    href={item.anchor}
                    style={{ color: '#ffffff', textDecoration: 'none' }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={i}
                    onClick={() => navigate(item.path)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                    }}
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', marginBottom: '16px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="mailto:contact@revelacteur.com" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                contact@revelacteur.com
              </a>
              <a href="tel:+123456789" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                +1 234 567 89
              </a>
              <a href="/pages/login" style={{ color: '#38bdf8', textDecoration: 'none' }}>
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
