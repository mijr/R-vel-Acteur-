import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Chip,
  Stack,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
  Rating,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
// Example testimonials data - replace this import with your actual data
const testimonials = [
  {
    id: 1,
    name: 'Alice Dupont',
    role: 'Coach',
    organization: 'Coaching Pro',
    serviceCategory: 'coaching',
    content: 'Grâce au coaching, j’ai pu atteindre mes objectifs plus rapidement.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marc Lemoine',
    role: 'Formateur',
    organization: 'Formation Express',
    serviceCategory: 'formation',
    content: 'La formation était claire, complète et très utile.',
    rating: 4,
  },
  {
    id: 3,
    name: 'Sophie Martin',
    role: 'Consultante',
    organization: 'Médiation Plus',
    serviceCategory: 'mediation',
    content: 'La médiation a permis de résoudre des conflits efficacement.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Pauline Laurent',
    role: 'Facilitatrice',
    organization: 'Facilitation Experts',
    serviceCategory: 'facilitation',
    content: 'Les ateliers de facilitation ont dynamisé notre équipe.',
    rating: 4,
  },
  {
    id: 5,
    name: 'Jean-Pierre',
    role: 'Coach',
    organization: 'Coaching Pro',
    serviceCategory: 'coaching',
    content: 'Coaching motivant et efficace, je recommande vivement.',
    rating: 5,
  },
  // Add more testimonial objects here
];

const CARD_WIDTH = 320;

const TestimonialsPage = () => {
   const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const scrollRef = useRef(null);
  
    const handleLogin = () => navigate('/pages/login');
  const categories = [
    { id: 'all', name: 'Tous les témoignages' },
    { id: 'coaching', name: 'Coaching' },
    { id: 'formation', name: 'Formation' },
    { id: 'mediation', name: 'Médiation' },
    { id: 'facilitation', name: 'Facilitation' },
  ];

  const filteredTestimonials = testimonials.filter(
    (t) => selectedCategory === 'all' || t.serviceCategory === selectedCategory
  );

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -CARD_WIDTH * 3, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: CARD_WIDTH * 3, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', py: 8 }}>
      {/* Header */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box textAlign="center">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Témoignages
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
            Découvrez l'expérience de nos clients et les résultats obtenus grâce à nos
            accompagnements personnalisés.
          </Typography>
        </Box>
      </Container>

      {/* Filter */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
          <FilterAltIcon color="action" />
          <Typography variant="subtitle1" fontWeight="medium">
            Filtrer par service :
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                color="primary"
                size="small"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ mb: 10, position: 'relative' }}>
        {!isMobile ? (
          <>
            <Box
              ref={scrollRef}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                gap: 3,
                pb: 1,
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
              }}
            >
              {filteredTestimonials.length > 0 ? (
                filteredTestimonials.map((testimonial) => (
                  <Paper
                    key={testimonial.id}
                    elevation={2}
                    sx={{
                      flex: '0 0 auto',
                      width: CARD_WIDTH,
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      scrollSnapAlign: 'start',
                      cursor: 'default',
                      ':hover': { boxShadow: 6 },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                      <FormatQuoteIcon color="primary" fontSize="large" />
                      <Rating
                        name="read-only"
                        value={testimonial.rating}
                        readOnly
                        precision={1}
                        icon={<StarIcon fontSize="inherit" />}
                        emptyIcon={<StarIcon fontSize="inherit" />}
                        size="small"
                      />
                    </Stack>

                    <Typography
                      variant="body1"
                      color="text.primary"
                      mb={4}
                      sx={{ fontStyle: 'italic', flexGrow: 1 }}
                    >
                      "{testimonial.content}"
                    </Typography>

                    <Box borderTop={1} borderColor="grey.300" pt={3}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        {testimonial.role} - {testimonial.organization}
                      </Typography>
                      <Chip
                        label={testimonial.serviceCategory}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Paper>
                ))
              ) : (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  textAlign="center"
                  py={8}
                  width="100%"
                >
                  Aucun témoignage ne correspond à cette catégorie.
                </Typography>
              )}
            </Box>

            {/* Scroll Arrows */}
            <IconButton
              onClick={scrollLeft}
              aria-label="Scroll testimonials left"
              sx={{
                position: 'absolute',
                top: '50%',
                left: -40,
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'background.default' },
                zIndex: 10,
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={scrollRight}
              aria-label="Scroll testimonials right"
              sx={{
                position: 'absolute',
                top: '50%',
                right: -40,
                transform: 'translateY(-50%)',
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'background.default' },
                zIndex: 10,
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        ) : (
          <Grid container spacing={4}>
            {filteredTestimonials.length > 0 ? (
              filteredTestimonials.map((testimonial) => (
                <Grid item xs={12} key={testimonial.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      ':hover': { boxShadow: 6 },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                      <FormatQuoteIcon color="primary" fontSize="large" />
                      <Rating
                        name="read-only"
                        value={testimonial.rating}
                        readOnly
                        precision={1}
                        icon={<StarIcon fontSize="inherit" />}
                        emptyIcon={<StarIcon fontSize="inherit" />}
                        size="small"
                      />
                    </Stack>

                    <Typography
                      variant="body1"
                      color="text.primary"
                      mb={4}
                      sx={{ fontStyle: 'italic', flexGrow: 1 }}
                    >
                      "{testimonial.content}"
                    </Typography>

                    <Box borderTop={1} borderColor="grey.300" pt={3}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        {testimonial.role} - {testimonial.organization}
                      </Typography>
                      <Chip
                        label={testimonial.serviceCategory}
                        color="primary"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary" textAlign="center" py={8}>
                  Aucun témoignage ne correspond à cette catégorie.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>

      {/* Statistics */}
      <Box sx={{ bgcolor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Nos Résultats
            </Typography>
            <Typography variant="h6" color="text.secondary">
              La satisfaction de nos clients en chiffres
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              { value: '95%', label: 'Taux de satisfaction' },
              { value: '4.8/5', label: 'Note moyenne' },
              { value: '85%', label: 'Recommandent nos services' },
              { value: '92%', label: 'Objectifs atteints' },
            ].map(({ value, label }) => (
              <Grid key={label} item xs={6} md={3}>
                <Box textAlign="center">
                  <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
                    {value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ bgcolor: 'primary.main', py: 10 }}>
        <Container maxWidth="md" textAlign="center" color="primary.contrastText">
          <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
            Rejoignez nos clients satisfaits
          </Typography>
          <Typography variant="h6" color="primary.light" mb={6}>
            Découvrez comment nous pouvons vous accompagner dans votre développement
          </Typography>
          <Button
          onClick={handleLogin}
            variant="contained"
            color="secondary"
            size="large"
            sx={{ fontWeight: 'bold' }}
          >
            Commencer maintenant
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default TestimonialsPage;
