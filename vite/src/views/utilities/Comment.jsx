import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { motion } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Modal,
  Card,
  CardContent,
  CardHeader,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { GET_ME } from 'graphql/queries'; // Assure-toi que le chemin est correct

// GraphQL
const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials {
      id
      name
      role
      organization
      quote
      typeDePrestation
    }
  }
`;

const CREATE_TESTIMONIAL = gql`
  mutation CreateTestimonial($input: TestimonialInput!) {
    createTestimonial(input: $input) {
      id
      name
      quote
    }
  }
`;

const TestimonialsPage = () => {
  const { data: userData } = useQuery(GET_ME);
  const { data, loading, error, refetch } = useQuery(GET_TESTIMONIALS);
  const [createTestimonial] = useMutation(CREATE_TESTIMONIAL);

  const [form, setForm] = useState({
    organization: '',
    quote: '',
    typeDePrestation: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { quote, organization, typeDePrestation } = form;
    if (!quote) return alert("Le témoignage est requis");

    const user = userData?.me;
    const name = `${user.firstName} ${user.lastName}`;
    const role = user.role;

    setSubmitting(true);
    try {
      await createTestimonial({
        variables: {
          input: {
            name,
            role,
            quote,
            organization,
            typeDePrestation
          }
        }
      });
      await refetch();
      alert("Témoignage ajouté !");
      setForm({ organization: '', quote: '', typeDePrestation: '' });
      setOpen(false);
    } catch (err) {
      alert("Erreur : " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 1200,
        margin: '40px auto',
        padding: 20,
        background: '#f8fafc',
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Témoignages Clients</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Ajouter un témoignage
        </Button>
      </Box>

      {/* Affichage des témoignages */}
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Erreur : {error.message}</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={3}>
          {data.testimonials.map((t) => (
            <Card key={t.id} sx={{ width: 300, background: '#fff', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="body2" fontStyle="italic" color="text.secondary">
                  “{t.quote}”
                </Typography>
              </CardContent>
              <CardHeader
                title={t.name}
                subheader={
                  <>
                    {t.role && <Typography variant="body2">{t.role}</Typography>}
                    {t.organization && <Typography variant="body2">{t.organization}</Typography>}
                    {t.typeDePrestation && (
                      <Typography variant="caption" color="text.secondary">
                        Prestation : {t.typeDePrestation}
                      </Typography>
                    )}
                  </>
                }
              />
            </Card>
          ))}
        </Box>
      )}

      {/* Modal de formulaire */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Ajouter un témoignage</Typography>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
          </Box>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              name="organization"
              label="Organisation"
              value={form.organization}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="quote"
              label="Témoignage"
              value={form.quote}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              name="typeDePrestation"
              label="Type de prestation"
              value={form.typeDePrestation}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleSubmit} disabled={submitting}>
              {submitting ? <CircularProgress size={24} /> : 'Soumettre'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </motion.div>
  );
};

export default TestimonialsPage;
