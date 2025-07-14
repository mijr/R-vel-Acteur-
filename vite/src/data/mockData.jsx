export const services = [
  {
    id: '1',
    title: 'Coaching Professionnel',
    description: 'Accompagnement personnalisé pour développer vos compétences professionnelles et atteindre vos objectifs de carrière.',
    category: 'coaching',
    methodology: 'Approche systémique et solution-focused basée sur l\'écoute active et la co-construction.',
    pricing: 'À partir de 80€/séance',
    targetAudience: ['Cadres', 'Entrepreneurs', 'Managers']
  },
  {
    id: '2',
    title: 'Formation en Entreprise',
    description: 'Modules de formation adaptés aux besoins spécifiques de votre organisation.',
    category: 'formation',
    methodology: 'Pédagogie interactive avec mise en situation et outils pratiques.',
    pricing: 'Sur devis selon durée et effectif',
    targetAudience: ['Entreprises', 'Équipes', 'Organisations']
  },
  {
    id: '3',
    title: 'Médiation et Résolution de Conflits',
    description: 'Accompagnement pour résoudre les tensions et améliorer la communication dans les équipes.',
    category: 'mediation',
    methodology: 'Processus structuré de médiation avec techniques de communication non-violente.',
    pricing: 'À partir de 150€/séance',
    targetAudience: ['Équipes', 'Organisations', 'Particuliers']
  },
  {
    id: '4',
    title: 'Facilitation d\'Équipe',
    description: 'Animation d\'ateliers et séminaires pour renforcer la cohésion et l\'efficacité collective.',
    category: 'facilitation',
    methodology: 'Outils d\'intelligence collective et techniques d\'animation participative.',
    pricing: 'À partir de 300€/demi-journée',
    targetAudience: ['Équipes', 'Comités de direction', 'Groupes projet']
  },
  {
    id: '5',
    title: 'Expression Artistique et Créativité',
    description: 'Valorisation de la créativité à travers la musique, l\'écriture et l\'expression artistique.',
    category: 'art',
    methodology: 'Approche expérientielle combinant art-thérapie et développement personnel.',
    pricing: 'À partir de 60€/séance',
    targetAudience: ['Particuliers', 'Artistes', 'Créatifs']
  }
];

export const testimonials = [
  {
    id: '1',
    name: 'Marie Dubois',
    role: 'Directrice RH',
    organization: 'TechCorp France',
    content: 'L\'accompagnement en coaching d\'équipe a transformé notre dynamique de travail. Les résultats ont été visibles dès les premières séances.',
    serviceCategory: 'coaching',
    rating: 5
  },
  {
    id: '2',
    name: 'Jean-Pierre Martin',
    role: 'Entrepreneur',
    organization: 'StartUp Innovation',
    content: 'La formation en gestion de conflits nous a donné les outils concrets pour améliorer notre communication interne.',
    serviceCategory: 'formation',
    rating: 5
  },
  {
    id: '3',
    name: 'Aminata Koné',
    role: 'Manager',
    organization: 'Groupe Afrique Solutions',
    content: 'Un accompagnement professionnel et bienveillant qui m\'a permis de développer mon leadership avec confiance.',
    serviceCategory: 'coaching',
    rating: 5
  }
];

export const blogPosts = [
  {
    id: '1',
    title: 'Les clés d\'un leadership authentique',
    excerpt: 'Découvrez comment développer un style de leadership qui vous ressemble et inspire vos équipes.',
    content: 'Le leadership authentique repose sur...',
    category: 'coaching',
    type: 'article',
    publishDate: '2024-01-15',
    readTime: '5 min'
  },
  {
    id: '2',
    title: 'Médiation en entreprise : prévenir plutôt que guérir',
    excerpt: 'Comment anticiper et gérer les conflits en milieu professionnel.',
    content: 'La médiation préventive...',
    category: 'médiation',
    type: 'video',
    publishDate: '2024-01-10',
    readTime: '8 min',
    mediaUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'Podcast : L\'art de la communication bienveillante',
    excerpt: 'Une discussion approfondie sur les techniques de communication non-violente.',
    content: 'Dans ce podcast...',
    category: 'développement',
    type: 'podcast',
    publishDate: '2024-01-05',
    readTime: '15 min',
    mediaUrl: 'https://soundcloud.com/example'
  }
];

export const faqs = [
  {
    id: '1',
    question: 'Comment se déroule une première séance de coaching ?',
    answer: 'La première séance est consacrée à faire connaissance et à définir ensemble vos objectifs. Nous établissons un contrat de coaching clair et déterminons la fréquence des séances.',
    category: 'coaching'
  },
  {
    id: '2',
    question: 'Quelle est la durée moyenne d\'un accompagnement ?',
    answer: 'La durée varie selon vos besoins et objectifs. En moyenne, un accompagnement individuel dure entre 6 et 12 séances sur 3 à 6 mois.',
    category: 'processus'
  },
  {
    id: '3',
    question: 'Proposez-vous des formations à distance ?',
    answer: 'Oui, nous adaptons nos formations aux contraintes géographiques. Nous proposons des sessions en visioconférence et des modules hybrides.',
    category: 'formation'
  },
  {
    id: '4',
    question: 'Comment sont établis les tarifs ?',
    answer: 'Les tarifs varient selon le type de prestation et la durée. Nous proposons toujours un devis personnalisé après un premier échange.',
    category: 'tarifs'
  }
];

export const news = [
  {
    id: '1',
    title: 'Nouveau service : Coaching en ligne pour les professionnels africains',
    content: 'Nous lançons une offre spécialement adaptée aux besoins des professionnels francophones d\'Afrique avec des créneaux horaires adaptés.',
    type: 'service',
    date: '2024-01-20',
    featured: true
  },
  {
    id: '2',
    title: 'Conférence "Leadership et Bien-être" - 15 février 2024',
    content: 'Rejoignez-nous pour une conférence gratuite sur les liens entre leadership authentique et bien-être au travail.',
    type: 'event',
    date: '2024-01-18',
    featured: true
  },
  {
    id: '3',
    title: 'Interview dans le magazine "Entreprise & Carrière"',
    content: 'Découvrez notre approche de la médiation en entreprise dans le dernier numéro du magazine spécialisé.',
    type: 'media',
    date: '2024-01-12',
    featured: false
  }
];