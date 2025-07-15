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
const UtilsComment = Loadable(lazy(() => import('views/utilities/Comment')));
const UtilsBlog = Loadable(lazy(() =>import('views/utilities/Blog') ));
const UtilsSociologicalDashboard = Loadable(lazy(() =>import('views/utilities/SociologicalDashboard') ));
const UtilsUserDashboard = Loadable(lazy(() =>import('views/utilities/UserDashboard') ));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Profile = Loadable(lazy(() => import('views/sample-page/Profile')));
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
    },
    {
      path: '/Comment',
      element: <UtilsComment /> 

    },
     {
      path: '/SociologicalDashboard',
      element: <UtilsSociologicalDashboard /> 

    },
     {
      path: '/UserDashboard',
      element: <UtilsUserDashboard /> 

    },
    {
      path:'/Articles',
      element: <UtilsBlog/>
    },
    {
      path: '/Profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;
