import { Route } from './types'
import Dashboard from '@/features/dashboard/Dashboard';


export const privateRoutes: Route[] = [
    {path: '/dashboard',  element: <Dashboard />},
];
