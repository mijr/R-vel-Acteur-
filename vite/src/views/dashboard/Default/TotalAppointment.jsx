import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CAL_API_URL = 'https://api.cal.com/v1/attendees?apiKey=cal_live_8aee1aa2c48670ea92d8fe14fcb4d077';

export default function EarningCard({ isLoading }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(CAL_API_URL);
        const data = await response.json();
        setAppointmentCount(data?.length ?? 0);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <>
      {isLoading || loadingAppointments ? (
        <SkeletonEarningCard />
      ) : (
        <MainCard
          border={false}
          content={false}
          sx={{
            bgcolor: 'secondary.dark',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative',
             '&>div': { position: 'relative', zIndex: 5 },
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -85 },
              right: { xs: -95 }
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 210,
              height: 210,
              background: theme.palette.secondary[800],
              borderRadius: '50%',
              top: { xs: -125 },
              right: { xs: -15 },
              opacity: 0.5
            }
          }}
        >
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
                <Grid container sx={{ justifyContent: 'space-between' }}>
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        bgcolor: 'secondary.800',
                        mt: 1
                      }}
                    >
                     <CalendarMonthIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                   <Grid item>
                      <Typography variant="h6" sx={{ color: 'primary.200' }}>
                        Total rendez-vous
                      </Typography>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
                        {appointmentCount}
                      </Typography>
                    </Grid>
                 
                </Grid>
              </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
}

EarningCard.propTypes = {
  isLoading: PropTypes.bool
};
