// src/routes/LandingRoutes.js
import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const LandingPage = Loadable(lazy(() => import('home/LandingPage')));
const AppointmentPage = Loadable(lazy(() => import('home/AppointmentPage')));
const BlogPage = Loadable(lazy(() => import('home/Blog')));
const NewsPage = Loadable(lazy(() => import('home/News')));

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
    },
     {
      path: 'blog',
      element: <BlogPage />
    },
    {
      path: 'news',
      element: <NewsPage />
    }
  ]
};

export default LandingRoutes;
