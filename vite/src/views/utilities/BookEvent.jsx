import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import MainCard from 'ui-component/cards/MainCard';
import { Typography } from '@mui/material';

export default function BookEvent() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'cal-widget' });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
    })();
  }, []);

  return (
    <MainCard title="Réserver un rendez-vous">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Sélectionnez une date ci-dessous pour réserver un rendez-vous :
      </Typography>
      <Cal
        namespace="cal-widget"
        calLink="savana-fusion-lktyvz/30min"
        style={{ width: '100%', height: '800px', overflow: 'scroll' }}
        config={{
          layout: 'month_view'
        }}
      />
    </MainCard>
  );
}
