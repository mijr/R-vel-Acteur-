import { gql, useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CircularProgress from '@mui/material/CircularProgress';
import { gridSpacing } from 'store/constant';

// GraphQL query
const GET_APPOINTMENTS = gql`
  query GetAppointments($email: String!) {
    getAppointments(email: $email) {
      id
      email
      dateTime
      type
    }
  }
`;

export default function AppointmentList({ email = 'test@example.com' }) {
  const { loading, error, data } = useQuery(GET_APPOINTMENTS, {
    variables: { email },
  });

  return (
    <MainCard title="Mes rendez-vous">
      <Grid container spacing={gridSpacing}>
        {loading && (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        )}

        {error && (
          <Grid item xs={12}>
            <Typography color="error">Erreur: {error.message}</Typography>
          </Grid>
        )}

        {data?.getAppointments?.length === 0 && (
          <Grid item xs={12}>
            <Typography>Aucun rendez-vous trouvé.</Typography>
          </Grid>
        )}

        {data?.getAppointments?.map((appt) => (
          <Grid key={appt.id} item xs={12} sm={6}>
            <SubCard title={appt.type.toUpperCase()}>
              <Typography variant="body1">{appt.email}</Typography>
              <Typography variant="body2">
                {new Date(appt.dateTime).toLocaleString()}
              </Typography>
            </SubCard>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
}
