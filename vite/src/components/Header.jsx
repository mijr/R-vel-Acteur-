import React, { useState } from 'react';
import { Menu, X, Calendar, User } from 'lucide-react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
  const navigation = [
    { name: 'Accueil', id: 'home' },
    { name: 'Nos Prestations', id: 'services' },
    { name: 'Témoignages', id: 'testimonials' },
    { name: 'Qui sommes-nous', id: 'about' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Actualités', id: 'news' },
    { name: 'Blog', id: 'blog' },
  ];

   const handleLogin = () => navigate('/auth/login');

  return (
    <>
      <AppBar position="sticky" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: 'pointer' }}
            onClick={() => onNavigate('home')}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'skyblue',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
              }}
            >
              R
            </Box>
            <Typography variant="h6" ml={1} fontWeight="bold">
              Rével'Acteur!
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navigation.map((item) => (
              <Button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: currentPage === item.id ? 'skyblue' : 'text.primary',
                  borderBottom: currentPage === item.id ? '2px solid skyblue' : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    color: 'skyblue',
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* CTA Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
               onClick={handleLogin}
              variant="contained"
              sx={{ backgroundColor: 'skyblue', '&:hover': { backgroundColor: '#0284c7' } }}
              startIcon={<Calendar size={18} />}
            >
              Prendre RDV
            </Button>
            <Button
             onClick={handleLogin}
              variant="outlined"
              startIcon={<User size={18} />}
              sx={{
                borderColor: '#d1d5db',
                color: 'text.primary',
                '&:hover': { backgroundColor: '#f9fafb' },
              }}
            >
              Connexion
            </Button>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            edge="end"
            onClick={() => setIsMenuOpen(true)}
            sx={{ display: { md: 'none' } }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <Box sx={{ width: 250, p: 2 }} role="presentation">
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <IconButton onClick={() => setIsMenuOpen(false)}>
              <X />
            </IconButton>
          </Box>
          <List>
            {navigation.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  selected={currentPage === item.id}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      color: 'skyblue',
                    },
                  }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Button
             onClick={handleLogin}
            variant="contained"
            fullWidth
            startIcon={<Calendar size={18} />}
            sx={{ backgroundColor: 'skyblue', '&:hover': { backgroundColor: '#0284c7' } }}
          >
            Prendre RDV
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
