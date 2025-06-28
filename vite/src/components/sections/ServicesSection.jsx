import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant, fadeIn } from '../../utils/motion';

const ServicesSection = () => {
  const services = [
    {
      title: 'Consulting & Coaching',
      description: 'Développement personnel et professionnel sur-mesure pour atteindre vos objectifs.',
      icon: '👔',
      details: [
        'Coaching individuel (dirigeants, managers)',
        'Coaching d\'équipe',
        'Bilan de compétences',
        'Préparation aux entretiens',
        'Gestion du stress et confiance en soi'
      ],
      methodology: 'Approche intégrative combinant PNL, analyse transactionnelle et psychologie positive',
      price: 'À partir de 120€/h (forfaits disponibles)',
      audience: 'Particuliers, managers, dirigeants, équipes',
      duration: 'Séances de 1h30 à 2h, programmes sur 3 à 12 mois'
    },
      {
        title: 'Formation',
        description: 'Modules adaptés aux besoins des particuliers et entreprises pour monter en compétences.',
        icon: '🎓',
        details: [
          'Formation en leadership',
          'Gestion de conflits',
          'Communication non-violente',
          'Intelligence émotionnelle',
          'Gestion du temps et priorités'
        ],
        methodology: 'Pédagogie active avec études de cas, jeux de rôle et mises en situation',
        price: 'À partir de 800€/jour (groupe de 8-12 personnes)',
        audience: 'Entreprises, institutions, groupes',
        duration: 'Formations de 1 à 5 jours'
      },
      {
        title: 'Médiation',
        description: 'Faciliter le dialogue et améliorer les dynamiques professionnelles et personnelles.',
        icon: '🤝',
        details: [
          'Conflits interpersonnels',
          'Crises d\'équipe',
          'Relations clients-fournisseurs',
          'Médiation familiale',
          'Transmission d\'entreprise'
        ],
        methodology: 'Processus structuré en 5 étapes garantissant confidentialité et impartialité',
        price: 'Forfait 3 séances à 900€ (entreprise) ou 600€ (particuliers)',
        audience: 'Entreprises, familles, associations',
        duration: 'Processus de 1 à 3 mois'
      },
      // {
      //   title: 'Art & Écriture',
      //   description: 'Exprimez votre créativité à travers la musique, la littérature et l\'art thérapeutique.',
      //   icon: '🎨',
      //   details: [
      //     'Ateliers d\'écriture thérapeutique',
      //     'Musicothérapie',
      //     'Art-thérapie',
      //     'Création de contenu professionnel',
      //     'Développement de la créativité'
      //   ],
      //   methodology: 'Approche expressive basée sur les arts comme vecteur de transformation',
      //   price: 'À partir de 60€/atelier (groupes) ou 80€/h (individuel)',
      //   audience: 'Particuliers, écoles, maisons de retraite',
      //   duration: 'Ateliers de 2h, cycles de 5 à 10 séances'
      // },
  ];

  return (
    <motion.section 
      id="nos-prestations"
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
          Nos prestations
        </motion.h2>
        <motion.p variants={textVariant(0.2)} style={{ 
          maxWidth: '700px',
          margin: '0 auto 40px auto',
          color: '#64748b',
          fontSize: '1.125rem',
          lineHeight: '1.6',
        }}>
          Découvrez notre accompagnement personnalisé adapté à vos besoins spécifiques
        </motion.p>

        {/* Filter System */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.2, 1)}
          style={{ marginBottom: '40px' }}
        >
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            {['Tous', 'Entreprises', 'Particuliers', 'Équipes', 'Individus'].map((filter, i) => (
              <motion.button
                key={i}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: i === 0 ? '#38bdf8' : 'transparent',
                  color: i === 0 ? 'white' : '#64748b',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Services Grid */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.2, 1)}
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}
        >
          {services.map((service, i) => (
            <motion.div 
              key={i}
              style={{ 
                backgroundColor: '#ffffff',
                padding: '32px 24px',
                borderRadius: '12px',
                width: '280px',
                color: '#1e293b',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
              whileHover={{ y: -10, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{service.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#1e293b' }}>{service.title}</h3>
              <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: '1.6' }}>{service.description}</p>
              
              <div style={{ textAlign: 'left', width: '100%', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.875rem', color: '#38bdf8', marginBottom: '8px' }}>Détails des prestations:</h4>
                <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                  {service.details.map((detail, idx) => (
                    <li key={idx} style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '6px' }}>{detail}</li>
                  ))}
                </ul>
                
                <h4 style={{ fontSize: '0.875rem', color: '#38bdf8', marginBottom: '8px' }}>Notre approche:</h4>
                <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '16px' }}>{service.methodology}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <div>
                    <h4 style={{ color: '#38bdf8', marginBottom: '8px' }}>Public:</h4>
                    <p style={{ color: '#64748b' }}>{service.audience}</p>
                  </div>
                  <div>
                    <h4 style={{ color: '#38bdf8', marginBottom: '8px' }}>Durée:</h4>
                    <p style={{ color: '#64748b' }}>{service.duration}</p>
                  </div>
                </div>
                
                <div style={{ marginTop: '12px' }}>
                  <h4 style={{ color: '#38bdf8', marginBottom: '8px', fontSize: '0.875rem' }}>Tarifs:</h4>
                  <p style={{ color: '#1e293b', fontWeight: '600' }}>{service.price}</p>
                </div>
              </div>
              
              <motion.button 
                style={{ 
                  marginTop: '15px',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#38bdf8',
                  color: '#ffffff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  alignSelf: 'flex-start',
                  width: '100%',
                  textAlign: 'center'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demander un devis pour {service.title.split('&')[0].trim()}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Methodology Section */}
        <motion.div 
          variants={fadeIn('up', 'tween', 0.4, 1)}
          style={{ 
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '40px',
            marginTop: '60px',
            textAlign: 'left'
          }}
        >
          <h3 style={{ color: '#1e293b', fontSize: '1.5rem', marginBottom: '20px' }}>
            Notre méthodologie unique
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {[
              {
                title: 'Diagnostic personnalisé',
                description: 'Analyse approfondie de vos besoins spécifiques avant toute intervention'
              },
              {
                title: 'Approche sur-mesure',
                description: 'Solutions adaptées à votre contexte et à vos objectifs'
              },
              {
                title: 'Suivi rigoureux',
                description: 'Évaluation continue des progrès et ajustements si nécessaire'
              },
              {
                title: 'Outils concrets',
                description: 'Boîte à outils pratiques pour une autonomie progressive'
              }
            ].map((item, i) => (
              <div key={i} style={{ flex: '1 1 200px' }}>
                <h4 style={{ color: '#38bdf8', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ color: '#64748b' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ServicesSection;