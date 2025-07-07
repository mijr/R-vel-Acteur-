import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const AppointmentList = Loadable(lazy(() => import('views/utilities/AppointmentList')));
const BookEvent = Loadable(lazy(() => import('views/utilities/BookEvent')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsUsers = Loadable(lazy(() => import('views/utilities/Users')));
const UtilsNews = Loadable(lazy(()=>   import('views/utilities/News')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'AppointmentList',
      element: <AppointmentList />
    },
    {
     path: 'BookEvent',
      element: <BookEvent />  
    },
    {
     path: 'New',
      element: <UtilsNews />  
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'User',
      element: <UtilsUsers />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
