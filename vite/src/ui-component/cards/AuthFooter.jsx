// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

export default function AuthFooter() {
  return (
    <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
      <Typography variant="subtitle2" component={Link} href="https://Rével'Acteur.com" target="_blank" underline="hover">
        Rével'Acteur.com
      </Typography>
      <Typography variant="subtitle2" component={Link} href="https://Rével'Acteur.com" target="_blank" underline="hover">
        &copy; Rével'Acteur.com
      </Typography>
    </Stack>
  );
}
