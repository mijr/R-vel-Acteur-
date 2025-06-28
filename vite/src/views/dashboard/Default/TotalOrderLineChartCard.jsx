import PropTypes from 'prop-types';
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const GET_USER_COUNT = gql`
  query GetUserCount($by: String!) {
    userCount(by: $by)
  }
`;

export default function TotalUserCountCard({ isLoading }) {
  const theme = useTheme();
  const [timeValue, setTimeValue] = React.useState('month');
  const { data, loading, error } = useQuery(GET_USER_COUNT, {
    variables: { by: timeValue },
  });

  const handleChangeTime = (event, value) => {
    setTimeValue(value);
  };

  return (
    <>
      {isLoading || loading ? (
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
            <Grid container direction="column">
              <Grid>
                <Grid container justifyContent="space-between">
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
                    <Button
                      disableElevation
                      variant={timeValue === 'month' ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, 'month')}
                    >
                      Month
                    </Button>
                    <Button
                      disableElevation
                      variant={timeValue === 'year' ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, 'year')}
                    >
                      Year
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography
                      sx={{ fontSize: '2.125rem', fontWeight: 500, mt: 1.75, mb: 0.75 }}
                    >
                      {data?.userCount ?? 0}
                    </Typography>
                    <Typography
                      sx={{ fontSize: '1rem', fontWeight: 500, color: 'primary.200' }}
                    >
                      Total Users
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="flex-end">
                    <Avatar
                      sx={{
                        ...theme.typography.smallAvatar,
                        cursor: 'pointer',
                        bgcolor: 'primary.200',
                        color: 'primary.dark'
                      }}
                    >
                      <ArrowDownwardIcon
                        fontSize="inherit"
                        sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                      />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </MainCard>
      )}
    </>
  );
}

TotalUserCountCard.propTypes = {
  isLoading: PropTypes.bool
};