import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant, fadeIn } from '../../utils/motion';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Samsung',
      quote: "Service exceptionnel. Nous avons vu un réel impact sur notre cohésion d'équipe.",
      role: 'Directeur RH'
    },
    {
      name: 'Moka',
      quote: "L'accompagnement sur mesure a transformé notre manière de travailler.",
      role: 'CEO'
    },
    {
      name: 'Forbes',
      quote: "Une approche innovante qui a fait ses preuves dans notre organisation.",
      role: 'Responsable Innovation'
    },
    // Other testimonials...
  ];

  return (
    <motion.section 
      id="témoignages"
      style={{ 
        padding: '80px 20px', 
        textAlign: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: '#f8fafc'
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={staggerContainer}>
        <motion.h2 variants={textVariant(0.1)} style={{ 
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '16px',
          color: '#1e293b',
          fontWeight: '700',
        }}>
          Témoignages
        </motion.h2>
        <motion.p variants={textVariant(0.2)} style={{ 
          maxWidth: '700px',
          margin: '0 auto 40px auto',
          color: '#64748b',
          fontSize: '1.125rem',
          lineHeight: '1.6',
        }}>
          Ce que nos clients disent de nous
        </motion.p>

        <motion.div 
          variants={fadeIn('up', 'tween', 0.2, 1)}
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div 
              key={i}
              style={{ 
                backgroundColor: '#ffffff',
                padding: '32px 24px',
                borderRadius: '12px',
                width: '280px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                textAlign: 'left',
              }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <p style={{ fontStyle: 'italic', color: '#475569', lineHeight: '1.6' }}>"{testimonial.quote}"</p>
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontWeight: '600', color: '#1e293b' }}>- {testimonial.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default TestimonialsSection;