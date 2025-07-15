import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      firstName
      lastName
      role
    }
  }
`;

const CAL_API_URL = 'https://api.cal.com/v1/attendees?apiKey=cal_live_8aee1aa2c48670ea92d8fe14fcb4d077';

export default function TotalUserCountCard({ isLoading }) {
  const theme = useTheme();
  const { data: userData, loading: userLoading } = useQuery(GET_USERS);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [appointmentLoading, setAppointmentLoading] = useState(true);

  // Fetch appointments from Cal API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(CAL_API_URL);
        const appointments = await response.json();
        setAppointmentCount(appointments?.length ?? 0);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setAppointmentLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const totalUsers = userData?.users?.length ?? 0;

  return isLoading || userLoading || appointmentLoading ? (
    <SkeletonTotalOrderCard />
  ) : (
    <MainCard
      border={false}
      content={false}
      sx={{
        bgcolor: 'primary.dark',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&>div': { position: 'relative', zIndex: 5 },
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: theme.palette.primary[800],
          borderRadius: '50%',
          top: { xs: -85 },
          right: { xs: -95 }
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: theme.palette.primary[800],
          borderRadius: '50%',
          top: { xs: -125 },
          right: { xs: -15 },
          opacity: 0.5
        }
      }}
    >
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.largeAvatar,
                  bgcolor: 'primary.800',
                  color: '#fff',
                  mt: 1
                }}
              >
                <PersonIcon fontSize="inherit" />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ color: 'primary.200' }}>
                Utilisateur
              </Typography>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
                {totalUsers}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
}

TotalUserCountCard.propTypes = {
  isLoading: PropTypes.bool
};
