// src/routes/LandingRoutes.js
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const LandingPage = Loadable(lazy(() => import('home/LandingPage')));
const AppointmentPage = Loadable(lazy(() => import('home/AppointmentPage')));

const LandingRoutes = {
  path: '/',
  children: [
    {
      path: '',
      element: <LandingPage />
    },
    {
      path: 'appointment',
      element: <AppointmentPage />
    }
  ]
};

export default LandingRoutes;
