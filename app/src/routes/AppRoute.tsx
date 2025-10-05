import { createBrowserRouter } from 'react-router-dom';

import { Route } from './types'
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';
import SecureRoute from './SecureRoute';


  const protectedRoutes = privateRoutes.map((route: Route) => ({
    ...route,
    element: (
        <SecureRoute>{route.element}</SecureRoute>
    ),
  }));

  const routing = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
  
  export default routing


