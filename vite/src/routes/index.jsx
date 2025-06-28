// src/routes/index.js (or wherever createBrowserRouter is called)
import { createBrowserRouter } from 'react-router-dom';

import LandingRoutes from './LandingRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import MainRoutes from './MainRoutes';

const router = createBrowserRouter(
  [LandingRoutes, AuthenticationRoutes, MainRoutes], // 
  {
    basename: import.meta.env.VITE_APP_BASE_NAME
  }
);

export default router;
