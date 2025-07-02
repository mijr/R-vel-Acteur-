import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AboutSection from '../components/sections/AboutSection';
import FAQSection from '../components/sections/FAQSection';
import NewsSection from '../components/sections/NewsSection';
import BlogSection from '../components/sections/BlogSection';
import FooterSection from '../components/sections/Footer';
import Navbar from '../components/sections/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Accueil', anchor: '#accueil' },
    { label: 'Nos prestations', anchor: '#nos-prestations' },
    { label: 'Témoignages', anchor: '#témoignages' },
    { label: 'Qui sommes-nous', anchor: '#qui-sommes-nous' },
    { label: 'FAQ', anchor: '#faq' },
    { label: 'Actualités', path: '/news' },
    { label: 'Blog', path: '/blog' },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1e293b' }}>
      <Navbar navItems={navItems} />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <AboutSection />
      <FAQSection />
      <FooterSection navItems={navItems} />
    </div>
  );
};

export default LandingPage;
