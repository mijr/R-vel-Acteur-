import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant } from '../../utils/motion';

const HeroSection = ({ handleStart }) => {
  return (
    <motion.section 
      id="accueil"
      style={{ padding: '100px 20px', textAlign: 'center' }}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.h1 variants={textVariant(0.1)} style={{ 
        fontSize: 'clamp(2rem, 5vw, 3rem)', 
        color: '#1e293b',
        fontWeight: '700',
        lineHeight: '1.2',
        marginBottom: '24px'
      }}>
        Des outils alimentés par Marco pour les équipes produit
      </motion.h1>
      <motion.p variants={textVariant(0.2)} style={{ 
        marginTop: 20, 
        maxWidth: 700, 
        marginInline: 'auto',
        color: '#64748b',
        fontSize: '1.125rem',
        lineHeight: '1.6'
      }}>
        Notre plateforme propose une gamme variée de services : coaching, formation, médiation, art et plus encore.
      </motion.p>
      <motion.div 
        variants={textVariant(0.3)}
        style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}
      >
        <motion.button 
          style={{ 
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: '#38bdf8',
            color: '#ffffff',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Commencer
        </motion.button>
        <motion.button 
          style={{ 
            padding: '12px 24px',
            border: '2px solid #38bdf8',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#38bdf8',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
          whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
          whileTap={{ scale: 0.95 }}
        >
          Planifier une démo
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;