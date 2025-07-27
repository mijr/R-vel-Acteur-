import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

// Material UI
import {
  Grid, TextField, Typography, Box, FormControl, FormControlLabel,
  InputLabel, OutlinedInput, InputAdornment, IconButton, Checkbox, 
  Button, CircularProgress, Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Project UI
import AnimateButton from 'ui-component/extended/AnimateButton';

// GraphQL mutation
const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
    ) {
      token
      user {
        id
        email
        role
        phone
      }
    }
  }
`;

export default function AuthRegister() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const [signup] = useMutation(SIGNUP);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le numéro de téléphone est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'adresse email est requise';
    if (!formData.password.trim()) newErrors.password = 'Le mot de passe est requis';
    else if (formData.password.length < 8) newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    if (!checked) newErrors.terms = 'Vous devez accepter les conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const { data } = await signup({
        variables: { ...formData }
      });

      localStorage.setItem('token', data.signup.token);

      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie',
        text: `Bienvenue ${data.signup.user.email} !`,
        confirmButtonColor: theme.palette.secondary.main,
      }).then(() => {
        navigate('/auth/login');
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: err.message || 'Une erreur est survenue lors de l\'inscription.',
        confirmButtonColor: theme.palette.error.main,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Créer un compte
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Numéro de téléphone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Adresse email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.password}>
              <InputLabel htmlFor="password">Mot de passe</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Mot de passe"
              />
              {errors.password && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {errors.password}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  color="secondary"
                />
              }
              label={
                <Typography variant="body2">
                  J'accepte les&nbsp;
                  <Typography 
                    component={Link} 
                    to="/terms" 
                    color="secondary"
                    sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    conditions d'utilisation
                  </Typography>
                </Typography>
              }
              sx={{ alignItems: 'flex-start' }}
            />
            {errors.terms && (
              <Typography variant="caption" color="error">
                {errors.terms}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
              >
                {loading ? 'Inscription en cours...' : 'S\'inscrire maintenant'}
              </Button>
            </AnimateButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" textAlign="center">
              Déjà un compte ?{' '}
              <Typography 
                component={Link} 
                to="/auth/login" 
                color="secondary"
                sx={{ 
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Connectez-vous
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
