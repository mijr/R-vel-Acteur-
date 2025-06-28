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

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

// ===========================|| AUTH - FORGOT PASSWORD ||=========================== //

export default function ForgotPassword() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Please enter your email address.');
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
      if (result.data?.requestPasswordReset) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
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
                  {/* Logo */}
                  <Grid item sx={{ textAlign: 'center' }}>
                    <Link to="/" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid>

                  {/* Header */}
                  <Grid item xs={12}>
                    <Stack spacing={1} alignItems="center">
                      <Typography variant={downMD ? 'h4' : 'h3'} sx={{ color: 'secondary.main' }}>
                        Forgot Password?
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        Enter your registered email and we'll send you a reset link.
                      </Typography>
                    </Stack>
                  </Grid>

                  {/* Form */}
                  <Grid item xs={12}>
                    {submitted ? (
                      <Alert severity="success">
                        ✅ If your email exists, a password reset link has been sent. Please check your inbox.
                      </Alert>
                    ) : (
                      <Stack spacing={2}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <TextField
                          label="Email Address"
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
                          onClick={handleReset}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
                        </Button>
                      </Stack>
                    )}
                  </Grid>

                  {/* Divider */}
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* Back to login */}
                  <Grid item xs={12}>
                    <Grid container justifyContent="center">
                      <Typography component={Link} to="/pages/login" variant="body2" sx={{ textDecoration: 'none' }}>
                        ← Back to Login
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>

        {/* Footer */}
        <Grid item sx={{ px: 3, my: 3 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
}
