import { useState } from 'react';
import { Link } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import Swal from 'sweetalert2';
// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Box from '@mui/material/Box';
import Logo from '../../../assets/images/RA_logo_1.png';
import AuthFooter from 'ui-component/cards/AuthFooter';

export default function ForgotPassword() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async () => {
    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail.");
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation RequestPasswordReset($email: String!) {
              requestPasswordReset(email: $email)
            }
          `,
          variables: { email }
        })
      });

      const result = await response.json();

      if (result.errors?.length > 0) {
        Swal.fire('Erreur', result.errors[0].message, 'error');
      } else if (result.data?.requestPasswordReset) {
        setStep(2);
        Swal.fire('Code envoyé !', 'Un code OTP a été envoyé à votre adresse e-mail.', 'success');
      } else {
        Swal.fire('Erreur', "Une erreur s'est produite. Veuillez réessayer.", 'error');
      }

    } catch (err) {
      console.error(err);
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp.trim() || !newPassword.trim()) {
      setError("Veuillez saisir le code OTP et votre nouveau mot de passe.");
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation ResetPasswordWithOTP($email: String!, $otpCode: String!, $newPassword: String!) {
              resetPasswordWithOTP(email: $email, otpCode: $otpCode, newPassword: $newPassword)
            }
          `,
          variables: { email, otpCode: otp, newPassword }
        })
      });

      const result = await response.json();

      if (result.errors?.length > 0) {
        Swal.fire('Erreur', result.errors[0].message, 'error');
      } else {
        setSubmitted(true);
        Swal.fire('Succès', '🎉 Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.', 'success');
      }

    } catch (err) {
      console.error(err);
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper1>
      <Grid container direction="column" sx={{ minHeight: '100vh', justifyContent: 'flex-end' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 2, sm: 4 }, width: { xs: '100%', sm: '400px' } }}>
              <AuthCardWrapper>
                <Grid container spacing={3} alignItems="center" justifyContent="center">
                  <Grid item sx={{ textAlign: 'center' }}>
                    <Link to="/" aria-label="logo">
                       <Box
                      component="img"      // specify HTML tag here, must be string 'img'
                      src={Logo}           // pass imported image URL here
                      alt="Logo"
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        objectFit: 'contain',
                      }}
                    />
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1} alignItems="center">
                      <Typography variant={downMD ? 'h4' : 'h3'} sx={{ color: 'secondary.main' }}>
                        Mot de passe oublié ?
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        {step === 1
                          ? "Saisissez votre e-mail, un code OTP vous sera envoyé."
                          : "Saisissez le code OTP reçu et votre nouveau mot de passe."}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    {submitted ? (
                      <Alert severity="success">{success}</Alert>
                    ) : (
                      <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}

                        {step === 1 ? (
                          <>
                            <TextField
                              label="Adresse e-mail"
                              type="email"
                              fullWidth
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              autoComplete="email"
                              required
                            />
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={handleRequestOTP}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress size={24} color="inherit" /> : "Envoyer le code OTP"}
                            </Button>
                          </>
                        ) : (
                          <>
                            <TextField
                              label="Code OTP"
                              type="text"
                              fullWidth
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              required
                            />
                            <TextField
                              label="Nouveau mot de passe"
                              type="password"
                              fullWidth
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                            />
                            <Button
                              variant="contained"
                              fullWidth
                              onClick={handleResetPassword}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress size={24} color="inherit" /> : "Réinitialiser le mot de passe"}
                            </Button>
                          </>
                        )}
                      </Stack>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justifyContent="center">
                      <Typography component={Link} to="/auth/login" variant="body2" sx={{ textDecoration: 'none' }}>
                        ← Retour à la connexion
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sx={{ px: 3, my: 3 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
}
