import { Route } from './types'
import Homepage from '@/features/homepage/Homepage'
import Registration from '@/features/registration/Registration';


export const publicRoutes: Route[] = [
    {path: '/',  element: <Homepage />},
    {path: '/register',  element: <Registration />},
];
