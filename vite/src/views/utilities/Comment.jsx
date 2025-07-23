import React, { useState, useRef } from 'react';
import {
  Box, Typography, Button, IconButton, Modal,
  TextField, CircularProgress, Chip, Stack, Paper,
  Rating, useMediaQuery, useTheme, MenuItem, Select
} from '@mui/material';
import {
  Add as AddIcon, Close as CloseIcon,
  ChevronLeft, ChevronRight, FormatQuote as FormatQuoteIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_ME } from 'graphql/queries';

const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials {
      id name role organization quote serviceCategory rating
    }
  }
`;

const CREATE_TESTIMONIAL = gql`
  mutation CreateTestimonial($input: TestimonialInput!) {
    createTestimonial(input: $input) {
      id name quote
    }
  }
`;

const CARD_WIDTH = 320;

const categories = [
  { id: 'all', name: 'Tous les témoignages' },
  { id: 'coaching', name: 'Coaching' },
  { id: 'formation', name: 'Formation' },
  { id: 'mediation', name: 'Médiation' },
  { id: 'facilitation', name: 'Facilitation' },
];

export default function TestimonialsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const scrollRef = useRef(null);
  const { data: userData } = useQuery(GET_ME);
  const { data, loading, error, refetch } = useQuery(GET_TESTIMONIALS);
  const [createTestimonial] = useMutation(CREATE_TESTIMONIAL);

  const [form, setForm] = useState({
    organization: '',
    quote: '',
    serviceCategory: '',
    rating: 0,
  });
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = data?.testimonials.filter(t =>
    selectedCategory === 'all' || t.serviceCategory === selectedCategory
  ) || [];

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -CARD_WIDTH * 3, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: CARD_WIDTH * 3, behavior: 'smooth' });

  const handleSubmit = async () => {
    if (!form.quote || !form.serviceCategory) {
      return alert("Le témoignage et la catégorie sont requis");
    }
    const user = userData?.me;
    setSubmitting(true);
    try {
      await createTestimonial({
        variables: { input: {
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          organization: form.organization,
          quote: form.quote,
          serviceCategory: form.serviceCategory,
          rating: form.rating,
        }},
      });
      refetch();
      alert('Témoignage ajouté !');
      setForm({ organization: '', quote: '', serviceCategory: '', rating: 0 });
      setOpen(false);
    } catch (err) {
      alert('Erreur : ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f9fafb' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Témoignages Clients</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Ajouter un témoignage
        </Button>
      </Box>

      <Stack direction="row" spacing={2} mb={4} flexWrap="wrap">
        {categories.map(c => (
          <Button
            key={c.id}
            variant={selectedCategory === c.id ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory(c.id)}
          >
            {c.name}
          </Button>
        ))}
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Erreur : {error.message}</Typography>
      ) : (
        <>
          {isMobile ? (
            <Stack spacing={2}>
              {filtered.map(t => <TestimonialCard key={t.id} t={t} />)}
            </Stack>
          ) : (
            <Box position="relative">
              <Box
                ref={scrollRef}
                sx={{
                  display: 'flex',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  gap: 2,
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {filtered.map(t => <TestimonialCard key={t.id} t={t} />)}
              </Box>
              <IconButton onClick={scrollLeft} sx={{ position: 'absolute', top: '40%', left: -20, bgcolor: 'white' }}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={scrollRight} sx={{ position: 'absolute', top: '40%', right: -20, bgcolor: 'white' }}>
                <ChevronRight />
              </IconButton>
            </Box>
          )}
        </>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: 500,
          bgcolor: 'background.paper', borderRadius: 2, p: 4
        }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Ajouter un témoignage</Typography>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <Stack spacing={2}>
            <TextField
              label="Organisation"
              value={form.organization}
              onChange={e => setForm({...form, organization: e.target.value})}
              fullWidth
            />
            <TextField
              label="Témoignage"
              multiline rows={3}
              value={form.quote}
              onChange={e => setForm({...form, quote: e.target.value})}
              fullWidth
            />
            <Select
              value={form.serviceCategory}
              onChange={e => setForm({...form, serviceCategory: e.target.value})}
              displayEmpty fullWidth
            >
              <MenuItem value="">Sélectionner la prestation</MenuItem>
              {categories.filter(c => c.id !== 'all').map(c => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
            <Rating
              value={form.rating}
              onChange={(_, r) => setForm({...form, rating: r})}
            />
            <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : 'Soumettre'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

function TestimonialCard({ t }) {
  return (
    <Paper sx={{
      flex: '0 0 auto', width: CARD_WIDTH, p: 3,
      scrollSnapAlign: 'start', borderRadius: 2
    }} elevation={3}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <FormatQuoteIcon color="primary" />
        <Rating value={t.rating} readOnly size="small" icon={<StarIcon />} emptyIcon={<StarIcon />} />
      </Stack>
      <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 2 }}>
        “{t.quote}”
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold">{t.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {t.role} — {t.organization}
      </Typography>
      <Chip label={t.serviceCategory} size="small" sx={{ mt: 1 }} />
    </Paper>
  );
}
