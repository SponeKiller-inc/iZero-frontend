import { Route } from './types'
import Homepage from "@/features/homepage/Homepage"


export const publicRoutes: Route[] = [
    {path: '/',  element: <Homepage />},

];
