import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';

// MUI
import { Grid, Typography, CircularProgress } from '@mui/material';

// Admin Dashboard Components
import TotalAppointment from './TotalAppointment';
import PopularCard from './PopularCard';
import TotalUser from './TotalUser';
import TotalGrowthBarChart from './TotalGrowthBarChart';

// User Dashboard Components (create these separately)
import UserWelcomeCard from '../UserWelcomeCard';


import { gridSpacing } from 'store/constant';

// GraphQL: Current User
const GET_ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      role
    }
  }
`;

// ==============================|| DASHBOARD COMPONENT ||============================== //

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  const { data, loading, error } = useQuery(GET_ME);

  useEffect(() => {
    if (!loading) {
      setLoading(false);
    }
  }, [loading]);

  if (loading || isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Erreur lors du chargement de l'utilisateur</Typography>;
  }

  const user = data?.me;
  const isAdmin = user?.role === 'admin';

  // ===================== ADMIN DASHBOARD =====================
  if (isAdmin) {
    return (
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalAppointment isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalUser isLoading={isLoading} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <TotalUser isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <TotalGrowthBarChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  // ===================== USER DASHBOARD =====================
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <UserWelcomeCard user={user} />
      </Grid>
    </Grid>
  );
}
