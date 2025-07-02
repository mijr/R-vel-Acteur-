import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant, fadeIn } from '../utils/motion';
import Navbar from '../components/sections/Navbar'; // Adjust path if needed
import FooterSection from '../components/sections/Footer'; // Adjust path if needed

const navItems = [
  { label: 'Accueil', path: '/' },
  { label: 'Nos prestations', anchor: '#nos-prestations' },
  { label: 'Témoignages', anchor: '#témoignages' },
  { label: 'Qui sommes-nous', anchor: '#qui-sommes-nous' },
  { label: 'FAQ', anchor: '#faq' },
  { label: 'Actualités', path: '/news' },
  { label: 'Blog', path: '/blog' }
];

const newsItems = [
  // Add more than 9 items for pagination to work
  {
    title: "Nouvel atelier d'écriture thérapeutique",
    date: '15 juin 2023',
    description: "Découvrez notre nouveau cycle d'ateliers...",
    type: 'Nouveau service',
    image: '📝'
  },
  {
    title: 'Conférence sur le leadership bienveillant',
    date: '28 juin 2023 - 18h30',
    description: 'Participez à notre conférence gratuite sur les nouvelles formes de leadership.',
    type: 'Événement',
    image: '🎤'
  },
  {
    title: 'Interview dans Forbes France',
    date: '5 mai 2023',
    description: 'Retrouvez notre interview sur les nouvelles méthodes de développement professionnel.',
    type: 'Média',
    image: '📰'
  },
  {
    title: 'Formation certifiante en médiation',
    date: 'Septembre 2023',
    description: 'Nouvelle session de notre formation intensive en gestion des conflits.',
    type: 'Formation',
    image: '🎓'
  },
  {
    title: 'Podcast sur le coaching professionnel',
    date: '10 avril 2023',
    description: 'Écoutez notre dernier épisode sur l’évolution du coaching.',
    type: 'Podcast',
    image: '🎧'
  },
  {
    title: 'Webinaire : Gérer le stress',
    date: '22 mars 2023',
    description: 'Un atelier pratique pour mieux gérer le stress au travail.',
    type: 'Webinaire',
    image: '💻'
  },
  {
    title: 'Nouvelle recrue dans notre équipe',
    date: '1 mars 2023',
    description: 'Bienvenue à Julie, notre nouvelle coach spécialisée en communication.',
    type: 'Annonce',
    image: '👩‍💼'
  },
  {
    title: 'Article publié dans Psychologies',
    date: '15 février 2023',
    description: 'Lisez notre article sur les clés du bien-être professionnel.',
    type: 'Presse',
    image: '📰'
  },
  {
    title: 'Atelier méditation et pleine conscience',
    date: '10 janvier 2023',
    description: 'Démarrez l’année avec sérénité grâce à notre atelier de pleine conscience.',
    type: 'Atelier',
    image: '🧘‍♂️'
  }
];

const ITEMS_PER_PAGE = 9;

const NewsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentNews = newsItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  return (
    <>
      <Navbar navItems={navItems} />

      <motion.section
        id="actualites"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer}
        style={{
          position: 'relative',
          padding: '80px 20px',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#f8fafc',
          overflow: 'hidden'
        }}
      >
        <motion.h2 variants={textVariant(0.1)} style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '16px',
          color: '#1e293b',
          fontWeight: '700'
        }}>
          Actualités
        </motion.h2>

        <motion.p variants={textVariant(0.2)} style={{
          maxWidth: '700px',
          margin: '0 auto 40px auto',
          color: '#64748b',
          fontSize: '1.125rem',
          lineHeight: '1.6'
        }}>
          Découvrez nos dernières nouvelles et événements à venir
        </motion.p>

        <motion.div
          variants={fadeIn('up', 'tween', 0.3, 1)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            justifyContent: 'center',
            marginBottom: '40px'
          }}
        >
          {currentNews.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              background: currentPage === 1 ? '#e2e8f0' : '#fff',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            ‹ Précédent
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: currentPage === idx + 1 ? '#38bdf8' : '#fff',
                color: currentPage === idx + 1 ? '#fff' : '#000',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              background: currentPage === totalPages ? '#e2e8f0' : '#fff',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
            }}
          >
            Suivant ›
          </button>
        </div>
      </motion.section>

      <FooterSection />
    </>
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
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      border: '1px solid #e2e8f0',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}
  >
    <div style={{ fontSize: '2.25rem', lineHeight: '1' }}>{news.image}</div>
    <h3 style={{
      fontSize: '1.125rem',
      fontWeight: '700',
      color: '#0f172a',
      marginBottom: '4px'
    }}>
      {news.title}
    </h3>
    <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>
      {news.description}
    </p>
    <div style={{
      fontSize: '0.875rem',
      color: '#64748b',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      marginTop: 'auto'
    }}>
      <span><strong>📅</strong> {news.date}</span>
      <span><strong>🏷️</strong> {news.type}</span>
    </div>
  </motion.div>
);

export default NewsSection;
