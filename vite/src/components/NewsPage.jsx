import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Paper,
  Divider
} from '@mui/material';
import { CalendarToday as CalendarIcon, FilterList, OpenInNew } from '@mui/icons-material';

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

// French months map for parsing
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

const NewsPage = () => {
  const { loading, error, data } = useQuery(GET_NEWS);
  const [selectedType, setSelectedType] = useState('all');

  if (loading) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography align="center" variant="h6">
          Chargement...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 8 }}>
        <Typography align="center" variant="h6" color="error">
          Une erreur est survenue : {error.message}
        </Typography>
      </Box>
    );
  }

  const news = data?.newsList || [];

  const types = [
    { id: 'all', name: 'Toutes les actualités' },
    { id: 'event', name: 'Événements' },
    { id: 'service', name: 'Services' },
    { id: 'media', name: 'Médias' },
    { id: 'update', name: 'Mises à jour' }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'event': return 'success';
      case 'service': return 'primary';
      case 'media': return 'secondary';
      case 'update': return 'warning';
      default: return 'default';
    }
  };

  const getTypeName = (type) => {
    switch (type) {
      case 'event': return 'Événement';
      case 'service': return 'Service';
      case 'media': return 'Média';
      case 'update': return 'Mise à jour';
      default: return type;
    }
  };

  // Filter news by selected type
  const filteredNews = news.filter(
    (item) => selectedType === 'all' || item.type === selectedType
  );

  // Sort news descending by date (parsed)
  const sortedNews = [...filteredNews].sort((a, b) => {
    const dateA = parseFrenchDate(a.date) ? parseFrenchDate(a.date).getTime() : 0;
    const dateB = parseFrenchDate(b.date) ? parseFrenchDate(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            Actualités
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" maxWidth="md" mx="auto">
            Suivez toutes les nouveautés du cabinet : nouveaux services, événements,
            formations et actualités du secteur.
          </Typography>
        </Container>
      </Box>

      {/* Filter */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', py: 4 }}>
        <Container>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
            <FilterList fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              Filtrer par type :
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {types.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.name}
                </Button>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* News Grid */}
      <Box sx={{ py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            {sortedNews.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Chip
                      label={getTypeName(item.type)}
                      color={getTypeColor(item.type)}
                      size="small"
                    />
                    <Stack direction="row" spacing={0.5} alignItems="center" color="text.secondary">
                      <CalendarIcon fontSize="small" />
                      <Typography variant="caption">
                        {(() => {
                          const parsedDate = parseFrenchDate(item.date);
                          if (!parsedDate || isNaN(parsedDate)) return item.date;
                          return parsedDate.toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          });
                        })()}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="h6" gutterBottom noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.description}
                  </Typography>
                  {item.featured && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" color="primary" fontWeight={500}>
                          Article mis en avant
                        </Typography>
                        <Button
                          size="small"
                          endIcon={<OpenInNew fontSize="small" />}
                          sx={{ textTransform: 'none' }}
                        >
                          Lire plus
                        </Button>
                      </Stack>
                    </>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>

          {sortedNews.length === 0 && (
            <Box textAlign="center" py={6}>
              <Typography variant="h6" color="text.secondary">
                Aucune actualité ne correspond à ce type.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Newsletter CTA */}
      <Box sx={{ bgcolor: 'primary.main', py: 10 }}>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h4" color="primary.contrastText" gutterBottom>
            Restez informé
          </Typography>
          <Typography variant="h6" color="primary.contrastText" mb={4}>
            Inscrivez-vous à notre newsletter pour ne rien manquer de nos actualités
          </Typography>
          <Stack
            direction="row"
            spacing={0}
            justifyContent="center"
            maxWidth="sm"
            mx="auto"
            component="form"
          >
            <TextField
              placeholder="Votre adresse email"
              variant="filled"
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: { bgcolor: 'background.paper', borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                px: 4
              }}
            >
              S'inscrire
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default NewsPage;
