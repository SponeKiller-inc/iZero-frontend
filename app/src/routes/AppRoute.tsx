import { useRoutes } from 'react-router-dom';

import { Route } from './types'
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './PrivateRoutest';
import SecureRoute from './SecureRoute';

export const AppRoutes = () => {

  const protectedRoutes = privateRoutes.map((route: Route) => ({
    ...route,
    element: (
        <SecureRoute>{route.element}</SecureRoute>
    ),
  }));

  const routing = useRoutes([...publicRoutes, ...protectedRoutes]);
  
  return routing;
};

