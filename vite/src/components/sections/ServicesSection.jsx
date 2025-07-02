import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, textVariant, fadeIn } from "../../utils/motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Consulting & Coaching",
      description:
        "Développement personnel et professionnel sur-mesure pour atteindre vos objectifs.",
      icon: "👔",
      details: [
        "Coaching individuel (dirigeants, managers)",
        "Coaching d'équipe",
        "Bilan de compétences",
        "Préparation aux entretiens",
        "Gestion du stress et confiance en soi",
      ],
      methodology:
        "Approche intégrative combinant PNL, analyse transactionnelle et psychologie positive",
      price: "À partir de 120€/h (forfaits disponibles)",
      audience: "Particuliers, managers, dirigeants, équipes",
      duration: "Séances de 1h30 à 2h, programmes sur 3 à 12 mois",
    },
    {
      title: "Formation",
      description:
        "Modules adaptés aux besoins des particuliers et entreprises pour monter en compétences.",
      icon: "🎓",
      details: [
        "Formation en leadership",
        "Gestion de conflits",
        "Communication non-violente",
        "Intelligence émotionnelle",
        "Gestion du temps et priorités",
      ],
      methodology:
        "Pédagogie active avec études de cas, jeux de rôle et mises en situation",
      price: "À partir de 800€/jour (groupe de 8-12 personnes)",
      audience: "Entreprises, institutions, groupes",
      duration: "Formations de 1 à 5 jours",
    },
    {
      title: "Médiation",
      description:
        "Faciliter le dialogue et améliorer les dynamiques professionnelles et personnelles.",
      icon: "🤝",
      details: [
        "Conflits interpersonnels",
        "Crises d'équipe",
        "Relations clients-fournisseurs",
        "Médiation familiale",
        "Transmission d'entreprise",
      ],
      methodology:
        "Processus structuré en 5 étapes garantissant confidentialité et impartialité",
      price:
        "Forfait 3 séances à 900€ (entreprise) ou 600€ (particuliers)",
      audience: "Entreprises, familles, associations",
      duration: "Processus de 1 à 3 mois",
    },
    {
      title: "Art & Écriture",
      description:
        "Exprimez votre créativité à travers la musique, la littérature et l'art thérapeutique.",
      icon: "🎨",
      details: [
        "Ateliers d'écriture thérapeutique",
        "Musicothérapie",
        "Art-thérapie",
        "Création de contenu professionnel",
        "Développement de la créativité",
      ],
      methodology:
        "Approche expressive basée sur les arts comme vecteur de transformation",
      price: "À partir de 60€/atelier (groupes) ou 80€/h (individuel)",
      audience: "Particuliers, écoles, maisons de retraite",
      duration: "Ateliers de 2h, cycles de 5 à 10 séances",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [expandedCard, setExpandedCard] = useState(null);

  const cardsPerPage = 3;
  const pageCount = Math.ceil(services.length / cardsPerPage);
  const currentCards = services.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleNext = () => setCurrentPage((prev) => (prev + 1) % pageCount);
  const handlePrev = () => setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);

  return (
    <motion.section
      id="nos-prestations"
      style={{ padding: "80px 20px", textAlign: "center", maxWidth: "1200px", margin: "0 auto" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div variants={staggerContainer}>
        <motion.h2
          variants={textVariant(0.1)}
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            marginBottom: "16px",
            color: "#1e293b",
            fontWeight: "700",
          }}
        >
          Nos prestations
        </motion.h2>

        <motion.p
          variants={textVariant(0.2)}
          style={{
            maxWidth: "700px",
            margin: "0 auto 40px",
            color: "#64748b",
            fontSize: "1.125rem",
            lineHeight: "1.6",
          }}
        >
          Découvrez notre accompagnement personnalisé adapté à vos besoins spécifiques
        </motion.p>

        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <button onClick={handlePrev} style={{ background: "none", border: "none", cursor: "pointer" }} aria-label="Précédent">
            <ChevronLeft size={32} color="#38bdf8" />
          </button>

          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
            {currentCards.map((service, i) => {
              const absoluteIndex = currentPage * cardsPerPage + i;
              const isExpanded = expandedCard === absoluteIndex;

              return (
                <motion.div
                  key={i}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "32px 24px",
                    borderRadius: "12px",
                    width: "280px",
                    color: "#1e293b",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                  whileHover={{ y: -10 }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{service.icon}</div>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "#1e293b" }}>
                    {service.title}
                  </h3>
                  <p style={{ color: "#64748b", marginBottom: "20px" }}>{service.description}</p>

                  {isExpanded && (
                    <div style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>
                      <h4 style={{ color: "#38bdf8", marginBottom: "8px" }}>Détails :</h4>
                      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
                        {service.details.map((d, j) => (
                          <li key={j} style={{ color: "#64748b", fontSize: "0.875rem" }}>{d}</li>
                        ))}
                      </ul>
                      <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "8px" }}>
                        <strong>Approche :</strong> {service.methodology}
                      </p>
                      <p style={{ fontSize: "0.875rem" }}>
                        <strong>Public :</strong> {service.audience}<br />
                        <strong>Durée :</strong> {service.duration}<br />
                        <strong>Tarif :</strong> {service.price}
                      </p>
                    </div>
                  )}

                  <motion.button
                    onClick={() => setExpandedCard(isExpanded ? null : absoluteIndex)}
                    style={{
                      marginTop: "15px",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: "#38bdf8",
                      color: "#ffffff",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      width: "100%",
                      textAlign: "center",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isExpanded ? "Réduire" : "Lire la suite"}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          <button onClick={handleNext} style={{ background: "none", border: "none", cursor: "pointer" }} aria-label="Suivant">
            <ChevronRight size={32} color="#38bdf8" />
          </button>
        </motion.div>

        <div style={{ textAlign: "center", color: "#64748b", fontWeight: "500", marginTop: "-16px" }}>
          Page {currentPage + 1} sur {pageCount}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ServicesSection;
