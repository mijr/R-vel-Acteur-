import { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Button } from '@mui/material';
import { gridSpacing } from 'store/constant';

export default function AppointmentList() {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null); // id of event being edited
  const [editUrl, setEditUrl] = useState('');      // temp storage for meetingUrl
  const [attendeeEditMode, setAttendeeEditMode] = useState(null); // id of attendee being edited
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeTimeZone, setAttendeeTimeZone] = useState('');
  const [bookingReferences, setBookingReferences] = useState([]); // Store booking references

  // Fetching attendees and booking references together
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendeesRes, bookingRes] = await Promise.all([
          axios.get('https://api.cal.com/v1/attendees?apiKey=cal_live_8aee1aa2c48670ea92d8fe14fcb4d077'),
          fetch('https://api.cal.com/v1/booking-references?apiKey=cal_live_8aee1aa2c48670ea92d8fe14fcb4d077').then(res => res.json())
        ]);

        const attendeesData = attendeesRes.data.attendees;
        const bookingData = bookingRes.booking_references;

        // Merge booking references with attendees
        const mergedAttendees = attendeesData.map(attendee => {
          const booking = bookingData.find(b => b.bookingId === attendee.bookingId);
          return {
            ...attendee,
            meetingUrl: booking?.meetingUrl || '',
            meetingPassword: booking?.meetingPassword || '', // We will not display this
          };
        });

        setAttendees(mergedAttendees);
        setBookingReferences(bookingData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch attendees or booking references.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Delete handler for attendees
    const handleDeleteAttendee = async (id) => {
      if (!window.confirm('Supprimer cet invité ?')) return;
      try {
        await axios.delete(`/api/attendees/${id}`);
        setAttendees(prev => prev.filter(attendee => attendee.id !== id));
      } catch (err) {
        console.error('Delete attendee failed:', err);
        alert('Erreur lors de la suppression de l\'invité');
      }
    };


  // Edit handler for attendees
  const handleEditAttendee = (attendee) => {
    setAttendeeEditMode(attendee.id);
    setAttendeeEmail(attendee.email);
    setAttendeeName(attendee.name);
    setAttendeeTimeZone(attendee.timeZone);
  };

  // Save edited attendee
  const handleSaveAttendee = async (id) => {
    try {
      const res = await axios.patch(`/api/attendees/${id}`, {
        email: attendeeEmail,
        name: attendeeName,
        timeZone: attendeeTimeZone,
      });
      setAttendees(prev =>
        prev.map(attendee => (attendee.id === id ? { ...attendee, ...res.data } : attendee))
      );
      setAttendeeEditMode(null);
    } catch (err) {
      console.error('Edit attendee failed:', err);
      alert('Erreur lors de la mise à jour de l\'invité');
    }
  };

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
            <Typography color="error">{error}</Typography>
          </Grid>
        )}

        {!loading && !error && attendees.length === 0 && (
          <Grid item xs={12}>
            <Typography>Aucun rendez-vous trouvé.</Typography>
          </Grid>
        )}

        {attendees && attendees.length > 0 ? (
          attendees.map(attendee => (
            <Grid key={attendee.id} item xs={12} sm={6}>
              <SubCard title={`Attendee: ${attendee.name}`}>
                <Typography variant="body2">Email: {attendee.email}</Typography>
                <Typography variant="body2">Time Zone: {attendee.timeZone}</Typography>

                {/* Display Meeting URL as a clickable link */}
                {attendee.meetingUrl && (
                  <Typography variant="body2">
                    <a href={attendee.meetingUrl} target="_blank" rel="noopener noreferrer">
                      Join Meeting
                    </a>
                  </Typography>
                )}

                {/* Password is not displayed */}
                {/* <Typography variant="body2">Meeting Password: {attendee.meetingPassword || 'N/A'}</Typography> */}

                {attendeeEditMode === attendee.id ? (
                  <>
                    <TextField
                      label="Email"
                      fullWidth
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      sx={{ my: 1 }}
                    />
                    <TextField
                      label="Name"
                      fullWidth
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      sx={{ my: 1 }}
                    />
                    <TextField
                      label="Time Zone"
                      fullWidth
                      value={attendeeTimeZone}
                      onChange={(e) => setAttendeeTimeZone(e.target.value)}
                      sx={{ my: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSaveAttendee(attendee.id)}
                      sx={{ mr: 1 }}
                    >
                      Sauvegarder
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setAttendeeEditMode(null)}
                    >
                      Annuler
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditAttendee(attendee)}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteAttendee(attendee.id)}
                      sx={{ mt: 1 }}
                    >
                      Supprimer
                    </Button>
                  </>
                )}
              </SubCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>Aucun invité trouvé.</Typography>
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
}
