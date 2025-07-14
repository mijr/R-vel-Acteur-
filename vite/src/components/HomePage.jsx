import React, { useRef, useState } from 'react'; 
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  ArrowRight,
  CheckCircle,
  Users,
  Target,
  Heart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import StarIcon from '@mui/icons-material/Star';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { services, testimonials } from '../data/mockData'; // Keep your static mock data for services & testimonials

const CARD_WIDTH = 320;
const SCROLL_STEP = CARD_WIDTH * 3;

const GET_NEWS = gql`
  query NewsList {
    newsList {
      id
      title
      date
      description
      type
      image
      featured
    }
  }
`;
const frenchMonths = {
  janvier: 1,
  février: 2,
  mars: 3,
  avril: 4,
  mai: 5,
  juin: 6,
  juillet: 7,
  août: 8,
  septembre: 9,
  octobre: 10,
  novembre: 11,
  décembre: 12,
};

function parseFrenchDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.toLowerCase().split(' ');
  if (parts.length !== 3) return null;
  const day = parts[0];
  const month = frenchMonths[parts[1]];
  const year = parts[2];
  if (!month) return null;
  return new Date(`${year}-${month.toString().padStart(2, '0')}-${day.padStart(2, '0')}`);
}
const HomePage = ({ onNavigate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scrollRef = useRef(null);
   const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_NEWS);
    const itemsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);

  const canGoLeft = startIndex > 0;
  const canGoRight = startIndex + itemsPerPage < testimonials.length;

  const handleLeftClick = () => {
    if (canGoLeft) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleRightClick = () => {
    if (canGoRight) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
    }
  };

  const handleLogin = () => navigate('/pages/login');
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          bgcolor: 'background.paper',
          backgroundImage:
            'linear-gradient(to bottom, rgba(240, 249, 255, 0.8), rgba(255, 255, 255, 1))',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            fontWeight="bold"
            gutterBottom
            sx={{ lineHeight: 1.2, mb: 3 }}
          >
            Révélez votre <Box component="span" color="primary.main">potentiel</Box>
          </Typography>
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            color="text.secondary"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              mb: 4,
              fontSize: isMobile ? '1.1rem' : '1.25rem',
            }}
          >
            Accompagnement professionnel en coaching, formation et médiation. Développez vos compétences et celles de vos équipes avec des méthodes éprouvées.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowRight size={20} />}
              onClick={handleLogin}
              sx={{ px: 4, py: 1.5 }}
            >
              Prendre rendez-vous
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => onNavigate('services')}
              sx={{ px: 4, py: 1.5 }}
            >
              Découvrir nos services
            </Button>
          </Stack>
          {!isMobile && (
            <Box
              sx={{
                mt: 6,
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              {['Coaching', 'Formation', 'Médiation'].map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: 1, fontWeight: 500 }}
                />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Statistics Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <Users size={isMobile ? 36 : 48} color={theme.palette.primary.main} />,
                label: '500+',
                sub: 'Clients accompagnés',
              },
              {
                icon: <Target size={isMobile ? 36 : 48} color={theme.palette.primary.main} />,
                label: '95%',
                sub: 'Taux de satisfaction',
              },
              {
                icon: <Heart size={isMobile ? 36 : 48} color={theme.palette.primary.main} />,
                label: '10+',
                sub: "Années d'expérience",
              },
            ].map((stat, idx) => (
              <Grid item xs={6} sm={4} key={idx} textAlign="center">
                <Box mb={2}>{stat.icon}</Box>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  {stat.label}
                </Typography>
                <Typography color="text.secondary" variant="subtitle1">
                  {stat.sub}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            sx={{ mb: 4 }}
          >
            Nos services
          </Typography>

          {!isMobile ? (
            <Box sx={{ position: 'relative' }}>
              <Box
                ref={scrollRef}
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  scrollBehavior: 'smooth',
                  gap: 3,
                  pb: 1,
                  '&::-webkit-scrollbar': { display: 'none' },
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                }}
              >
                {services.map((service) => (
                  <Paper
                    key={service.id}
                    sx={{
                      flex: '0 0 auto',
                      width: CARD_WIDTH,
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 3,
                      bgcolor: 'background.default',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': { boxShadow: 6 },
                    }}
                    onClick={() => onNavigate('serviceDetails', { serviceId: service.id })}
                    tabIndex={0}
                  >
                    <Chip
                      label={
                        service.category.charAt(0).toUpperCase() +
                        service.category.slice(1)
                      }
                      size="small"
                      color={
                        {
                          coaching: 'secondary',
                          formation: 'success',
                          mediation: 'warning',
                          facilitation: 'info',
                          art: 'error',
                        }[service.category] || 'default'
                      }
                      sx={{ mb: 1, alignSelf: 'flex-start' }}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flexGrow: 1, mb: 1 }}
                    >
                      {service.description.length > 120
                        ? service.description.slice(0, 120) + '...'
                        : service.description}
                    </Typography>
                    <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                      {service.targetAudience.slice(0, 3).map((aud, i) => (
                        <Chip
                          key={i}
                          label={aud}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: 11 }}
                        />
                      ))}
                    </Stack>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 2, fontWeight: '600' }}
                    >
                      {service.pricing}
                    </Typography>
                    <Button
                      size="small"
                      endIcon={<ArrowRight size={16} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('serviceDetails', { serviceId: service.id });
                      }}
                    >
                      En savoir plus
                    </Button>
                  </Paper>
                ))}
              </Box>

              <IconButton
                onClick={scrollLeft}
                aria-label="Scroll services left"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: -40,
                  transform: 'translateY(-50%)',
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                  '&:hover': { bgcolor: 'background.default' },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={scrollRight}
                aria-label="Scroll services right"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: -40,
                  transform: 'translateY(-50%)',
                  bgcolor: 'background.paper',
                  boxShadow: 2,
                  '&:hover': { bgcolor: 'background.default' },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          ) : (
            <Box>
              <Stack spacing={3}>
                {services.slice(0, 3).map((service) => (
                  <Paper
                    key={service.id}
                    sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}
                    onClick={() => onNavigate('serviceDetails', { serviceId: service.id })}
                    tabIndex={0}
                  >
                    <Chip
                      label={
                        service.category.charAt(0).toUpperCase() +
                        service.category.slice(1)
                      }
                      size="small"
                      color={
                        {
                          coaching: 'secondary',
                          formation: 'success',
                          mediation: 'warning',
                          facilitation: 'info',
                          art: 'error',
                        }[service.category] || 'default'
                      }
                      sx={{ mb: 1, alignSelf: 'flex-start' }}
                    />
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {service.description.length > 100
                        ? service.description.slice(0, 100) + '...'
                        : service.description}
                    </Typography>
                    <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                      {service.targetAudience.slice(0, 3).map((aud, i) => (
                        <Chip
                          key={i}
                          label={aud}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: 11 }}
                        />
                      ))}
                    </Stack>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1, fontWeight: '600' }}
                    >
                      {service.pricing}
                    </Typography>
                    <Button
                      size="small"
                      endIcon={<ArrowRight size={16} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('serviceDetails', { serviceId: service.id });
                      }}
                    >
                      En savoir plus
                    </Button>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </Container>
      </Box>

      {/* Latest News Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            textAlign="center"
            sx={{ mb: 6 }}
          >
            Actualités récentes
          </Typography>

          {loading && (
            <Typography align="center" sx={{ mb: 4 }}>
              Chargement des actualités...
            </Typography>
          )}
          {error && (
            <Typography color="error" align="center" sx={{ mb: 4 }}>
              Erreur lors du chargement des actualités.
            </Typography>
          )}

          {!loading && !error && data?.newsList?.length === 0 && (
            <Typography align="center" sx={{ mb: 4 }}>
              Aucune actualité disponible pour le moment.
            </Typography>
          )}

          {!loading && !error && data?.newsList?.length > 0 && (
            <Grid container spacing={4} justifyContent="center">
              {data.newsList.map(({ id, title, description, date }) => (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      boxShadow: 3,
                      cursor: 'pointer',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      '&:hover': { boxShadow: 6 },
                    }}
                    onClick={() => onNavigate('blogPost', { postId: id })}
                    tabIndex={0}
                  >
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      fontWeight="600"
                      sx={{ mb: 1 }}
                    >
                         {(() => {
                          const parsedDate = parseFrenchDate(date);
                          if (!parsedDate || isNaN(parsedDate)) return date;
                          return parsedDate.toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          });
                        })()}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ flexGrow: 1, mb: 2 }}
                    >
                      {description.length > 120
                        ? description.slice(0, 120) + '...'
                        : description}
                    </Typography>
                    <Button
                      size="small"
                      endIcon={<ArrowRight size={16} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('blogPost', { postId: id });
                      }}
                    >
                      Lire la suite
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* Testimonials Section */}
     <Box sx={{ position: 'relative', width: '100%', px: 2 }}>
      {/* Left Arrow */}
      <IconButton
        onClick={handleLeftClick}
        disabled={!canGoLeft}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
        aria-label="Previous testimonials"
      >
        <ChevronLeft fontSize="large" />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={handleRightClick}
        disabled={!canGoRight}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
        aria-label="Next testimonials"
      >
        <ChevronRight fontSize="large" />
      </IconButton>

      <Grid container spacing={4} justifyContent="center">
        {visibleTestimonials.map(({ id, name, role, organization, content, rating }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                “{content}”
              </Typography>

              {/* Rating stars */}
              <Box sx={{ mb: 1 }}>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    fontSize="small"
                    color={i < rating ? 'primary' : 'disabled'}
                    sx={{ mr: 0.5 }}
                  />
                ))}
              </Box>

              <Typography
                variant="subtitle2"
                fontWeight="600"
                color="text.secondary"
                align="right"
              >
                - {name}, {role} @ {organization}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 8,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Prêt à passer à l'action ?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Contactez-nous pour un accompagnement personnalisé.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => onNavigate('contact')}
          >
            Contactez-nous
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
