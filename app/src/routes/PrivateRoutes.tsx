import { Route } from './types'
import Homepage from "@/features/homepage/Homepage"


export const privateRoutes: Route[] = [
    {path: '/',  element: <Homepage />},

];
