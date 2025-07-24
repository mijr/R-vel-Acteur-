import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button, Checkbox, FormControl, FormControlLabel, Grid,
  IconButton, InputAdornment, InputLabel, OutlinedInput,
  TextField, Typography, Box
} from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// GraphQL mutation
const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
    ) {
      token
      user {
        id
        email
        role
        phone
      }
    }
  }
`;



export default function AuthRegister() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
   const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phone, setPhone] = useState('');


  const [signup, { loading }] = useMutation(SIGNUP);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleSubmit = async () => {
    try {
      const { data } = await signup({
        variables: { email, password, firstName, lastName, phone }
      });


      localStorage.setItem('token', data.signup.token);

      Swal.fire({
        icon: 'success',
        title: 'Inscription réussie',
        text: `Bienvenue ${data.signup.user.email} !`,
      }).then(() => {
        // ✅ navigate after success
        navigate('/pages/login');
      });

    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: err.message || 'Une erreur est survenue lors de l’inscription.',
      });
    }
  };



  return (
    <>
      <Grid container direction="column" spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

     <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            sx={{ ...theme.typography.customInput }}
          />
        </Grid>

      </Grid>


      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
        <OutlinedInput
          id="outlined-adornment-email-register"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address / Username"
        />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password-register"
          type={showPassword ? 'text' : 'password'}
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid item>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />}
            label={
              <Typography variant="subtitle1">
                Agree with &nbsp;
                <Typography variant="subtitle1" component={Link} to="#">
                  Terms & Conditions
                </Typography>
              </Typography>
            }
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button
            disableElevation
            fullWidth
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>
        </AnimateButton>
      </Box>
    </>
  );
}
