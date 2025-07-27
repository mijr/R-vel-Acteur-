import React, { useState } from 'react';
import {
  useQuery, useMutation
} from '@apollo/client';
import {
  Box, Button, TextField, MenuItem, Card, CardContent, Grid, Typography, Dialog, DialogTitle, DialogActions, DialogContent
} from '@mui/material';
import {
  GET_COUPONS, CREATE_COUPON, UPDATE_COUPON, DELETE_COUPON
} from '../../graphql/queries';

export default function CouponPage() {
  const { data, refetch } = useQuery(GET_COUPONS);
  const [createCoupon] = useMutation(CREATE_COUPON);
  const [updateCoupon] = useMutation(UPDATE_COUPON);
  const [deleteCoupon] = useMutation(DELETE_COUPON);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    code: '', type: 'FIXED', value: '', currency: '', expiration_date: ''
  });

  // New state for filters
  const [filters, setFilters] = useState({
    type: '',
    currency: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'code' ? value.toUpperCase() : value
    });
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const openEdit = (coupon) => {
    setEditData(coupon);
    const expirationDate = coupon.expiration_date ? new Date(parseInt(coupon.expiration_date)).toISOString().slice(0, 10) : '';
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      currency: coupon.currency,
      expiration_date: expirationDate
    });
    setDialogOpen(true);
  };

  const submitForm = async () => {
    const parsedValue = parseFloat(form.value);
    const formData = {
      ...form,
      value: isNaN(parsedValue) ? 0 : parsedValue
    };

    const { __typename, ...cleanedFormData } = formData;

    if (editData) {
      await updateCoupon({ variables: { input: { ...cleanedFormData, id: editData.id } } });
    } else {
      await createCoupon({ variables: { input: cleanedFormData } });
    }

    refetch();
    setDialogOpen(false);
    setForm({ code: '', type: 'FIXED', value: '', currency: '', expiration_date: '' });
    setEditData(null);
  };

  const handleDelete = async (id) => {
    await deleteCoupon({ variables: { id } });
    refetch();
  };

  // Filter coupons based on filters state
  const filteredCoupons = data?.getCoupons.filter(coupon => {
    return (
      (filters.type === '' || coupon.type === filters.type) &&
      (filters.currency === '' || coupon.currency === filters.currency)
    );
  }) || [];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Coupons</Typography>

      {/* Filters */}
      <Box mb={2} display="flex" gap={2} flexWrap="wrap">
        <TextField
          select
          label="Filtrer par type"
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">Tous</MenuItem>
          <MenuItem value="FIXED">Fixe</MenuItem>
          <MenuItem value="PERCENT">Pourcentage</MenuItem>
        </TextField>

        <TextField
          select
          label="Filtrer par devise"
          name="currency"
          value={filters.currency}
          onChange={handleFilterChange}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">Toutes</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="XOF">XAF</MenuItem>
        </TextField>
      </Box>

      <Button variant="contained" onClick={() => setDialogOpen(true)}>Ajouter un coupon</Button>

      <Grid container spacing={2} mt={2}>
        {filteredCoupons.map(coupon => (
          <Grid item xs={12} md={4} key={coupon.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{coupon.code}</Typography>
                <Typography>
                  {coupon.type === 'PERCENT'
                    ? `${coupon.value}%`
                    : `${coupon.value} ${coupon.currency}`}
                </Typography>
                <Typography>
                  Expire le : {new Date(parseInt(coupon.expiration_date)).toLocaleDateString('fr-FR')}
                </Typography>
                <Button onClick={() => openEdit(coupon)}>Modifier</Button>
                <Button onClick={() => handleDelete(coupon.id)} color="error">Supprimer</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editData ? 'Modifier' : 'Créer'} un coupon</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" name="code" label="Code" value={form.code} onChange={handleChange} />
          <TextField select fullWidth margin="dense" name="type" label="Type" value={form.type} onChange={handleChange}>
            <MenuItem value="FIXED">Fixe</MenuItem>
            <MenuItem value="PERCENT">Pourcentage</MenuItem>
          </TextField>
          <TextField fullWidth margin="dense" name="value" label="Valeur" type="number" value={form.value} onChange={handleChange} />
          <TextField
            select
            fullWidth
            margin="dense"
            name="currency"
            label="Devise"
            value={form.currency}
            onChange={handleChange}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="XOF">XAF</MenuItem>
          </TextField>

          <TextField
            fullWidth
            margin="dense"
            name="expiration_date"
            label="Date d'expiration"
            type="date"
            value={form.expiration_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button onClick={submitForm} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
