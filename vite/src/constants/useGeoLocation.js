import { useState, useEffect } from 'react';

export const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIPAndGeo = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error('Failed to fetch IP');
        const ipData = await ipResponse.json();

        const geoResponse = await fetch(`http://ip-api.com/json/${ipData.ip}`);
        if (!geoResponse.ok) throw new Error('Failed to fetch geolocation');
        const geoData = await geoResponse.json();

        if (geoData.status !== 'success') {
          throw new Error('Geolocation API returned error');
        }

        setLocation(geoData);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchIPAndGeo();
  }, []);

  return { location, loading, error };
};
