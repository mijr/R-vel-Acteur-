import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Avatar,
  Divider,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
  Stack,
  Button,
  FormControl,   // <-- add this
  InputLabel ,
  Collapse
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';
import { useQuery, gql } from '@apollo/client';
import {
  ExpandLess as ChevronUp,
  ExpandMore as ChevronDown,
  ShowChart,
  Radar as RadarIcon,
  Assessment,
  Person,
  CalendarToday
} from '@mui/icons-material';

// Queries (same as before)
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

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
    }
  }
`;

const GET_WELLBEING_TRENDS = gql`
  query WellbeingTrend($userId: Int!) {
    wellbeingTrend(userId: $userId) {
      id
      weekLabel
      value
    }
  }
`;

const GET_RADAR_SKILLS = gql`
  query RadarSkills($userId: Int!, $period: String!) {
    radarSkills(userId: $userId, period: $period) {
      id
      subject
      value
    }
  }
`;

const GET_KPI_SUMMARY = gql`
  query KpiSummary($userId: Int!, $period: String!) {
    kpiSummary(userId: $userId, period: $period) {
      id
      summary
    }
  }
`;

const periods = ['week', 'month', 'quarter'];

export default function KpiDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Current logged-in user info
  const { data: meData, loading: meLoading, error: meError } = useQuery(GET_ME);
  const userRole = meData?.me?.role || null;
  const meUserId = meData?.me?.id || null;

  // If admin, fetch users list for selector
  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS, {
    skip: userRole !== 'admin',
  });

  // Selected states
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [expandedSection, setExpandedSection] = useState({
    wellbeing: true,
    skills: true,
    summary: true
  });

  // Set default selectedUserId
  useEffect(() => {
    if (userRole === 'admin' && usersData?.users?.length) {
      setSelectedUserId((prev) => prev || usersData.users[0].id);
    } else if (userRole !== 'admin' && meUserId) {
      setSelectedUserId(meUserId);
    }
  }, [userRole, meUserId, usersData]);

  // Queries for KPIs
  const { data: wellbeingData, loading: wellbeingLoading, error: wellbeingError, refetch: refetchWellbeing } = useQuery(GET_WELLBEING_TRENDS, {
    variables: { userId: selectedUserId },
    skip: !selectedUserId,
  });

  const { data: radarData, loading: radarLoading, error: radarError, refetch: refetchRadar } = useQuery(GET_RADAR_SKILLS, {
    variables: { userId: selectedUserId, period: selectedPeriod },
    skip: !selectedUserId,
  });

  const { data: summaryData, loading: summaryLoading, error: summaryError, refetch: refetchSummary } = useQuery(GET_KPI_SUMMARY, {
    variables: { userId: selectedUserId, period: selectedPeriod },
    skip: !selectedUserId,
  });

  // Refetch KPI data when selectedUserId or period changes
  useEffect(() => {
    if (selectedUserId) {
      refetchWellbeing();
      refetchRadar();
      refetchSummary();
    }
  }, [selectedUserId, selectedPeriod, refetchWellbeing, refetchRadar, refetchSummary]);

  // Helper for progression delta calculation
  const getDelta = (arr) => {
    if (!arr || arr.length < 2) return null;
    const last = arr[arr.length - 1].value;
    const prev = arr[arr.length - 2].value;
    return last - prev;
  };

  // Extract KPI data for display
  const wellbeingTrend = wellbeingData?.wellbeingTrend || [];
  const wellbeingCurrent = wellbeingTrend.length > 0 ? wellbeingTrend[wellbeingTrend.length - 1].value : null;
  const wellbeingDelta = getDelta(wellbeingTrend);

  const radarSkills = radarData?.radarSkills || [];
  const radarCurrentAvg = radarSkills.length > 0 ? radarSkills.reduce((sum, r) => sum + r.value, 0) / radarSkills.length : null;

  if (meLoading) return <CircularProgress />;
  if (meError) return <Typography color="error">Erreur chargement utilisateur</Typography>;

  if (userRole === 'admin' && usersLoading) return <CircularProgress />;
  if (userRole === 'admin' && usersError) return <Typography color="error">Erreur chargement utilisateurs</Typography>;

  const toggleSection = (section) => {
    setExpandedSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant={isMobile ? 'h4' : 'h3'} fontWeight="bold" gutterBottom>
          Tableau de bord <Box component="span" color="primary.main">KPI sociologique</Box>
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {meData?.me?.firstName} {meData?.me?.lastName} • {userRole === 'admin' ? 'Administrateur' : 'Utilisateur'}
        </Typography>
      </Box>

      {/* User and Period Selectors */}
      <Paper elevation={0} sx={{ 
        p: 3, 
        mb: 4,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3
      }}>
        <Grid container spacing={2}>
          {userRole === 'admin' && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Utilisateur</InputLabel>
                <Select
                  value={selectedUserId || ''}
                  onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
                  startAdornment={<Person sx={{ mr: 1, color: 'action.active' }} />}
                >
                  {usersData?.users?.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}
          
          <Grid item xs={12} md={userRole === 'admin' ? 6 : 12}>
            <FormControl fullWidth size="small">
              <InputLabel>Période</InputLabel>
              <Select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                startAdornment={<CalendarToday sx={{ mr: 1, color: 'action.active' }} />}
              >
                {periods.map((p) => (
                  <MenuItem key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                  <ShowChart />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">Bien-être social</Typography>
              </Stack>
              
              <Box display="flex" alignItems="flex-end" gap={2}>
                <Typography variant="h4" fontWeight="bold">
                  {wellbeingCurrent !== null ? wellbeingCurrent.toFixed(2) : 'N/A'}
                </Typography>
                {wellbeingDelta !== null && (
                  <Chip
                    label={`${wellbeingDelta >= 0 ? '+' : ''}${wellbeingDelta.toFixed(2)}`}
                    color={wellbeingDelta >= 0 ? 'success' : 'error'}
                    size="small"
                    sx={{ fontWeight: 'bold' }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3
          }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.main' }}>
                  <RadarIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold">Moyenne compétences</Typography>
              </Stack>
              
              <Typography variant="h4" fontWeight="bold">
                {radarCurrentAvg !== null ? radarCurrentAvg.toFixed(2) : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Wellbeing Section */}
      <Paper elevation={0} sx={{ 
        mb: 4,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <Box 
          sx={{ 
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: expandedSection.wellbeing ? 'primary.light' : 'background.paper',
            color: expandedSection.wellbeing ? 'primary.contrastText' : 'inherit',
            cursor: 'pointer'
          }}
          onClick={() => toggleSection('wellbeing')}
        >
          <Typography variant="h6" fontWeight="bold">
            Évolution du bien-être social
          </Typography>
          {expandedSection.wellbeing ? <ChevronUp /> : <ChevronDown />}
        </Box>
        
        <Collapse in={expandedSection.wellbeing}>
          <Box sx={{ p: 3 }}>
            {wellbeingTrend.length > 0 ? (
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={wellbeingTrend}>
                    <XAxis dataKey="weekLabel" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={theme.palette.primary.main} 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Typography color="text.secondary" textAlign="center" py={4}>
                Aucune donnée disponible pour le bien-être
              </Typography>
            )}
          </Box>
        </Collapse>
      </Paper>

      {/* Skills Section */}
      <Paper elevation={0} sx={{ 
        mb: 4,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <Box 
          sx={{ 
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: expandedSection.skills ? 'secondary.light' : 'background.paper',
            color: expandedSection.skills ? 'secondary.contrastText' : 'inherit',
            cursor: 'pointer'
          }}
          onClick={() => toggleSection('skills')}
        >
          <Typography variant="h6" fontWeight="bold">
            Compétences sociales
          </Typography>
          {expandedSection.skills ? <ChevronUp /> : <ChevronDown />}
        </Box>
        
        <Collapse in={expandedSection.skills}>
          <Box sx={{ p: 3 }}>
            {radarSkills.length > 0 ? (
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarSkills}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar
                      name="Compétences"
                      dataKey="value"
                      stroke={theme.palette.secondary.main}
                      fill={theme.palette.secondary.main}
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <Typography color="text.secondary" textAlign="center" py={4}>
                Aucune donnée disponible pour les compétences
              </Typography>
            )}
          </Box>
        </Collapse>
      </Paper>

      {/* Summary Section */}
      <Paper elevation={0} sx={{ 
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <Box 
          sx={{ 
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: expandedSection.summary ? 'info.light' : 'background.paper',
            color: expandedSection.summary ? 'info.contrastText' : 'inherit',
            cursor: 'pointer'
          }}
          onClick={() => toggleSection('summary')}
        >
          <Typography variant="h6" fontWeight="bold">
            Synthèse
          </Typography>
          {expandedSection.summary ? <ChevronUp /> : <ChevronDown />}
        </Box>
        
        <Collapse in={expandedSection.summary}>
          <Box sx={{ p: 3 }}>
            {summaryData?.kpiSummary?.summary ? (
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                {summaryData.kpiSummary.summary}
              </Typography>
            ) : (
              <Typography color="text.secondary" textAlign="center" py={4}>
                Aucune synthèse disponible
              </Typography>
            )}
          </Box>
        </Collapse>
      </Paper>
    </Container>
  );
}