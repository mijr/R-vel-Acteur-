// AppointmentList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CircularProgress from '@mui/material/CircularProgress';
import { gridSpacing } from 'store/constant';

export default function AppointmentList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/cal-events')
      .then(res => setEvents(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainCard title="Mes rendez-vous (Cal.com)">
      <Grid container spacing={gridSpacing}>
        {loading && <Grid item xs={12}><CircularProgress/></Grid>}
        {error && <Grid item xs={12}><Typography color="error">{error}</Typography></Grid>}
        {!loading && !error && events.length===0 && (
          <Grid item xs={12}><Typography>Aucun rendez-vous trouvé.</Typography></Grid>
        )}
        {events.map(appt => (
          <Grid key={appt.uid} item xs={12} sm={6}>
            <SubCard title={appt.eventType?.title || 'Rendez-vous'}>
              <Typography>{appt.attendees?.[0]?.name}</Typography>
              <Typography variant="body2">
                {new Date(appt.start).toLocaleString('fr-FR')}
              </Typography>
            </SubCard>
          </Grid>
        ))}
      </Grid>
    </MainCard>
  );
}
