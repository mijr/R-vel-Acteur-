import { useState, useEffect } from 'react';

export const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIPAndGeo = async () => {
      try {
        // First get IP
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error('Failed to fetch IP');
        const ipData = await ipResponse.json();

        // Then get geolocation using ipapi.co
        const geoResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
        if (!geoResponse.ok) throw new Error('Failed to fetch geolocation');
        const geoData = await geoResponse.json();

        if (geoData.error) {
          throw new Error(geoData.reason || 'Geolocation API returned error');
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
