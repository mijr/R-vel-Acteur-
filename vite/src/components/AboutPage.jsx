import React from 'react';
import { Award, BookOpen, Heart, Users, Target, Globe } from 'lucide-react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AboutPage = ({ onNavigate }) => {
  const navigate = useNavigate();
  const values = [
    {
      icon: Heart,
      title: 'Bienveillance',
      description: 'Un accompagnement respectueux et empathique, dans un cadre sécurisé et confidentiel.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Des méthodes éprouvées et une approche personnalisée pour des résultats durables.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: "Une démarche participative qui valorise l'intelligence collective et la co-construction."
    },
    {
      icon: Globe,
      title: 'Ouverture',
      description: "Une vision internationale et interculturelle, particulièrement en direction de l'Afrique."
    }
  ];

  const certifications = [
    {
      title: 'Certification ICF (International Coach Federation)',
      year: '2020',
      description: 'Coach professionnel certifié niveau PCC'
    },
    {
      title: 'Formation en Médiation',
      year: '2019',
      description: 'Centre National de la Médiation'
    },
    {
      title: 'Master en Psychologie du Travail',
      year: '2015',
      description: 'Université Paris Descartes'
    },
    {
      title: 'Formation en Art-Thérapie',
      year: '2018',
      description: 'Institut de Formation en Art-Thérapie'
    }
  ];

   const handleLogin = () => navigate('/pages/login');

  return (
    <Box>
      {/* Header */}
      <Box bgcolor="white" py={10}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Qui sommes-nous ?
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" maxWidth="md" mx="auto">
            Découvrez notre approche, nos valeurs et notre engagement dans l'accompagnement professionnel et personnel.
          </Typography>
        </Container>
      </Box>

      {/* Founder */}
      <Box py={10} bgcolor="white">
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Notre Fondateur
              </Typography>
              <Typography paragraph color="text.secondary">
                Avec plus de 15 ans d'expérience dans l'accompagnement professionnel, notre fondateur a développé une approche unique qui allie rigueur méthodologique et dimension humaine.
              </Typography>
              <Typography paragraph color="text.secondary">
                Diplômé en psychologie du travail et certifié coach professionnel, il a accompagné des centaines de particuliers et d'organisations dans leur développement.
              </Typography>
              <Typography paragraph color="text.secondary">
                Passionné par la créativité et l'expression artistique, il intègre ces dimensions dans ses accompagnements pour révéler le potentiel de chacun de manière authentique.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center', bgcolor: 'sky.50' }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'sky.200', mx: 'auto', mb: 2 }}>
                  <Users size={40} color="#0284c7" />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">
                  Jean-Marie Révélateur
                </Typography>
                <Typography color="primary" gutterBottom>
                  Fondateur & Coach Professionnel
                </Typography>
                <Stack direction="row" spacing={4} justifyContent="center" mt={2}>
                  <Box>
                    <Typography variant="h6" color="primary">500+</Typography>
                    <Typography variant="body2">Clients</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="primary">15+</Typography>
                    <Typography variant="body2">Années</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h6" color="primary">50+</Typography>
                    <Typography variant="body2">Entreprises</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values */}
       <Box py={10} bgcolor="grey.50">
          <Container>
            <Typography variant="h4" align="center" gutterBottom>
              Nos Valeurs
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" mb={6}>
              Les principes qui guident notre approche et nos actions
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 3,
                px: 1,
                // Optional: hide scrollbar on WebKit
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none', // IE 10+
              }}
            >
              {values.map((val, idx) => (
                <Card
                  key={idx}
                  elevation={2}
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    flex: '0 0 280px', // fixed width so cards line up horizontally
                    scrollSnapAlign: 'start', // Optional: snap scrolling
                  }}
                >
                  <Avatar sx={{ bgcolor: 'sky.100', mx: 'auto', mb: 2 }}>
                    <val.icon size={28} color="#0284c7" />
                  </Avatar>
                  <Typography variant="h6" gutterBottom>
                    {val.title}
                  </Typography>
                  <Typography color="text.secondary">{val.description}</Typography>
                </Card>
              ))}
            </Box>
          </Container>
        </Box>

      {/* Certifications */}
      <Box py={10} bgcolor="white">
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Formations & Certifications
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={6}>
            Une expertise reconnue et continuellement enrichie
          </Typography>
          <Grid container spacing={4}>
            {certifications.map((cert, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Box display="flex">
                  <Avatar sx={{ bgcolor: 'sky.100', mr: 2 }}>
                    <Award size={24} color="#0284c7" />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">{cert.title}</Typography>
                    <Typography color="primary">{cert.year}</Typography>
                    <Typography color="text.secondary">{cert.description}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Approach */}
      <Box py={10} bgcolor="sky.50">
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Notre Approche
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={6}>
            Une méthodologie éprouvée pour des résultats durables
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: BookOpen, title: 'Analyse', text: 'Diagnostic approfondi de la situation...' },
              { icon: Users, title: 'Accompagnement', text: 'Démarche collaborative utilisant des outils adaptés...' },
              { icon: Target, title: 'Résultats', text: 'Évaluation des progrès et mise en place d\'un plan d\'action...' }
            ].map((step, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ p: 3 }}>
                  <Avatar sx={{ bgcolor: 'sky.100', mb: 2 }}>
                    <step.icon size={24} color="#0284c7" />
                  </Avatar>
                  <Typography variant="h6" gutterBottom>{step.title}</Typography>
                  <Typography color="text.secondary">{step.text}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Engagements */}
      <Box py={10} bgcolor="white">
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Nos Engagements
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={6}>
            Au-delà de l'accompagnement professionnel
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, bgcolor: 'sky.50' }}>
                <Typography variant="h6" gutterBottom>Engagement Humanitaire</Typography>
                <Typography color="text.secondary" paragraph>
                  Nous soutenons activement des projets en Afrique francophone...
                </Typography>
                <ul>
                  <li>• Formations gratuites pour les jeunes entrepreneurs</li>
                  <li>• Accompagnement d'ONG et associations</li>
                  <li>• Programmes de mentorat à distance</li>
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4, bgcolor: 'sky.50' }}>
                <Typography variant="h6" gutterBottom>Expression Artistique</Typography>
                <Typography color="text.secondary" paragraph>
                  La créativité est au cœur de notre approche...
                </Typography>
                <ul>
                  <li>• Ateliers d'écriture créative</li>
                  <li>• Sessions de musique thérapeutique</li>
                  <li>• Accompagnement d'artistes professionnels</li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box py={10} bgcolor="sky.600" textAlign="center" color="white">
        <Container>
          <Typography variant="h4" gutterBottom>
            Prêt à commencer votre parcours ?
          </Typography>
          <Typography variant="h6" color="sky.100" mb={4}>
            Découvrez comment nous pouvons vous accompagner
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button variant="contained" color="inherit" onClick={handleLogin}>
              Prendre rendez-vous
            </Button>
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} onClick={() => onNavigate('services')}>
              Découvrir nos services
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
