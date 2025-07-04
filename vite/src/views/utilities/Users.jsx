import { useQuery } from '@apollo/client';
import { GET_ME } from 'graphql/queries';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { Box, CircularProgress, Typography, Grid, Card } from '@mui/material';

export default function UserProfileCard() {
  const { data, loading, error } = useQuery(GET_ME);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Erreur : {error.message}</Typography>;

  const user = data.me;

  return (
    <MainCard title="Mon Profil Utilisateur">
      <Card sx={{ boxShadow: 4, p: 3, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Nom</Typography>
            <Typography variant="body1">{user.firstName} {user.lastName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Email</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Rôle</Typography>
            <Typography variant="body1">{user.role}</Typography>
          </Grid>
        </Grid>
      </Card>
    </MainCard>
  );
}
