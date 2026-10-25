import { Route } from './types'
import Dashboard from '@/features/dashboard/Dashboard';
import AccountSettings from '@/features/accountSettings/AccountSettings';


export const privateRoutes: Route[] = [
    {
        path: '/dashboard',  
        element: <Dashboard />, 
        handle: {
            label: 'dashboard'
        }
    },
    {
        path: '/account-settings',
        element: <AccountSettings />,
        handle: {
            label: 'accountSettings'
        }
    },
];
