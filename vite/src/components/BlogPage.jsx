import React, { useState } from 'react';
import {
  Box, Typography, Container, TextField, InputAdornment, Select, MenuItem, Grid,
  Card, CardContent, CardActions, Button, Chip, Paper, CircularProgress
} from '@mui/material';
import {
  CalendarToday, AccessTime, Search
} from '@mui/icons-material';
import { Play, Headphones, FileText } from 'lucide-react';
import { gql, useQuery } from '@apollo/client';

const GET_ARTICLES = gql`
  query Articles($keyword: String, $category: String, $type: ContentType, $theme: String) {
    articles(keyword: $keyword, category: $category, type: $type, theme: $theme) {
      id
      title
      content
      category
      type
      mediaUrl
      duration
      theme
      date
      allowDownload
    }
  }
`;

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const buildQueryVariables = () => {
    const vars = {};
    if (selectedCategory !== 'all') vars.category = selectedCategory;
    if (selectedType !== 'all') vars.type = selectedType.toUpperCase(); // matches ENUM
    if (searchTerm.trim()) vars.keyword = searchTerm.trim();
    return vars;
  };

  const { data, loading } = useQuery(GET_ARTICLES, {
    variables: buildQueryVariables()
  });
 console.log(data)
  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'coaching', name: 'Coaching' },
    { id: 'formation', name: 'Formation' },
    { id: 'développement', name: 'Développement' },
    { id: 'médiation', name: 'Médiation' },
  ];

  const contentTypes = [
    { id: 'all', name: 'Tous les formats' },
    { id: 'text', name: 'Articles' },
    { id: 'video', name: 'Vidéos' },
    { id: 'audio', name: 'Podcasts' },
  ];

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'video': return <Play size={16} />;
      case 'audio': return <Headphones size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'video': return { bgcolor: 'error.light', color: 'error.dark' };
      case 'audio': return { bgcolor: 'success.light', color: 'success.dark' };
      default: return { bgcolor: 'primary.light', color: 'primary.dark' };
    }
  };

  const sortedPosts = [...(data?.articles || [])].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
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

      {/* Search & Filters */}
      <Box sx={{ py: 4, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={6} md={3}>
              <Select
                fullWidth
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} md={3}>
              <Select
                fullWidth
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {contentTypes.map(type => (
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
          {loading ? (
            <Box textAlign="center" py={10}>
              <CircularProgress />
            </Box>
          ) : (
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

                      {post.mediaUrl && (post.type === 'VIDEO' || post.type === 'AUDIO') && (
                        <Paper
                          elevation={0}
                          sx={{ mt: 2, p: 2, bgcolor: 'grey.100', textAlign: 'center' }}
                        >
                          {post.type === 'VIDEO' ? (
                            <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                              <iframe
                                src={post.mediaUrl.replace("watch?v=", "embed/")}
                                title={post.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  border: 'none'
                                }}
                              />
                            </Box>
                          ) : (
                            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                              <Headphones size={20} />
                              <Typography variant="body2" color="text.secondary">
                                <a href={post.mediaUrl} target="_blank" rel="noopener noreferrer">
                                  Écouter le podcast
                                </a>
                              </Typography>
                            </Box>
                          )}
                        </Paper>
                      )}


                      <Box display="flex" justifyContent="space-between" mt={3} color="text.secondary" fontSize={14}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <CalendarToday sx={{ fontSize: 16 }} />
                          {new Date(post.date).toLocaleDateString('fr-FR')}
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <AccessTime sx={{ fontSize: 16 }} />
                          {post.duration ? `${post.duration} min` : '—'}
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
          )}

          {!loading && sortedPosts.length === 0 && (
            <Box textAlign="center" py={10}>
              <Typography variant="h6" color="text.secondary">
                Aucun article ne correspond à votre recherche.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default BlogPage;
