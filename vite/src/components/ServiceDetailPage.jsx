import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Stack,
  Button,
  Divider,
  Grid,
  Container,
  TextField,
  Alert,
} from '@mui/material';
import { useQuery, useMutation, gql } from '@apollo/client';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const GET_SERVICE = gql`
  query GetService($id: ID!) {
    service(id: $id) {
      id
      title
      description
      category
      methodology
      targetAudience
      pricing {
        region
        amount
        currency
      }
      billingMode {
        type
        periodicity
        installments
        expiration
        rules
      }
      couponRules {
        allowed
        maxDiscount
        combinable
      }
      createdAt
      updatedAt
    }
  }
`;

const APPLY_COUPON = gql`
  mutation ApplyCouponToService($serviceId: ID!, $couponCode: String!) {
    applyCouponToService(serviceId: $serviceId, couponCode: $couponCode) {
      service {
        id
        title
      }
      originalPrice
      discountedPrice
      currency
      appliedCoupon
    }
  }
`;

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = location.state || {};

  const { data, loading, error } = useQuery(GET_SERVICE, {
    variables: { id: serviceId },
    skip: !serviceId,
  });

  const [applyCouponToService, { loading: applying }] = useMutation(APPLY_COUPON);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(null);
  const [appliedCouponData, setAppliedCouponData] = useState(null);

  useEffect(() => {
    setCouponCode('');
    setCouponError(null);
    setAppliedCouponData(null);
  }, [data?.service]);

  if (loading) return <Typography>Chargement...</Typography>;
  if (error) return <Typography>Erreur: {error.message}</Typography>;
  if (!data?.service) return <Typography>Service introuvable</Typography>;

  const service = data.service;
  const userRegion = 'europe';
  const geoPrice = service.pricing.find((p) => p.region === userRegion) || service.pricing[0];

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    applyCouponToService({
      variables: { serviceId: service.id, couponCode: couponCode.trim() },
    })
      .then(({ data }) => {
        setCouponError(null);
        setAppliedCouponData(data.applyCouponToService);
      })
      .catch((err) => {
        setCouponError(err.message);
        setAppliedCouponData(null);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Button onClick={() => navigate(-1)} startIcon={<ArrowLeft size={18} />} sx={{ mb: 3 }}>
        Retour
      </Button>

      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {service.title}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Description
          </Typography>
          <Typography mb={4}>{service.description}</Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Méthodologie
          </Typography>
          <Typography mb={4}>{service.methodology}</Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Public cible
          </Typography>
          <Stack direction="row" spacing={1} mb={4}>
            {service.targetAudience.map((item) => (
              <Chip key={item} label={item} />
            ))}
          </Stack>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Tarification ({geoPrice.region})
          </Typography>
          <Typography mb={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DollarSign size={16} /> {geoPrice.amount} {geoPrice.currency}
          </Typography>

          {service.couponRules?.allowed && (
            <Box mt={6}>
              <Typography variant="h5" gutterBottom>
                Appliquer un code promo
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} maxWidth={400}>
                <TextField
                  label="Code promo"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  fullWidth
                  disabled={applying}
                />
                <Button
                  variant="contained"
                  onClick={handleApplyCoupon}
                  disabled={applying || !couponCode.trim()}
                >
                  {applying ? 'Application...' : 'Appliquer'}
                </Button>
              </Stack>
              {couponError && <Alert severity="error" sx={{ mt: 2 }}>{couponError}</Alert>}
              {appliedCouponData && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  Code promo <strong>{appliedCouponData.appliedCoupon}</strong> appliqué !<br />
                  Prix original : {appliedCouponData.originalPrice} {appliedCouponData.currency}<br />
                  Prix réduit : {appliedCouponData.discountedPrice.toFixed(2)} {appliedCouponData.currency}
                </Alert>
              )}
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Détails de facturation
            </Typography>
            <Typography mb={2}>Mode: {service.billingMode.type}</Typography>
            {service.billingMode.periodicity && (
              <Typography mb={2}>Périodicité: {service.billingMode.periodicity}</Typography>
            )}
            {service.billingMode.installments && (
              <Typography mb={2}>Versements: {service.billingMode.installments} fois</Typography>
            )}
            {service.billingMode.expiration && (
              <Typography mb={2}>Expiration: {service.billingMode.expiration}</Typography>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Prix
            </Typography>

            {appliedCouponData ? (
              <Box mt={2} p={2} bgcolor="action.selected" borderRadius={1}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Prix avec coupon
                </Typography>
                <Typography variant="h6" color="primary">
                  {appliedCouponData.discountedPrice.toFixed(2)} {appliedCouponData.currency}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h5" color="primary" fontWeight="bold">
                {geoPrice.amount} {geoPrice.currency}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/pages/login')}
              sx={{ mt: 3 }}
            >
              Réserver maintenant
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceDetailPage;
