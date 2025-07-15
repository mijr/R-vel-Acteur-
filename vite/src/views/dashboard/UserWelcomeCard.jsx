import { Card, CardContent, Typography } from '@mui/material';

export default function UserWelcomeCard({ user }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Bienvenue, {user.firstName}!
        </Typography>
        <Typography variant="body1">
          Voici un aperçu de vos indicateurs sociaux.
        </Typography>
      </CardContent>
    </Card>
  );
}
