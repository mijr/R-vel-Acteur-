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
  console.log('Coupons data:', data);
  const [createCoupon] = useMutation(CREATE_COUPON);
  const [updateCoupon] = useMutation(UPDATE_COUPON);
  const [deleteCoupon] = useMutation(DELETE_COUPON);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    code: '', type: 'FIXED', value: '', currency: '', expiration_date: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openEdit = (coupon) => {
    setEditData(coupon);
    const expirationDate = coupon.expiration_date ? new Date(parseInt(coupon.expiration_date)).toISOString().slice(0, 10) : '';
    setForm({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      currency: coupon.currency,
      expiration_date: expirationDate // Format date as YYYY-MM-DD
    });
    setDialogOpen(true);
  };

  const submitForm = async () => {
    // Ensure 'value' is a valid number and fallback to 0 if invalid
    const parsedValue = parseFloat(form.value);
    const formData = { 
      ...form, 
      value: isNaN(parsedValue) ? 0 : parsedValue // Handle invalid values
    };

    // Remove __typename if it exists
    const { __typename, ...cleanedFormData } = formData;

    if (editData) {
      await updateCoupon({ variables: { input: { ...cleanedFormData, id: editData.id } } });
    } else {
      await createCoupon({ variables: { input: cleanedFormData } });
    }

    // Refetch data after creating or updating
    refetch();

    // Close dialog and reset the form
    setDialogOpen(false);
    setForm({ code: '', type: 'FIXED', value: '', currency: '', expiration_date: '' });
    setEditData(null);
  };

  const handleDelete = async (id) => {
    await deleteCoupon({ variables: { id } });
    refetch();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Coupons</Typography>
      <Button variant="contained" onClick={() => setDialogOpen(true)}>Add Coupon</Button>
      <Grid container spacing={2} mt={2}>
        {data?.getCoupons.map(coupon => (
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
                  Expires: {new Date(parseInt(coupon.expiration_date)).toLocaleDateString()}
                </Typography>
                <Button onClick={() => openEdit(coupon)}>Edit</Button>
                <Button onClick={() => handleDelete(coupon.id)} color="error">Delete</Button>
              </CardContent>
            </Card>

          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editData ? 'Edit' : 'Create'} Coupon</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" name="code" label="Code" value={form.code} onChange={handleChange} />
          <TextField select fullWidth margin="dense" name="type" label="Type" value={form.type} onChange={handleChange}>
            <MenuItem value="FIXED">Fixed</MenuItem>
            <MenuItem value="PERCENT">Percent</MenuItem>
          </TextField>
          <TextField fullWidth margin="dense" name="value" label="Value" type="number" value={form.value} onChange={handleChange} />
          <TextField fullWidth margin="dense" name="currency" label="Currency" value={form.currency} onChange={handleChange} />
          <TextField 
            fullWidth 
            margin="dense" 
            name="expiration_date" 
            label="Expiration Date" 
            type="date" 
            value={form.expiration_date} 
            onChange={handleChange} 
            InputLabelProps={{ shrink: true }} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={submitForm} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
