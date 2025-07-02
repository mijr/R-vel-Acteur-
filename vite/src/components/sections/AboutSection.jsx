import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant, fadeIn } from '../../utils/motion';

const AboutSection = () => {
  const values = [
    {
      title: 'Écoute active',
      description: 'Chaque accompagnement commence par une écoute profonde de vos besoins'
    },
     {
      title: 'Authenticité',
      description: 'Nous croyons en des relations transparentes et sincères'
    },
    {
      title: 'Innovation',
      description: 'Nos méthodes évoluent constamment pour plus d\'efficacité'
    },
    {
      title: 'Engagement',
      description: 'Nous nous engageons pleinement dans chaque accompagnement'
    }
  ];
  return (
    <motion.section 
      id="qui-sommes-nous"
      style={{ 
        padding: '80px 20px', 
        textAlign: 'center', 
        maxWidth: '1200px', 
        margin: '0 auto'
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
          Qui sommes-nous
        </motion.h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {/* Founder Profile */}
          <motion.div 
            variants={fadeIn('up', 'tween', 0.2, 1)}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center',
              gap: '20px'
            }}
          >
            <div style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              backgroundColor: '#e2e8f0' 
            }}></div>
            <h3 style={{ fontSize: '1.5rem', color: '#1e293b' }}>Jean Dupont, Fondateur</h3>
            <p style={{ maxWidth: '800px', color: '#64748b', lineHeight: '1.6' }}>
              Avec plus de 15 ans d'expérience en développement personnel et professionnel, j'ai accompagné plus de 500 clients 
              dans leur transformation. Mon parcours atypique m'a conduit de l'entreprise à l'art-thérapie, 
              créant une approche unique qui allie rigueur professionnelle et créativité.
            </p>
          </motion.div>
          
          {/* Values and Approach */}
          <motion.div 
            variants={fadeIn('up', 'tween', 0.3, 1)}
            style={{ 
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              padding: '40px'
            }}
          >
            <h3 style={{ 
              color: '#1e293b', 
              fontSize: '1.5rem', 
              marginBottom: '20px', 
              textAlign: 'center' 
            }}>
              Nos valeurs et approche
            </h3>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '20px', 
              justifyContent: 'center' 
            }}>
              {values.map((value, i) => (
                <div key={i} style={{ flex: '1 1 200px', textAlign: 'center' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    backgroundColor: '#38bdf8', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    color: 'white',
                    fontSize: '1.5rem'
                  }}>
                    {i+1}
                  </div>
                  <h4 style={{ color: '#1e293b', marginBottom: '8px' }}>{value.title}</h4>
                  <p style={{ color: '#64748b' }}>{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Certifications and Professional Journey */}
          <motion.div 
            variants={fadeIn('up', 'tween', 0.4, 1)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ 
                color: '#1e293b', 
                fontSize: '1.25rem', 
                marginBottom: '16px' 
              }}>
                Certifications
              </h3>
              <ul style={{ color: '#64748b', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Master en Psychologie des Organisations</li>
                <li style={{ marginBottom: '8px' }}>Certification en Coaching Professionnel (ICF)</li>
                <li style={{ marginBottom: '8px' }}>Formation en Médiation CNV</li>
                <li style={{ marginBottom: '8px' }}>Diplôme d'Art-Thérapie</li>
              </ul>
            </div>
            
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ 
                color: '#1e293b', 
                fontSize: '1.25rem', 
                marginBottom: '16px' 
              }}>
                Parcours professionnel
              </h3>
              <ul style={{ color: '#64748b', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>10 ans en ressources humaines (Samsung, L'Oréal)</li>
                <li style={{ marginBottom: '8px' }}>5 ans en cabinet de conseil indépendant</li>
                <li style={{ marginBottom: '8px' }}>Intervenant à HEC Paris depuis 2018</li>
                <li style={{ marginBottom: '8px' }}>Auteur de 2 livres sur le développement personnel</li>
              </ul>
            </div>
            
            <div style={{ flex: '1 1 300px' }}>
              <h3 style={{ 
                color: '#1e293b', 
                fontSize: '1.25rem', 
                marginBottom: '16px' 
              }}>
                Engagements
              </h3>
              <ul style={{ color: '#64748b', paddingLeft: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Bénévole pour l'association "Parler pour s'en sortir"</li>
                <li style={{ marginBottom: '8px' }}>Organisateur d'ateliers artistiques en prison</li>
                <li style={{ marginBottom: '8px' }}>Membre actif du réseau "Entreprises Humanistes"</li>
                <li style={{ marginBottom: '8px' }}>Musicien amateur (concerts caritatifs)</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;