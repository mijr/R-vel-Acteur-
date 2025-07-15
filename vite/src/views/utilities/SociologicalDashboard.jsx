import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Select, MenuItem,
  FormControl, InputLabel, Grid, Card, CardContent,
  TextField, Button, Stack, Paper,
} from '@mui/material';
import { useQuery, useMutation, gql } from '@apollo/client';

// GraphQL queries/mutations
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      firstName
      lastName
      email
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

const ADD_WELLBEING_TREND = gql`
  mutation AddWellbeingTrend($userId: Int!, $weekLabel: String!, $value: Float!) {
    addWellbeingTrend(userId: $userId, weekLabel: $weekLabel, value: $value) {
      id
    }
  }
`;

const ADD_RADAR_SKILLS = gql`
  mutation AddRadarSkills($userId: Int!, $period: String!, $data: [RadarSkillInput!]!) {
    addRadarSkills(userId: $userId, period: $period, data: $data) {
      id
      subject
      value
    }
  }
`;



const ADD_KPI_SUMMARY = gql`
  mutation AddKpiSummary($userId: Int!, $period: String!, $summary: String!) {
    addKpiSummary(userId: $userId, period: $period, summary: $summary) {
      id
      summary
    }
  }
`;

const periods = ['week', 'month', 'quarter'];

export default function AdminDashboard() {
  const { data: usersData, loading: usersLoading } = useQuery(GET_USERS);

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Queries
  const { data: wellbeingData, refetch: refetchWellbeing } = useQuery(GET_WELLBEING_TRENDS, {
    variables: { userId: selectedUserId || 0 },
    skip: !selectedUserId,
  });

  const { data: radarData, refetch: refetchRadar } = useQuery(GET_RADAR_SKILLS, {
    variables: { userId: selectedUserId || 0, period: selectedPeriod },
    skip: !selectedUserId,
  });

  const { data: summaryData, refetch: refetchSummary } = useQuery(GET_KPI_SUMMARY, {
    variables: { userId: selectedUserId || 0, period: selectedPeriod },
    skip: !selectedUserId,
  });

  // Mutations
  const [addWellbeingTrend, { loading: addingTrend }] = useMutation(ADD_WELLBEING_TREND);
  const [addRadarSkills, { loading: addingRadar }] = useMutation(ADD_RADAR_SKILLS);
  const [addKpiSummary, { loading: addingSummary }] = useMutation(ADD_KPI_SUMMARY);

  // State for new entries
  const [newWeekLabel, setNewWeekLabel] = useState('');
  const [newWellbeingValue, setNewWellbeingValue] = useState('');

  const [newRadarSubject, setNewRadarSubject] = useState('');
  const [newRadarValue, setNewRadarValue] = useState('');

  const [newSummary, setNewSummary] = useState('');

  // Refetch when user or period changes
  useEffect(() => {
    if (selectedUserId) {
      refetchWellbeing();
      refetchRadar();
      refetchSummary();
    }
  }, [selectedUserId, selectedPeriod, refetchWellbeing, refetchRadar, refetchSummary]);

  // Handlers
  const handleAddTrend = async () => {
    if (!newWeekLabel || !newWellbeingValue) return alert('Remplissez tous les champs');
    try {
      await addWellbeingTrend({
        variables: {
          userId: selectedUserId,
          weekLabel: newWeekLabel,
          value: parseFloat(newWellbeingValue),
        },
      });
      setNewWeekLabel('');
      setNewWellbeingValue('');
      refetchWellbeing();
    } catch (err) {
      alert('Erreur lors de l\'ajout');
      console.error(err);
    }
  };

  const handleAddRadarSkill = async () => {
    if (!newRadarSubject || !newRadarValue) return alert('Remplissez tous les champs');
    try {
    
      await addRadarSkills({
        variables: {
          userId: selectedUserId,
          period: selectedPeriod,
          data: [
            {
              subject: newRadarSubject,  // from your state input
              value: parseInt(newRadarValue, 10),
            },
          ],
        },
      });
      setNewRadarSubject('');
      setNewRadarValue('');
      refetchRadar();
    } catch (err) {
      alert('Erreur lors de l\'ajout');
      console.error(err);
    }
  };

  const handleAddKpiSummary = async () => {
    if (!newSummary) return alert('Remplissez le résumé');
    try {
      await addKpiSummary({
        variables: {
          userId: selectedUserId,
          period: selectedPeriod,
          summary: newSummary,
        },
      });
      setNewSummary('');
      refetchSummary();
    } catch (err) {
      alert('Erreur lors de l\'ajout');
      console.error(err);
    }
  };

  if (usersLoading) return <Typography>Chargement des utilisateurs...</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord Admin
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Utilisateur</InputLabel>
        <Select
          value={selectedUserId || ''}
          onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
          label="Utilisateur"
        >
          {usersData?.users?.map((u) => (
            <MenuItem key={u.id} value={u.id}>
              {u.firstName} {u.lastName} ({u.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Période</InputLabel>
        <Select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          label="Période"
        >
          {periods.map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Wellbeing trends */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Tendances Bien-être
        </Typography>
        {wellbeingData?.wellbeingTrend?.length === 0 ? (
          <Typography>Aucune donnée</Typography>
        ) : (
          wellbeingData?.wellbeingTrend?.map((wt) => (
            <Paper key={wt.id} sx={{ p: 2, mb: 1 }}>
              {wt.weekLabel} : {wt.value}
            </Paper>
          ))
        )}
      </Box>

      {/* Add wellbeing trend */}
      <Box mb={4} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Ajouter une tendance bien-être
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            label="Semaine"
            value={newWeekLabel}
            onChange={(e) => setNewWeekLabel(e.target.value)}
          />
          <TextField
            label="Valeur"
            type="number"
            value={newWellbeingValue}
            onChange={(e) => setNewWellbeingValue(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddTrend} disabled={addingTrend}>
            Ajouter
          </Button>
        </Stack>
      </Box>

      {/* Radar skills */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Compétences Radar
        </Typography>
        {radarData?.radarSkills?.length === 0 ? (
          <Typography>Aucune donnée</Typography>
        ) : (
          radarData?.radarSkills?.map((r) => (
            <Paper key={r.id} sx={{ p: 2, mb: 1 }}>
              {r.subject} : {r.value}
            </Paper>
          ))
        )}
      </Box>

      {/* Add radar skill */}
      <Box mb={4} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Ajouter une compétence radar
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <TextField
            label="Sujet"
            value={newRadarSubject}
            onChange={(e) => setNewRadarSubject(e.target.value)}
          />
          <TextField
            label="Valeur"
            type="number"
            value={newRadarValue}
            onChange={(e) => setNewRadarValue(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddRadarSkill} disabled={addingRadar}>
            Ajouter
          </Button>
        </Stack>
      </Box>

      {/* KPI Summary */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Synthèse
        </Typography>
        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
          {summaryData?.kpiSummary?.summary || 'Aucune synthèse disponible'}
        </Typography>
      </Box>

      {/* Add KPI summary */}
      <Box mb={4} p={2} sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Ajouter / Mettre à jour la synthèse
        </Typography>
        <TextField
          label="Synthèse"
          multiline
          minRows={3}
          fullWidth
          value={newSummary}
          onChange={(e) => setNewSummary(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleAddKpiSummary} disabled={addingSummary || !selectedUserId}>
          Ajouter / Mettre à jour
        </Button>
      </Box>
    </Container>
  );
}
