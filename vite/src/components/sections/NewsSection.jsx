import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant, fadeIn } from '../../utils/motion';

const NewsSection = () => {
  const newsItems = [
    {
      title: "Nouvel atelier d'écriture thérapeutique",
      date: '15 juin 2023',
      description: "Découvrez notre nouveau cycle d'ateliers...",
      type: 'Nouveau service',
      image: '📝',
    },
    {
      title: 'Conférence sur le leadership bienveillant',
      date: '28 juin 2023 - 18h30',
      description: 'Participez à notre conférence gratuite sur les nouvelles formes de leadership.',
      type: 'Événement',
      image: '🎤',
    },
    {
      title: 'Interview dans Forbes France',
      date: '5 mai 2023',
      description: 'Retrouvez notre interview sur les nouvelles méthodes de développement professionnel.',
      type: 'Média',
      image: '📰',
    },
    {
      title: 'Formation certifiante en médiation',
      date: 'Septembre 2023',
      description: 'Nouvelle session de notre formation intensive en gestion des conflits.',
      type: 'Formation',
      image: '🎓',
    },
  ];

  return (
    <motion.section
      id="actualités"
      style={{
        padding: '80px 20px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f8fafc',
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={staggerContainer}>
        <motion.h2
          variants={textVariant(0.1)}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '16px',
            color: '#1e293b',
            fontWeight: '700',
          }}
        >
          Actualités
        </motion.h2>

        <motion.p
          variants={textVariant(0.2)}
          style={{
            maxWidth: '700px',
            margin: '0 auto 40px auto',
            color: '#64748b',
            fontSize: '1.125rem',
            lineHeight: '1.6',
          }}
        >
          Découvrez nos dernières nouvelles et événements à venir
        </motion.p>

        <motion.div
          variants={fadeIn('up', 'tween', 0.3, 1)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {newsItems.map((news, i) => (
            <NewsCard key={i} news={news} />
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

const NewsCard = ({ news }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
    transition={{ duration: 0.3 }}
    style={{
      backgroundColor: '#ffffff',
      padding: '24px',
      borderRadius: '12px',
      width: '100%',
      maxWidth: '300px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}
  >
    <div style={{ fontSize: '2.25rem', lineHeight: '1' }}>{news.image}</div>
    <h3
      style={{
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '4px',
      }}
    >
      {news.title}
    </h3>
    <p
      style={{
        fontSize: '0.95rem',
        color: '#475569',
        lineHeight: '1.5',
      }}
    >
      {news.description}
    </p>
    <div
      style={{
        fontSize: '0.875rem',
        color: '#64748b',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginTop: 'auto',
      }}
    >
      <span><strong>📅</strong> {news.date}</span>
      <span><strong>🏷️</strong> {news.type}</span>
    </div>
  </motion.div>
);

export default NewsSection;
