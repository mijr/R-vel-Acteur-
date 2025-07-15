import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  CircularProgress,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
  Collapse
} from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import Download from '@mui/icons-material/Download';
import Send from '@mui/icons-material/Send';
import Add from '@mui/icons-material/Add';
import { ExpandLess as ChevronUp, ExpandMore as ChevronDown } from '@mui/icons-material';
import MessageSquare from '@mui/icons-material/Message';
import Film from '@mui/icons-material/Movie';
import Headphones from '@mui/icons-material/Headphones';
import FileText from '@mui/icons-material/Article';
import Calendar from '@mui/icons-material/CalendarToday';
import User from '@mui/icons-material/Person';

import Container from '@mui/material/Container';

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


const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: ArticleInput!) {
    createArticle(input: $input) {
      id
      title
    }
  }
`;

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id)
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
      id
      userName
      message
      date
    }
  }
`;

export default function BlogSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [filters, setFilters] = useState({
  keyword: '',
  category: '',
  type: undefined,
  theme: ''
});

const buildQueryVariables = () => {
  const vars = { ...filters };
  if (!vars.type) delete vars.type;
  if (!vars.keyword) delete vars.keyword;
  if (!vars.category) delete vars.category;
  if (!vars.theme) delete vars.theme;
  return vars;
};
  const [createForm, setCreateForm] = useState({
    title: '', content: '', category: '', type: 'TEXT', mediaUrl: '', duration: '', theme: '', date: '', allowDownload: false
  });
  const [openModal, setOpenModal] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState({});

  const { data, loading, refetch } = useQuery(GET_ARTICLES, {
    variables: buildQueryVariables()
    });
  const [createArticle] = useMutation(CREATE_ARTICLE, {
    onCompleted: () => {
      setOpenModal(false);
      setCreateForm({
        title: '', content: '', category: '', type: 'TEXT', mediaUrl: '', duration: '', theme: '', date: '', allowDownload: false
      });
      refetch();
    }
  });
  const [deleteArticle] = useMutation(DELETE_ARTICLE, { onCompleted: () => refetch() });

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const toggleArticle = (articleId) => {
    setExpandedArticles(prev => ({
      ...prev,
      [articleId]: !prev[articleId]
    }));
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'VIDEO': return <Film color="primary" />;
      case 'AUDIO': return <Headphones color="primary" />;
      default: return <FileText color="primary" />;
    }
  };

  return (
    <Box sx={{ 
      py: { xs: 4, md: 6 },
      bgcolor: 'background.default'
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2
        }}>
          <Typography variant={isMobile ? 'h4' : 'h3'} fontWeight="bold">
            Blogs & <Box component="span" color="primary.main">Ressources</Box>
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={() => setOpenModal(true)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            New Blog
          </Button>
        </Box>

        {/* Filters */}
        <Paper elevation={0} sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3
        }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
            Filter Articles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField 
                label="Keyword" 
                name="keyword" 
                fullWidth 
                size="small"
                value={filters.keyword} 
                onChange={handleFilterChange} 
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField 
                label="Category" 
                name="category" 
                fullWidth 
                size="small"
                value={filters.category} 
                onChange={handleFilterChange} 
              />
            </Grid>
            <Grid item xs={12} md={3}>
             <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                    name="type"
                    value={filters.type || ''}
                    label="Type"
                    onChange={(e) => {
                    const value = e.target.value;
                    setFilters({ ...filters, type: value === '' ? undefined : value });
                    }}
                >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="TEXT">Text</MenuItem>
                    <MenuItem value="VIDEO">Video</MenuItem>
                    <MenuItem value="AUDIO">Audio</MenuItem>
                </Select>
                </FormControl>

            </Grid>
            <Grid item xs={12} md={3}>
              <TextField 
                label="Theme" 
                name="theme" 
                fullWidth 
                size="small"
                value={filters.theme} 
                onChange={handleFilterChange} 
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Article List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {data?.articles?.map((article) => (
              <Grid item xs={12} key={article.id}>
                <Card elevation={0} sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  overflow: 'hidden'
                }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      p: 3,
                      cursor: 'pointer',
                      bgcolor: expandedArticles[article.id] ? 'primary.light' : 'background.paper',
                      color: expandedArticles[article.id] ? 'primary.contrastText' : 'inherit',
                      transition: 'background-color 0.3s'
                    }}
                    onClick={() => toggleArticle(article.id)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ 
                        bgcolor: expandedArticles[article.id] ? 'background.paper' : 'primary.light',
                        color: expandedArticles[article.id] ? 'primary.main' : 'primary.contrastText'
                      }}>
                        {getTypeIcon(article.type)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">{article.title}</Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          <Chip 
                            label={article.category} 
                            size="small" 
                            variant="outlined" 
                            color={expandedArticles[article.id] ? 'secondary' : 'default'}
                          />
                          <Chip 
                            icon={<Calendar fontSize="small" />}
                            label={article.date} 
                            size="small" 
                            variant="outlined" 
                            color={expandedArticles[article.id] ? 'secondary' : 'default'}
                          />
                        </Stack>
                      </Box>
                    </Box>
                    {expandedArticles[article.id] ? <ChevronUp /> : <ChevronDown />}
                  </Box>

                  <Collapse in={expandedArticles[article.id]}>
                    <CardContent>
                      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                        {article.content}
                      </Typography>

                      {article.type !== 'TEXT' && article.mediaUrl && (
                        <Box sx={{ 
                          mb: 3,
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: '1px solid',
                          borderColor: 'divider'
                        }}>
                          {article.type === 'VIDEO' ? (
                            <video controls width="100%">
                              <source src={article.mediaUrl} type="video/mp4" />
                            </video>
                          ) : (
                            <audio controls style={{ width: '100%', padding: 8 }}>
                              <source src={article.mediaUrl} type="audio/mpeg" />
                            </audio>
                          )}
                        </Box>
                      )}

                      {article.allowDownload && article.mediaUrl && (
                        <Button 
                          startIcon={<Download />} 
                          href={article.mediaUrl} 
                          download 
                          variant="outlined"
                          sx={{ mb: 3 }}
                        >
                          Download Resource
                        </Button>
                      )}

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button 
                          variant="outlined" 
                          color="error" 
                          startIcon={<Delete />} 
                          onClick={() => deleteArticle({ variables: { id: article.id } })}
                        >
                          Delete Article
                        </Button>
                      </Box>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Create Article Modal */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="md">
          <DialogTitle sx={{ 
            bgcolor: 'primary.main', 
            color: 'primary.contrastText',
            fontWeight: 'bold'
          }}>
            Create New Article
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField 
                  label="Title" 
                  fullWidth 
                  size="small"
                  value={createForm.title} 
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  label="Category" 
                  fullWidth 
                  size="small"
                  value={createForm.category} 
                  onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Content" 
                  fullWidth 
                  multiline 
                  rows={4} 
                  size="small"
                  value={createForm.content} 
                  onChange={(e) => setCreateForm({ ...createForm, content: e.target.value })} 
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Type</InputLabel>
                  <Select 
                    value={createForm.type} 
                    onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                  >
                    <MenuItem value="TEXT">Text</MenuItem>
                    <MenuItem value="VIDEO">Video</MenuItem>
                    <MenuItem value="AUDIO">Audio</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField 
                  label="Media URL" 
                  fullWidth 
                  size="small"
                                    value={createForm.mediaUrl}
                  onChange={(e) => setCreateForm({ ...createForm, mediaUrl: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField 
                  label="Duration" 
                  fullWidth 
                  size="small"
                  value={createForm.duration}
                  onChange={(e) => setCreateForm({ ...createForm, duration: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  label="Theme" 
                  fullWidth 
                  size="small"
                  value={createForm.theme}
                  onChange={(e) => setCreateForm({ ...createForm, theme: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  label="Date" 
                  type="date"
                  fullWidth 
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  value={createForm.date}
                  onChange={(e) => setCreateForm({ ...createForm, date: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel shrink>Allow Download</InputLabel>
                  <Select
                    value={createForm.allowDownload ? 'yes' : 'no'}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        allowDownload: e.target.value === 'yes'
                      })
                    }
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button 
                variant="contained" 
                onClick={() => {
                    const preparedInput = {
                    ...createForm,
                    duration: createForm.duration ? parseInt(createForm.duration, 10) : null
                    };
                    createArticle({ variables: { input: preparedInput } });
                }}
                disabled={!createForm.title || !createForm.content}
                >
                Submit
                </Button>

          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
