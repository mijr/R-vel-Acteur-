import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import {
  Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton,
  InputAdornment, InputLabel, OutlinedInput, Typography, CircularProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert2';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est requise";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Le mot de passe est requis';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    setLoading(true);
    try {
      const { data } = await login({ variables: { email, password } });

      localStorage.setItem('token', data.login.token);
      localStorage.setItem('user', JSON.stringify(data.login.user));

      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie',
        text: `Bienvenue ${data.login.user.firstName || ''} !`
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur de connexion',
        text: err.message || 'Identifiants incorrects',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={!!errors.email}>
        <InputLabel htmlFor="login-email">Adresse e-mail</InputLabel>
        <OutlinedInput
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors({ ...errors, email: '' });
          }}
          label="Adresse e-mail"
        />
        {errors.email && (
          <Typography variant="caption" color="error">
            {errors.email}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }} error={!!errors.password}>
        <InputLabel htmlFor="login-password">Mot de passe</InputLabel>
        <OutlinedInput
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({ ...errors, password: '' });
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Mot de passe"
        />
        {errors.password && (
          <Typography variant="caption" color="error">
            {errors.password}
          </Typography>
        )}
      </FormControl>

      <Grid container justifyContent="space-between">
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
          label="Se souvenir de moi"
        />
        <Typography component={Link} to="/auth/forgot-password" variant="subtitle2" color="secondary">
          Mot de passe oublié ?
        </Typography>
      </Grid>

      <Box mt={2}>
        <AnimateButton>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
