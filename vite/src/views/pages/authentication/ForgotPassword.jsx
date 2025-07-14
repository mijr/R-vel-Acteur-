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

export default function ForgotPassword() {
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [step, setStep] = useState(1); // Step 1: email, Step 2: OTP & new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async () => {
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

      if (result.errors?.length > 0) {
        setError(result.errors[0].message);
      } else if (result.data?.requestPasswordReset) {
        setStep(2);
        setSuccess('✅ OTP sent to your email.');
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

  const handleResetPassword = async () => {
    if (!otp.trim() || !newPassword.trim()) {
      setError('Please enter both OTP and your new password.');
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
        setError(result.errors[0].message);
      } else {
        setSubmitted(true);
        setSuccess('🎉 Password reset successfully. You can now log in.');
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
                  <Grid item sx={{ textAlign: 'center' }}>
                    <Link to="/" aria-label="logo">
                      <Logo />
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Stack spacing={1} alignItems="center">
                      <Typography variant={downMD ? 'h4' : 'h3'} sx={{ color: 'secondary.main' }}>
                        Forgot Password?
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        {step === 1
                          ? "Enter your registered email and we'll send you an OTP."
                          : 'Enter the OTP sent to your email and your new password.'}
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
                              onClick={handleRequestOTP}
                              disabled={loading}
                            >
                              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
                            </Button>
                          </>
                        ) : (
                          <>
                            <TextField
                              label="OTP Code"
                              type="text"
                              fullWidth
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              required
                            />
                            <TextField
                              label="New Password"
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
                              {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
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

        <Grid item sx={{ px: 3, my: 3 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
}
