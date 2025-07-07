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
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update profile. Please try again.');
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMessage('');
    if (!currentPassword || !newPassword) {
      setPasswordMessage("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMessage("New password must be at least 8 characters long.");
      return;
    }

    try {
      const { data } = await changePassword({
        variables: { currentPassword, newPassword }
      });
      setPasswordMessage(data.changePassword || "Password changed successfully!");
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setPasswordMessage(err.message || "Failed to change password. Please check your current password.");
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
      Error loading profile: {error.message}
    </Alert>
  );

  return (
    <MainCard title="My Profile">
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: '0 auto' }}>
        <Grid container spacing={3}>
          {/* ========== Profile Information Section ========== */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Personal Information</Typography>
            <Divider sx={{ mb: 3 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
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
              label="Last Name"
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
              Save Changes
            </Button>
          </Grid>

          {/* ========== Password Change Section ========== */}
          <Grid item xs={12} mt={4}>
            <Typography variant="h5" gutterBottom>Change Password</Typography>
            <Divider sx={{ mb: 3 }} />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type={showPassword.current ? 'text' : 'password'}
              label="Current Password"
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
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
              size="small"
              helperText="Password must be at least 8 characters long"
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
                severity={passwordMessage.includes('success') ? 'success' : 'error'}
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
              Update Password
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </MainCard>
  );
}