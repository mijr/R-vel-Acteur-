import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { staggerContainer, textVariant, fadeIn } from '../../utils/motion';

const FAQSection = () => {
  const faqs = [
    {
      question: 'Comment se déroule une première séance de coaching ?',
      answer: 'La première séance est un temps de rencontre et de diagnostic. Nous échangeons sur vos attentes, vos objectifs et définissons ensemble le cadre de notre collaboration. Cette séance dure généralement 1h30.'
    },
    {
          question: 'Quelle est la différence entre coaching et thérapie ?',
          answer: 'Le coaching se concentre sur le présent et l\'avenir, avec des objectifs concrets à atteindre. La thérapie travaille davantage sur les causes passées des difficultés actuelles. Nous pouvons vous orienter vers un thérapeute si nécessaire.'
        },
        {
          question: 'Proposez-vous des forfaits ou des séances à l\'unité ?',
          answer: 'Les deux options sont possibles. Pour un travail en profondeur, nous recommandons généralement un forfait de 5 à 10 séances. Des séances ponctuelles sont également disponibles pour des besoins spécifiques.'
        },
        {
          question: 'Les séances sont-elles remboursées ?',
          answer: 'Certaines mutuelles remboursent partiellement les séances de coaching. Renseignez-vous auprès de votre complémentaire santé. Pour les entreprises, ces prestations sont généralement considérées comme des frais de formation.'
        },
        {
          question: 'Pouvez-vous intervenir en entreprise ?',
          answer: 'Oui, nous intervenons régulièrement en entreprise pour du coaching individuel (dirigeants, managers) ou collectif (équipes), ainsi que pour des formations et des médiations.'
        }
    // Other FAQs...
  ];

  return (
    <motion.section 
      id="faq"
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
          FAQ
        </motion.h2>
        <motion.p variants={textVariant(0.2)} style={{ 
          maxWidth: '700px',
          margin: '0 auto 40px auto',
          color: '#64748b',
          fontSize: '1.125rem',
          lineHeight: '1.6',
        }}>
          Trouvez les réponses aux questions les plus fréquentes
        </motion.p>

        <motion.div 
          variants={fadeIn('up', 'tween', 0.2, 1)}
          style={{ maxWidth: '800px', margin: '0 auto' }}
        >
          {faqs.map((faq, i) => (
            <Accordion 
              key={i} 
              style={{ 
                marginBottom: '16px', 
                boxShadow: 'none', 
                border: '1px solid #e2e8f0' 
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '8px' 
                }}
              >
                <h4 style={{ color: '#1e293b', margin: 0 }}>{faq.question}</h4>
              </AccordionSummary>
              <AccordionDetails style={{ backgroundColor: '#f8fafc' }}>
                <p style={{ color: '#64748b' }}>{faq.answer}</p>
              </AccordionDetails>
            </Accordion>
          ))}
          
          <motion.div 
            style={{ marginTop: '40px', textAlign: 'center' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Vous ne trouvez pas réponse à votre question ?
            </p>
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
              Nous contacter
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default FAQSection;