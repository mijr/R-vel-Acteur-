import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/HomePage';
import ServicesPage from '../components/ServicesPage';
import TestimonialsPage from '../components/TestimonialsPage';
import AboutPage from '../components/AboutPage';
import FAQPage from '../components/FAQPage';
import NewsPage from '../components/NewsPage';
import BlogPage from '../components/BlogPage';
import AppointmentPage from '../components/AppointmentPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'services':
        return <ServicesPage onNavigate={setCurrentPage} />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'faq':
        return <FAQPage />;
      case 'news':
        return <NewsPage />;
      case 'blog':
        return <BlogPage />;
      case 'appointment':
        return <AppointmentPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;