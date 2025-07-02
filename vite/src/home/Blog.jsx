import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, textVariant, fadeIn } from '../utils/motion';

import Navbar from '../components/sections/Navbar'; // Adjust path as needed
import FooterSection from '../components/sections/Footer'; // Adjust path as needed

const BlogSection = () => {

      const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Nos prestations', anchor: '#nos-prestations' },
    { label: 'Témoignages', anchor: '#témoignages' },
    { label: 'Qui sommes-nous', anchor: '#qui-sommes-nous' },
    { label: 'FAQ', anchor: '#faq' },
    { label: 'Actualités', path: '/news' },
    { label: 'Blog', path: '/blog' },
  ];

  const blogPosts = [
    {
      title: 'Les 5 pièges du manager bienveillant',
      date: '10 juin 2023',
      description: 'Comment éviter les écueils courants lorsqu\'on adopte un style de management bienveillant.',
      type: 'Article',
      category: 'Coaching',
      readTime: '8 min',
      image: '📄'
    },
    {
      title: 'Podcast: Gérer les conflits en équipe',
      date: '25 mai 2023',
      description: 'Notre dernier épisode sur les techniques de médiation professionnelle.',
      type: 'Podcast',
      category: 'Médiation',
      listenTime: '32 min',
      image: '🎧'
    },
    {
      title: 'Vidéo: Exercice de respiration anti-stress',
      date: '15 mai 2023',
      description: 'Démonstration d\'une technique simple pour gérer le stress en milieu professionnel.',
      type: 'Vidéo',
      category: 'Formation',
      watchTime: '5 min',
      image: '🎥'
    },
  ];

  return (
    <>
     <Navbar navItems={navItems} />


      <motion.section 
        id="blog"
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
       <motion.div
  variants={fadeIn('up', 'tween', 0.3, 1)}
  style={{
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    padding: '0 40px',
  }}
>
  {/* Left Chevron */}
  <button
    style={{
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#94a3b8',
    }}
    aria-label="Scroll left"
  >
    ◀
  </button>

  {blogPosts.map((post, i) => (
    <BlogPostCard key={i} post={post} index={i} />
  ))}

  {/* Right Chevron */}
  <button
    style={{
      position: 'absolute',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#94a3b8',
    }}
    aria-label="Scroll right"
  >
    ▶
  </button>
</motion.div>

      </motion.section>

      <FooterSection /> {/* ✅ Add your footer at the bottom */}
    </>
  );
};

const BlogPostCard = ({ post }) => {
  const time =
    post.readTime || post.listenTime || post.watchTime || '—';

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '340px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ fontSize: '2.5rem', lineHeight: '1' }}>{post.image}</div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: '4px',
      }}>
        {post.title}
      </h3>
      <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>
        {post.description}
      </p>
      <div style={{
        fontSize: '0.875rem',
        color: '#64748b',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        marginTop: 'auto',
      }}>
        <span><strong>📅</strong> {post.date}</span>
        <span><strong>🏷️</strong> {post.category} — {post.type}</span>
        <span><strong>⏱️</strong> {time}</span>
      </div>
    </motion.div>
  );
};

export default BlogSection;
