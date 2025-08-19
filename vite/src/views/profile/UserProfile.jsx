import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  CircularProgress,
  Grid,
  Paper,
  Alert,
  MenuItem,
  InputAdornment,
  Avatar
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from '../../graphql/queries';
import { useGeoLocation } from '../../constants/useGeoLocation';

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

const MATRIMONIAL_STATUSES = [
  'Célibataire',
  'Marié(e)',
  'Divorcé(e)',
  'Veuf/Veuve',
  'Séparé(e)',
  'En couple'
];

const CURRENCIES = [
  'USD',
  'EUR',
  'CAD',
  'XAF',
  'XOF',
  // Add more as needed
];

function UserProfile() {
  const geoLocation = useGeoLocation();
  const { data: meData, loading: meLoading, error: meError } = useQuery(GET_ME);
  const userId = meData?.me?.id;

  const { data, loading, error, refetch } = useQuery(GET_USER_PROFILE, {
    variables: { id: userId },
    skip: !userId,
  });

  const [updateUserProfile, { loading: updateLoading }] = useMutation(UPDATE_USER_PROFILE);

  const [form, setForm] = useState({
    currency: '',
    profession: '',
    weight: '',
    height: '',
    date_of_birth: null,
    matrimonial_status: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 useEffect(() => {
  if (data?.getUserProfile) {
    const profile = data.getUserProfile;
    setForm({
      currency: profile.currency || '',
      profession: profile.profession || '',
      weight: profile.weight !== null ? profile.weight.toString() : '',
      height: profile.height !== null ? profile.height.toString() : '',
      date_of_birth: profile.date_of_birth ? dayjs(profile.date_of_birth) : null,
      matrimonial_status: profile.matrimonial_status || '',
      description: profile.description || '',
    });
  }
}, [data]);

useEffect(() => {
    if (!form.currency && geoLocation?.country) {
      const currency = COUNTRY_TO_CURRENCY[geoLocation.country] || '';
      if (currency) {
        setForm((prev) => ({ ...prev, currency }));
      }
    }
  }, [geoLocation, form.currency]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({ ...prev, date_of_birth: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const input = {
        ...form,
        weight: form.weight ? parseFloat(form.weight) : null,
        height: form.height ? parseFloat(form.height) : null,
        date_of_birth: form.date_of_birth ? form.date_of_birth.format('YYYY-MM-DD') : null,

      };

      await updateUserProfile({ variables: { id: userId, input } });
      await refetch();
      setSuccessMessage(">Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage("An error occurred while updating your profile. Please try again.");
    }
  };

  if (meLoading || loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (meError || error) return (
    <Box p={3}>
      <Alert severity="error">Error loading profile data.</Alert>
    </Box>
  );

  return (
    <Box p={5} maxWidth="100" mx="auto">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar 
            src=''
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h4" component="h1">
              {meData?.me?.firstName} {meData?.me?.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {meData?.me?.email}
            </Typography>
          </Box>
        </Box>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>{successMessage}</Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>{errorMessage}</Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Devise"
                name="currency"
                value={form.currency}
                onChange={handleChange}
                fullWidth
                select
                margin="normal"
              >
                {CURRENCIES.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Profession"
                name="profession"
                value={form.profession}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Poids"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Taille"
                name="height"
                value={form.height}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Date de naissance"
                value={form.date_of_birth}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Statut matrimonial"
                name="matrimonial_status"
                value={form.matrimonial_status}
                onChange={handleChange}
                fullWidth
                select
                margin="normal"
              >
                {MATRIMONIAL_STATUSES.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="A propos de moi"
                name="description"
                value={form.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                placeholder="Tell us a little about yourself..."
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  disabled={updateLoading}
                >
                  {updateLoading ? <CircularProgress size={24} /> : 'Enregistrer le profil'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default UserProfile;