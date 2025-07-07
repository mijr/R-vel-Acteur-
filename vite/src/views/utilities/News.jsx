import React, { useState } from 'react';
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
} from '@mui/material';

const GET_NEWS = gql`
  query NewsList {
    newsList {
      id
      title
      date
      description
      type
      image
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
    }
  }
`;

const newsTypes = ['Nouveau service', 'Événement', 'Média', 'Formation'];

const NewsSection = () => {
  const { data, loading, error, refetch } = useQuery(GET_NEWS);
  const [createNews] = useMutation(CREATE_NEWS);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    description: '',
    type: '',
    image: '',
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setForm({ title: '', date: '', description: '', type: '', image: '' });
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createNews({ variables: { input: form } });
      await refetch();
      closeModal();
    } catch (err) {
      alert('Erreur lors de la création: ' + err.message);
    }
  };

  console.log('newsList:', data?.newsList); // Debug

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

      <Button variant="contained" color="primary" onClick={openModal} sx={{ mb: 3 }}>
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
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}

      {/* Modal Form */}
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>Créer une nouvelle actualité</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField label="Titre" name="title" fullWidth value={form.title} onChange={handleChange} required />
          <TextField label="Date" name="date" fullWidth value={form.date} onChange={handleChange} placeholder="Ex: 15 juin 2023" required />
          <TextField label="Description" name="description" fullWidth multiline rows={3} value={form.description} onChange={handleChange} required />
          <TextField label="Type" name="type" select fullWidth value={form.type} onChange={handleChange} required>
            {newsTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
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

          {form.image && /^https?:\/\//.test(form.image) && (
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

        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Annuler</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

const NewsCard = ({ news }) => {
  const isUrl = (str) => /^https?:\/\//.test(str);

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '300px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Section Image ou Emoji */}
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {news.image ? (
          isUrl(news.image) ? (
            <img
              src={news.image}
              alt={news.title}
              style={{ maxHeight: '48px', maxWidth: '100%', objectFit: 'contain' }}
              onError={(e) => (e.target.style.display = 'none')}
            />
          ) : (
            <span style={{ fontSize: '2.5rem' }}>{news.image}</span>
          )
        ) : (
          <span style={{ fontSize: '1rem', color: '#cbd5e1' }}>Aucune image</span>
        )}
      </div>

      {/* Titre */}
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '4px',
        }}
      >
        {news.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.95rem',
          color: '#475569',
          lineHeight: '1.5',
        }}
      >
        {news.description}
      </p>

      {/* Infos Date + Type */}
      <div
        style={{
          fontSize: '0.875rem',
          color: '#64748b',
          marginTop: 'auto',
        }}
      >
        <span>
          <strong>📅</strong> {news.date}
        </span>
        <br />
        <span>
          <strong>🏷️</strong> {news.type}
        </span>
      </div>
    </div>
  );
};


export default NewsSection;
