// src/routes/LandingRoutes.js
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const LandingPage = Loadable(lazy(() => import('home/LandingPage')));

const LandingRoutes = {
  path: '/',
  element: <LandingPage />
};

export default LandingRoutes;
