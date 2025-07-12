import { Route } from './types'
import Homepage from '@/features/homepage/Homepage'
import Registration from '@/features/registration/Registration';
import Login from '@/features/login/Login';
import NotFoundPage from '@/features/notFoundPage/NotFoundPage';


export const publicRoutes: Route[] = [
    {path: '/',  element: <Homepage />},
    {path: '/register',  element: <Registration />},
    {path: '/login',  element: <Login />},
    {path: '*',  element: <NotFoundPage />},
];
