import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// material-ui
import {
  Box, Button, Grid, InputLabel, MenuItem,
  Select, TextField, Typography, FormControl,
  Stepper, Step, StepLabel, Alert, Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { CalendarToday, Schedule, Email, Category } from '@mui/icons-material';

// Apollo
import { gql, useMutation } from '@apollo/client';

// Custom theme colors
const brandColors = {
  primary: '#87CEEB', // Sky blue
  secondary: '#E3F2FD', // Light blue
  background: '#FFFFFF', // White
  text: '#333333', // Dark gray for text
  accent: '#5D9CEC', // Complementary blue
  success: '#4CAF50' // Green for success
};

const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($input: AppointmentInput!) {
    createAppointment(input: $input) {
      id
      email
      dateTime
      type
    }
  }
`;

const steps = ['Détails', 'Confirmation'];

const AppointmentPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState('');
  const [type, setType] = useState('découverte');
  const [emailError, setEmailError] = useState('');
  const [dateError, setDateError] = useState('');

  const [createAppointment, { loading, error }] = useMutation(CREATE_APPOINTMENT);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleNext = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email est requis');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Veuillez entrer un email valide');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!selectedDate) {
      setDateError('Veuillez sélectionner une date');
      isValid = false;
    } else {
      setDateError('');
    }

    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  const ConfirmationStep = () => {
    const handleConfirm = async () => {
      if (!selectedDate || !time) return;

      const [hours, minutes] = time.split(':');
      const dateWithTime = new Date(selectedDate);
      dateWithTime.setHours(parseInt(hours));
      dateWithTime.setMinutes(parseInt(minutes));
      dateWithTime.setSeconds(0);
      dateWithTime.setMilliseconds(0);

      try {
        await createAppointment({
          variables: {
            input: {
              email,
              dateTime: dateWithTime.toISOString(),
              type
            }
          }
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (err) {
        console.error('GraphQL Error:', err);
      }
    };

    return (
      <Box sx={{ mt: 3 }}>
        <Alert severity="success" sx={{
          mb: 3,
          backgroundColor: brandColors.secondary,
          color: brandColors.text
        }}>
          Veuillez vérifier les détails de votre rendez-vous avant confirmation
        </Alert>

        <Paper elevation={0} sx={{
          p: 3,
          mb: 3,
          backgroundColor: brandColors.secondary,
          borderRadius: '12px',
          border: `1px solid ${brandColors.primary}`
        }}>
          <Typography variant="h6" color={brandColors.accent} gutterBottom sx={{ fontWeight: 600 }}>
            Résumé du rendez-vous
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color={brandColors.text}>Email:</Typography>
              <Typography sx={{ color: brandColors.text }}>{email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color={brandColors.text}>Date:</Typography>
              <Typography sx={{ color: brandColors.text }}>
                {selectedDate?.toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color={brandColors.text}>Heure:</Typography>
              <Typography sx={{ color: brandColors.text }}>
                {time}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color={brandColors.text}>Type:</Typography>
              <Typography sx={{ color: brandColors.text, textTransform: 'capitalize' }}>{type}</Typography>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Une erreur est survenue lors de la prise du rendez-vous.
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            onClick={handleBack}
            variant="outlined"
            sx={{
              mr: 1,
              color: brandColors.accent,
              borderColor: brandColors.accent,
              '&:hover': {
                borderColor: brandColors.primary
              }
            }}
          >
            Retour
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: brandColors.primary,
              '&:hover': {
                backgroundColor: brandColors.accent
              }
            }}
          >
            {loading ? 'Envoi...' : 'Confirmer'}
          </Button>
        </Box>
      </Box>
    );
  };

  const SuccessStep = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 4
      }}
    >
      <Box sx={{ mb: 3 }}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill={brandColors.success} />
          <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Box>

      <Typography variant="h4" sx={{
        color: brandColors.accent,
        gutterBottom: true,
        fontWeight: 600,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
      }}>
        Rendez-vous confirmé !
      </Typography>
      <Typography variant="body1" sx={{
        mb: 2,
        color: brandColors.text
      }}>
        Nous avons envoyé les détails de votre rendez-vous à <strong>{email}</strong>
      </Typography>
      <Typography variant="body2" sx={{
        mb: 4,
        color: brandColors.text
      }}>
        Un rappel vous sera envoyé 24 heures avant votre rendez-vous.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
        sx={{
          mt: 2,
          backgroundColor: brandColors.primary,
          '&:hover': {
            backgroundColor: brandColors.accent
          }
        }}
      >
        Retour à l'accueil
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: brandColors.background,
        color: brandColors.text,
        p: { xs: 2, sm: 4 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          backgroundColor: brandColors.background,
          borderRadius: '16px',
          p: { xs: 2, sm: 4 },
          width: '100%',
          maxWidth: '800px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${brandColors.secondary}`
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{
                '& .MuiStepLabel-label': {
                  color: brandColors.text,
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }
              }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <SuccessStep />
        ) : activeStep === 1 ? (
          <ConfirmationStep />
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h4" mb={3} sx={{
              textAlign: 'center',
              color: brandColors.accent,
              fontWeight: 600,
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
            }}>
              Prendre un rendez-vous
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Votre email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  error={!!emailError}
                  helperText={emailError}
                  InputProps={{
                    startAdornment: <Email sx={{
                      mr: 1,
                      color: brandColors.primary
                    }} />,
                    style: {
                      color: brandColors.text,
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: brandColors.text,
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                    }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: brandColors.primary,
                      },
                      '&:hover fieldset': {
                        borderColor: brandColors.accent,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel sx={{
                  mb: 1,
                  color: brandColors.text,
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                }}>
                  <CalendarToday sx={{
                    mr: 1,
                    fontSize: '1rem',
                    color: brandColors.primary
                  }} />
                  Date
                </InputLabel>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    if (dateError) setDateError('');
                  }}
                  minDate={new Date()}
                  filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
                  dateFormat="PPPP"
                  placeholderText="Sélectionnez une date"
                  customInput={
                    <TextField
                      fullWidth
                      error={!!dateError}
                      helperText={dateError}
                      InputProps={{
                        style: {
                          color: brandColors.text,
                          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: brandColors.primary,
                          },
                          '&:hover fieldset': {
                            borderColor: brandColors.accent,
                          },
                        },
                      }}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="time"
                  label={
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      color: brandColors.text
                    }}>
                      <Schedule sx={{
                        mr: 1,
                        fontSize: '1rem',
                        color: brandColors.primary
                      }} />
                      Heure
                    </Box>
                  }
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  InputLabelProps={{
                    style: {
                      color: brandColors.text,
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                    },
                    shrink: true
                  }}
                  InputProps={{
                    style: {
                      color: brandColors.text,
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: brandColors.primary,
                      },
                      '&:hover fieldset': {
                        borderColor: brandColors.accent,
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel
                    id="appointment-type-label"
                    sx={{
                      color: brandColors.text,
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                    }}
                  >
                    <Category sx={{
                      mr: 1,
                      fontSize: '1rem',
                      color: brandColors.primary
                    }} />
                    Type de rendez-vous
                  </InputLabel>
                  <Select
                    labelId="appointment-type-label"
                    value={type}
                    label="Type de rendez-vous"
                    onChange={(e) => setType(e.target.value)}
                    sx={{
                      color: brandColors.text,
                      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: brandColors.primary,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: brandColors.accent,
                      },
                    }}
                  >
                    <MenuItem value="découverte">Découverte (30 min)</MenuItem>
                    <MenuItem value="suivi">Suivi de projet (60 min)</MenuItem>
                    <MenuItem value="coaching">Coaching personnel (90 min)</MenuItem>
                    <MenuItem value="formation">Formation (120 min)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <AnimateButton>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: brandColors.primary,
                    '&:hover': {
                      backgroundColor: brandColors.accent
                    },
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
                  }}
                >
                  Suivant
                </Button>
              </AnimateButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AppointmentPage;
