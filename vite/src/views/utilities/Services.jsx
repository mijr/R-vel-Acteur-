import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  ListItemText,
  OutlinedInput,
  Grid,
} from '@mui/material';
import { ChevronLeft, ChevronRight, ArrowRight, Filter } from 'lucide-react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_SERVICES,
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from '../../graphql/queries';

const categories = [
  { id: 'coaching', name: 'Coaching' },
  { id: 'formation', name: 'Formation' },
  { id: 'mediation', name: 'Médiation' },
  { id: 'facilitation', name: 'Facilitation' },
  { id: 'art', name: 'Art & Créativité' },
];

const audienceOptions = ['Particuliers', 'Entreprises', 'Équipes', 'Organisations'];

// Simple helper to return icons based on category (replace with your icons)
const getCategoryIcon = (category) => {
  switch (category) {
    case 'coaching':
      return <ChevronRight size={24} />;
    case 'formation':
      return <ChevronRight size={24} />;
    case 'mediation':
      return <ChevronRight size={24} />;
    case 'facilitation':
      return <ChevronRight size={24} />;
    case 'art':
      return <ChevronRight size={24} />;
    default:
      return <ChevronRight size={24} />;
  }
};

const AddServicePage = () => {
  const { data, loading: loadingServices, error: errorServices, refetch } = useQuery(GET_SERVICES);

  const [addService] = useMutation(ADD_SERVICE);
  const [updateService] = useMutation(UPDATE_SERVICE);
  const [deleteService] = useMutation(DELETE_SERVICE);

  const [selectedService, setSelectedService] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
const [form, setForm] = useState({
  title: '',
  description: '',
  category: '',
  methodology: '',
  targetAudience: [],
  pricing: [
    { region: 'africa', amount: '', currency: 'XAF' },
    { region: 'europe', amount: '', currency: 'EUR' },
    { region: 'asia', amount: '', currency: 'USD' }
  ],
  billingMode: {
    type: 'one-time',
    periodicity: '',
    installments: null,
    expiration: '',
    rules: ''
  },
  couponRules: {
    allowed: false,
    maxDiscount: null,
    combinable: false
  }
});
  const [success, setSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAudience, setSelectedAudience] = useState('');

  const scrollContainerRef = useRef(null);

  // Reset form helper
 const resetForm = () => {
  setForm({
    title: '',
    description: '',
    category: '',
    methodology: '',
    targetAudience: [],
    pricing: [
      { region: 'africa', amount: '', currency: 'XAF' },
      { region: 'europe', amount: '', currency: 'EUR' },
      { region: 'asia', amount: '', currency: 'USD' }
    ],
    billingMode: {
      type: 'one-time',
      periodicity: '',
      installments: null,
      expiration: '',
      rules: ''
    },
    couponRules: {
      allowed: false,
      maxDiscount: null,
      combinable: false
    }
  });
  setErrorMsg(null);
};

  // When user selects a service to edit
 useEffect(() => {
  if (selectedService) {
    setForm({
      title: selectedService.title,
      description: selectedService.description,
      category: selectedService.category,
      methodology: selectedService.methodology,
      targetAudience: selectedService.targetAudience || [],
      pricing: selectedService.pricing || [
        { region: 'africa', amount: '', currency: 'XAF' },
        { region: 'europe', amount: '', currency: 'EUR' },
        { region: 'asia', amount: '', currency: 'USD' }
      ],
      billingMode: selectedService.billingMode || {
        type: 'one-time',
        periodicity: '',
        installments: null,
        expiration: '',
        rules: ''
      },
      couponRules: selectedService.couponRules || {
        allowed: false,
        maxDiscount: null,
        combinable: false
      }
    });
    setSuccess(null);
    setErrorMsg(null);
  }
}, [selectedService]);

  // Scroll function for horizontal scrolling chevrons
  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = 320 + 24; // card width + gap
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter services based on selectedCategory and selectedAudience
  const filteredServices = (data?.services || []).filter((service) => {
    const matchCategory = selectedCategory ? service.category === selectedCategory : true;

    const matchAudience = selectedAudience
      ? service.targetAudience?.includes(selectedAudience)
      : true;

    return matchCategory && matchAudience;
  });

  // Handle form submit for add/update service
  const handleSubmit = async () => {
  setErrorMsg(null);
  try {
    const input = {
      title: form.title,
      description: form.description,
      category: form.category,
      methodology: form.methodology,
      pricing: form.pricing.map(p => ({
        ...p,
        amount: parseFloat(p.amount) || 0
      })),
      targetAudience: form.targetAudience,
      billingMode: form.billingMode,
      couponRules: form.couponRules
    };

    if (selectedService) {
      await updateService({
        variables: {
          id: selectedService.id,
          input
        },
      });
      setSuccess('Service mis à jour avec succès.');
    } else {
      await addService({
        variables: { input },
      });
      setSuccess('Service ajouté avec succès.');
      resetForm();
    }
    setOpenAddModal(false);
    setSelectedService(null);
    refetch();
  } catch (err) {
    setErrorMsg(err.message || 'Une erreur est survenue.');
    setSuccess(null);
  }
};

  // Handle delete service (optional button)
  const handleDelete = async () => {
    if (!selectedService) return;
    try {
      await deleteService({ variables: { id: selectedService.id } });
      setSuccess('Service supprimé avec succès.');
      setSelectedService(null);
      refetch();
    } catch (err) {
      setErrorMsg(err.message || 'Une erreur est survenue lors de la suppression.');
    }
  };

  return (
    <Box maxWidth={900} mx="auto" p={4}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Gestion des Services
      </Typography>

      {/* Filters */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 4,
          borderBottom: 1,
          borderColor: 'divider',
          mb: 4,
        }}
      >
        <Box
          maxWidth={1200}
          mx="auto"
          px={2}
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          gap={3}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Category Filter */}
          <Box flex={1}>
            <Box display="flex" alignItems="center" mb={1}>
              <Filter size={18} style={{ marginRight: 6, color: '#6b7280' }} />
              <Typography variant="subtitle1" color="text.secondary">
                Filtrer par catégorie
              </Typography>
            </Box>
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant={selectedCategory === null ? 'contained' : 'outlined'}
                  size="small"
                  onClick={() => setSelectedCategory(null)}
                  sx={{ textTransform: 'none', minWidth: 120 }}
                >
                  Tous
                </Button>
              </Grid>
              {categories.map((category) => (
                <Grid item key={category.id}>
                  <Button
                    variant={selectedCategory === category.id ? 'contained' : 'outlined'}
                    color="primary"
                    size="small"
                    onClick={() => setSelectedCategory(category.id)}
                    sx={{ textTransform: 'none', minWidth: 120 }}
                  >
                    {category.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Audience Filter */}
          <Box width={{ xs: '100%', lg: 240 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="audience-select-label">Public cible</InputLabel>
              <Select
                labelId="audience-select-label"
                value={selectedAudience}
                label="Public cible"
                onChange={(e) => setSelectedAudience(e.target.value)}
              >
                <MenuItem value="">Tous</MenuItem>
                {audienceOptions.map((audience) => (
                  <MenuItem key={audience} value={audience}>
                    {audience}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => {
          resetForm();
          setOpenAddModal(true);
          setSelectedService(null);
          setSuccess(null);
          setErrorMsg(null);
        }}
      >
        Créer un service
      </Button>

      {/* Services Grid with horizontal scroll and chevrons */}
      <Box sx={{ py: 8 }}>
        <Box maxWidth={1200} mx="auto" px={2} position="relative">
          {/* Left Chevron */}
          <Button
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 0,
              transform: 'translateY(-50%)',
              zIndex: 10,
              minWidth: 36,
              minHeight: 36,
              borderRadius: '50%',
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': { bgcolor: 'grey.200' },
            }}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </Button>

          {/* Services Container */}
            {/* Services Container */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              gap: 3,
              px: 6,
              scrollbarWidth: 'none', // Firefox
              '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
            }}
          >
            {loadingServices && (
              <Box sx={{ width: '100%', textAlign: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            )}

            {errorServices && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {errorServices.message}
              </Alert>
            )}

            {!loadingServices && !errorServices && filteredServices.length === 0 && (
              <Typography
                align="center"
                color="text.secondary"
                variant="h6"
                py={6}
                sx={{ width: '100%' }}
              >
                Aucun service trouvé.
              </Typography>
            )}

            {filteredServices.map((service) => (
              <Paper
                key={service.id}
                elevation={3}
                sx={{
                  flex: '0 0 320px',
                  scrollSnapAlign: 'start',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-6px)',
                  },
                }}
                onClick={() => {
                  setSelectedService(service);
                  setOpenAddModal(false);
                  setSuccess(null);
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <Box
                    sx={{
                      bgcolor: 'primary.light',
                      borderRadius: 1,
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      width: 40,
                      height: 40,
                    }}
                  >
                    {getCategoryIcon(service.category)}
                  </Box>
                  <Typography variant="h6" fontWeight="600" noWrap>
                    {service.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary" mb={2} flexGrow={1} sx={{ minHeight: 60 }}>
                  {service.description}
                </Typography>

                <Box mb={2}>
                  <Typography fontWeight="medium" gutterBottom>
                    Méthodologie
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ minHeight: 50 }}>
                    {service.methodology}
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Typography fontWeight="medium" gutterBottom>
                    Public cible
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {service.targetAudience.map((audience, i) => (
                      <Chip
                        key={i}
                        label={audience}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                </Box>
                
                  <Box
                    mt="auto"
                    pt={2}
                    borderTop={1}
                    borderColor="divider"
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Pricing (based on your region)
                    </Typography>
                    {service.pricing.map((price) => (
                      <Box key={price.region} display="flex" justifyContent="space-between">
                        <Typography variant="body2" textTransform="capitalize">
                          {price.region}:
                        </Typography>
                        <Typography fontWeight="bold">
                          {price.amount} {price.currency}
                        </Typography>
                      </Box>
                    ))}
                    {service.billingMode && (
                      <Box mt={1}>
                        <Typography variant="body2" color="text.secondary">
                          {service.billingMode.type === 'one-time' && 'One-time payment'}
                          {service.billingMode.type === 'subscription' && 
                            `${service.billingMode.periodicity} subscription`}
                          {service.billingMode.type === 'installment' && 
                            `${service.billingMode.installments} installments`}
                        </Typography>
                      </Box>
                    )}
                  </Box>
              </Paper>
            ))}
          </Box>

          {/* Right Chevron */}
          <Button
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
              zIndex: 10,
              minWidth: 36,
              minHeight: 36,
              borderRadius: '50%',
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': { bgcolor: 'grey.200' },
            }}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </Button>
        </Box>
      </Box>

      {/* Add/Edit Modal */}
      <Dialog
        open={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          setSelectedService(null);
          setSuccess(null);
          setErrorMsg(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedService ? 'Modifier un service' : 'Ajouter un service'}</DialogTitle>
        <DialogContent dividers>
          {success && (
            <Alert
              severity="success"
              onClose={() => setSuccess(null)}
              sx={{ mb: 2 }}
            >
              {success}
            </Alert>
          )}
          {errorMsg && (
            <Alert
              severity="error"
              onClose={() => setErrorMsg(null)}
              sx={{ mb: 2 }}
            >
              {errorMsg}
            </Alert>
          )}
        <Stack spacing={2}>
          <TextField
            label="Titre"
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <FormControl fullWidth>
            <InputLabel id="category-select-label">Catégorie</InputLabel>
            <Select
              labelId="category-select-label"
              label="Catégorie"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Méthodologie"
            fullWidth
            multiline
            minRows={2}
            value={form.methodology}
            onChange={(e) => setForm({ ...form, methodology: e.target.value })}
          />

          {/* Remove old Tarification field */}

          <Box mt={2}>
            <Typography variant="h6" gutterBottom>Geo Pricing</Typography>
            {form.pricing.map((price, index) => (
              <Box key={price.region} mb={2}>
                <Typography variant="subtitle2" textTransform="capitalize">
                  {price.region} Pricing
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Amount"
                      type="number"
                      fullWidth
                      value={price.amount}
                      onChange={(e) => {
                        const newPricing = [...form.pricing];
                        newPricing[index].amount = e.target.value;
                        setForm({ ...form, pricing: newPricing });
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Currency"
                      select
                      fullWidth
                      value={price.currency}
                      onChange={(e) => {
                        const newPricing = [...form.pricing];
                        newPricing[index].currency = e.target.value;
                        setForm({ ...form, pricing: newPricing });
                      }}
                    >
                      <MenuItem value="XAF">XAF (Central Africa)</MenuItem>
                      <MenuItem value="EUR">EUR (Europe)</MenuItem>
                      <MenuItem value="USD">USD (Asia/International)</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>

          <Box mt={2}>
            <Typography variant="h6" gutterBottom>Billing Mode</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Billing Type</InputLabel>
              <Select
                value={form.billingMode.type}
                onChange={(e) => setForm({
                  ...form,
                  billingMode: { ...form.billingMode, type: e.target.value },
                })}
              >
                <MenuItem value="one-time">One-time Payment</MenuItem>
                <MenuItem value="subscription">Subscription</MenuItem>
                <MenuItem value="installment">Installment Plan</MenuItem>
              </Select>
            </FormControl>

            {form.billingMode.type === 'subscription' && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Periodicity</InputLabel>
                <Select
                  value={form.billingMode.periodicity}
                  onChange={(e) => setForm({
                    ...form,
                    billingMode: { ...form.billingMode, periodicity: e.target.value },
                  })}
                >
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            )}

            {form.billingMode.type === 'installment' && (
              <TextField
                label="Number of Installments"
                type="number"
                fullWidth
                margin="normal"
                value={form.billingMode.installments || ''}
                onChange={(e) => setForm({
                  ...form,
                  billingMode: { ...form.billingMode, installments: parseInt(e.target.value) },
                })}
              />
            )}

            <TextField
              label="Expiration Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              value={form.billingMode.expiration || ''}
              onChange={(e) => setForm({
                ...form,
                billingMode: { ...form.billingMode, expiration: e.target.value },
              })}
            />

            <TextField
              label="Special Rules"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={form.billingMode.rules || ''}
              onChange={(e) => setForm({
                ...form,
                billingMode: { ...form.billingMode, rules: e.target.value },
              })}
            />
          </Box>

          <Box mt={2}>
            <Typography variant="h6" gutterBottom>Coupon Rules</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.couponRules.allowed}
                  onChange={(e) => setForm({
                    ...form,
                    couponRules: { ...form.couponRules, allowed: e.target.checked },
                  })}
                />
              }
              label="Allow coupons for this service"
            />

            {form.couponRules.allowed && (
              <>
                <TextField
                  label="Maximum Discount (%)"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={form.couponRules.maxDiscount || ''}
                  onChange={(e) => setForm({
                    ...form,
                    couponRules: { ...form.couponRules, maxDiscount: parseFloat(e.target.value) },
                  })}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.couponRules.combinable}
                      onChange={(e) => setForm({
                        ...form,
                        couponRules: { ...form.couponRules, combinable: e.target.checked },
                      })}
                    />
                  }
                  label="Allow combining multiple coupons"
                />
              </>
            )}
          </Box>

          <FormControl fullWidth>
            <InputLabel id="target-audience-label">Public cible</InputLabel>
            <Select
              labelId="target-audience-label"
              multiple
              value={form.targetAudience}
              onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
              input={<OutlinedInput label="Public cible" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {audienceOptions.map((aud) => (
                <MenuItem key={aud} value={aud}>
                  <Checkbox checked={form.targetAudience.indexOf(aud) > -1} />
                  <ListItemText primary={aud} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          {selectedService && (
            <Button
              color="error"
              onClick={async () => {
                if (
                  window.confirm(
                    'Êtes-vous sûr de vouloir supprimer ce service ?'
                  )
                ) {
                  try {
                    await deleteService({ variables: { id: selectedService.id } });
                    setSuccess('Service supprimé avec succès.');
                    setSelectedService(null);
                    setOpenAddModal(false);
                    refetch();
                  } catch (err) {
                    setErrorMsg(err.message || 'Erreur lors de la suppression.');
                  }
                }
              }}
            >
              Supprimer
            </Button>
          )}
          <Button
            onClick={() => {
              setOpenAddModal(false);
              setSelectedService(null);
              setSuccess(null);
              setErrorMsg(null);
            }}
          >
            Annuler
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {selectedService ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddServicePage;
