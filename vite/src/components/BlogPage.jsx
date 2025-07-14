import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Paper,
} from '@mui/material';
import {
  CalendarToday,
  AccessTime,
  Search,
} from '@mui/icons-material';
import { Play, Headphones, FileText } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'coaching', name: 'Coaching' },
    { id: 'formation', name: 'Formation' },
    { id: 'développement', name: 'Développement' },
    { id: 'médiation', name: 'Médiation' },
  ];

  const contentTypes = [
    { id: 'all', name: 'Tous les formats' },
    { id: 'article', name: 'Articles' },
    { id: 'video', name: 'Vidéos' },
    { id: 'podcast', name: 'Podcasts' },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Play size={16} />;
      case 'podcast': return <Headphones size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return { bgcolor: 'error.light', color: 'error.dark' };
      case 'podcast': return { bgcolor: 'success.light', color: 'success.dark' };
      default: return { bgcolor: 'primary.light', color: 'primary.dark' };
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === 'all' || post.category === selectedCategory;
    const typeMatch = selectedType === 'all' || post.type === selectedType;
    const searchMatch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && typeMatch && searchMatch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Blog
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            Découvrez nos articles, vidéos et podcasts sur le développement personnel,
            le coaching et la gestion d'équipe.
          </Typography>
        </Container>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ py: 4, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6} md={3} lg={3}>
              <Select
                fullWidth
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={6} md={3} lg={3}>
              <Select
                fullWidth
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {contentTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Blog Grid */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {sortedPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Box display="flex" gap={1} alignItems="center">
                        <Chip
                          label={
                            <Box display="flex" alignItems="center" gap={0.5}>
                              {getTypeIcon(post.type)}
                              {post.type}
                            </Box>
                          }
                          size="small"
                          sx={{ ...getTypeColor(post.type), textTransform: 'capitalize' }}
                        />
                        <Chip label={post.category} size="small" variant="outlined" />
                      </Box>
                    </Box>

                    <Typography variant="h6" gutterBottom noWrap>
                      {post.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {post.excerpt}
                    </Typography>

                    {post.mediaUrl && (
                      <Paper
                        elevation={0}
                        sx={{ mt: 2, p: 2, bgcolor: 'grey.100', textAlign: 'center' }}
                      >
                        <Box display="flex" alignItems="center" justifyContent="center" color="grey.600">
                          {post.type === 'video' && <Play size={20} />}
                          {post.type === 'podcast' && <Headphones size={20} />}
                          <Typography variant="body2" ml={1}>
                            {post.type === 'video' ? 'Vidéo disponible' : 'Podcast disponible'}
                          </Typography>
                        </Box>
                      </Paper>
                    )}

                    <Box display="flex" justifyContent="space-between" mt={3} color="text.secondary" fontSize={14}>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <CalendarToday sx={{ fontSize: 16 }} />
                        {new Date(post.publishDate).toLocaleDateString('fr-FR')}
                      </Box>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AccessTime sx={{ fontSize: 16 }} />
                        {post.readTime}
                      </Box>
                    </Box>
                  </CardContent>

                  <CardActions>
                    <Button fullWidth variant="contained" color="primary">
                      Lire l'article
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {sortedPosts.length === 0 && (
            <Box textAlign="center" py={10}>
              <Typography variant="h6" color="text.secondary">
                Aucun article ne correspond à votre recherche.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Newsletter CTA */}
      <Box sx={{ py: 8, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ne manquez rien de nos publications
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Recevez nos derniers articles directement dans votre boîte email
          </Typography>
          <Box display="flex" maxWidth={400} mx="auto">
            <TextField
              variant="filled"
              placeholder="Votre adresse email"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ borderRadius: '8px 0 0 8px', bgcolor: 'white' }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                borderRadius: '0 8px 8px 0',
                fontWeight: 'bold',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              S'abonner
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default BlogPage;
