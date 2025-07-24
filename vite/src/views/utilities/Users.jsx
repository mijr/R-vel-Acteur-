import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tooltip
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
      role
      phone
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
      role
      phone
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const roles = ['admin', 'user'];
  console.log('Roles:', roles);
export default function UserProfileCard({ isAdmin }) {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    phone: ''
  });

  const [deleteConfirm, setDeleteConfirm] = useState(null);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Erreur : {error.message}</Typography>;

  const users = data.users;
   console.log('Fetched users:', users);
  const openModal = (user) => {
    setSelectedUser(user);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      phone: user.phone || ''
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await updateUser({
        variables: {
          id: selectedUser.id,
          input: { ...form }
        }
      });
      await refetch();
      closeModal();
    } catch (err) {
      alert('Erreur lors de la mise à jour: ' + err.message);
    }
  };

  const confirmDelete = (userId) => {
    setDeleteConfirm(userId);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleDelete = async () => {
    try {
      await deleteUser({ variables: { id: deleteConfirm } });
      await refetch();
      setDeleteConfirm(null);
    } catch (err) {
      alert('Erreur lors de la suppression: ' + err.message);
    }
  };

  return (
    <MainCard title="Liste des Utilisateurs">
      {users.map((user) => (
        <Card key={user.id} sx={{ boxShadow: 2, p: 3, mb: 2, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle2" color="textSecondary">Nom</Typography>
              <Typography variant="body1" fontWeight={600}>
                {user.firstName} {user.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="subtitle2" color="textSecondary">Email</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle2" color="textSecondary">Rôle</Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{user.role}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle2" color="textSecondary">Téléphone</Typography>
              <Typography variant="body1">{user.phone || '-'}</Typography>
            </Grid>


            
              <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                <Tooltip title="Modifier">
                  <IconButton
                    color="primary"
                    onClick={() => openModal(user)}
                    aria-label={`Modifier ${user.firstName}`}
                  >
                    <IconEdit size={20} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton
                    color="error"
                    onClick={() => confirmDelete(user.id)}
                    aria-label={`Supprimer ${user.firstName}`}
                  >
                    <IconTrash size={20} />
                  </IconButton>
                </Tooltip>
              </Grid>
          </Grid>
        </Card>
      ))}

      {/* Modal Modification */}
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Prénom"
            name="firstName"
            fullWidth
            value={form.firstName}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="dense"
            label="Nom"
            name="lastName"
            fullWidth
            value={form.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Téléphone"
            name="phone"
            type="tel"
            fullWidth
            value={form.phone}
            onChange={handleChange}
          />
          <TextField
            select
            margin="dense"
            label="Rôle"
            name="role"
            fullWidth
            value={form.role}
            onChange={handleChange}
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Annuler</Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation suppression */}
      <Dialog open={Boolean(deleteConfirm)} onClose={cancelDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Annuler</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}
