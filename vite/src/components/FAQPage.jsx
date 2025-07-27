import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Box,
  Button,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { faqs } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
const FAQPage = () => {
   const navigate = useNavigate();
  const [openItems, setOpenItems] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Toutes les questions' },
    { id: 'coaching', name: 'Coaching' },
    { id: 'formation', name: 'Formation' },
    { id: 'processus', name: 'Processus' },
    { id: 'tarifs', name: 'Tarifs' },
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqs.filter((faq) => {
    const categoryMatch = selectedCategory === 'all' || faq.category === selectedCategory;
    const searchMatch =
      searchTerm === '' ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });
   const handleLogin = () => navigate('/auth/login');
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <Box sx={{ py: 8, textAlign: 'center', backgroundColor: '#fff' }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Questions Fréquentes
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto">
          Trouvez rapidement les réponses à vos questions les plus courantes.
          Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter.
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ py: 4, borderBottom: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', px: 2, display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher dans les questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <InputLabel id="filter-label">
              <FilterListIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Catégorie
            </InputLabel>
            <Select
              labelId="filter-label"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Catégorie"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* FAQ Items */}
      <Box sx={{ py: 6, maxWidth: 900, mx: 'auto', px: 2 }}>
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => (
            <Accordion
              key={faq.id}
              expanded={openItems.has(faq.id)}
              onChange={() => toggleItem(faq.id)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {faq.question}
                  </Typography>
                  <Chip
                    size="small"
                    label={faq.category}
                    color="primary"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ py: 8 }}>
            Aucune question ne correspond à votre recherche.
          </Typography>
        )}
      </Box>

      {/* Contact CTA */}
      <Box sx={{ py: 8, backgroundColor: '#fff', textAlign: 'center' }}>
        <Box sx={{ backgroundColor: '#e0f2fe', borderRadius: 2, px: 4, py: 6, maxWidth: 700, mx: 'auto' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Vous ne trouvez pas votre réponse ?
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Notre équipe est disponible pour répondre à toutes vos questions spécifiques.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', mt: 4 }}>
            <Button   onClick={handleLogin} variant="contained" color="primary" size="large">
              Prendre rendez-vous
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Nous contacter
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FAQPage;
