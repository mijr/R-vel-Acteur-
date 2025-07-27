import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// maintenance routing
const LoginPage = Loadable(lazy(() => import('views/auth/authentication/Login')));
const RegisterPage = Loadable(lazy(() => import('views/auth/authentication/Register')));
const ForgotPasswordPage = Loadable(lazy(() => import('views/auth/authentication/ForgotPassword')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/auth/login',
      element: <LoginPage />
    },
    {
      path: '/auth/register',
      element: <RegisterPage />
    },
    {
      path: '/auth/forgot-password',
      element: <ForgotPasswordPage /> 
    }
  ]
};

export default AuthenticationRoutes;
