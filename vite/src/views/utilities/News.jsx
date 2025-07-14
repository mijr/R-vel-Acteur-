import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

const CREATE_NEWS = gql`
  mutation CreateNews($input: CreateNewsInput!) {
    createNews(input: $input) {
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

const UPDATE_NEWS = gql`
  mutation UpdateNews($input: UpdateNewsInput!) {
    updateNews(input: $input) {
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

const DELETE_NEWS = gql`
  mutation DeleteNews($id: ID!) {
    deleteNews(id: $id)
  }
`;

const newsTypes = [
  { label: 'Nouveau service', value: 'service' },
  { label: 'Événement', value: 'event' },
  { label: 'Média', value: 'media' },
  { label: 'Formation', value: 'training' },
];

const NewsSection = () => {
  const { data, loading, error, refetch } = useQuery(GET_NEWS);

  const [createNews] = useMutation(CREATE_NEWS);
  const [updateNews] = useMutation(UPDATE_NEWS);
  const [deleteNews] = useMutation(DELETE_NEWS);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const emptyForm = {
    id: '',
    title: '',
    date: '',
    description: '',
    type: '',
    image: '',
    featured: false,
  };

  const [form, setForm] = useState(emptyForm);

  const openModalForCreate = () => {
    setForm(emptyForm);
    setIsEditMode(false);
    setModalOpen(true);
  };

  const openModalForEdit = (news) => {
    setForm({
      id: news.id,
      title: news.title,
      date: news.date,
      description: news.description,
      type: news.type,
      image: news.image || '',
      featured: news.featured,
    });
    setIsEditMode(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setForm(emptyForm);
    setIsEditMode(false);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await updateNews({ variables: { input: form } });
      } else {
        const { id, ...input } = form; // Remove id for create
        await createNews({ variables: { input } });
      }
      await refetch();
      closeModal();
    } catch (err) {
      alert('Erreur lors de la sauvegarde : ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette actualité ?')) return;

    try {
      await deleteNews({ variables: { id } });
      await refetch();
    } catch (err) {
      alert('Erreur lors de la suppression : ' + err.message);
    }
  };

  const isUrl = (str) => /^https?:\/\//.test(str);

  return (
    <section
      id="actualités"
      style={{
        padding: '80px 20px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f8fafc',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: '16px',
          color: '#1e293b',
          fontWeight: '700',
        }}
      >
        Actualités
      </h2>

      <Button variant="contained" color="primary" onClick={openModalForCreate} sx={{ mb: 3 }}>
        Créer Actualité
      </Button>

      <p
        style={{
          maxWidth: '700px',
          margin: '0 auto 40px auto',
          color: '#64748b',
          fontSize: '1.125rem',
          lineHeight: '1.6',
        }}
      >
        Découvrez nos dernières nouvelles et événements à venir
      </p>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Erreur : {error.message}</Typography>
      ) : data?.newsList?.length === 0 ? (
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Aucune actualité disponible.
        </Typography>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {data.newsList.map((news) => (
            <NewsCard
              key={news.id}
              news={news}
              onEdit={() => openModalForEdit(news)}
              onDelete={() => handleDelete(news.id)}
            />
          ))}
        </div>
      )}

      {/* Modal Form */}
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? 'Modifier une actualité' : 'Créer une nouvelle actualité'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Titre"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Date"
            name="date"
            fullWidth
            value={form.date}
            onChange={handleChange}
            placeholder="Ex: 2024-01-20"
            required
          />
          <TextField
            label="Contenu"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={form.description}
            onChange={handleChange}
            required
          />
          <TextField
            label="Type"
            name="type"
            select
            fullWidth
            value={form.type}
            onChange={handleChange}
            required
          >
            {newsTypes.map(({ label, value }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Image (emoji ou URL)"
            name="image"
            fullWidth
            value={form.image}
            onChange={handleChange}
            placeholder="Ex: 📝 ou https://..."
            sx={{ mb: 1 }}
          />

          <Typography variant="body2" sx={{ mt: 1 }}>
            ou téléversez une image :
          </Typography>

          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Choisir un fichier
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setForm((prev) => ({ ...prev, image: url }));
                }
              }}
            />
          </Button>

          {form.image && isUrl(form.image) && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="caption">Aperçu :</Typography>
              <Box
                component="img"
                src={form.image}
                alt="Preview"
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  mt: 1,
                }}
              />
            </Box>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={form.featured}
                onChange={handleCheckboxChange}
                name="featured"
              />
            }
            label="Mettre en avant"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditMode ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

const NewsCard = ({ news, onEdit, onDelete }) => {
  return (
    <Box
      sx={{
        maxWidth: 320,
        p: 2,
        boxShadow: '0 4px 6px rgb(0 0 0 / 0.1)',
        borderRadius: 2,
        backgroundColor: '#fff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: '700', color: news.featured ? '#059669' : '#94a3b8' }}
      >
        {news.type.toUpperCase()}
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {news.title}
      </Typography>

      <Typography variant="body2" sx={{ color: '#475569', flexGrow: 1, whiteSpace: 'pre-line' }}>
        {news.description}
      </Typography>

      {news.image && (
        <Box
          sx={{
            fontSize: news.image.length === 1 ? '2rem' : '1rem',
            mt: 1,
          }}
        >
          {news.image.length === 1 ? (
            <span aria-label="emoji">{news.image}</span>
          ) : (
            <img
              src={news.image}
              alt="news"
              style={{ maxWidth: '100%', borderRadius: '4px' }}
              loading="lazy"
            />
          )}
        </Box>
      )}

      <Typography
        variant="caption"
        sx={{ color: '#94a3b8', mt: 1, textAlign: 'right' }}
      >
        {news.date}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 1, justifyContent: 'flex-end' }}>
        <IconButton size="small" color="primary" onClick={onEdit} aria-label="Modifier">
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={onDelete} aria-label="Supprimer">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default NewsSection;
