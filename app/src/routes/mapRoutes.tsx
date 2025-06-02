import { useRoutes } from 'react-router-dom';

import { Route } from './types'
import { publicRoutes } from './PublicRoutes';
import { privateRoutes } from './PrivateRoutes';
//import SecureRoutes from '../components/routes/SecureRoutes';

export const AppRoutes = () => {

  const protectedRoutes = privateRoutes.map((route: Route) => ({
    ...route,
  }));

  const routing = useRoutes([...publicRoutes, ...protectedRoutes]);
  
  return routing;
};

