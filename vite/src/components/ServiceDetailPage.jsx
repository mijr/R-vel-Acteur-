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
  CircularProgress,
} from '@mui/material';
import { useQuery, useMutation, gql } from '@apollo/client';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGeoLocation } from '../constants/useGeoLocation';

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
      appliedCoupon
      prices {
        region
        originalPrice
        discountedPrice
        currency
      }
    }
  }
`;

const ServiceDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = location.state || {};
  const { location: geoLocation, isLoading: geoLoading, isError: geoError } = useGeoLocation();

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

  if (loading || geoLoading) return (
    <Box display="flex" justifyContent="center" py={4}>
      <CircularProgress />
    </Box>
  );

  if (error) return <Alert severity="error" sx={{ m: 2 }}>Erreur: {error.message}</Alert>;
  if (!data?.service) return <Alert severity="warning" sx={{ m: 2 }}>Service introuvable</Alert>;

  const service = data.service;
  
  // Determine the best matching price based on geolocation
  const getGeoPrice = () => {
    if (!service.pricing || service.pricing.length === 0) return null;
    
    // Try to match by region name first
    if (geoLocation?.regionName) {
      const regionMatch = service.pricing.find(p => 
        p.region.toLowerCase() === geoLocation.regionName.toLowerCase()
      );
      if (regionMatch) return regionMatch;
    }
    
    // Try to match by country
    if (geoLocation?.country) {
      const countryMatch = service.pricing.find(p => 
        p.region.toLowerCase() === geoLocation.country.toLowerCase()
      );
      if (countryMatch) return countryMatch;
    }
    
    // Fallback to default/first pricing
    return service.pricing[0];
  };

  const geoPrice = getGeoPrice();
  const locationInfo = geoLocation?.city 
    ? `${geoLocation.city}, ${geoLocation.regionName || geoLocation.country}`
    : geoLocation?.regionName || geoLocation?.country || 'Votre région';

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

      {geoError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Nous n'avons pas pu détecter votre région. Les prix affichés sont ceux par défaut.
        </Alert>
      )}

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
          <Stack direction="row" spacing={1} mb={4} flexWrap="wrap">
            {service.targetAudience.map((item) => (
              <Chip key={item} label={item} sx={{ mb: 1 }} />
            ))}
          </Stack>

          {geoPrice && (
            <>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Tarification ({locationInfo})
              </Typography>
              <Typography mb={4} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DollarSign size={20} /> {geoPrice.amount} {geoPrice.currency}
              </Typography>
            </>
          )}

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
                  {/* {(() => {
                    const regional = appliedCouponData.prices.find(
                      (p) => p.region.toLowerCase() === geoPrice?.region.toLowerCase()
                    ) || appliedCouponData.prices[0];

                    return (
                      <>
                        Prix original : {regional.originalPrice} {regional.currency}<br />
                        Prix réduit : {regional.discountedPrice.toFixed(2)} {regional.currency}
                      </>
                    );
                  })()} */}
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
              Prix pour {locationInfo}
            </Typography>

            {geoPrice ? (
              appliedCouponData ? (
                (() => {
                  const regional = appliedCouponData.prices.find(
                    (p) => p.region.toLowerCase() === geoPrice.region.toLowerCase()
                  ) || appliedCouponData.prices[0];

                  return (
                    <Box mt={2} p={2} bgcolor="action.selected" borderRadius={1}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Prix avec coupon
                      </Typography> 
                      <Typography variant="h6" fontWeight="bold" color="primary">
                        {regional.discountedPrice.toFixed(2)} {regional.currency}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        (Prix original: {regional.originalPrice} {regional.currency})
                      </Typography>
                    </Box>
                  );
                })()
              ) : (
                <Typography variant="h5" color="primary" fontWeight="bold">
                  {geoPrice.amount} {geoPrice.currency}
                </Typography>
              )
            ) : (
              <Alert severity="warning">Aucune information de prix disponible</Alert>
            )}


            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate('/auth/login')}
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