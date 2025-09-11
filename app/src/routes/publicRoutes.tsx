import { Route } from './types'
import Homepage from '@/features/homepage/Homepage'
import Registration from '@/features/registration/Registration';
import Login from '@/features/login/Login';
import NotFoundPage from '@/features/notFoundPage/NotFoundPage';

export const publicRoutes: Route[] = [
    {
        path: '/',  
        element: <Homepage />, 
        handle: {
            label: 'homepage'
        },
    },
    {
        path: '/register',  
        element: <Registration />, 
        handle: {
            label: 'register'
        },
    },
    {
        path: '/login',  
        element: <Login />, 
        handle: {
            label: 'login'
        },
    },
    {
        path: '*',  
        element: <NotFoundPage />, 
        handle: {
            label: 'notFound'
        }
    },
];
