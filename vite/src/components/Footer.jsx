import React from 'react';
import { MapPin, Phone, Mail, Facebook, Linkedin, Twitter } from 'lucide-react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  IconButton,
  Link,
} from '@mui/material';
import Logo from '../assets/images/RA_logo_blanc.png'

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#111827', color: '#fff', py: 6 }}>
      <Box maxWidth="lg" mx="auto" px={{ xs: 2, sm: 3, md: 4 }}>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={6}>
             <Box
                display="flex"
                alignItems="center"
                sx={{ cursor: 'pointer' }}
                onClick={() => onNavigate('home')}
              >
                <Box
                  component="img"
                  src={Logo}   // Use the imported Logo here
                  alt="Logo"
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    objectFit: 'contain',
                  }}
                />
              </Box>
            <Typography variant="body2" color="gray.300" maxWidth="md" mb={2}>
              Accompagnement professionnel en coaching, formation et médiation. 
              Révélez votre potentiel et celui de vos équipes avec des méthodes éprouvées.
            </Typography>
            <Box display="flex" gap={1}>
              <IconButton color="inherit" href="#" sx={{ color: 'gray.400', '&:hover': { color: '#fff' } }}>
                <Facebook size={20} />
              </IconButton>
              <IconButton color="inherit" href="#" sx={{ color: 'gray.400', '&:hover': { color: '#fff' } }}>
                <Linkedin size={20} />
              </IconButton>
              <IconButton color="inherit" href="#" sx={{ color: 'gray.400', '&:hover': { color: '#fff' } }}>
                <Twitter size={20} />
              </IconButton>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Nos Services
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link href="#" underline="hover" color="gray.300" sx={{ '&:hover': { color: '#fff' } }}>
                Coaching Professionnel
              </Link>
              <Link href="#" underline="hover" color="gray.300" sx={{ '&:hover': { color: '#fff' } }}>
                Formation en Entreprise
              </Link>
              <Link href="#" underline="hover" color="gray.300" sx={{ '&:hover': { color: '#fff' } }}>
                Médiation
              </Link>
              <Link href="#" underline="hover" color="gray.300" sx={{ '&:hover': { color: '#fff' } }}>
                Facilitation d'Équipe
              </Link>
              <Link href="#" underline="hover" color="gray.300" sx={{ '&:hover': { color: '#fff' } }}>
                Expression Artistique
              </Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Box display="flex" alignItems="center" mb={1} color="gray.300">
              <MapPin size={20} style={{ marginRight: 8, color: '#38bdf8' }} />
              <Typography variant="body2">Paris, France</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1} color="gray.300">
              <Phone size={20} style={{ marginRight: 8, color: '#38bdf8' }} />
              <Typography variant="body2">+33 1 23 45 67 89</Typography>
            </Box>
            <Box display="flex" alignItems="center" color="gray.300">
              <Mail size={20} style={{ marginRight: 8, color: '#38bdf8' }} />
              <Typography variant="body2">contact@revelacteur.fr</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Divider sx={{ my: 4, backgroundColor: '#1f2937' }} />
        <Typography variant="body2" align="center" color="gray.400">
          &copy; 2025 Rével'Acteur! Tous droits réservés.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
