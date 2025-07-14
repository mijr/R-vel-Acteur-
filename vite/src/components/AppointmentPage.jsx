import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Event as CalendarIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const AppointmentPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    appointmentType: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const serviceTypes = [
    { id: 'coaching', name: 'Coaching Professionnel', duration: '1h30' },
    { id: 'formation', name: 'Formation', duration: '2h - 8h' },
    { id: 'mediation', name: 'Médiation', duration: '2h' },
    { id: 'facilitation', name: "Facilitation d'Équipe", duration: '4h' },
    { id: 'art', name: 'Expression Artistique', duration: '1h' },
  ];

  const appointmentTypes = [
    { id: 'decouverte', name: 'Séance découverte (gratuite)', duration: '30min' },
    { id: 'premiere', name: 'Première séance', duration: '1h30' },
    { id: 'suivi', name: 'Séance de suivi', duration: '1h' },
    { id: 'urgent', name: 'Rendez-vous urgent', duration: '1h' },
  ];

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Confirmation step
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      serviceType: '',
      appointmentType: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  // Step 1: Service & Appointment Type selection
  const renderStep1 = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Quel type de service vous intéresse ?
      </Typography>
      <ToggleButtonGroup
        value={formData.serviceType}
        exclusive
        onChange={(e, val) => val && handleInputChange('serviceType', val)}
        sx={{ flexWrap: 'wrap', gap: 2, mb: 4 }}
      >
        {serviceTypes.map(({ id, name, duration }) => (
          <ToggleButton
            key={id}
            value={id}
            sx={{
              flexDirection: 'column',
              width: 160,
              height: 80,
              borderRadius: 2,
              borderWidth: 2,
              textAlign: 'left',
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                borderColor: 'primary.main',
                color: 'primary.main',
              },
            }}
          >
            <Typography fontWeight="bold">{name}</Typography>
            <Typography variant="caption" color="text.secondary">
              Durée : {duration}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Typography variant="h6" gutterBottom>
        Type de rendez-vous
      </Typography>
      <ToggleButtonGroup
        value={formData.appointmentType}
        exclusive
        onChange={(e, val) => val && handleInputChange('appointmentType', val)}
        sx={{ flexWrap: 'wrap', gap: 2 }}
      >
        {appointmentTypes.map(({ id, name, duration }) => (
          <ToggleButton
            key={id}
            value={id}
            sx={{
              flexDirection: 'column',
              width: 160,
              height: 80,
              borderRadius: 2,
              borderWidth: 2,
              textAlign: 'left',
              '&.Mui-selected': {
                bgcolor: 'primary.light',
                borderColor: 'primary.main',
                color: 'primary.main',
              },
            }}
          >
            <Typography fontWeight="bold">{name}</Typography>
            <Typography variant="caption" color="text.secondary">
              Durée : {duration}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );

  // Step 2: Date & Time selection
  const renderStep2 = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choisissez une date et une heure
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Date souhaitée"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" mb={1}>
            Heure souhaitée
          </Typography>
          <ToggleButtonGroup
            value={formData.time}
            exclusive
            onChange={(e, val) => val && handleInputChange('time', val)}
            sx={{ flexWrap: 'wrap', gap: 1 }}
          >
            {timeSlots.map((time) => (
              <ToggleButton key={time} value={time} sx={{ width: 70 }}>
                {time}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );

  // Step 3: Contact information
  const renderStep3 = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Vos informations de contact
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Nom complet *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email *"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Téléphone *"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Message (optionnel)"
            multiline
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );

  // Step 4: Confirmation
  const renderStep4 = () => (
    <Box textAlign="center" py={6}>
      <Box
        sx={{
          width: 80,
          height: 80,
          bgcolor: 'success.light',
          borderRadius: '50%',
          mx: 'auto',
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'success.main',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 40 }} />
      </Box>

      <Typography variant="h4" fontWeight="bold" mb={2}>
        Rendez-vous confirmé !
      </Typography>
      <Typography color="text.secondary" mb={4}>
        Votre demande de rendez-vous a été transmise avec succès. Vous recevrez une confirmation par email sous 24h.
      </Typography>

      <Paper
        variant="outlined"
        sx={{ p: 3, maxWidth: 400, mx: 'auto', textAlign: 'left', mb: 4 }}
      >
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          Récapitulatif de votre réservation
        </Typography>
        <Typography>
          <strong>Service :</strong>{' '}
          {serviceTypes.find((s) => s.id === formData.serviceType)?.name || '-'}
        </Typography>
        <Typography>
          <strong>Type :</strong>{' '}
          {appointmentTypes.find((t) => t.id === formData.appointmentType)?.name || '-'}
        </Typography>
        <Typography>
          <strong>Date :</strong>{' '}
          {formData.date ? new Date(formData.date).toLocaleDateString('fr-FR') : '-'}
        </Typography>
        <Typography>
          <strong>Heure :</strong> {formData.time || '-'}
        </Typography>
      </Paper>

      <Button variant="contained" onClick={resetForm} size="large">
        Prendre un autre rendez-vous
      </Button>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        component="section"
        sx={{
          bgcolor: 'background.paper',
          py: 8,
          textAlign: 'center',
          boxShadow: 1,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Prendre Rendez-vous
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
            Réservez votre séance d'accompagnement en quelques clics. Nous vous confirmerons les détails sous 24h.
          </Typography>
        </Container>
      </Box>

      {/* Form Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper variant="outlined" sx={{ p: 4 }}>
          {/* Stepper */}
          <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 4 }}>
            {['Service', 'Date & Heure', 'Contact', 'Confirmation'].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            {step < 4 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
                <Button
                  disabled={step === 1}
                  onClick={() => setStep(step - 1)}
                  variant="outlined"
                >
                  Retour
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={
                    (step === 1 && (!formData.serviceType || !formData.appointmentType)) ||
                    (step === 2 && (!formData.date || !formData.time)) ||
                    (step === 3 &&
                      (!formData.name || !formData.email || !formData.phone))
                  }
                >
                  {step === 3 ? 'Confirmer' : 'Suivant'}
                </Button>
              </Box>
            )}
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AppointmentPage;
