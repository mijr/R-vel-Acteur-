// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate(); // <-- Hook

  const handleStart = () => {
    navigate('/dashboard/default'); // <-- Navigate to Dashboard
  };
  return (
    <div style={{ backgroundColor: '#0f172a', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* Navigation Bar */}
      <header style={navContainer}>
        <div style={navContent}>
          <h2 style={{ color: '#38bdf8', fontSize: '1.5rem', margin: 0 }}>Rével'Acteur</h2>
          <nav style={navLinks}>
            {[
              'Accueil',
              'Nos prestations',
              'Témoignages',
              'Qui sommes-nous',
              'FAQ',
              'Actualités',
              'Blog',
            ].map((item, i) => (
              <a key={i} href="#" style={navLink}>
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#38bdf8' }}>
          Des outils alimentés par l'IA pour les équipes produit
        </h1>
        <p style={{ marginTop: 20, maxWidth: 600, marginInline: 'auto' }}>
          Notre modèle de page d’accueil fonctionne sur tous les appareils. Configurez-la une seule fois
          et obtenez des résultats superbes à vie.
        </p>
        <div style={{ marginTop: 30 }}>
         <button style={btnStyle} onClick={handleStart}>
            Commencer
          </button>
          <button style={{ ...btnStyle, backgroundColor: '#1e293b' }}>Planifier une démo</button>
        </div>
      </section>

      {/* Features */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Cartographiez votre parcours produit</h2>
        <p style={subtitleStyle}>
          Collaborez avec votre équipe en quelques minutes. Intégration fluide avec vos outils préférés.
        </p>
        <div style={cardGrid}>
          {['Outils intégrés', 'Évolutivité', 'Flux de travail sur mesure'].map((title, i) => (
            <div key={i} style={cardStyle}>
              <h3>{title}</h3>
              <p>
                Développement produit simplifié avec une plateforme cohérente, adaptée aux besoins et aux
                informations.
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Nos Prestations */}
<section style={sectionStyle}>
  <h2 style={titleStyle}>Nos prestations</h2>
  <p style={subtitleStyle}>
    Découvrez notre gamme de services personnalisés, adaptés à vos besoins professionnels et personnels.
  </p>
  <div style={cardGrid}>
    {/* Coaching */}
    <div style={cardStyle}>
      <h3>Coaching</h3>
      <p>Accompagnement individuel ou en équipe pour favoriser l’épanouissement professionnel.</p>
      <button style={contactBtn}>Nous contacter</button>
    </div>

    {/* Formation */}
    <div style={cardStyle}>
      <h3>Formation</h3>
      <p>Sessions interactives pour renforcer les compétences clés dans un cadre dynamique.</p>
      <button style={contactBtn}>Nous contacter</button>
    </div>

    {/* Médiation */}
    <div style={cardStyle}>
      <h3>Médiation</h3>
      <p>Interventions neutres pour faciliter le dialogue et résoudre les conflits durablement.</p>
      <button style={contactBtn}>Nous contacter</button>
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section style={sectionStyle}>
        <h2 style={titleStyle}>Témoignages</h2>
        <div style={cardGrid}>
          {['Samsung', 'Moka', 'Forbes'].map((name, i) => (
            <div key={i} style={testimonialStyle}>
              <p>"Contenu IA qui change la donne pour notre productivité. Nous sommes conquis!"</p>
              <small>- {name}</small>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 20px', backgroundColor: '#1e293b', color: '#94a3b8' }}>
        <div style={footerGrid}>
          {[
            'Accueil',
            'Nos prestations',
            'Témoignages',
            'Qui sommes-nous',
            'FAQ',
            'Actualités',
            'Blog',
          ].map((item, i) => (
            <a key={i} href="#" style={footerLink}>
              {item}
            </a>
          ))}
        </div>
       <p style={{ marginTop: 20, textAlign: 'center', fontSize: 12 }}>
          © {new Date().getFullYear()} Rével'Acteur. Tous droits réservés.
        </p>

      </footer>
    </div>
  );
};

// --- Styles ---
const btnStyle = {
  padding: '10px 20px',
  margin: '0 10px',
  border: 'none',
  borderRadius: 6,
  backgroundColor: '#38bdf8',
  color: '#000',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const contactBtn = {
  marginTop: 15,
  padding: '8px 16px',
  border: 'none',
  borderRadius: 6,
  backgroundColor: '#38bdf8',
  color: '#000',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const navContainer = {
  backgroundColor: '#0f172a',
  padding: '20px 40px',
  borderBottom: '1px solid #1e293b',
  position: 'sticky',
  top: 0,
  zIndex: 10,
};

const navContent = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: 1200,
  margin: '0 auto',
  flexWrap: 'wrap',
};

const navLinks = {
  display: 'flex',
  gap: 20,
  flexWrap: 'wrap',
};

const navLink = {
  color: '#94a3b8',
  textDecoration: 'none',
  fontSize: 16,
  fontWeight: '500',
};

const sectionStyle = {
  padding: '60px 20px',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '2rem',
  marginBottom: 10,
  color: '#38bdf8',
};

const subtitleStyle = {
  maxWidth: 600,
  margin: '0 auto 40px auto',
  color: '#cbd5e1',
};

const cardGrid = {
  display: 'flex',
  justifyContent: 'center',
  gap: 20,
  flexWrap: 'wrap',
};

const cardStyle = {
  backgroundColor: '#1e293b',
  padding: 20,
  borderRadius: 12,
  width: 250,
  color: '#fff',
};

const testimonialStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #334155',
  padding: 20,
  borderRadius: 12,
  width: 250,
};

const footerGrid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 20,
  justifyContent: 'center',
};

const footerLink = {
  color: '#94a3b8',
  textDecoration: 'none',
};

export default LandingPage;
