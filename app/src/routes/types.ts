import { ReactElement, ReactNode } from 'react';

export interface Route {
  path: string;
  element: ReactElement;
}

export interface SecureRouteProps {
  children: ReactNode;
}