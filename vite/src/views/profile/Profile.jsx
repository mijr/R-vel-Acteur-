import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// =======================|| GRAPHQL QUERIES & MUTATIONS ||======================= //

const GET_ME = gql`
  query Me {
    me {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      firstName
      lastName
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`;

// =======================|| PROFILE PAGE COMPONENT ||======================= //

export default function ProfilePage() {
  const { data, loading, error, refetch } = useQuery(GET_ME);
  const [updateUser] = useMutation(UPDATE_USER);
  const [changePassword] = useMutation(CHANGE_PASSWORD);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (data?.me) {
      const { firstName, lastName, email } = data.me;
      setForm({ firstName: firstName || '', lastName: lastName || '', email });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await updateUser({
        variables: {
          id: data.me.id,
          input: form
        }
      });
      await refetch();
      setSuccessMessage('Profil mis à jour avec succès !');
    } catch (err) {
      setErrorMessage(err.message || 'Échec de la mise à jour du profil. Veuillez réessayer.');
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMessage('');
    if (!currentPassword || !newPassword) {
      setPasswordMessage("Veuillez remplir les deux champs du mot de passe.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    try {
      const { data } = await changePassword({
        variables: { currentPassword, newPassword }
      });
      setPasswordMessage(data.changePassword || "Mot de passe modifié avec succès !");
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPasswordMessage(err.message || "Échec du changement de mot de passe. Veuillez vérifier votre mot de passe actuel.");
    }
  };

  const toggleShowPassword = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      Erreur lors du chargement du profil : {error.message}
    </Alert>
  );

  return (
    <MainCard title="Mon Profil">
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
        <Grid container spacing={3}>
          {/* ========== Section Informations Personnelles ========== */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Informations personnelles</Typography>
            <Divider sx={{ mb: 3 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
            />
          </Grid>

          {successMessage && (
            <Grid item xs={12}>
              <Alert severity="success" onClose={() => setSuccessMessage('')}>
                {successMessage}
              </Alert>
            </Grid>
          )}

          {errorMessage && (
            <Grid item xs={12}>
              <Alert severity="error" onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Alert>
            </Grid>
          )}

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleUpdate}
              disabled={!form.firstName || !form.lastName || !form.email}
            >
              Enregistrer les modifications
            </Button>
          </Grid>

          {/* ========== Section Changement de Mot de Passe ========== */}
          <Grid item xs={12} mt={4}>
            <Typography variant="h5" gutterBottom>Changer le mot de passe</Typography>
            <Divider sx={{ mb: 3 }} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type={showPassword.current ? 'text' : 'password'}
              label="Mot de passe actuel"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => toggleShowPassword('current')}
                      edge="end"
                    >
                      {showPassword.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type={showPassword.new ? 'text' : 'password'}
              label="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              size="small"
              helperText="Le mot de passe doit contenir au moins 8 caractères"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => toggleShowPassword('new')}
                      edge="end"
                    >
                      {showPassword.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {passwordMessage && (
            <Grid item xs={12}>
              <Alert 
                severity={passwordMessage.toLowerCase().includes('succès') ? 'success' : 'error'}
                onClose={() => setPasswordMessage('')}
              >
                {passwordMessage}
              </Alert>
            </Grid>
          )}

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handlePasswordChange}
              disabled={!currentPassword || !newPassword || newPassword.length < 8}
            >
              Mettre à jour le mot de passe
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </MainCard>
  );
}
