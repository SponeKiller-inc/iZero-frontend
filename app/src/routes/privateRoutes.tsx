import { Route } from './types'
import Dashboard from '@/features/dashboard/Dashboard';
import CustomerCatalog from '@/features/catalog/customer/Customer';


export const privateRoutes: Route[] = [
    {
        path: '/dashboard',  
        element: <Dashboard />, 
        handle: {
            label: 'Dashboard',
            entityType: 'dashboard'
        }
    },
    {
        path: '/catalog/customer',  
        element: <CustomerCatalog />, 
        handle: {
            label: 'Customer Catalog',
            entityType: 'customer'
        }
    },
];
