import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from '../../../assets/images/RA_logo_1.png';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo">
      <Box
        component="img"      // specify HTML tag here, must be string 'img'
        src={Logo}           // pass imported image URL here
        alt="Logo"
        sx={{
          width: 100,
          height: 80,
          borderRadius: 2,
          objectFit: 'contain',
        }}
      />
    </Link>
  );
}
