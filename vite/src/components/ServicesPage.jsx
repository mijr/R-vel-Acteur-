import React, { useState, useRef } from 'react';
import {
  Filter,
  Users,
  Building,
  User,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  Grid,
  Paper,
  InputLabel,
  FormControl,
  Stack,
  Chip,
} from '@mui/material';
import { services } from '../data/mockData';

const ServicesPage = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAudience, setSelectedAudience] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les services', icon: null },
    { id: 'coaching', name: 'Coaching', icon: User },
    { id: 'formation', name: 'Formation', icon: Users },
    { id: 'mediation', name: 'Médiation', icon: Heart },
    { id: 'facilitation', name: 'Facilitation', icon: Building },
    { id: 'art', name: 'Art & Créativité', icon: Heart },
  ];

  const audiences = [
    { id: 'all', name: 'Tous les publics' },
    { id: 'particuliers', name: 'Particuliers' },
    { id: 'entreprises', name: 'Entreprises' },
    { id: 'equipes', name: 'Équipes' },
    { id: 'organisations', name: 'Organisations' },
  ];

  const filteredServices = services.filter((service) => {
    const categoryMatch =
      selectedCategory === 'all' || service.category === selectedCategory;
    const audienceMatch =
      selectedAudience === 'all' ||
      service.targetAudience.some((audience) =>
        audience.toLowerCase().includes(selectedAudience.toLowerCase())
      );
    return categoryMatch && audienceMatch;
  });

  const getCategoryIcon = (category) => {
    const categoryData = categories.find((c) => c.id === category);
    if (!categoryData || !categoryData.icon) return null;
    const Icon = categoryData.icon;
    return <Icon size={20} />;
  };

  const scrollContainerRef = useRef(null);

  // Scroll handler
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Scroll by width of 3 cards + gaps (320 * 3 + 32 * 2)
    const scrollAmount = direction === 'left' ? -(320 * 3 + 32 * 2) : 320 * 3 + 32 * 2;

    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" mb={2}>
          Nos Prestations
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
          Découvrez notre gamme complète de services d'accompagnement professionnel,&nbsp;
          adaptés à vos besoins spécifiques et conçus pour révéler votre potentiel.
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ bgcolor: 'background.paper', py: 4, borderBottom: 1, borderColor: 'divider' }}>
        <Box
          maxWidth={1200}
          mx="auto"
          px={2}
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          gap={3}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Category Filter */}
          <Box flex={1}>
            <Box display="flex" alignItems="center" mb={1}>
              <Filter size={18} style={{ marginRight: 6, color: '#6b7280' }} />
              <Typography variant="subtitle1" color="text.secondary">
                Filtrer par catégorie
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {categories.map((category) => (
                <Grid item key={category.id}>
                  <Button
                    variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                    onClick={() => setSelectedCategory(category.id)}
                    startIcon={category.icon ? <category.icon size={18} /> : null}
                    sx={{ textTransform: 'none', minWidth: 120 }}
                  >
                    {category.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Audience Filter */}
          <Box width={{ xs: '100%', lg: 240 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="audience-select-label">Public cible</InputLabel>
              <Select
                labelId="audience-select-label"
                value={selectedAudience}
                label="Public cible"
                onChange={(e) => setSelectedAudience(e.target.value)}
              >
                {audiences.map((audience) => (
                  <MenuItem key={audience.id} value={audience.id}>
                    {audience.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Services Grid with horizontal scroll and chevrons */}
      <Box sx={{ py: 8 }}>
        <Box maxWidth={1200} mx="auto" px={2} position="relative">
          {/* Left Chevron */}
          <Button
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              zIndex: 10,
              minWidth: 36,
              minHeight: 36,
              borderRadius: '50%',
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': { bgcolor: 'grey.200' },
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </Button>

          {/* Services Container */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: 3,
              px: 6, // padding so chevrons don't cover content
              scrollbarWidth: 'none', // Firefox
              '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
            }}
          >
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <Paper
                  key={service.id}
                  elevation={3}
                  sx={{
                    flex: '0 0 320px', // fixed width for 3 items visible
                    scrollSnapAlign: 'start',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-6px)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box
                      sx={{
                        bgcolor: 'primary.light',
                        borderRadius: 1,
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        width: 40,
                        height: 40,
                      }}
                    >
                      {getCategoryIcon(service.category)}
                    </Box>
                    <Typography variant="h6" fontWeight="600" noWrap>
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" mb={2} flexGrow={1} sx={{ minHeight: 60 }}>
                    {service.description}
                  </Typography>

                  <Box mb={2}>
                    <Typography fontWeight="medium" gutterBottom>
                      Méthodologie
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 50 }}>
                      {service.methodology}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography fontWeight="medium" gutterBottom>
                      Public cible
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {service.targetAudience.map((audience, i) => (
                        <Chip
                          key={i}
                          label={audience}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mb: 0.5 }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Box
                    mt="auto"
                    pt={2}
                    borderTop={1}
                    borderColor="divider"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography color="primary" fontWeight="bold">
                      {service.pricing}
                    </Typography>
                    <Button
                      endIcon={<ArrowRight size={18} />}
                      variant="text"
                      color="primary"
                      onClick={() => onNavigate('appointment')}
                      sx={{ textTransform: 'none' }}
                    >
                      Contact
                    </Button>
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography
                align="center"
                color="text.secondary"
                variant="h6"
                py={6}
                sx={{ width: '100%' }}
              >
                Aucun service ne correspond aux critères sélectionnés.
              </Typography>
            )}
          </Box>

          {/* Right Chevron */}
          <Button
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              zIndex: 10,
              minWidth: 36,
              minHeight: 36,
              borderRadius: '50%',
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': { bgcolor: 'grey.200' },
            }}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </Button>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          textAlign: 'center',
          py: 6,
          px: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          Vous souhaitez en savoir plus ?
        </Typography>
        <Typography variant="subtitle1" maxWidth={600} mx="auto" mb={3}>
          Contactez-nous pour un accompagnement personnalisé adapté à vos besoins.
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => onNavigate('appointment')}
        >
          Prenez rendez-vous
        </Button>
      </Box>
    </Box>
  );
};

export default ServicesPage;
